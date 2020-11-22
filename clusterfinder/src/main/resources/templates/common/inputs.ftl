[#ftl output_format="HTML"]
[#import "translations.ftl" as translations]

[#-- Creates a checkbox input element with the following parameters:
    * id - id of the input element
    * name - name of the input element
    * labelKey - label to show beside the input element (must be a translation key)
    * value - value of the input element
    * tooltipKey - optional, when present adds a tooltip, which is displayed when hovering over the element
--]
[#macro createCheckbox id name labelKey value tooltipKey=""]
  <input class="form-check-input" type="checkbox" id="${id!}" name="${name!}" value="${value!true?c}">
  <label class="form-check-label"
         for="${id!}"
         [#if tooltipKey?has_content]
         data-toggle="tooltip"
         data-placement="right"
         title="[@translations.retrieveTranslation tooltipKey /]"
         [/#if]
  >[@translations.retrieveTranslation labelKey /]</label>
[/#macro]

[#macro createCheckboxWithTooltip id name labelKey tooltipKey value="true"]
  [@createCheckbox id name labelKey value tooltipKey /]
[/#macro]

[#-- Creates a dropdonw input element with the following parameters:
    * id - id of the input element
    * name - name of the input element
    * labelKey - label to show above the input element (must be a translation key)
    * valuesMap - a map of elements (mandatory parameter)
--]
[#macro createDropdown id name valuesMap labelKey]
  [#if valuesMap?has_content]
    <label class="label-w-top-margin" for="${id!}">[@translations.retrieveTranslation labelKey /]</label>
    <select class="form-control" id="${id!}" name="${name!}">
      [#list valuesMap as value, valueLabel]
        <option value="${value}">[@translations.retrieveTranslation "${valueLabel}" /]</option>
      [/#list]
    </select>
  [/#if]
[/#macro]
