package ee.tlu.evkk.dal.dto;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;

import java.util.List;

@Getter
public class TextAndMetadata {

  private final List<TextMetadata> properties;
  private final String text;

  public TextAndMetadata(String properties, String text) throws JsonProcessingException {
    ObjectMapper mapper = new ObjectMapper();
    this.properties = mapper.readValue(properties, new TypeReference<>() {});
    this.text = text;
  }
}
