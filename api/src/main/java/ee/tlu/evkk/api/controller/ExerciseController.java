package ee.tlu.evkk.api.controller;

import ee.tlu.evkk.api.service.ExerciseService;
import ee.tlu.evkk.dal.dto.Exercise;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URL;
import java.nio.file.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.io.IOException;
import java.util.Map;
import java.util.HashMap;
import java.io.InputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.List;
import org.springframework.core.io.Resource;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import javax.servlet.http.HttpServletRequest;


@RestController
@RequestMapping("/exercises")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ExerciseController {

  private final ExerciseService exerciseService;

  @GetMapping
  public List<Exercise> getAll() {
    return exerciseService.getAllExercises();
  }

  @GetMapping("/{id}")
  public Exercise getById(@PathVariable Long id) {
    return exerciseService.getExerciseById(id);
  }


//  @GetMapping("/file/{externalId}/{filename}")
//  public ResponseEntity<Resource> serveExerciseFile(@PathVariable String externalId, @PathVariable String filename) {
//    try {
//      if (!Files.exists(filePath)) {
//        return ResponseEntity.notFound().build();
//      }
//      Path filePath = Paths.get("uploads/exercises/" + externalId).resolve(filename).normalize();
//      Resource resource = new UrlResource(filePath.toUri());
//
//      if (resource.exists() || resource.isReadable()) {
//        return ResponseEntity.ok()
//          .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
//          .body(resource);
//      } else {
//        return ResponseEntity.notFound().build();
//      }
//    } catch (Exception e) {
//      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//    }
//  }

//  @GetMapping("/uploads/exercises/{externalId}/{filename}")
//  public ResponseEntity<Resource> serveContentFilex(
//    @PathVariable String externalId,
//    @PathVariable String filename) {
//
//    try {
//      Path filePath = Paths.get("uploads/exercises/" + externalId + "/h5p.json").normalize();
//      Resource resource = new UrlResource(filePath.toUri());
//
//      if (resource.exists() || resource.isReadable()) {
//        return ResponseEntity.ok()
//          .header(HttpHeaders.CONTENT_DISPOSITION, "inline")
//          .body(resource);
//      } else {
//        return ResponseEntity.notFound().build();
//      }
//    } catch (Exception e) {
//      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//    }
//  }
//
//
//  @GetMapping("/uploads/exercises/{externalId}/content/{filename}")
//  public ResponseEntity<Resource> serveContentFile(
//    @PathVariable String externalId,
//    @PathVariable String filename) {
//
//    try {
//      Path filePath = Paths.get("uploads/exercises/" + externalId + "/content/content.json").normalize();
//      Resource resource = new UrlResource(filePath.toUri());
//
//      if (resource.exists() || resource.isReadable()) {
//        return ResponseEntity.ok()
//          .header(HttpHeaders.CONTENT_DISPOSITION, "inline")
//          .body(resource);
//      } else {
//        return ResponseEntity.notFound().build();
//      }
//    } catch (Exception e) {
//      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//    }
//  }


  @GetMapping("/uploads/exercises/{externalId}/**")
  public ResponseEntity<Resource> serveFileAlternativePath(
    @PathVariable String externalId,
    HttpServletRequest request) {

    try {
      // Extract the filepath from the request URL
      String requestURL = request.getRequestURI();
      String basePath = "/uploads/exercises/" + externalId + "/";
      String filepath = requestURL.substring(requestURL.indexOf(basePath) + basePath.length());

      // Construct the path to the file
      Path filePath = Paths.get("uploads/exercises/" + externalId + "/" + filepath).normalize();

      // Create a resource from the file path
      Resource resource = new UrlResource(filePath.toUri());

      // Check if the resource exists and is readable
      if (resource.exists() || resource.isReadable()) {
        return ResponseEntity.ok()
          .header(HttpHeaders.CONTENT_DISPOSITION, "inline")
          .body(resource);
      } else {
        // Return 404 if the file does not exist
        return ResponseEntity.notFound().build();
      }
    } catch (Exception e) {
      // Return 500 Internal Server Error in case of an exception
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @PostMapping
  public ResponseEntity<?> insert(@RequestBody Exercise exercise) {
    try {
      exerciseService.saveExerciseIfNotExists(exercise);
      return ResponseEntity.ok(Map.of("status", "ok"));
    } catch (RuntimeException e) {
      e.printStackTrace();
      return ResponseEntity.status(409).body("ERROR_EXERCISE_ALREADY_EXISTS");
    }
  }

  @PostMapping("/validate-link")
  public ResponseEntity<?> validateH5PLink(@RequestBody Map<String, String> payload) {
    String link = payload.get("link");

    if (link == null || link.isBlank()) {
      return ResponseEntity.badRequest().body(Map.of("status", "error", "message", "ERROR_LINK_IS_MISSING"));
    }

    try {
      URL parsedUrl = new URL(link);
      if (!parsedUrl.getHost().equals("sisuloome.e-koolikott.ee")) {
        return ResponseEntity.badRequest().body(Map.of("status", "error", "message", "ERROR_ONLY_KOOLIKOTT_LINK_IS_ALLOWED"));
      }

      String[] parts = parsedUrl.getPath().split("/");

      if (parts.length < 3 || !parts[1].equals("node")) {
        return ResponseEntity.badRequest().body(Map.of("status", "error", "message", "INVALID_PATH_FORMAT"));
      }

      String externalId = parts[2];

      if (exerciseService.existsByExternalId(externalId)) {
        return ResponseEntity.ok(Map.of("status", "EXERCISE_ALREADY_EXISTS", "external_id", externalId));
      }

      return ResponseEntity.ok(Map.of("status", "ok", "external_id", externalId));

    } catch (Exception e) {
      return ResponseEntity.badRequest().body(Map.of("status", "error", "message", e.getMessage()));
    }
  }


  //Таким образом, метод /upload выполняет скачивание, распаковку и сохранение файла на сервере.
  @PostMapping("/upload")
  public ResponseEntity<?> downloadAndExtractH5P(@RequestParam("externalId") String externalId) {

    try {
      String remoteUrl = "https://sisuloome.e-koolikott.ee/sites/default/files/h5p/exports/interactive-content-" + externalId + ".h5p";

      Path baseDir = Paths.get("uploads/exercises/", externalId);
      Files.createDirectories(baseDir);
      Path h5pFilePath = baseDir.resolve(externalId + ".h5p");

      try (InputStream in = new URL(remoteUrl).openStream()) {
        Files.copy(in, h5pFilePath, StandardCopyOption.REPLACE_EXISTING);
      }

      // распаковка прямо туда же
      try (ZipInputStream zipIn = new ZipInputStream(Files.newInputStream(h5pFilePath))) {
        ZipEntry entry;
        while ((entry = zipIn.getNextEntry()) != null) {
          Path filePath = baseDir.resolve(entry.getName());
          if (!entry.isDirectory()) {
            Files.createDirectories(filePath.getParent());
            Files.copy(zipIn, filePath, StandardCopyOption.REPLACE_EXISTING);
          }
          zipIn.closeEntry();
        }
      }

      // создаём упражнение, если ещё не было
      if (!exerciseService.existsByExternalId(externalId)) {
        Exercise exercise = new Exercise();
        exercise.setExternalId(externalId);
        exercise.setFilePath("uploads/exercises/" + externalId + "/" + externalId + ".h5p");
        exercise.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        exercise.setLikes(0);
        exercise.setViews(0);
        exerciseService.insertExercise(exercise);
      }

      return ResponseEntity.ok(Map.of("status", "ok", "external_id", externalId));

    } catch (IOException e) {
      return ResponseEntity.status(500).body(Map.of("status", "error", "message", "FAIL_TO_DOWNLOAD_OR_UNZIP", "details", e.getMessage()));
    }
  }
}
