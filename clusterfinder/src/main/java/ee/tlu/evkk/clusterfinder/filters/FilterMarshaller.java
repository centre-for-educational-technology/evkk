package ee.tlu.evkk.clusterfinder.filters;

import ee.tlu.evkk.clusterfinder.constants.ClauseType;
import ee.tlu.evkk.clusterfinder.constants.WordType;
import ee.tlu.evkk.clusterfinder.filters.util.FilteringUtil;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@Component
public class FilterMarshaller
{
  private final WordFilterFactory wordFilterFactory;

  private final WordSpecificFilterFactory wordSpecificFilterFactory;

  private final ClauseFilterFactory clauseFilterFactory;

  public FilterMarshaller(WordFilterFactory wordFilterFactory, WordSpecificFilterFactory wordSpecificFilterFactory, ClauseFilterFactory clauseFilterFactory)
  {
    this.wordFilterFactory = wordFilterFactory;
    this.wordSpecificFilterFactory = wordSpecificFilterFactory;
    this.clauseFilterFactory = clauseFilterFactory;
  }

  public List< String > marshalFilters(HttpServletRequest request)
  {
    Map< String, String[] > paramsMap = request.getParameterMap();

    WordType wordType = WordType.getByValue( request.getParameter( "wordType" ) );
    ClauseType clauseType = ClauseType.getByValue( request.getParameter( "clauseType" ) );

    boolean isMorfo = asBoolean( request.getParameter("morfological") );
    boolean isSyntactic = asBoolean( request.getParameter("syntactic") );
    boolean isWordType = asBoolean( request.getParameter("wordtype") );
    boolean isMorfoSyntactic = isMorfo && isSyntactic;

    if ( isMorfoSyntactic )
    {
      return FilteringUtil.getUnionizedFilters( getWordSpecificFilters( wordType, paramsMap ), getClauseSpecificFilters( clauseType, paramsMap ) );
    }

    if ( isMorfo )
    {
      return getWordSpecificFilters( wordType, paramsMap );
    }

    if ( isSyntactic )
    {
      return getClauseSpecificFilters( clauseType, paramsMap );
    }

    if ( isWordType )
    {
      return wordFilterFactory.getWordFilters(wordType);
    }

    return List.of();
  }

  private List< String > getWordSpecificFilters( WordType wordType, Map< String, String[] > paramsMap )
  {
    return wordSpecificFilterFactory.getFilter( wordType ).getWordSpecificFilters( paramsMap );
  }

  private List< String > getClauseSpecificFilters( ClauseType clauseType, Map< String, String[] > paramsMap )
  {
    return clauseFilterFactory.getFilter( clauseType ).getClauseFilters( paramsMap );
  }

  private boolean asBoolean(String value)
  {
    return Boolean.parseBoolean(value);
  }
}
