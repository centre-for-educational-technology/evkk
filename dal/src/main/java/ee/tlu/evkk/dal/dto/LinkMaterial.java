package ee.tlu.evkk.dal.dto;

import lombok.*;

import java.io.Serializable;
import java.sql.Timestamp;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LinkMaterial implements Serializable {
  private Long id;
  private String url;
  private Long materialId;
  private Material material;
}
