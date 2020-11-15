package ee.tlu.evkk.clusterfinder.constants;

import java.io.File;

public class SystemConstants
{
  public static final String TEMP_DIR = System.getProperty("java.io.tmpdir");

  public static final String TEMP_DIR_WITH_SEPARATOR = TEMP_DIR + File.separator;
}
