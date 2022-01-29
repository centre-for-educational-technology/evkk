package ee.tlu.evkk.clusterfinder.service.helper;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Component
public class MarkupExplanationHelper
{
  private final Map< String, String  > clusterTextsMap;

  public MarkupExplanationHelper( Map< String, String > clusterTextsMap )
  {
    this.clusterTextsMap = clusterTextsMap;
  }

  public String getMarkupExplanation( String markup )
  {
    String concreteMatch = clusterTextsMap.get( markup );
    return concreteMatch != null ? concreteMatch : getPartialMatchForMarkup( markup );
  }

  private String getPartialMatchForMarkup( String markup )
  {
    String matchingKey = "";
    List< String > splitMarkup = Arrays.asList( markup.split( " " ) );
    for ( String key : clusterTextsMap.keySet() )
    {
      List< String > splitKey = Arrays.asList( key.split( " " ) );
      if ( splitKey.containsAll( splitMarkup ) )
      {
        matchingKey = key;
        break;
      }
    }

    return StringUtils.isNotEmpty( matchingKey ) ? clusterTextsMap.get( matchingKey ) : StringUtils.EMPTY;
  }
}
