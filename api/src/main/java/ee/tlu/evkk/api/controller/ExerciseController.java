package ee.tlu.evkk.api.controller;

import ee.tlu.evkk.api.service.ExerciseService;
import ee.tlu.evkk.dal.dto.Exercise;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.HttpURLConnection;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.nio.file.StandardCopyOption;
import javax.servlet.http.HttpServletRequest;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import java.util.Comparator;
import java.io.File;


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

  @GetMapping("/uploads/exercises/{externalId}/**")
  public ResponseEntity<Resource> serveFileAlternativePath(
    @PathVariable String externalId,
    HttpServletRequest request) {

    try {
      // Võtame kogu URL-rea (näiteks /uploads/exercises/1234/somefile.js)
      String requestURL = request.getRequestURI();

      // Leiame tee osa pärast externalId-d (nt "somefile.js")
      String basePath = "/uploads/exercises/" + externalId + "/";
      String filepath = requestURL.substring(requestURL.indexOf(basePath) + basePath.length());

      // Koostame füüsilise failitee
      Path filePath = Paths.get("uploads/exercises/" + externalId + "/" + filepath).normalize();
      Resource resource = new UrlResource(filePath.toUri());

      // Kontrollime, kas fail eksisteerib ja on loetav
      if (resource.exists() || resource.isReadable()) {

        // Proovime tuvastada MIME tüübi (sisu tüüp, nt text/html, image/jpeg, application/javascript jne)
        String contentType = Files.probeContentType(filePath);

        // Mõnel süsteemil ei tunta .js faile ära — määrame selle käsitsi
        if (filePath.toString().endsWith(".js")) {
          contentType = "application/javascript";
          // Kui MIME tüüpi ei suudetud tuvastada, määrame vaikimisi
        } else if (contentType == null) {
          contentType = "application/octet-stream";
        }

        // Tagastame faili koos sobiva Content-Type ja Content-Disposition päisega
        // See võimaldab brauseril näiteks .js faili skriptina kasutada
        return ResponseEntity.ok()
          .header(HttpHeaders.CONTENT_TYPE, contentType)
          .header(HttpHeaders.CONTENT_DISPOSITION, "inline")
          .body(resource);
      } else {
        return ResponseEntity.notFound().build();
      }
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @PostMapping
  public ResponseEntity<?> insert(@RequestBody Exercise exercise) {
    try {
      exerciseService.saveExercise(exercise);
      return ResponseEntity.ok(Map.of("status", "ok"));
    } catch (RuntimeException e) {
      e.printStackTrace();
      return ResponseEntity.status(409).body("EXERCISE_ALREADY_EXISTS");
    }
  }

  @PostMapping("/validate-link")
  public ResponseEntity<?> validateH5PLink(@RequestBody Map<String, String> payload) {
    String link = payload.get("link");
    if (link == null || link.isBlank()) {
      return ResponseEntity.badRequest()
        .body(Map.of("status", "error", "message", "ERROR_LINK_IS_MISSING"));
    }

    URL parsedUrl;

    try {
      parsedUrl = new URL(link);
    } catch (MalformedURLException e) {
      return ResponseEntity.badRequest()
        .body(Map.of("status", "error", "message", "ERROR_INVALID_URL"));
    }
    if (!"sisuloome.e-koolikott.ee".equals(parsedUrl.getHost())) {
      return ResponseEntity.badRequest()
        .body(Map.of("status", "error", "message", "ERROR_ONLY_KOOLIKOTT_LINK_IS_ALLOWED"));
    }

    String[] parts = parsedUrl.getPath().split("/");
    if (parts.length < 3 || !"node".equals(parts[1])) {
      return ResponseEntity.badRequest()
        .body(Map.of("status", "error", "message", "INVALID_PATH_FORMAT"));
    }

    String externalId = parts[2];

    try {
      int id = Integer.parseInt(externalId);
      if (id <= 0) {
        return ResponseEntity.badRequest()
          .body(Map.of("status", "error", "message", "INVALID_NODE_ID"));
      }
    } catch (NumberFormatException e) {
      return ResponseEntity.badRequest()
        .body(Map.of("status", "error", "message", "INVALID_NODE_ID_FORMAT"));
    }

    if (exerciseService.existsByExternalId(externalId)) {
      return ResponseEntity.ok(Map.of("status", "EXERCISE_ALREADY_EXISTS", "external_id", externalId));
    }

    String exportUrl = "https://sisuloome.e-koolikott.ee/sites/default/files/h5p/exports/interactive-content-"
      + externalId + ".h5p";

    try {
      HttpURLConnection head = (HttpURLConnection) new URL(exportUrl).openConnection();
      head.setRequestMethod("HEAD");
      head.setConnectTimeout(3000);
      head.setReadTimeout(3000);
      if (head.getResponseCode() != HttpURLConnection.HTTP_OK) {
        return ResponseEntity.badRequest()
          .body(Map.of("status", "error", "message", "ERROR_INVALID_H5P_LINK"));
      }
    } catch (IOException e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(Map.of("status", "error", "message", "ERROR_CHECKING_H5P_LINK"));
    }
    try (InputStream in = new URL(exportUrl).openStream();
         ZipInputStream zip = new ZipInputStream(in)) {
      ZipEntry entry = zip.getNextEntry();
      if (entry == null) {
        return ResponseEntity.badRequest()
          .body(Map.of("status", "error", "message", "ERROR_INVALID_H5P_LINK_EMPTY"));
      }
    } catch (IOException e) {
      return ResponseEntity.badRequest()
        .body(Map.of("status", "error", "message", "ERROR_INVALID_H5P_LINK_CORRUPT"));
    }
    return ResponseEntity.ok(Map.of("status", "ok", "external_id", externalId));
  }


  @PostMapping("/upload")
  public ResponseEntity<?> downloadAndExtractH5P(@RequestParam("externalId") String externalId) {
    try {
      String remoteUrl = "https://sisuloome.e-koolikott.ee/sites/default/files/h5p/exports/interactive-content-"
        + externalId + ".h5p";
      Path baseDir = Paths.get("uploads/exercises/", externalId);
      Files.createDirectories(baseDir);
      Path h5pFilePath = baseDir.resolve(externalId + ".h5p");
      try (InputStream in = new URL(remoteUrl).openStream()) {
        Files.copy(in, h5pFilePath, StandardCopyOption.REPLACE_EXISTING);
      }
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
      return ResponseEntity.ok(Map.of("status", "ok", "external_id", externalId));
    } catch (IOException e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(Map.of("status", "error", "message", "ERROR_FAILED_TO_DOWNLOAD_OR_UNZIP", "details", e.getMessage()));
    }
  }

  @DeleteMapping("/delete")
  public ResponseEntity<?> deleteExerciseByExternalId(@RequestBody Map<String, String> payload) {
    String externalId = payload.get("externalId");

    if (externalId == null || externalId.isBlank()) {
      System.out.println("No externalId provided in delete request.");
      return ResponseEntity.badRequest()
        .body(Map.of("status", "error", "message", "MISSING_EXTERNAL_ID"));
    }

    try {
      Path dir = Paths.get("uploads/exercises/", externalId);

      System.out.println("Delete request received for: " + externalId);
      System.out.println("Resolved directory path: " + dir);

      if (Files.exists(dir)) {
        Files.walk(dir)
          .sorted(Comparator.reverseOrder())
          .map(Path::toFile)
          .forEach(File::delete);
      }
      System.out.println("Successfully deleted: " + dir);

      return ResponseEntity.ok(Map.of("status", "deleted"));
    } catch (IOException e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(Map.of("status", "error", "message", "ERROR_DELETE_FAILED", "details", e.getMessage()));
    }
  }
}
