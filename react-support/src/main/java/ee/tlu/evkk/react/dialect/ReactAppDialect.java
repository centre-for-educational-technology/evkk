package ee.tlu.evkk.react.dialect;

import ee.tlu.evkk.react.html.StaticResourceExtractor;
import org.thymeleaf.dialect.AbstractProcessorDialect;
import org.thymeleaf.processor.IProcessor;

import java.util.HashSet;
import java.util.Set;

/**
 * @author Mikk Tarvas
 * Date: 2019-01-19
 */
public class ReactAppDialect extends AbstractProcessorDialect {

    private static final String NAME = "CRA";
    private static final String PREFIX = "react";
    private static final int PROCESSOR_PRECEDENCE = 1000;

    private final StaticResourceExtractor staticResourceExtractor;

    public ReactAppDialect(StaticResourceExtractor staticResourceExtractor) {
        super(NAME, PREFIX, PROCESSOR_PRECEDENCE);
        this.staticResourceExtractor = staticResourceExtractor;
    }

    @Override
    public Set<IProcessor> getProcessors(String dialectPrefix) {
        final Set<IProcessor> processors = new HashSet<>();
        processors.add(new ScriptElementProcessor(dialectPrefix, staticResourceExtractor));
        processors.add(new StylesheetLinkProcessor(dialectPrefix, staticResourceExtractor));
        return processors;
    }

}