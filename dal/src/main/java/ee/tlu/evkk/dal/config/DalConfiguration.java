package ee.tlu.evkk.dal.config;

import ee.tlu.evkk.dal.handler.UUIDHandler;
import org.apache.ibatis.session.AutoMappingBehavior;
import org.apache.ibatis.session.LocalCacheScope;
import org.apache.ibatis.type.TypeHandlerRegistry;
import org.mybatis.spring.annotation.MapperScan;
import org.mybatis.spring.boot.autoconfigure.ConfigurationCustomizer;
import org.springframework.context.annotation.Configuration;

import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 2019-02-18
 */
@Configuration
@MapperScan(basePackages = "ee.tlu.evkk.dal.dao")
public class DalConfiguration implements ConfigurationCustomizer {

    @Override
    public void customize(org.apache.ibatis.session.Configuration configuration) {
        configuration.setMapUnderscoreToCamelCase(true);
        configuration.setAutoMappingBehavior(AutoMappingBehavior.FULL);
        configuration.setMultipleResultSetsEnabled(true);
        configuration.setCacheEnabled(true);
        configuration.setReturnInstanceForEmptyRow(true);
        configuration.setLocalCacheScope(LocalCacheScope.SESSION);

        registerTypeHandlers(configuration.getTypeHandlerRegistry());
    }

    private void registerTypeHandlers(TypeHandlerRegistry registry) {
        registry.register(UUID.class, UUIDHandler.class);
    }

}