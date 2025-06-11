package ee.tlu.evkk.dal.dto;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FileMaterial implements Serializable {
  private Long id;
  private String filePath;
  private Integer fileSize;
  private String fileFormat;
  private Long materialId;
  private Material material;
}
