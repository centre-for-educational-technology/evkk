package ee.tlu.evkk.react.dialect;

import ee.tlu.evkk.react.html.StaticResource;
import ee.tlu.evkk.react.html.StaticResourceExtractor;
import org.springframework.util.StringUtils;
import org.thymeleaf.context.ITemplateContext;
import org.thymeleaf.engine.AttributeName;
import org.thymeleaf.model.*;
import org.thymeleaf.processor.element.AbstractAttributeTagProcessor;
import org.thymeleaf.processor.element.IElementTagStructureHandler;
import org.thymeleaf.templatemode.TemplateMode;

import java.util.List;

/**
 * @author Mikk Tarvas
 * Date: 2019-01-19
 */
abstract class AbstractReactProcessor extends AbstractAttributeTagProcessor {

    private static final String ATTRIBUTE_NAME = "data-react";
    private static final int PRECEDENCE = 10000;

    private final StaticResourceExtractor staticResourceExtractor;

    AbstractReactProcessor(String dialectPrefix, String elementName, StaticResourceExtractor staticResourceExtractor) {
        super(TemplateMode.HTML, dialectPrefix, elementName, false, ATTRIBUTE_NAME, false, PRECEDENCE, true);
        this.staticResourceExtractor = staticResourceExtractor;
    }

    @Override
    protected void doProcess(ITemplateContext context, IProcessableElementTag tag, AttributeName attributeName, String attributeValue, IElementTagStructureHandler structureHandler) {
        IModelFactory modelFactory = context.getModelFactory();
        IModel model = modelFactory.createModel();

        List<StaticResource> resources = getStaticResources(staticResourceExtractor);
        resources.forEach(resource -> {
            String tagName = resource.getTagName();

            IOpenElementTag openEvent = modelFactory.createOpenElementTag(tagName, resource.getAttributes(), AttributeValueQuotes.DOUBLE, false);
            model.add(openEvent);

            CharSequence text = resource.getText();
            if (StringUtils.hasText(text)) {
                IText textEvent = modelFactory.createText(text);
                model.add(textEvent);
            }

            ICloseElementTag closeEvent = modelFactory.createCloseElementTag(tagName);
            model.add(closeEvent);
        });

        structureHandler.replaceWith(model, false);
    }

    abstract List<StaticResource> getStaticResources(StaticResourceExtractor staticResourceExtractor);

}
