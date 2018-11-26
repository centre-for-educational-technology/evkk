package ee.tlu.evkk.db;

import org.flywaydb.core.Flyway;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.flyway.FlywayMigrationStrategy;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.init.ScriptUtils;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.*;
import java.util.function.Consumer;

/**
 * @author Mikk Tarvas
 * Date: 26/11/2018
 */
@SpringBootApplication
public class DatabaseRunner {

    private static final Map<String, Consumer<Flyway>> METHOD_MAP;
    private static final String SEED_COMMAND = "seed";

    static {
        Map<String, Consumer<Flyway>> methods = new HashMap<>();
        methods.put("clean", Flyway::clean);
        methods.put("baseline", Flyway::baseline);
        methods.put("migrate", Flyway::migrate);
        methods.put("validate", Flyway::validate);
        methods.put("repair", Flyway::repair);
        METHOD_MAP = Collections.unmodifiableMap(methods);
    }

    public static void main(String[] args) {
        SpringApplication.run(DatabaseRunner.class, args);
    }

    @Bean
    public FlywayMigrationStrategy flywayMigrationStrategy(ApplicationArguments arguments,
                                                           @Value("${db.seedsLocation}") String seedsLocation) {
        return flyway -> {
            try {
                run(flyway, arguments, seedsLocation);
            } catch (SQLException | IOException ex) {
                throw new RuntimeException("unable to run migrations", ex);
            }
        };
    }

    private void run(Flyway flyway, ApplicationArguments arguments, String seedsLocation)
            throws SQLException, IOException {
        List<String> nonOptionArgs = arguments.getNonOptionArgs();
        for (Map.Entry<String, Consumer<Flyway>> entry : METHOD_MAP.entrySet()) {
            if (nonOptionArgs.contains(entry.getKey())) {
                entry.getValue().accept(flyway);
            }
        }
        if (nonOptionArgs.contains(SEED_COMMAND)) {
            seed(flyway, seedsLocation);
        }
    }

    private void seed(Flyway flyway, String seedLocations) throws SQLException, IOException {
        try (Connection connection = flyway.getDataSource().getConnection()) {
            for (Resource seed : getSeeds(flyway.getClassLoader(), seedLocations)) {
                ScriptUtils.executeSqlScript(connection, seed);
            }
        }
    }

    private List<Resource> getSeeds(ClassLoader classLoader, String seedLocations) throws IOException {
        PathMatchingResourcePatternResolver patternResolver = new PathMatchingResourcePatternResolver(classLoader);
        List<Resource> resources = Arrays.asList(patternResolver.getResources(seedLocations));
        resources.sort(Comparator.comparing(Resource::getFilename));
        return resources;
    }

}
