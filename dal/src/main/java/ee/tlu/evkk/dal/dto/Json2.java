package ee.tlu.evkk.dal.dto;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import java.io.IOException;
import java.util.Objects;

/**
 * @author Mikk Tarvas
 * Date: 29/10/2019
 */
public class Json2 {

  private static final ObjectMapper OBJECT_MAPPER;

  static {
    OBJECT_MAPPER = new ObjectMapper();
    OBJECT_MAPPER.registerModule(new JavaTimeModule());

    OBJECT_MAPPER.configure(SerializationFeature.WRITE_DATE_TIMESTAMPS_AS_NANOSECONDS, false);
    OBJECT_MAPPER.configure(DeserializationFeature.READ_DATE_TIMESTAMPS_AS_NANOSECONDS, false);
  }

  private final JsonNode jsonNode;

  private Json2(JsonNode jsonNode) {
    if (jsonNode == null) throw new NullPointerException();
    this.jsonNode = jsonNode;
  }

  public String getAsString() throws JsonProcessingException {
    return OBJECT_MAPPER.writeValueAsString(jsonNode);
  }

  public <T> T getAsObject(Class<T> clazz) {
    if (clazz == null) throw new NullPointerException();
    return OBJECT_MAPPER.convertValue(jsonNode, clazz);
  }

  public <T> T getAsObject(TypeReference<T> typeReference) {
    if (typeReference == null) throw new NullPointerException();
    return OBJECT_MAPPER.convertValue(jsonNode, typeReference);
  }

  public static Json2 createFromString(String string) throws IOException {
    if (string == null) throw new NullPointerException();
    JsonNode jsonNode = OBJECT_MAPPER.readTree(string);
    return new Json2(jsonNode);
  }

  public static Json2 createFromObject(Object object) {
    if (object == null) throw new NullPointerException();
    JsonNode jsonNode = OBJECT_MAPPER.valueToTree(object);
    return new Json2(jsonNode);
  }

  @Override
  public boolean equals(Object other) {
    if (this == other) return true;
    if (other == null) return false;
    if (getClass() != other.getClass()) return false;
    Json2 json = (Json2) other;
    return jsonNode.equals(json.jsonNode);
  }

  @Override
  public int hashCode() {
    return Objects.hash(jsonNode);
  }

}
