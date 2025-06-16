package ee.tlu.evkk.dal.dto;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TargetGroup implements Serializable {
  private Long id;
  private String name;
}
