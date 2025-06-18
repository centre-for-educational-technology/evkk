package ee.tlu.evkk.api.controller;

import ee.tlu.evkk.api.service.DownloadService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;

@RestController
@RequestMapping("/files")
@RequiredArgsConstructor
public class DownloadController {

  private final DownloadService downloadService;

  @GetMapping("/{filename:.+}")
  public ResponseEntity<Resource> downloadFile(@PathVariable String filename) {
    String fullPath = System.getProperty("user.dir") + "/uploads/" + filename;

    File file = downloadService.getFile(filename);
    if (file == null) {
      return ResponseEntity.notFound().build();
    }
    return downloadService.buildDownloadResponse(file);
  }
}
