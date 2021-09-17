package ee.tlu.evkk.clusterfinder.filters;

import ee.tlu.evkk.clusterfinder.constants.WordType;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class WordFilterFactory
{
  private static final String ADJECTIVE_TYPE_A = "_A_";

  private static final String ADJECTIVE_TYPE_G = "_G_";

  public List< String > getWordFilters(WordType wordType)
  {
    if ( wordType == WordType.ALL )
    {
      return List.of();
    }

    return wordType == WordType.ADJECTIVE ? List.of( ADJECTIVE_TYPE_A, ADJECTIVE_TYPE_G ) : List.of( "_" + wordType.getValue() + "_" );
  }
}
