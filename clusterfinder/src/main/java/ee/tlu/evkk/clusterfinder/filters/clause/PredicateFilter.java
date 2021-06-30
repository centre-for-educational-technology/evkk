package ee.tlu.evkk.clusterfinder.filters.clause;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static ee.tlu.evkk.clusterfinder.constants.FilteringConstants.CLAUSE_TYPE_ADDITION_OPTIONS_PARAM;

public class PredicateFilter implements ClauseFilter
{
  private static final List < String > ALL_PREDICATES = List.of( "@FMV", "@FCV", "@IMV", "@ICV", "@NEG" );

  @Override
  public List<String> getClauseFilters(Map<String, String[]> requestParameters)
  {
    String[] predicateOptions = requestParameters.get( CLAUSE_TYPE_ADDITION_OPTIONS_PARAM );
    if ( predicateOptions != null )
    {
      return Arrays.asList( predicateOptions );
    }

    return ALL_PREDICATES;
  }
}
