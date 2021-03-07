package ee.tlu.evkk.clusterfinder.filters.clause;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static ee.tlu.evkk.clusterfinder.constants.FilteringConstants.CLAUSE_TYPE_ADDITION_OPTIONS_PARAM;

public class QuantifierModifierFilter implements ClauseFilter
{
  private static final List < String > ALL_QUANTIFIER_MODIFIERS = List.of( "@Q>", "@<Q" );

  @Override
  public List<String> getClauseFilters(Map<String, String[]> requestParameters)
  {
    String[] quantifierModifierOptions = requestParameters.get( CLAUSE_TYPE_ADDITION_OPTIONS_PARAM );
    if ( quantifierModifierOptions != null )
    {
      return Arrays.asList( quantifierModifierOptions );
    }

    return ALL_QUANTIFIER_MODIFIERS;
  }
}
