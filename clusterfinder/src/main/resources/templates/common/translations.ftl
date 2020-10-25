[#ftl]
[#import "/spring.ftl" as spring]

[#macro retrieveTranslation key]
  [#local keyIfMissing = "???" + key + "???" /]
  [@spring.messageText key keyIfMissing /]
[/#macro]
