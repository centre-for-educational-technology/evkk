package ee.tlu.evkk.api.controller;


import ee.tlu.evkk.api.service.ExerciseSearchService;
import ee.tlu.evkk.dal.dto.Exercise;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/exercises")
public class ExerciseSearchController {

  private final ExerciseSearchService exerciseService;

  public ExerciseSearchController(ExerciseSearchService exerciseService) {
    this.exerciseService = exerciseService;
  }

  @GetMapping("/results")
  public List<Exercise> getFilteredExercises(
    @RequestParam(required = false) List<String> categories,
    @RequestParam(required = false) List<String> languageLevel
  ){
    return exerciseService.getFilteredExercises(categories, languageLevel);
  }


}
