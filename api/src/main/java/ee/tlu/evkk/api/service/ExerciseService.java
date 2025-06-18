package ee.tlu.evkk.api.service;

import ee.tlu.evkk.dal.dao.ExerciseDao;
import ee.tlu.evkk.dal.dto.Exercise;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

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

  public void saveExercise(Exercise exercise) {
    if (existsByExternalId(exercise.getExternalId())) {
      throw new RuntimeException("ERROR_EXERCISE_ALREADY_EXISTS");
    }

    exercise.setCreatedAt(Timestamp.valueOf(LocalDateTime.now()));
    exercise.setFilePath("uploads/exercises/" + exercise.getExternalId() + "/" + exercise.getExternalId() + ".h5p");
    exercise.setViews(0);
    exercise.setLikes(0);
    insertExercise(exercise);
  }

  public void insertExercise(Exercise exercise) {
    exerciseDao.insertExercise(exercise);
    exerciseDao.insertExerciseCategories(exercise);
    exerciseDao.insertExerciseTargetGroups(exercise);
  }

  public boolean existsByExternalId(String externalId) {
    return exerciseDao.findByExternalId(externalId) != null;
  }

}
