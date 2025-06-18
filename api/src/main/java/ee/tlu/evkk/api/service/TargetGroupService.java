package ee.tlu.evkk.api.service;

import ee.tlu.evkk.dal.dao.ExerciseDao;
import ee.tlu.evkk.dal.dao.TargetGroupDao;
import ee.tlu.evkk.dal.dto.Exercise;
import ee.tlu.evkk.dal.dto.TargetGroup;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

@Service
@RequiredArgsConstructor
public class TargetGroupService {
  private final TargetGroupDao targetGroupDao;

  public List<TargetGroup> getAllTargetGroups() {
    return targetGroupDao.findAllTargetGroups();
  }
}
