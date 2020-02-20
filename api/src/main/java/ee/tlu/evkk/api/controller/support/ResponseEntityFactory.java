package ee.tlu.evkk.api.controller.support;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.time.Instant;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;

/**
 * @author Mikk Tarvas
 * Date: 20.02.2020
 */
@Component
public class ResponseEntityFactory {

  public ResponseEntity<Resource> download(String fileName, Instant createdAt, InputStream inputStream) throws IOException {
    byte[] bytes = inputStream.readAllBytes(); //TODO: work-around, because we can read LOB in transaction only
    ZonedDateTime creationDate = ZonedDateTime.ofInstant(createdAt, ZoneOffset.UTC);
    ContentDisposition contentDisposition = ContentDisposition.builder("attachment").filename(fileName).creationDate(creationDate).build();
    HttpHeaders headers = new HttpHeaders();
    headers.setContentDisposition(contentDisposition);
    return ResponseEntity.status(HttpStatus.OK).headers(headers).body(new ByteArrayResource(bytes));
  }

}
