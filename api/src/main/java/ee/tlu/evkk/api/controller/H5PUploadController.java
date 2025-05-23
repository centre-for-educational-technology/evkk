package ee.tlu.evkk.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
//miskipärast post ei jõua siia :(
@CrossOrigin("*")
@RestController
public class H5PUploadController {

    @PostMapping("/h5p-parse")
    public ResponseEntity<?> parseH5pFile(HttpServletRequest request) {
        try (InputStream is = request.getInputStream()) {
            try (ZipInputStream zis = new ZipInputStream(is)) {
                ZipEntry entry;
                String contentJson = null, h5pJson = null;
                while ((entry = zis.getNextEntry()) != null) {
                    if ("content/content.json".equals(entry.getName())) {
                        contentJson = new String(zis.readAllBytes(), StandardCharsets.UTF_8);
                    } else if ("h5p.json".equals(entry.getName())) {
                        h5pJson = new String(zis.readAllBytes(), StandardCharsets.UTF_8);
                    }
                    zis.closeEntry();
                }
                if (contentJson == null) {
                    return ResponseEntity.badRequest().body(Map.of("error", "content/content.json not found"));
                }
                ObjectMapper mapper = new ObjectMapper();
                Map<String, Object> response = new HashMap<>();
                response.put("contentJson", mapper.readValue(contentJson, Map.class));
                response.put("h5pJson", h5pJson != null ? mapper.readValue(h5pJson, Map.class) : Map.of());
                return ResponseEntity.ok(response);
            }
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Failed to process H5P"));
        }
    }
}
