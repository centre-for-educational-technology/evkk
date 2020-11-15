package ee.tlu.evkk.clusterfinder.util;

import ee.tlu.evkk.clusterfinder.exception.FileUploadException;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Set;

import static ee.tlu.evkk.clusterfinder.constants.SystemConstants.TEMP_DIR;
import static ee.tlu.evkk.clusterfinder.constants.SystemConstants.TEMP_DIR_WITH_SEPARATOR;

public class FileUtil
{
  private static final String UTF_8_ENCODING = "UTF-8";

  private static final Set< String > ALLOWED_FILE_EXTENSIONS = Set.of( ".txt" );

  public static void uploadFile(MultipartFile file) throws FileUploadException
  {
    String fileExtension = FilenameUtils.getExtension(file.getName());
    if (!ALLOWED_FILE_EXTENSIONS.contains(fileExtension) || file.isEmpty())
    {
      throw new FileUploadException("Invalid file provided");
    }

    saveToTempDirectory(file);
  }

  // TODO: Maybe add escaping to the content
  public static void saveTextToFile(String text, String fileUUID) throws IOException
  {
    File targetFile = createTargetFile(fileUUID);
    FileUtils.writeStringToFile(targetFile, text, UTF_8_ENCODING);
  }

  private static void saveToTempDirectory(MultipartFile file) throws FileUploadException
  {
    try (InputStream inputStream = file.getInputStream())
    {
      Files.copy(inputStream, Paths.get(TEMP_DIR), StandardCopyOption.REPLACE_EXISTING);
    }
    catch (IOException e)
    {
      throw new FileUploadException("Could not upload file: " + e.getMessage(), e);
    }
  }

  private static File createTargetFile(String fileUUID)
  {
    String targetFileName = fileUUID + ".txt";
    return new File(TEMP_DIR_WITH_SEPARATOR, targetFileName);
  }
}
