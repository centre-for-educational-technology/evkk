package ee.tlu.evkk.clusterfinder.model;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor( access = AccessLevel.PRIVATE )
public class ValidationErrors
{
  private List < ValidationError > errors = new ArrayList<>();

  public void addError( ValidationError error )
  {
    errors.add( error );
  }

  public void addError( String message, String field )
  {
    errors.add( ValidationError.of( message, field ) );
  }

  public boolean hasErrors()
  {
    return errors != null && !errors.isEmpty();
  }
}
