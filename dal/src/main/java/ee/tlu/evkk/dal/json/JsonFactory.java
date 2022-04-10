package ee.tlu.evkk.dal.json;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.Objects;

/**
 * @author Mikk Tarvas
 * Date: 30.01.2022
 */
public class JsonFactory {

  private final ObjectMapper objectMapper;

  public JsonFactory(ObjectMapper objectMapper) {
    this.objectMapper = objectMapper;
  }

  public Json createFromString(String string) throws IOException {
    Objects.requireNonNull(string, "string must not be null");
    JsonNode jsonNode = objectMapper.readTree(string);
    return new Json(objectMapper, jsonNode);
  }

  public Json createFromObject(Object object) {
    JsonNode jsonNode = objectMapper.valueToTree(object);
    return new Json(objectMapper, jsonNode);
  }

}
