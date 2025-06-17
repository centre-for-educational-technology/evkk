package ee.tlu.evkk.api.service;

import ee.tlu.evkk.dal.dao.*;
import ee.tlu.evkk.dal.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudyMaterialService {

  private final MaterialDao materialDao;
  private final CategoryDao categoryDao;
  private final LanguageLevelDao languageLevelDao;
  private final FileMaterialDao fileMaterialDao;
  private final LinkMaterialDao linkMaterialDao;
  private final TextMaterialDao textMaterialDao;
  private final VideoMaterialDao videoMaterialDao;

  public Material saveStudyMaterialToDatabase(
    MultipartFile file, String title, String description,
    List<String> categories, String level, String type,
    String link, String text, List<String> targetGroups
  ) throws IOException {

    int materialTypeId = getMaterialTypeId(type);
    Long levelId = findOrInsertLevel(level);
    Long statusId = 1L; // DRAFT

    Material material = Material.builder()
      .title(title)
      .description(description)
      .downloads(0)
      .likes(0)
      .createdAt(new Timestamp(System.currentTimeMillis()))
      .materialTypeId((long) materialTypeId)
      .languageLevelId(levelId)
      .status(Status.builder().id(statusId).name("DRAFT").build())
      .build();

    materialDao.insertMaterial(material);

    // Mitme kategooria salvestamine
    List<Category> categoryList = categories.stream()
      .map(this::findOrInsertCategory)
      .map(id -> Category.builder().id(id).build())
      .collect(Collectors.toList());

    material.setCategories(categoryList);
    materialDao.insertMaterialCategories(material);

    // Mitme sihigrupi lisamine
    materialDao.insertMaterialTargetGroups(material);

    // Alaminfo salvestamine tüübi alusel
    switch (type.toLowerCase()) {
      case "fail":
        String filePath = storeFile(file);
        fileMaterialDao.insertFileMaterial(FileMaterial.builder()
          .materialId(material.getId())
          .filePath(filePath)
          .fileSize((int) file.getSize())
          .fileFormat(getFileExtension(file.getOriginalFilename()))
          .build());
        break;

      case "link":
        linkMaterialDao.insertLinkMaterial(LinkMaterial.builder()
          .materialId(material.getId())
          .url(link)
          .build());
        break;

      case "tekst":
        textMaterialDao.insertTextMaterial(TextMaterial.builder()
          .materialId(material.getId())
          .text(text)
          .wordCount(text == null ? 0 : text.trim().split("\\s+").length)
          .build());
        break;

      case "video":
        String platform = detectPlatform(link);
        String embedCode = generateEmbedCode(link, platform);
        videoMaterialDao.insertVideoMaterial(VideoMaterial.builder()
          .materialId(material.getId())
          .videoUrl(link)
          .platform(platform)
          .embedCode(embedCode)
          .build());
        break;
    }
    return material;
  }

  private int getMaterialTypeId(String type) {
    switch (type.toLowerCase()) {
      case "fail": return 1;
      case "link": return 2;
      case "tekst": return 3;
      case "video": return 4;
      default: throw new IllegalArgumentException("Undefined material type: " + type);
    }
  }

  private String storeFile(MultipartFile file) throws IOException {
    String uploadDir = System.getProperty("user.dir") + "/uploads/files/";
    File dir = new File(uploadDir);
    if (!dir.exists()) dir.mkdirs();

    File storedFile = new File(uploadDir + file.getOriginalFilename());
    file.transferTo(storedFile);
    return storedFile.getPath();
  }

  private String getFileExtension(String filename) {
    int dotIndex = filename.lastIndexOf('.');
    return (dotIndex != -1) ? filename.substring(dotIndex + 1) : "";
  }

  private String detectPlatform(String url) {
    if (url == null) return "UNKNOWN";
    if (url.contains("youtube.com") || url.contains("youtu.be")) return "YOUTUBE";
    if (url.contains("vimeo.com")) return "VIMEO";
    return "UNKNOWN";
  }

  private String generateEmbedCode(String url, String platform) {
    switch (platform) {
      case "YOUTUBE":
        String youtubeId = extractYoutubeId(url);
        return "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/" + youtubeId + "\" frameborder=\"0\" allowfullscreen></iframe>";
      case "VIMEO":
        String vimeoId = extractVimeoId(url);
        return "<iframe src=\"https://player.vimeo.com/video/" + vimeoId + "\" width=\"640\" height=\"360\" frameborder=\"0\" allowfullscreen></iframe>";
      default:
        return "";
    }
  }

  private String extractYoutubeId(String url) {
    try {
      if (url.contains("v=")) {
        return url.substring(url.indexOf("v=") + 2).split("&")[0];
      } else if (url.contains("youtu.be/")) {
        return url.substring(url.indexOf("youtu.be/") + 9).split("\\?")[0];
      }
    } catch (Exception e) {
      // ignore
    }
    return "";
  }

  private String extractVimeoId(String url) {
    try {
      String[] parts = url.split("/");
      return parts[parts.length - 1];
    } catch (Exception e) {
      return "";
    }
  }

  private Long findOrInsertCategory(String name) {
    List<Category> all = categoryDao.findAllCategories();
    for (Category cat : all) {
      if (cat.getName().equalsIgnoreCase(name)) return cat.getId();
    }
    Category newCategory = Category.builder().name(name).build();
    categoryDao.insert(newCategory);
    return categoryDao.findAllCategories().stream()
      .filter(cat -> cat.getName().equalsIgnoreCase(name))
      .findFirst()
      .map(Category::getId)
      .orElseThrow();
  }

  private Long findOrInsertLevel(String level) {
    List<LanguageLevel> all = languageLevelDao.findAllLanguageLevels();
    for (LanguageLevel ll : all) {
      if (ll.getLevel().equalsIgnoreCase(level)) return ll.getId();
    }
    LanguageLevel newLevel = LanguageLevel.builder().level(level).build();
    languageLevelDao.insert(newLevel);
    return languageLevelDao.findAllLanguageLevels().stream()
      .filter(ll -> ll.getLevel().equalsIgnoreCase(level))
      .findFirst()
      .map(LanguageLevel::getId)
      .orElseThrow();
  }

  public List<Material> getAllStudyMaterials() {
    return materialDao.findAllMaterials();
  }
}
