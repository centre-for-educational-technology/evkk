[#ftl]
[#import "translations.ftl" as translations]
[#import "inputs.ftl" as input]

[#--
  This file contains common macros for generating word type specific
  form addtional options. A word type must be provided for each macro
  otherwise nothing is returned from the macro.
--]

[#macro createPluralTypeOptions wordType]
  [#if wordType?has_content]
    <h5>[@translations.retrieveTranslation "common.plural.type.header" /]</h5>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id=wordType + "pluralTypeSingle"
          name=wordType + "-pluralType[]"
          labelKey= "plural.type.single.label"
          value="sg"
          tooltipKey=wordType + ".plural.type.single.tooltip" /]
    </div>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id=wordType + "pluralTypeMultiple"
          name=wordType + "-pluralType[]"
          labelKey="plural.type.multiple.label"
          value="pl"
          tooltipKey=wordType + ".plural.type.multiple.tooltip" /]
    </div>
  [/#if]
[/#macro]

[#macro createPerspectiveTypeOptions wordType]
  [#if wordType?has_content]
    <h5>[@translations.retrieveTranslation "common.perspective.type.header" /]</h5>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id=wordType + "prespectiveTypePs1"
          name=wordType + "-perspectivetype[]"
          labelKey="perspective.type.ps1.label"
          value="ps1"
          tooltipKey=wordType + ".perspective.type.ps1.tooltip" /]
    </div>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id=wordType + "prespectiveTypePs2"
          name=wordType + "-perspectivetype[]"
          labelKey="perspective.type.ps2.label"
          value="ps2"
          tooltipKey=wordType + ".perspective.type.ps2.tooltip" /]
    </div>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id=wordType + "prespectiveTypePs3"
          name=wordType + "-perspectivetype[]"
          labelKey="perspective.type.ps3.label"
          value="ps3"
          tooltipKey=wordType + ".perspective.type.ps3.tooltip" /]
    </div>
  [/#if]
[/#macro]

[#macro createCaseTypeOptions wordType]
  [#if wordType?has_content]
    <h5>[@translations.retrieveTranslation "common.case.type.header" /]</h5>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id=wordType + "caseTypeNom"
          name=wordType + "-casetype[]"
          labelKey="case.type.nom.label"
          value="nom"
          tooltipKey=wordType + ".case.type.nom.tooltip" /]
    </div>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id=wordType + "caseTypeGen"
          name=wordType + "-casetype[]"
          labelKey="case.type.gen.label"
          value="gen"
          tooltipKey=wordType + ".case.type.part.tooltip" /]
    </div>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id=wordType + "caseTypePart"
          name=wordType + "-casetype[]"
          labelKey="case.type.part.label"
          value="part"
          tooltipKey=wordType + ".case.type.part.tooltip" /]
    </div>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id=wordType + "caseTypeAdit"
          name=wordType + "-casetype[]"
          labelKey="case.type.adit.label"
          value="adit"
          tooltipKey=wordType + ".case.type.adit.tooltip" /]
    </div>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id=wordType + "caseTypeIll"
          name=wordType + "-casetype[]"
          labelKey="case.type.ill.label"
          value="ill"
          tooltipKey=wordType + ".case.type.ill.tooltip" /]
    </div>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id=wordType + "caseTypeIn"
          name=wordType + "-casetype[]"
          labelKey="case.type.in.label"
          value="in"
          tooltipKey=wordType + ".case.type.in.tooltip" /]
    </div>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id=wordType + "caseTypeEl"
          name=wordType + "-casetype[]"
          labelKey="case.type.el.label"
          value="el"
          tooltipKey=wordType + ".case.type.el.tooltip" /]
    </div>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id=wordType + "caseTypeAll"
          name=wordType + "-casetype[]"
          labelKey="case.type.all.label"
          value="all"
          tooltipKey=wordType + ".case.type.all.tooltip" /]
    </div>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id=wordType + "caseTypeAd"
          name=wordType + "-casetype[]"
          labelKey="case.type.ad.label"
          value="ad"
          tooltipKey=wordType + ".case.type.ad.tooltip" /]
    </div>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id=wordType + "caseTypeAbl"
          name=wordType + "-casetype[]"
          labelKey="case.type.abl.label"
          value="abl"
          tooltipKey=wordType + ".case.type.abl.tooltip" /]
    </div>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id=wordType + "caseTypeTr"
          name=wordType + "-casetype[]"
          labelKey="case.type.tr.label"
          value="tr"
          tooltipKey=wordType + ".case.type.tr.tooltip" /]
    </div>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id=wordType + "caseTypeTerm"
          name=wordType + "-casetype[]"
          labelKey="case.type.term.label"
          value="term"
          tooltipKey=wordType + ".case.type.term.tooltip" /]
    </div>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id=wordType + "caseTypeEss"
          name=wordType + "-casetype[]"
          labelKey="case.type.ess.label"
          value="ess"
          tooltipKey=wordType + ".case.type.ess.tooltip" /]
    </div>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id=wordType + "caseTypeAbes"
          name=wordType + "-casetype[]"
          labelKey="case.type.abes.label"
          value="abes"
          tooltipKey=wordType + ".case.type.abes.tooltip" /]
    </div>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id=wordType + "caseTypeKom"
          name=wordType + "-casetype[]"
          labelKey="case.type.kom.label"
          value="kom"
          tooltipKey=wordType + ".case.type.kom.tooltip" /]
    </div>
  [/#if]
[/#macro]
