package ee.tlu.evkk.dal;

import ee.tlu.evkk.dal.batis.handler.DurationTypeHandler;
import ee.tlu.evkk.dal.batis.handler.JsonTypeHandler;
import ee.tlu.evkk.dal.batis.handler.UUIDTypeHandler;
import ee.tlu.evkk.dal.dto.Json;
import org.apache.ibatis.type.TypeHandlerRegistry;
import org.mybatis.spring.annotation.MapperScan;
import org.mybatis.spring.boot.autoconfigure.ConfigurationCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;
import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 10.02.2020
 */
@Configuration
@ComponentScan
@MapperScan(basePackages = "ee.tlu.evkk.dal.dao")
public class DalConfiguration {

  @Bean
  public ConfigurationCustomizer configurationCustomizer() {
    return configuration -> {

      configuration.setMapUnderscoreToCamelCase(true);

      // register custom type handlers
      TypeHandlerRegistry typeHandlerRegistry = configuration.getTypeHandlerRegistry();
      typeHandlerRegistry.register(UUID.class, UUIDTypeHandler.class);
      typeHandlerRegistry.register(Json.class, JsonTypeHandler.class);
      typeHandlerRegistry.register(Duration.class, DurationTypeHandler.class);
    };
  }

}
