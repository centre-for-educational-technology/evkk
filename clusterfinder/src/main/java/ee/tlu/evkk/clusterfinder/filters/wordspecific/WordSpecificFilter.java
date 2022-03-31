package ee.tlu.evkk.clusterfinder.filters.wordspecific;

import java.util.List;
import java.util.Map;

public interface WordSpecificFilter
{
  List < String > getWordSpecificFilters(Map<String, String[]> requestParameters);
}
