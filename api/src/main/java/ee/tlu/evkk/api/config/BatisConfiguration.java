package ee.tlu.evkk.api.config;

import ee.tlu.evkk.api.batis.handler.DurationTypeHandler;
import ee.tlu.evkk.api.batis.handler.JsonTypeHandler;
import ee.tlu.evkk.api.batis.handler.UUIDTypeHandler;
import ee.tlu.evkk.api.dao.dto.Json;
import org.apache.ibatis.type.TypeHandlerRegistry;
import org.mybatis.spring.boot.autoconfigure.ConfigurationCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;
import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 10.02.2020
 */
@Configuration
public class BatisConfiguration {

  @Bean
  public ConfigurationCustomizer configurationCustomizer() {
    return configuration -> {

      // register custom type handlers
      TypeHandlerRegistry typeHandlerRegistry = configuration.getTypeHandlerRegistry();
      typeHandlerRegistry.register(UUID.class, UUIDTypeHandler.class);
      typeHandlerRegistry.register(Json.class, JsonTypeHandler.class);
      typeHandlerRegistry.register(Duration.class, DurationTypeHandler.class);
    };
  }

}
