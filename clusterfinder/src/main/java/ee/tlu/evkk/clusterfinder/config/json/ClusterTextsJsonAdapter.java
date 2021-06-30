package ee.tlu.evkk.clusterfinder.config.json;

import com.google.gson.*;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

public class ClusterTextsJsonAdapter implements JsonDeserializer<Map< String, String >>
{
  private static final String WORD_TYPE_ANALYSIS = "wordTypeAnalysis";

  private static final String SYNTACTIC_ANALYSIS = "syntacticAnalysis";

  private static final String MORFOLOGICAL_ANALYSIS = "morfologicalAnalysis";

  private static final String MORFOSYNTACTIC_ANALYSIS = "morfosyntacticAnalysis";

  @Override
  public Map<String, String> deserialize( JsonElement json, Type typeOfT, JsonDeserializationContext context ) throws JsonParseException
  {
    Map< String, String > markupsToText = new HashMap<>();
    deserializeTexts( json, markupsToText, WORD_TYPE_ANALYSIS );
    deserializeTexts( json, markupsToText, SYNTACTIC_ANALYSIS );
    deserializeTexts( json, markupsToText, MORFOLOGICAL_ANALYSIS );
    deserializeTexts( json, markupsToText, MORFOSYNTACTIC_ANALYSIS );
    return markupsToText;
  }

  private void deserializeTexts( JsonElement json, Map < String, String > markupsToText, String elementKey )
  {
    JsonObject analysisObject = json.getAsJsonObject().get( elementKey ).getAsJsonObject();
    for( Map.Entry<String, JsonElement> entry : analysisObject.entrySet() )
    {
      markupsToText.putIfAbsent( entry.getKey(), entry.getValue().getAsString() );
    }
  }
}
