package ee.tlu.evkk.core.service.dto;

import ee.tlu.evkk.dal.dto.Text;
import ee.tlu.evkk.dal.dto.TextProperty;

import java.util.Collection;

/**
 * @author Mikk Tarvas
 * Date: 17.04.2022
 */
public class TextWithProperties {

  private final Text text;
  private final Collection<TextProperty> properties;

  public TextWithProperties(Text text, Collection<TextProperty> properties) {
    this.text = text;
    this.properties = properties;
  }

  public Text getText() {
    return text;
  }

  public Collection<TextProperty> getProperties() {
    return properties;
  }

}
