package ee.tlu.evkk.clusterfinder.filters.clause;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static ee.tlu.evkk.clusterfinder.constants.FilteringConstants.CLAUSE_TYPE_ADDITION_OPTIONS_PARAM;

public class AttributeFilter implements ClauseFilter
{
  private static final List < String > ALL_ATTRIBUTES = List.of( "@NN>", "@<NN", "@AN>", "@<AN",
    "@DN>", "@<DN", "@KN>", "@<KN", "@VN>", "@<VN", "@INFN>", "@<INFN" );

  @Override
  public List<String> getClauseFilters(Map<String, String[]> requestParameters)
  {
    String[] attributeOptions = requestParameters.get( CLAUSE_TYPE_ADDITION_OPTIONS_PARAM );
    if ( attributeOptions != null )
    {
      return Arrays.asList( attributeOptions );
    }

    return ALL_ATTRIBUTES;
  }
}
