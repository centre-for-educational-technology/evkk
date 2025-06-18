package ee.tlu.evkk.api.controller;

import ee.tlu.evkk.api.service.CategoryService;
import ee.tlu.evkk.dal.dto.Category;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
@CrossOrigin("*")

public class CategoryController {

  private final CategoryService categoryService;

  @GetMapping
  public List<Category> getAll() {
    return categoryService.getAllCategories();
  }
}
