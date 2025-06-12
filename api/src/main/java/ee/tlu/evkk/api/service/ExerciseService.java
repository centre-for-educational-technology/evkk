package ee.tlu.evkk.api.service;

import ee.tlu.evkk.dal.dao.ExerciseDao;
import ee.tlu.evkk.dal.dto.Exercise;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.sql.Timestamp;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

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

  public void saveExerciseIfNotExists(Exercise exercise) {
    Exercise existing = exerciseDao.findByExternalId(exercise.getExternalId());

    if (existing != null && existing.getId() != null) {
      throw new RuntimeException("ERROR_EXERCISE_ALREADY_EXISTS");
    }

    exercise.setCreatedAt(Timestamp.valueOf(LocalDateTime.now()));
    exerciseDao.insertExercise(exercise);
  }

  public void insertExercise(Exercise exercise) {
    exerciseDao.insertExercise(exercise);
    exerciseDao.insertExerciseCategories(exercise);
  }

  public boolean existsByExternalId(String externalId) {
    return exerciseDao.findByExternalId(externalId) != null;
  }
  public void saveExerciseFile(String externalId, MultipartFile file, Exercise exercise) {
    try {
      if (file == null || file.isEmpty()) {
        throw new RuntimeException("Fail puudub või on tühi");
      }

      String fileName = file.getOriginalFilename();
      if (fileName == null || !fileName.toLowerCase().matches(".*\\.(json|h5p)$")) {
        throw new RuntimeException("Ainult .json ja .h5p failid on lubatud");
      }

      String folderPath = "uploads/exercises/" + externalId;
      Files.createDirectories(Paths.get(folderPath));

      Path targetPath = Paths.get(folderPath, fileName);
      file.transferTo(targetPath);

      String relativePath = folderPath + "/" + fileName;
      exercise.setFilePath(relativePath.replace("\\", "/")); // Windowsi \ → /

    } catch (IOException e) {
      throw new RuntimeException("Faili salvestamine ebaõnnestus", e);
    }
  }
}
