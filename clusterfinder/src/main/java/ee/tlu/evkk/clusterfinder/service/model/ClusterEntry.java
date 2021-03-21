package ee.tlu.evkk.clusterfinder.service.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
public class ClusterEntry
{
  private int frequency;

  private List <String> markups;

  private List <String> explanations;

  private List <String> usages;
}
