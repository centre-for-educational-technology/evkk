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

  // Salvestatakse data kausta (api/src/main/resources/data/)
  private final File storageFile = new File("src/main/resources/data/uploadedStudyMaterials.json");

  public Map<String, Object> saveStudyMaterialToFile(MultipartFile file, String title, String description, String category, String level) throws IOException {
    List<Map<String, Object>> materials = new ArrayList<>();

    if (storageFile.exists()) {
      materials = mapper.readValue(storageFile, new TypeReference<>() {});
    }

    int nextId = materials.stream()
      .map(m -> (Integer) m.getOrDefault("id", 0))
      .max(Integer::compareTo)
      .orElse(0) + 1;

    // Faili salvestamine projekti juurkausta
    String uploadDir = System.getProperty("user.dir") + "/uploads/";
    File dir = new File(uploadDir);
    if (!dir.exists() && !dir.mkdirs()) {
      throw new IOException("Kausta loomine ebaõnnestus: " + uploadDir);
    }

    String originalFilename = file.getOriginalFilename();
    String storedPath = uploadDir + originalFilename;
    file.transferTo(new File(storedPath));

    // Metaandmed JSON-i jaoks
    Map<String, Object> data = new HashMap<>();
    data.put("id", nextId);
    data.put("title", title);
    data.put("description", description);
    data.put("category", category);
    data.put("level", level);
    data.put("filename", originalFilename); // ainult nimi, mitte path

    materials.add(data);
    mapper.writerWithDefaultPrettyPrinter().writeValue(storageFile, materials);

    return data; // Tagastame salvestatud objekti
  }

  public List<Map<String, Object>> getAllStudyMaterials() throws IOException {
    if (!storageFile.exists()) {
      return new ArrayList<>();
    }
    return mapper.readValue(storageFile, new TypeReference<>() {});
  }

}
