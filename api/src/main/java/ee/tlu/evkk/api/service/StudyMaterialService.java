package ee.tlu.evkk.api.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.*;

@Service
public class StudyMaterialService {

  private final ObjectMapper mapper = new ObjectMapper();
  private final File storageFile = new File("src/main/resources/data/uploadedStudyMaterials.json");

  public Map<String, Object> saveStudyMaterialToFile(
    MultipartFile file, String title, String description,
    String category, String level, String type,
    String link, String text
  ) throws IOException {

    List<Map<String, Object>> materials = new ArrayList<>();
    if (storageFile.exists()) {
      materials = mapper.readValue(storageFile, new TypeReference<>() {});
    }

    int nextId = materials.stream()
      .map(m -> (Integer) m.getOrDefault("id", 0))
      .max(Integer::compareTo)
      .orElse(0) + 1;

    String filename = null;
    long size = 0;

    if ("fail".equals(type) && file != null) {
      String originalFilename = file.getOriginalFilename();
      String uploadDir = System.getProperty("user.dir") + "/uploads/files/";
      File dir = new File(uploadDir);
      if (!dir.exists() && !dir.mkdirs()) {
        throw new IOException("Kausta loomine ebaõnnestus: " + uploadDir);
      }

      File storedFile = new File(uploadDir + originalFilename);
      file.transferTo(storedFile);
      filename = originalFilename;
      size = file.getSize();
    }

    Map<String, Object> data = new HashMap<>();
    data.put("id", nextId);
    data.put("title", title);
    data.put("description", description);
    data.put("category", category);
    data.put("level", level);
    data.put("type", type);

    if (filename != null) {
      data.put("filename", filename);
      data.put("size", size);
    }

    if (link != null && !link.isBlank()) {
      data.put("link", link);
    }

    if (text != null && !text.isBlank()) {
      data.put("text", text);
    }

    materials.add(data);
    mapper.writerWithDefaultPrettyPrinter().writeValue(storageFile, materials);

    return data;
  }

  public List<Map<String, Object>> getAllStudyMaterials() throws IOException {
    if (!storageFile.exists()) {
      return new ArrayList<>();
    }
    return mapper.readValue(storageFile, new TypeReference<>() {});
  }
}
