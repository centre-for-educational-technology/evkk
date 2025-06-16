package ee.tlu.evkk.api.controller;

import ee.tlu.evkk.api.service.StudyMaterialService;
import ee.tlu.evkk.dal.dto.Material;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/study-material")
@RequiredArgsConstructor
public class StudyMaterialController {

  private final StudyMaterialService studyMaterialService;

  @PostMapping("/upload")
  public ResponseEntity<Material> uploadStudyMaterial(
    @RequestParam(value = "file", required = false) MultipartFile file,
    @RequestParam("title") String title,
    @RequestParam("description") String description,
    @RequestParam("category") List<String> categories,
    @RequestParam("level") String level,
    @RequestParam("type") String type,
    @RequestParam(value = "link", required = false) String link,
    @RequestParam(value = "text", required = false) String text
  ) throws IOException {
    return ok(studyMaterialService.saveStudyMaterialToDatabase(
      file, title, description, categories, level, type, link, text
    ));
  }

  @GetMapping("/all")
  public List<Material> getAllStudyMaterials() {
    return studyMaterialService.getAllStudyMaterials();
  }
}
