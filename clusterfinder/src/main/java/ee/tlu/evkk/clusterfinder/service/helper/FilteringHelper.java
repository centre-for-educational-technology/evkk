package ee.tlu.evkk.clusterfinder.service.helper;

import ee.tlu.evkk.clusterfinder.constants.WordType;
import ee.tlu.evkk.clusterfinder.model.ClusterSearchForm;
import ee.tlu.evkk.clusterfinder.service.model.ClusterEntry;
import org.springframework.util.CollectionUtils;

import java.util.List;

public final class FilteringHelper
{
  private static final String ADJECTIVE_TYPE_A = "_A_";

  private static final String ADJECTIVE_TYPE_G = "_G_";

  public static boolean filterEntries(ClusterEntry entry, ClusterSearchForm searchForm)
  {
    boolean isSyntacticAnalysis = searchForm.isSyntacticAnalysis();
    boolean isMorfologicalAnalysis = searchForm.isMorfoAnalysis();
    boolean isWordTypeAnalysis = searchForm.isWordtypeAnalysis();
    boolean isMorfoSyntacticAnalysis = searchForm.isMorfoSyntacticAnalysis();

    if ( isMorfoSyntacticAnalysis )
    {
      return filterEntriesByWordAndClause( entry.getMarkups(), searchForm.getWordTypeFilters(), searchForm.getClauseTypeFilters() );
    }
    else if ( isMorfologicalAnalysis )
    {
      return filterEntriesByWord( entry.getMarkups(), searchForm.getWordTypeFilters() );
    }
    else if ( isSyntacticAnalysis )
    {
      return filterEntriesByClause( entry.getMarkups(), searchForm.getClauseTypeFilters() );
    }
    else if ( isWordTypeAnalysis )
    {
      return filterEntriesByWordType( entry.getMarkups(), searchForm.getWordType() );
    }

    return true;
  }

  // TODO: Add support for morfo + syntactical filtering (perhaps create filters according to analysis type???)
  // Example output of morfo + syntactical analysis: A pos sg nom // @AN>
  private static boolean filterEntriesByWordAndClause(List<String> entryMarkups, List<String> wordTypeFilters, List<String> clauseTypeFilters)
  {
    return true;
  }

  private static boolean filterEntriesByClause(List<String> entryMarkups, List<String> clauseTypeFilters)
  {
    if ( clauseTypeFilters.isEmpty() )
    {
      return true;
    }

    return CollectionUtils.containsAny( entryMarkups, clauseTypeFilters );
  }

  private static boolean filterEntriesByWord(List<String> entryMarkups, List<String> wordTypeFilters)
  {
    if ( wordTypeFilters.isEmpty() )
    {
      return true;
    }

    return CollectionUtils.containsAny( entryMarkups, wordTypeFilters );
  }

  private static boolean filterEntriesByWordType(List<String> markups, WordType wordType)
  {
    if ( wordType == WordType.ALL )
    {
      return true;
    }

    if ( wordType == WordType.ADJECTIVE )
    {
      return markups.contains( ADJECTIVE_TYPE_A ) || markups.contains( ADJECTIVE_TYPE_G );
    }

    return markups.contains( "_" + wordType.getValue() + "_" );
  }
}
