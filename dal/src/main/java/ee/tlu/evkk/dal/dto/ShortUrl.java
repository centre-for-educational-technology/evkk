package ee.tlu.evkk.dal.dto;

import lombok.*;

import java.io.Serializable;
import java.sql.Time;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ShortUrl implements Serializable {
  private Long id;
  private String code;
  private String originalUrl;
  private Time createdAt;
  private Time expiresAt;
}
