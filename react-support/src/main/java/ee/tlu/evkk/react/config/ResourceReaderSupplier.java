package ee.tlu.evkk.react.config;

import ee.tlu.evkk.react.io.ReaderSupplier;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.EncodedResource;

import java.io.Reader;

/**
 * @author Mikk Tarvas
 * Date: 2019-01-20
 */
public class ResourceReaderSupplier implements ReaderSupplier {

    private final EncodedResource resource;

    public ResourceReaderSupplier(Resource resource) {
        this.resource = resource instanceof EncodedResource ? (EncodedResource) resource : new EncodedResource(resource);
    }

    @Override
    public Reader get() throws Exception {
        return resource.getReader();
    }

}
