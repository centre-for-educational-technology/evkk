package ee.tlu.evkk.api.service;

import ee.tlu.evkk.dal.dao.ExerciseDao;
import ee.tlu.evkk.dal.dto.Exercise;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExerciseSearchService {

  private final ExerciseDao exerciseDao;

  public ExerciseSearchService(ExerciseDao exerciseDao) {
    this.exerciseDao = exerciseDao;
  }

  public List<Exercise> getFilteredExercises(List<String> categories, List<String> languageLevel) {
    return exerciseDao.getFilteredExercises(categories, languageLevel);
  }
}
