package ee.tlu.evkk.dal.dto;

import lombok.*;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;

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
  private List<Category> categories;
  private Status status;

  private String filePath;
  private String fileFormat;
  private Integer fileSize;

  private String link;

  private String text;
  private Integer wordCount;

  private String videoUrl;
  private String platform;
  private String embedCode;
}
