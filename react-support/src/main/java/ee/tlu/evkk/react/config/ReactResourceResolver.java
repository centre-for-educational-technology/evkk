package ee.tlu.evkk.react.config;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.web.servlet.resource.AbstractResourceResolver;
import org.springframework.web.servlet.resource.ResourceResolverChain;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.net.MalformedURLException;
import java.net.URI;
import java.util.List;

/**
 * @author Mikk Tarvas
 * Date: 2019-01-21
 */
public class ReactResourceResolver extends AbstractResourceResolver {

    private final String host;
    private final int port;

    public ReactResourceResolver(String host, int port) {
        this.host = host;
        this.port = port;
    }

    @Override
    protected Resource resolveResourceInternal(HttpServletRequest request, String requestPath, List<? extends Resource> locations, ResourceResolverChain chain) {
        return getResource(new ServletServerHttpRequest(request));
    }

    @Override
    protected String resolveUrlPathInternal(String resourceUrlPath, List<? extends Resource> locations, ResourceResolverChain chain) {
        throw new UnsupportedOperationException();
    }

    private Resource getResource(ServletServerHttpRequest request) {
        URI uri = UriComponentsBuilder.fromHttpRequest(request).scheme("http").host(host).port(port).build().toUri();
        try {
            return new UrlResourceWithoutContentLength(uri);
        } catch (MalformedURLException ex) {
            throw new RuntimeException(ex);
        }
    }

    private static class UrlResourceWithoutContentLength extends UrlResource {

        UrlResourceWithoutContentLength(URI uri) throws MalformedURLException {
            super(uri);
        }

        @Override
        public long contentLength() {
            // this is used to indicate that we do not know actual content length for the resource
            // it is important because create-react-app seems to return resources as "chunks" and default resource resolver returns only the size for first chunk
            // as a result only first chunk is being read by the browser
            return -1L;
        }

    }

}
