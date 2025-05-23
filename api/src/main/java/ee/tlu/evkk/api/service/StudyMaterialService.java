package ee.tlu.evkk.api.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.*;

@Service
public class StudyMaterialService {

  private final ObjectMapper mapper = new ObjectMapper();

  // Salvestatakse data kausta (api/src/main/resources/data/)
  private final File storageFile = new File("src/main/resources/data/uploadedStudyMaterials.json");

  public Map<String, Object> saveStudyMaterialToFile(Map<String, Object> data) throws IOException {
    List<Map<String, Object>> materials = new ArrayList<>();

    // Loeme olemasolevad, kui fail eksisteerib
    if (storageFile.exists()) {
      materials = mapper.readValue(storageFile, new TypeReference<List<Map<String, Object>>>() {});
    }

    //Leiame järgmise vaba ID
    int nextId = materials.stream()
      .map(m -> (Integer) m.getOrDefault("id", 0))
      .max(Integer::compareTo)
      .orElse(0) + 1;

    data.put("id", nextId); // Lisa ID
    materials.add(data);    // Lisa listi
    mapper.writerWithDefaultPrettyPrinter().writeValue(storageFile, materials); // Kirjuta fail

    return data; // Tagastame salvestatud objekti
  }
}
