package ee.tlu.evkk.api.controller;

import ee.tlu.evkk.api.service.ExerciseService;
import ee.tlu.evkk.dal.dto.Exercise;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.IOException;
import java.util.Map;
import java.io.InputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.nio.file.StandardCopyOption;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.List;

@RestController
@RequestMapping("/exercises")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ExerciseController {

  private final ExerciseService exerciseService;

  @GetMapping
  public List<Exercise> getAll() {
    try {
      return exerciseService.getAllExercises();
    } catch (java.lang.Exception e) {
      throw new RuntimeException(e);
    }
  }

  @GetMapping("/{id}")
  public Exercise getById(@PathVariable Long id) {
    return exerciseService.getExerciseById(id);
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


  //linki valideerimine
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
      // Kontrollitakse kas externalId exiists
       if (exerciseService.existsByExternalId(externalId)) {
         return ResponseEntity.ok(Map.of("status", "EXERCISE_ALREADY_EXISTS", "external_id", externalId));
       }

      // Faili salvestus
      String remoteUrl = "https://sisuloome.e-koolikott.ee/sites/default/files/h5p/exports/interactive-content-" + externalId + ".h5p";
      Path targetPath = Paths.get("/elle/evkk/api/uploads/exercises", externalId + ".h5p");

      Files.createDirectories(targetPath.getParent());
      try (InputStream in = new URL(remoteUrl).openStream()) {
        Files.copy(in, targetPath, StandardCopyOption.REPLACE_EXISTING);
      } catch (IOException e) {
        return ResponseEntity.badRequest().body(Map.of("status", "error", "message", "FAILED_TO_DOWNLOAD_FILE"));
      }

      // Salvestame uploads/exercise/{externalId}/{filename}.h5p
      Path unzipDir = Files.createTempDirectory("unzipped_" + externalId);
      try (ZipInputStream zipIn = new ZipInputStream(Files.newInputStream(targetPath))) {
        ZipEntry entry;
        while ((entry = zipIn.getNextEntry()) != null) {
          Path filePath = unzipDir.resolve(entry.getName());
          if (!entry.isDirectory()) {
            Files.createDirectories(filePath.getParent());
            Files.copy(zipIn, filePath, StandardCopyOption.REPLACE_EXISTING);
          }
          zipIn.closeEntry();
        }
      } catch (IOException e) {
        return ResponseEntity.badRequest().body(Map.of("status", "error", "message", "FAILED_TO_UNZIP_H5P"));
      }

      // Kontrollime content.json
      Path contentJsonPath = unzipDir.resolve("content").resolve("content.json");
      if (!Files.exists(contentJsonPath)) {
        return ResponseEntity.badRequest().body(Map.of("status", "error", "message", "MISSING_CONTENT_JSON"));
      }

      try {
        String json = Files.readString(contentJsonPath);
        ObjectMapper mapper = new ObjectMapper();
        mapper.readTree(json);
      } catch (IOException e) {
        return ResponseEntity.badRequest().body(Map.of("status", "error", "message", "INVALID_CONTENT_JSON"));
      }

      return ResponseEntity.ok(Map.of("status", "ok", "external_id", externalId));

    } catch (Exception e) {
      return ResponseEntity.badRequest().body(Map.of("status", "error", "message", e.getMessage()));
    }

  }

}
