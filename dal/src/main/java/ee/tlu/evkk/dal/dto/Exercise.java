package ee.tlu.evkk.dal.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Exercise implements Serializable {
  private Long id;
  private String title;
  private String description;
  private Integer views;
  private Timestamp createdAt;
  private String createdByEmail;
  private Integer durationId;
  private String duration;
  private Integer likes;
  private String filePath;
  private Integer languageLevelId;
  private String level;
  private String levelLabel;
  private String externalId;
  private Integer statusId;
  private String status;
  private List<Category> categories;
}
