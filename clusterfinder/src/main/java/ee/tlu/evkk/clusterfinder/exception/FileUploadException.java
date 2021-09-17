package ee.tlu.evkk.clusterfinder.exception;

public class FileUploadException extends Exception
{
  public FileUploadException(String message)
  {
    super(message);
  }

  public FileUploadException(String message, Throwable throwable)
  {
    super(message, throwable);
  }
}
