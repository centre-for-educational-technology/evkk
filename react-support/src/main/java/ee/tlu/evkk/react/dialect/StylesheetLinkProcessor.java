package ee.tlu.evkk.react.dialect;

import ee.tlu.evkk.react.html.StaticResource;
import ee.tlu.evkk.react.html.StaticResourceExtractor;

import java.util.List;

/**
 * @author Mikk Tarvas
 * Date: 2019-01-19
 */
public class StylesheetLinkProcessor extends AbstractReactProcessor {

    private static final String ELEMENT_NAME = "link";

    public StylesheetLinkProcessor(String dialectPrefix, StaticResourceExtractor staticResourceExtractor) {
        super(dialectPrefix, ELEMENT_NAME, staticResourceExtractor);
    }

    @Override
    List<StaticResource> getStaticResources(StaticResourceExtractor staticResourceExtractor) {
        return staticResourceExtractor.getStyles();
    }

}