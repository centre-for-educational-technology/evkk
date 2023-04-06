package ee.tlu.evkk.core.service.dto;

import java.util.Set;
import java.util.UUID;

public class CorpusTextContentsDto {

  private Set<UUID> ids;

  public Set<UUID> getIds() {
    return ids;
  }

  public void setIds(Set<UUID> ids) {
    this.ids = ids;
  }
}
