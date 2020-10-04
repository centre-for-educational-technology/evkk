package ee.tlu.evkk.clusterfinder.util;

import ee.tlu.evkk.clusterfinder.exception.FileUploadException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

public class FileUtil
{
  private static final String TEMP_DIR = System.getProperty("java.io.tmpdir");

  public static void uploadFile(MultipartFile file) throws FileUploadException
  {
    // TODO: Add better file validation (allowed types, size etc.)
    if (!file.isEmpty())
    {
      saveToTempDirectory(file);
    }

    throw new FileUploadException("Empty file provided, skipping upload");
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
}
