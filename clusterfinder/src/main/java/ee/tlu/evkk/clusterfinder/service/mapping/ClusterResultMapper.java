package ee.tlu.evkk.clusterfinder.service.mapping;

import ee.tlu.evkk.clusterfinder.constants.WordType;
import ee.tlu.evkk.clusterfinder.model.ClusterSearchForm;
import ee.tlu.evkk.clusterfinder.service.model.ClusterEntry;
import ee.tlu.evkk.clusterfinder.service.model.ClusterResult;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Component
public class ClusterResultMapper {

  private static final int MARKUP_START_INDEX = 1;

  private static final int USAGES_START_INDEX_OFFSET = 2;

  public ClusterResult mapResults(String clusteredText, ClusterSearchForm searchForm)
  {
    if ( clusteredText == null || clusteredText.isEmpty() )
    {
      return ClusterResult.EMPTY;
    }

    return new ClusterResult(getEntries(clusteredText, searchForm));
  }

  private List<ClusterEntry> getEntries(String clusteredText, ClusterSearchForm searchForm)
  {
    return Arrays.stream(clusteredText.split("\n"))
                 .map(c -> c.split(";"))
                 .map(clusterRow -> mapToEntry(clusterRow, searchForm.getAnalysisLength()))
                 .filter(Objects::nonNull)
                 .filter(clusterEntry -> filterEntries(clusterEntry, searchForm))
                 .collect(Collectors.toList());
  }

  private ClusterEntry mapToEntry(String[] clusterRow, int clusterLength)
  {
    if ( clusterRow.length == 0 )
    {
      return null;
    }

    int frequency = Integer.parseInt(clusterRow[0].replaceAll("\\s",""));
    List<String> markups = getMarkups(clusterRow, clusterLength);
    List<String> usages = getUsages(clusterRow, clusterLength);

    return new ClusterEntry(frequency, markups, usages);
  }

  private List<String> getMarkups(String[] clusterRow, int clusterLength)
  {
    return Arrays.asList(clusterRow)
                 .subList(MARKUP_START_INDEX, MARKUP_START_INDEX + clusterLength)
                 .stream()
                 .map(String::trim)
                 .map(this::replaceNonEssentialMarkup)
                 .collect(Collectors.toList());
  }

  private List<String> getUsages(String[] clusterRow, int clusterLength)
  {
    return Arrays.asList(clusterRow)
                 .subList(clusterLength + USAGES_START_INDEX_OFFSET, clusterRow.length)
                 .stream()
                 .map(String::trim)
                 .collect(Collectors.toList());
  }

  private String replaceNonEssentialMarkup(String markup)
  {
    int firstSpaceIndex = markup.indexOf(' ');
    return markup.substring(firstSpaceIndex != -1 ? firstSpaceIndex : 0).trim();
  }

  private boolean filterEntries(ClusterEntry entry, ClusterSearchForm searchForm)
  {
    boolean isSyntacticAnalysis = searchForm.isSyntacticAnalysis();
    boolean isMorfologicalAnalysis = searchForm.isMorfoAnalysis();
    boolean isWordTypeAnalysis = searchForm.isWordtypeAnalysis();
    boolean isMorfoSyntacticAnalysis = isMorfologicalAnalysis && isSyntacticAnalysis;

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
      return filterEntriesByWordType( entry.getMarkups(), searchForm.getWordType(), searchForm.getWordTypeFilters() );
    }

    return true;
  }

  // TODO: Add support for morfo + syntactical filtering (perhaps create filters according to analysis type???)
  // Example output of morfo + syntactical analysis: A pos sg nom // @AN>
  private boolean filterEntriesByWordAndClause(List<String> entryMarkups, List<String> wordTypeFilters, List<String> clauseTypeFilters)
  {
    return true;
  }

  private boolean filterEntriesByClause(List<String> entryMarkups, List<String> clauseTypeFilters)
  {
    if ( clauseTypeFilters.isEmpty() )
    {
      return true;
    }

    return CollectionUtils.containsAny( entryMarkups, clauseTypeFilters );
  }

  private boolean filterEntriesByWord(List<String> entryMarkups, List<String> wordTypeFilters)
  {
    if ( wordTypeFilters.isEmpty() )
    {
      return true;
    }

    return CollectionUtils.containsAny( entryMarkups, wordTypeFilters );
  }

  private boolean filterEntriesByWordType(List<String> markups, WordType wordType, List<String> wordTypeFilters)
  {
    if ( wordType == WordType.ALL )
    {
      return true;
    }

    if ( wordType == WordType.ADJECTIVE )
    {
      String firstFilter = wordTypeFilters.get(0);
      return markups.contains( "_" + firstFilter.substring( 0, firstFilter.indexOf( ' ' ) ) + "_" );
    }

    return markups.contains( "_" + wordType.getValue() + "_" );
  }
}
