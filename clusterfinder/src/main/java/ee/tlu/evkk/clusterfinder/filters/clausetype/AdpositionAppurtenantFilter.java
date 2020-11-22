package ee.tlu.evkk.clusterfinder.filters.clausetype;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static ee.tlu.evkk.clusterfinder.constants.FilteringConstants.CLAUSE_TYPE_ADDITION_OPTIONS_PARAM;

public class AdpositionAppurtenantFilter implements ClauseTypeFilter
{
  private static final List < String > ALL_ADPOSITION_APPURTENANTS = List.of( "@P>", "@<P" );

  @Override
  public List<String> getClauseTypeFilters(Map<String, String[]> requestParameters)
  {
    String[] adpositionAppurtenantOptions = requestParameters.get( CLAUSE_TYPE_ADDITION_OPTIONS_PARAM );
    if ( adpositionAppurtenantOptions != null )
    {
      return Arrays.asList(adpositionAppurtenantOptions);
    }

    return ALL_ADPOSITION_APPURTENANTS;
  }
}
