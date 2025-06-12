package ee.tlu.evkk.dal.dto;

import lombok.*;

import java.io.Serializable;
import java.sql.Timestamp;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Material implements Serializable {
  private Long id;
  private String title;
  private String description;
  private Integer downloads;
  private Integer likes;
  private Timestamp createdAt;
  private Long materialTypeId;
  private MaterialType materialType;
  private Long languageLevelId;
  private LanguageLevel languageLevel;
  private Long categoryId;
  private Category category;
}
