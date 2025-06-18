package ee.tlu.evkk.api.controller;

import ee.tlu.evkk.api.service.StudyMaterialService;
import ee.tlu.evkk.dal.dto.Category;
import ee.tlu.evkk.dal.dto.LanguageLevel;
import ee.tlu.evkk.dal.dto.Material;
import ee.tlu.evkk.dal.dto.TargetGroup;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
  public ResponseEntity<?> uploadStudyMaterial(
    @RequestParam(value = "file", required = false) MultipartFile file,
    @RequestParam("title") String title,
    @RequestParam("description") String description,
    @RequestParam("category") List<String> categories,
    @RequestParam("level") String level,
    @RequestParam("type") String type,
    @RequestParam(value = "link", required = false) String link,
    @RequestParam(value = "text", required = false) String text,
    @RequestParam(value = "targetGroups") List<String> targetGroups
  ) {
    try {
      Material saved = studyMaterialService.saveStudyMaterialToDatabase(
        file, title, description, categories, level, type, link, text, targetGroups
      );
      return ResponseEntity.ok(saved);
    } catch (IllegalArgumentException e) {
      return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(e.getMessage());
    } catch (IOException e) {
      return ResponseEntity
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body("Faili salvestamine ebaõnnestus.");
    }
  }

  @GetMapping("/all")
  public List<Material> getAllStudyMaterials() {
    return studyMaterialService.getAllStudyMaterials();
  }

  @GetMapping("/{id}")
  public Material getStudyMaterialById(@PathVariable Long id) {
    return studyMaterialService.getMaterialById(id);
  }

  // find all language levels
  @GetMapping("/language-levels")
  public List<LanguageLevel> getLanguageLevels() {
    return studyMaterialService.getAllLanguageLevels();
  }

  // find all categories
  @GetMapping("/categories")
  public List<Category> getCategories() {
    return studyMaterialService.getAllCategories();
  }
}
