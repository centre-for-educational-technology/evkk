package ee.tlu.evkk.react.html;

import java.util.List;

/**
 * @author Mikk Tarvas
 * Date: 2019-01-11
 */
public interface StaticResourceExtractor {

    List<StaticResource> getScripts();

    List<StaticResource> getStyles();

}
