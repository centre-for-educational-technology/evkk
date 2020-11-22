package ee.tlu.evkk.clusterfinder.filters.util;

import ee.tlu.evkk.clusterfinder.constants.WordType;
import org.apache.commons.lang3.StringUtils;

import java.util.ArrayList;
import java.util.List;

public final class FilteringUtil
{
  public static List < String > assembleWordTypeFilters(WordType wordType, String[] wordOptions)
  {
    List < String > filters = new ArrayList<>();
    for ( String wordOption : wordOptions )
    {
      filters.add( formatWordOption( wordType, wordOption ) );
    }

    return filters;
  }

  private static String formatWordOption(WordType wordType, String wordOption)
  {
    return StringUtils.prependIfMissingIgnoreCase( wordType.getValue() + StringUtils.SPACE, wordOption );
  }
}
