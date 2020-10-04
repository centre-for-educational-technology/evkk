package ee.tlu.evkk.clusterfinder.ajax;

import ee.tlu.evkk.clusterfinder.constants.AjaxConsts;
import ee.tlu.evkk.clusterfinder.exception.FileUploadException;
import ee.tlu.evkk.clusterfinder.util.FileUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class FileAjaxController
{
  @PostMapping(AjaxConsts.FILE_UPLOAD)
  public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file)
  {
    try
    {
      FileUtil.uploadFile(file);
      return ResponseEntity.ok().build();
    }
    catch (FileUploadException e)
    {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }
}
