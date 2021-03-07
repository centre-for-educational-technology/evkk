package ee.tlu.evkk.clusterfinder.constants;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.io.File;

@NoArgsConstructor( access = AccessLevel.PRIVATE )
public class SystemConstants
{
  public static final String TEMP_DIR = System.getProperty("java.io.tmpdir");

  public static final String TEMP_DIR_WITH_SEPARATOR = TEMP_DIR + File.separator;
}
