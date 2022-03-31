package ee.tlu.evkk.clusterfinder.service.model;

import lombok.Data;
import org.apache.commons.lang3.StringUtils;

import java.util.List;

@Data
public class ClusterResult
{
  public static final ClusterResult EMPTY = new ClusterResult(List.of(), StringUtils.EMPTY);

  private final List < ClusterEntry > clusters;

  private final String separator;
}
