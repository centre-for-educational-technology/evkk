package ee.tlu.evkk.api.controller;

import ee.tlu.evkk.api.service.StudyMaterialService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/study-material")
@RequiredArgsConstructor
public class StudyMaterialController {

  private final StudyMaterialService studyMaterialService;

  @PostMapping("/upload")
  public ResponseEntity<Map<String, Object>> uploadStudyMaterial(@RequestBody Map<String, Object> data) {
    try {
      Map<String, Object> saved = studyMaterialService.saveStudyMaterialToFile(data);
      return ResponseEntity.ok(saved); // tagastame salvestatud objekti
    } catch (IOException e) {
      e.printStackTrace();
      return ResponseEntity.status(500).body(Map.of("error", "Õppematerjali salvestamine ebaõnnestus"));
    }
  }
}
