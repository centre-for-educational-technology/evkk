package ee.tlu.evkk.api.controller;

import ee.tlu.evkk.api.service.MaterialSearchService;
import ee.tlu.evkk.dal.dto.Material;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/study-material")
public class MaterialSearchController {

    private final MaterialSearchService materialSearchService;

    public MaterialSearchController(MaterialSearchService materialSearchService) {
      this.materialSearchService = materialSearchService;
    }

    @GetMapping("/results")
    public List<Material> getFilteredStudyMaterials(
      @RequestParam(required = false) List<String> categories,
      @RequestParam(required = false) List<String> languageLevel,
      @RequestParam(required = false) List<String> materialType
    ) {
      return materialSearchService.getFilteredStudyMaterials(categories, languageLevel, materialType);
    }

}
