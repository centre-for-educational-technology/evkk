package ee.tlu.evkk.dal.dto;

import lombok.*;

import java.io.Serializable;
import java.sql.Timestamp;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ShortUrl implements Serializable {
  private Long id;
  private String code;
  private String originalUrl;
  private Timestamp createdAt;
  private Timestamp expiresAt;
}
