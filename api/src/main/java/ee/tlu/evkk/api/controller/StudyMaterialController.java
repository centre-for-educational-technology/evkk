package ee.tlu.evkk.api.controller;

import ee.tlu.evkk.api.service.StudyMaterialService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/study-material")
@RequiredArgsConstructor
public class StudyMaterialController {

  private final StudyMaterialService studyMaterialService;

  @PostMapping("/upload")
  public ResponseEntity<Map<String, Object>> uploadStudyMaterial(
    @RequestParam(value = "file", required = false) MultipartFile file,
    @RequestParam("title") String title,
    @RequestParam("description") String description,
    @RequestParam("category") String category,
    @RequestParam("level") String level,
    @RequestParam("type") String type,
    @RequestParam(value = "link", required = false) String link,
    @RequestParam(value = "text", required = false) String text
  ) {
    try {
      Map<String, Object> saved = studyMaterialService.saveStudyMaterialToFile(file, title, description, category, level, type, link, text);
      return ResponseEntity.ok(saved);
    } catch (IOException e) {
      e.printStackTrace();
      return ResponseEntity.status(500).body(Map.of("error", "Salvestamine ebaõnnestus"));
    }
  }

  @GetMapping("/all")
  public ResponseEntity<List<Map<String, Object>>> getAllStudyMaterials() throws IOException {
    List<Map<String, Object>> materials = studyMaterialService.getAllStudyMaterials();
    return ResponseEntity.ok(materials);
  }
}
