package ee.tlu.evkk.dal.json;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Objects;

/**
 * @author Mikk Tarvas
 * Date: 29/10/2019
 */
public class Json {

  private final ObjectMapper objectMapper;
  private final JsonNode jsonNode;

  Json(ObjectMapper objectMapper, JsonNode jsonNode) {
    this.objectMapper = objectMapper;
    if (jsonNode == null) throw new NullPointerException();
    this.jsonNode = jsonNode;
  }

  public String getAsString() throws JsonProcessingException {
    return objectMapper.writeValueAsString(jsonNode);
  }

  public <T> T getAsObject(Class<T> clazz) {
    Objects.requireNonNull(clazz, "clazz must not be null");
    return objectMapper.convertValue(jsonNode, clazz);
  }

  public <T> T getAsObject(TypeReference<T> typeReference) {
    Objects.requireNonNull(typeReference, "typeReference must not be null");
    return objectMapper.convertValue(jsonNode, typeReference);
  }

  @Override
  public boolean equals(Object other) {
    if (this == other) return true;
    if (other == null) return false;
    if (getClass() != other.getClass()) return false;
    Json json = (Json) other;
    return jsonNode.equals(json.jsonNode);
  }

  @Override
  public int hashCode() {
    return Objects.hash(jsonNode);
  }

  @Override
  public String toString() {
    return "JSON=" + jsonNode;
  }

}
