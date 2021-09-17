[#ftl output_format="HTML" strip_whitespace=true]

[#-- Retrieves a translation that matches the given key from the
     .properties file. The output of this macro is also escaped.

     If no translation exists for the given key
     ??? + {key} + ??? is retured.
--]
[#macro retrieveTranslation key]
  [#local keyIfMissing = "???" + key + "???" /]
  [#compress]
    ${springMacroRequestContext.getMessage(key, keyIfMissing)}
  [/#compress]
[/#macro]

[#-- Retrieves a translation that matches the given key from the
     .properties file of the user's locale. The output of this macro
     is not escaped in comparison to the #retrieveTranslation macro above.

     If no translation exists for the given key
     ??? + {key} + ??? is retured.
--]
[#macro retrieveTranslationNoEsc key]
  [#local keyIfMissing = "???" + key + "???" /]
  [#compress]
    ${springMacroRequestContext.getMessage(key, keyIfMissing)?no_esc}
  [/#compress]
[/#macro]
