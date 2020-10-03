package ee.tlu.evkk.clusterfinder.service.mapping;

import ee.tlu.evkk.clusterfinder.service.model.ClusterEntry;
import ee.tlu.evkk.clusterfinder.service.model.ClusterResult;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ClusterResultMapper {

  private static final int MARKUP_START_INDEX = 1;

  private static final int USAGES_START_INDEX_OFFSET = 2;

  public ClusterResult mapResults(String clusteredText, int clusterLength)
  {
    if ( clusteredText == null || clusteredText.isEmpty() )
    {
      return ClusterResult.EMPTY;
    }

    return new ClusterResult(getEntries(clusteredText, clusterLength));
  }

  private List<ClusterEntry> getEntries(String clusteredText, int clusterLength)
  {
    return Arrays.stream(clusteredText.split("\n"))
                 .map(c -> c.split(";"))
                 .map(clusterRow -> mapToEntry(clusterRow, clusterLength))
                 .collect(Collectors.toList());
  }

  // TODO: Add filtering support for markups
  private ClusterEntry mapToEntry(String[] clusterRow, int clusterLength)
  {
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
}
