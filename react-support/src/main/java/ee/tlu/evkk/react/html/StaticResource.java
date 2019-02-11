package ee.tlu.evkk.react.html;

import java.util.Map;

/**
 * @author Mikk Tarvas
 * Date: 2019-01-11
 */
public class StaticResource {

    private String tagName;
    private CharSequence text;
    private Map<String, String> attributes;

    public String getTagName() {
        return tagName;
    }

    public void setTagName(String tagName) {
        this.tagName = tagName;
    }

    public CharSequence getText() {
        return text;
    }

    public void setText(CharSequence text) {
        this.text = text;
    }

    public Map<String, String> getAttributes() {
        return attributes;
    }

    public void setAttributes(Map<String, String> attributes) {
        this.attributes = attributes;
    }

}
