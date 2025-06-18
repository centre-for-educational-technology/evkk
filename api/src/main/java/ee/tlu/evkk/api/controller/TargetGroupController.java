package ee.tlu.evkk.api.controller;

import ee.tlu.evkk.api.service.ExerciseService;
import ee.tlu.evkk.api.service.TargetGroupService;
import ee.tlu.evkk.dal.dto.Exercise;
import ee.tlu.evkk.dal.dto.TargetGroup;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.Timestamp;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;


@RestController
@RequestMapping("/target-groups")
@RequiredArgsConstructor
public class TargetGroupController {
  private final TargetGroupService targetGroupService;

  @GetMapping()
  public List<TargetGroup> getAllTargetGroups() {
    return targetGroupService.getAllTargetGroups();
  }
}
