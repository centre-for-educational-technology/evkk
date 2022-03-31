package ee.tlu.evkk.dal.dto;

import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 11.02.2022
 */
public class TextProperty {

  private UUID id;
  private UUID textId;
  private String propertyName;
  private String propertyValue;

  public UUID getId() {
    return id;
  }

  public void setId(UUID id) {
    this.id = id;
  }

  public UUID getTextId() {
    return textId;
  }

  public void setTextId(UUID textId) {
    this.textId = textId;
  }

  public String getPropertyName() {
    return propertyName;
  }

  public void setPropertyName(String propertyName) {
    this.propertyName = propertyName;
  }

  public String getPropertyValue() {
    return propertyValue;
  }

  public void setPropertyValue(String propertyValue) {
    this.propertyValue = propertyValue;
  }

}
