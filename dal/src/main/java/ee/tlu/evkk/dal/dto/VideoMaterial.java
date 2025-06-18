package ee.tlu.evkk.dal.dto;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VideoMaterial implements Serializable {
  private Long id;
  private String videoUrl;
  private String platform;
  private String embedCode;
  private Long materialId;
  private Material material;
}
