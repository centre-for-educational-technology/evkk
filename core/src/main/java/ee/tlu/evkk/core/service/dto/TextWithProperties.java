package ee.tlu.evkk.core.service.dto;

import ee.tlu.evkk.dal.dto.Text;
import ee.tlu.evkk.dal.dto.TextProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Collection;

/**
 * @author Mikk Tarvas
 * Date: 17.04.2022
 */
@Getter
@AllArgsConstructor
public class TextWithProperties {

  private final Text text;
  private final Collection<TextProperty> properties;
}
