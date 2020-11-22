package ee.tlu.evkk.clusterfinder.filters.wordtype;

import java.util.List;
import java.util.Map;

public class AbbreviationFilter implements WordTypeFilter
{
  @Override
  public List<String> getWordTypeFilters(Map<String, String[]> requestParameters)
  {
    return List.of();
  }
}
