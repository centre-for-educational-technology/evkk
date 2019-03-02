package ee.tlu.evkk.portal.client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

/**
 * @author Mikk Tarvas
 * Date: 2019-02-11
 */
@Component
public class StringLengthClient {

    private final RestTemplate rest;

    @Autowired
    public StringLengthClient(RestTemplateBuilder builder) {
        this.rest = builder.build();
    }

    public int getStringLengthOfCharSequence(CharSequence charSequence) {
        if (charSequence == null) {
            throw new NullPointerException();
        }

        String asString = charSequence.toString();
        URI uri = UriComponentsBuilder.fromHttpUrl("http://minitorn.tlu.ee/~jaagup/oma/too/19/02/pikkus1.php").queryParam("tekst", asString).build().toUri();
        ResponseEntity<String> response = rest.getForEntity(uri, String.class);

        if (response.getBody() == null) {
            throw new NullPointerException();
        }

        return Integer.parseInt(response.getBody());
    }

}