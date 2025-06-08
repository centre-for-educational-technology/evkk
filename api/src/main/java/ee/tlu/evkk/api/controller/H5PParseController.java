package ee.tlu.evkk.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
@CrossOrigin("*")
@RestController

public class H5PParseController {

    private static final String storagePath = "..\\..\\..\\..\\..\\..\\ui\\src\\elle\\components\\library\\h5p\\storage\\";

    @PostMapping("/h5p-parse/{id}")
    public ResponseEntity<?> parseH5pFile(HttpServletRequest request, @PathVariable String id) {
        File storageRoot = new File(storagePath);
        if(!storageRoot.exists() || !storageRoot.isDirectory()){
          return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Storage kausta ei eksisteeri"));
        }

        File folder = new File(storagePath, id);
        if(!folder.exists()){
          if(!folder.mkdirs()){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Ei saanud kausta luua:" + id));
          }
        }
        File contentJson = new File(storagePath + "content.json");
        try (InputStream is = request.getInputStream()) {
            try (ZipInputStream zis = new ZipInputStream(is)) {
                ZipEntry entry;
                while ((entry = zis.getNextEntry()) != null) {
                    if ("content/content.json".equals(entry.getName())) {
                      try (FileOutputStream fos = new FileOutputStream(contentJson)) {
                        zis.transferTo(fos);
                      }
                      break;
                    }
                    zis.closeEntry();
                }

                ObjectMapper mapper = new ObjectMapper();
                Map<?, ?> contentMap = mapper.readValue(contentJson, Map.class);

                return ResponseEntity.ok(Map.of(
                  "status", "success",
                  "folder", folder.getAbsolutePath(),
                  "content", contentMap
                ));
            }
        }
        catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Viga H5P lugemisel", "details", e.getMessage()));
        }
    }
}
