package ee.tlu.evkk.clusterfinder;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
public class ClusterFinderRunner
{
  public static void main(String[] args)
  {
    SpringApplication.run(ClusterFinderRunner.class, args);
  }
}
