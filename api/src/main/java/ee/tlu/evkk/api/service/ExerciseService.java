package ee.tlu.evkk.api.service;

import ee.tlu.evkk.dal.dao.ExerciseDao;
import ee.tlu.evkk.dal.dto.Exercise;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExerciseService {

  private final ExerciseDao exerciseDao;

  public List<Exercise> getAllExercises() {
    return exerciseDao.findAllExercises();
  }

  public Exercise getExerciseById(Long id) {
    return exerciseDao.findById(id);
  }

  public void insertExercise(Exercise exercise) {
    exerciseDao.insert(exercise);
  }
}
