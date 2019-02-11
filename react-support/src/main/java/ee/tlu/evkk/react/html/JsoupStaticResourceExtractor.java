package ee.tlu.evkk.react.html;

import ee.tlu.evkk.react.io.ReaderSupplier;
import org.apache.commons.io.IOUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Attributes;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @author Mikk Tarvas
 * Date: 2019-01-11
 */
public class JsoupStaticResourceExtractor implements StaticResourceExtractor {

    private final ReaderSupplier htmlSource;

    public JsoupStaticResourceExtractor(ReaderSupplier htmlSource) {
        this.htmlSource = htmlSource;
    }

    private Document readDocument() {
        try {
            String asString = IOUtils.toString(htmlSource.get());
            return Jsoup.parse(asString);
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }

    private List<StaticResource> toStaticResourceList(List<Element> elements) {
        return elements.stream().map(this::toStaticResource).collect(Collectors.toList());
    }

    private StaticResource toStaticResource(Element element) {
        StaticResource staticResource = new StaticResource();
        staticResource.setTagName(element.tagName());
        staticResource.setText(element.html());
        staticResource.setAttributes(toAttributeMap(element.attributes()));
        return staticResource;
    }

    private Map<String, String> toAttributeMap(Attributes attributes) {
        HashMap<String, String> result = new HashMap<>();
        attributes.forEach(attribute -> result.put(attribute.getKey(), attribute.getValue()));
        return result;
    }

    @Override
    public List<StaticResource> getScripts() {
        Elements elements = readDocument().getElementsByTag("script");
        return toStaticResourceList(elements);
    }

    @Override
    public List<StaticResource> getStyles() {
        List<Element> elements = readDocument().getElementsByTag("link").stream().filter(element -> element.attr("rel").equalsIgnoreCase("stylesheet")).collect(Collectors.toList());
        return toStaticResourceList(elements);
    }
}