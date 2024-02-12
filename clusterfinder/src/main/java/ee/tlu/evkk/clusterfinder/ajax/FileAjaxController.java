package ee.tlu.evkk.clusterfinder.ajax;

import ee.tlu.evkk.clusterfinder.exception.FileUploadException;
import ee.tlu.evkk.clusterfinder.util.FileUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import static ee.tlu.evkk.clusterfinder.constants.AjaxConsts.FILE_UPLOAD;
import static org.springframework.http.ResponseEntity.ok;
import static org.springframework.http.ResponseEntity.status;

@Controller
@Slf4j
public class FileAjaxController {

  @PostMapping(FILE_UPLOAD)
  public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file)
  {
    try
    {
      FileUtil.uploadFile(file);
      return ok().build();
    }
    catch (FileUploadException e)
    {
      log.error("Could not upload file: {}", e.getMessage());
      return status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }
}
