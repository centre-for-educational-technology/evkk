package ee.tlu.evkk.clusterfinder.model;

import lombok.AllArgsConstructor;
import lombok.Value;

@Value
@AllArgsConstructor( staticName = "of" )
public class ValidationError
{
  private final String errorMessage;

  private final String field;
}
