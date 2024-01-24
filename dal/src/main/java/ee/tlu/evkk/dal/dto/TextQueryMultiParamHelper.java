package ee.tlu.evkk.dal.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TextQueryMultiParamHelper {

  private String table;
  private String parameter;
  private Set<String> values;
}
