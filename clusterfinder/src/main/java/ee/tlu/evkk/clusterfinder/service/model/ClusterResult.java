package ee.tlu.evkk.clusterfinder.service.model;

import lombok.Data;

import java.util.List;

@Data
public class ClusterResult
{
  public static final ClusterResult EMPTY = new ClusterResult(List.of());

  private final List < ClusterEntry > clusters;
}
