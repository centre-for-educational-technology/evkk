package ee.tlu.evkk.api.controller;

import ee.tlu.evkk.api.text.extractor.ContentExtractorExecutor;
import ee.tlu.evkk.api.text.extractor.ex.TextExtractionException;
import ee.tlu.evkk.api.text.extractor.ex.UnsupportedMimeTypeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin("*")
@RestController
public class ContentExtractorController {

    @Autowired
    private ContentExtractorExecutor extractor;

  @PostMapping("/textfromfile")
  public String textFromFile(@RequestParam("file") MultipartFile[] files) throws UnsupportedMimeTypeException, TextExtractionException {
    StringBuilder data = new StringBuilder();
    for (MultipartFile file : files) {
      data.append(extractor.extract(file, file.getOriginalFilename()));
    }
    return data.toString();
  }
}
