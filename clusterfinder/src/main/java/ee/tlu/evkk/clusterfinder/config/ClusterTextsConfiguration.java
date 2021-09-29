package ee.tlu.evkk.clusterfinder.config;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import ee.tlu.evkk.clusterfinder.config.json.ClusterTextsJsonAdapter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.File;
import java.io.IOException;
import java.io.Reader;
import java.lang.reflect.Type;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.Map;

@Configuration
public class ClusterTextsConfiguration
{
  private static final String CLUSTER_TEXTS_FILE = "clusterfinder/src/main/resources/files/clusterTexts.json";

  private static final Type MAP_TYPE = new TypeToken<Map<String, String>>(){}.getType();

  private static final Gson GSON = new GsonBuilder()
    .registerTypeAdapter(MAP_TYPE, new ClusterTextsJsonAdapter() )
    .disableHtmlEscaping()
    .create();

  @Bean
  public Map< String, String > clusterTextsMap() throws IOException
  {
    File file = new File( CLUSTER_TEXTS_FILE ).getAbsoluteFile();
    try(Reader reader = Files.newBufferedReader(file.toPath(), StandardCharsets.UTF_8))
    {
      return GSON.fromJson(reader, MAP_TYPE);
    }
  }
}
