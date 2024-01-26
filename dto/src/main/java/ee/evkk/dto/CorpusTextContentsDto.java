package ee.evkk.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;
import java.util.UUID;

@Getter
@Setter
public class CorpusTextContentsDto {

  private Set<UUID> ids;
}
