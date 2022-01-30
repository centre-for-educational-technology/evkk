package ee.tlu.evkk.dal.json;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @author Mikk Tarvas
 * Date: 30.01.2022
 */
public class JsonFactory {

  private final ObjectMapper objectMapper;

  public JsonFactory(ObjectMapper objectMapper) {
    this.objectMapper = objectMapper;
  }



}
