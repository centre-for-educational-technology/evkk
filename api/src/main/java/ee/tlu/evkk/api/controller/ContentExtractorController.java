package ee.tlu.evkk.api.text.extractor;

import org.springframework.web.bind.annotation.*;
import ee.tlu.evkk.api.text.extractor.ContentExtractorExecutor;
import org.springframework.beans.factory.annotation.Autowired;
import ee.tlu.evkk.api.text.extractor.ex.TextExtractionException;
import ee.tlu.evkk.api.text.extractor.ex.UnsupportedMimeTypeException;
import org.springframework.web.multipart.MultipartFile;

@RestController

public class ContentExtractorController {

    @Autowired
    private ContentExtractorExecutor extractor;

    @CrossOrigin("*")

    @PostMapping("/textfromfile")
    public String ContentExtractorController(@RequestParam("file") MultipartFile[] files) throws UnsupportedMimeTypeException, TextExtractionException {
        String data = "";
        for(int i = 0; i < files.length; i++) {
            data += extractor.extract(files[i], files[i].getOriginalFilename());
        }
        return data;
    }
}