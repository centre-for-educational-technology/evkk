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
      exercise.setFilePath(relativePath.replace("\\", "/"));

      // kui .h5p, siis pakkime kohe lahti samasse kausta
      if (fileName.toLowerCase().endsWith(".h5p")) {
        unzipH5PFile(targetPath, Paths.get(folderPath));
      }

    } catch (IOException e) {
      throw new RuntimeException("Faili salvestamine ebaõnnestus", e);
    }
  }

  private void unzipH5PFile(Path sourceFile, Path targetDir) {
    try (ZipInputStream zis = new ZipInputStream(Files.newInputStream(sourceFile))) {
      ZipEntry entry;
      while ((entry = zis.getNextEntry()) != null) {
        Path newPath = targetDir.resolve(entry.getName());
        if (entry.isDirectory()) {
          Files.createDirectories(newPath);
        } else {
          Files.createDirectories(newPath.getParent());
          Files.copy(zis, newPath, StandardCopyOption.REPLACE_EXISTING);
        }
      }
    } catch (IOException e) {
      throw new RuntimeException("H5P faili lahtipakkimine ebaõnnestus", e);
    }
  }
}
