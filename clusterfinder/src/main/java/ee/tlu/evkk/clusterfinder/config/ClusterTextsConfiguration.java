package ee.tlu.evkk.clusterfinder.config;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import ee.tlu.evkk.clusterfinder.config.json.ClusterTextsJsonAdapter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.reflect.Type;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@Configuration
public class ClusterTextsConfiguration {

  private static final String CLUSTER_TEXTS_FILE = "classpath:/files/cluster_descriptions.json";
  private static final Type MAP_TYPE = new TypeToken<Map<String, String>>() {}.getType();
  private static final Gson GSON = new GsonBuilder()
    .registerTypeAdapter(MAP_TYPE, new ClusterTextsJsonAdapter())
    .disableHtmlEscaping()
    .create();

  private final ResourceLoader resourceLoader;

  @Autowired
  public ClusterTextsConfiguration(ResourceLoader resourceLoader) {
    this.resourceLoader = resourceLoader;
  }

  @Bean
  public Map<String, String> clusterTextsMap() throws IOException {
    Resource resource = resourceLoader.getResource(CLUSTER_TEXTS_FILE);
    try (InputStream inputStream = resource.getInputStream();
         InputStreamReader reader = new InputStreamReader(inputStream, StandardCharsets.UTF_8);
         BufferedReader bufferedReader = new BufferedReader(reader)) {
      return GSON.fromJson(bufferedReader, MAP_TYPE);
    }
  }

}
