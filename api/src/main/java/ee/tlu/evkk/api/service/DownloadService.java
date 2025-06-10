package ee.tlu.evkk.api.service;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.File;
import java.nio.file.Files;

@Service
public class DownloadService {

  private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/files/";

  public File getFile(String filename) {
    File file = new File(UPLOAD_DIR + filename);
    return file.exists() ? file : null;
  }

  public Resource getFileAsResource(File file) {
    return new FileSystemResource(file);
  }

  public String getContentType(File file) {
    try {
      return Files.probeContentType(file.toPath());
    } catch (Exception e) {
      return "application/octet-stream";
    }
  }

  public String getDownloadHeader(File file) {
    return "attachment; filename=\"" + file.getName() + "\"";
  }

  public ResponseEntity<Resource> buildDownloadResponse(File file) {
    Resource resource = getFileAsResource(file);
    String contentType = getContentType(file);
    String headerValue = getDownloadHeader(file);

    return ResponseEntity.ok()
      .header(HttpHeaders.CONTENT_DISPOSITION, headerValue)
      .contentType(MediaType.parseMediaType(contentType))
      .body(resource);
  }
}
