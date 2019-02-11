package ee.tlu.evkk.react.html;

import java.util.Collections;
import java.util.List;

/**
 * @author Mikk Tarvas
 * Date: 2019-01-19
 */
public class CachedStaticResourceExtractor implements StaticResourceExtractor {

    private final Object lock = new Object();
    private final StaticResourceExtractor delegate;
    private volatile boolean loaded;
    private List<StaticResource> scripts;
    private List<StaticResource> styles;

    public CachedStaticResourceExtractor(StaticResourceExtractor delegate) {
        this.delegate = delegate;
    }

    private void loadIfNeeded() {
        if (!loaded) {
            synchronized (lock) {
                if (!loaded) {
                    this.scripts = Collections.unmodifiableList(delegate.getScripts());
                    this.styles = Collections.unmodifiableList(delegate.getStyles());
                    loaded = true;
                }
            }
        }
    }

    @Override
    public List<StaticResource> getScripts() {
        this.loadIfNeeded();
        return scripts;
    }

    @Override
    public List<StaticResource> getStyles() {
        this.loadIfNeeded();
        return styles;
    }

}
