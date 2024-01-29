package ee.tlu.evkk.clusterfinder.util;

import ee.tlu.evkk.clusterfinder.exception.FileUploadException;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Set;

import static ee.tlu.evkk.clusterfinder.constants.SystemConstants.TEMP_DIR_WITH_SEPARATOR;
import static java.nio.charset.StandardCharsets.UTF_8;
import static lombok.AccessLevel.PRIVATE;
import static org.apache.commons.io.FileUtils.writeStringToFile;
import static org.apache.commons.io.FilenameUtils.getExtension;

@NoArgsConstructor(access = PRIVATE)
public class FileUtil {

  private static final Set<String> ALLOWED_FILE_EXTENSIONS = Set.of("txt", "pdf", "doc", "docx", "odt");

  public static void uploadFile(MultipartFile file) throws FileUploadException {
    String fileExtension = getExtension(file.getOriginalFilename());
    if (!ALLOWED_FILE_EXTENSIONS.contains(fileExtension) || file.isEmpty()) {
      throw new FileUploadException("Invalid file provided");
    }

    saveToTempDirectory(file);
  }

  // TODO: Maybe add escaping to the content
  public static void saveTextToFile(String text, String fileUUID) throws IOException {
    File targetFile = createTargetFile(fileUUID);
    writeStringToFile(targetFile, text, UTF_8);
  }

  private static void saveToTempDirectory(MultipartFile file) throws FileUploadException {
    try {
      byte[] fileContent = file.getBytes();
      Files.write(Paths.get(TEMP_DIR_WITH_SEPARATOR + file.getOriginalFilename()), fileContent);
    } catch (IOException e) {
      throw new FileUploadException("Could not upload file: " + e.getMessage(), e);
    }
  }

  private static File createTargetFile(String fileUUID) {
    String targetFileName = fileUUID + ".txt";
    return new File(TEMP_DIR_WITH_SEPARATOR, targetFileName);
  }
}
