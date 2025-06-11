package ee.tlu.evkk.dal.dto;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TextMaterial implements Serializable {
  private Long id;
  private String text;
  private Integer wordCount;
  private Long materialId;
  private Material material;
}
