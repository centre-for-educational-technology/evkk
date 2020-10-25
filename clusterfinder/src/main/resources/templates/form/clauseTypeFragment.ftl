[#ftl output_format="HTML"]
[#import "../common/inputs.ftl" as input]

<!-- Dropdown for clause types -->
<div id="clauseTypeSelectContainer" class="form-group hidden">
  [@input.createDropdown
      id="clauseTypeDropdown"
      name="clauseType"
      valuesMap=clauseTypes
      labelKey="clause.type.dropdown.label" /]
</div>

<!-- Additional options for clause types -->
<!-- Predicate additional options -->
<div class="clause-additionals-container" id="predicate">
  <div class="form-check">
    [@input.createCheckboxWithTooltip
        id="finitePredicate"
        name="clauseTypeAdditionals[]"
        labelKey="PREDICATE.finite.label"
        value="@FMV"
        tooltipKey="PREDICATE.finite.tooltip" /]
  </div>
  <div class="form-check">
    [@input.createCheckboxWithTooltip
        id="auxiliaryFinitePredicate"
        name="clauseTypeAdditionals[]"
        labelKey="PREDICATE.auxiliary.finite.label"
        value="@FCV"
        tooltipKey="PREDICATE.auxiliary.finite.tooltip" /]
  </div>
  <div class="form-check">
    [@input.createCheckboxWithTooltip
        id="nonFinitePredicate"
        name="clauseTypeAdditionals[]"
        labelKey="PREDICATE.non.finite.label"
        value="@IMV"
        tooltipKey="PREDICATE.non.finite.tooltip" /]
  </div>
  <div class="form-check">
    [@input.createCheckboxWithTooltip
        id="auxiliaryNonFinitePredicate"
        name="clauseTypeAdditionals[]"
        labelKey="PREDICATE.auxiliary.non.finite.label"
        value="@ICV"
        tooltipKey="PREDICATE.auxiliary.non.finite.tooltip" /]
  </div>
  <div class="form-check">
    [@input.createCheckboxWithTooltip
        id="negationPredicate"
        name="clauseTypeAdditionals[]"
        labelKey="PREDICATE.negation.label"
        value="@NEG"
        tooltipKey="PREDICATE.negation.tooltip" /]
  </div>
</div>


<!-- Quantifier additional options -->
<div class="clause-additionals-container" id="quantifier">
  <div class="form-check">
    [@input.createCheckboxWithTooltip
        id="quantifierAppositive"
        name="clauseTypeAdditionals[]"
        labelKey="QUANTIFIER.appositive.label"
        value="@Q>"
        tooltipKey="QUANTIFIER.appositive.tooltip" /]
  </div>
  <div class="form-check">
    [@input.createCheckboxWithTooltip
        id="quantifierPostposed"
        name="clauseTypeAdditionals[]"
        labelKey="QUANTIFIER.postposed.label"
        value="@<Q"
        tooltipKey="QUANTIFIER.postposed.tooltip" /]
  </div>
</div>

<!-- Preposition additional options -->
<div class="clause-additionals-container" id="preposition">
  <div class="form-check">
    [@input.createCheckboxWithTooltip
        id="prepositionAppositive"
        name="clauseTypeAdditionals[]"
        labelKey="PREPOSITION.appositive.label"
        value="@P>"
        tooltipKey="PREPOSITION.appositive.tooltip" /]
  </div>
  <div class="form-check">
    [@input.createCheckboxWithTooltip
        id="prepositionPostposed"
        name="clauseTypeAdditionals[]"
        labelKey="PREPOSITION.postposed.label"
        value="@<P"
        tooltipKey="PREPOSITION.postposed.tooltip" /]
  </div>
</div>

<!-- Attribute additional options -->
<div class="clause-additionals-container" id="attribute">
  <div class="form-check">
    [@input.createCheckboxWithTooltip
        id="atributeNounAppositive"
        name="clauseTypeAdditionals[]"
        labelKey="ATTRIBUTE.noun.appositive.label"
        value="@NN>"
        tooltipKey="ATTRIBUTE.noun.appositive.tooltip" /]
  </div>
  <div class="form-check">
    [@input.createCheckboxWithTooltip
        id="atributeNounPostposed"
        name="clauseTypeAdditionals[]"
        labelKey="ATTRIBUTE.noun.postposed.label"
        value="@<NN"
        tooltipKey="ATTRIBUTE.noun.postposed.tooltip" /]
  </div>
  <div class="form-check">
    [@input.createCheckboxWithTooltip
        id="atributeAdjectiveAppositive"
        name="clauseTypeAdditionals[]"
        labelKey="ATTRIBUTE.adjective.appositive.label"
        value="@AN>"
        tooltipKey="ATTRIBUTE.adjective.appositive.tooltip" /]
  </div>
  <div class="form-check">
    [@input.createCheckboxWithTooltip
        id="atributeAdjectivePostposed"
        name="clauseTypeAdditionals[]"
        labelKey="ATTRIBUTE.adjective.postposed.label"
        value="@<AN"
        tooltipKey="ATTRIBUTE.adjective.postposed.tooltip" /]
  </div>
  <div class="form-check">
    [@input.createCheckboxWithTooltip
        id="atributeAdverbAppositive"
        name="clauseTypeAdditionals[]"
        labelKey="ATTRIBUTE.adverb.appositive.label"
        value="@DN>"
        tooltipKey="ATTRIBUTE.adverb.appositive.tooltip" /]
  </div>
  <div class="form-check">
    [@input.createCheckboxWithTooltip
        id="atributeAdverbPostposed"
        name="clauseTypeAdditionals[]"
        labelKey="ATTRIBUTE.adverb.postposed.label"
        value="@<DN"
        tooltipKey="ATTRIBUTE.adverb.postposed.tooltip" /]
  </div>
  <div class="form-check">
    [@input.createCheckboxWithTooltip
        id="adpositionalPhraseAppositive"
        name="clauseTypeAdditionals[]"
        labelKey="ATTRIBUTE.adpositional.phrase.appositive.label"
        value="@KN>"
        tooltipKey="ATTRIBUTE.adpositional.phrase.appositive.tooltip" /]
  </div>
  <div class="form-check">
    [@input.createCheckboxWithTooltip
        id="adpositionalPhrasePostposed"
        name="clauseTypeAdditionals[]"
        labelKey="ATTRIBUTE.adpositional.phrase.postposed.label"
        value="@<KN"
        tooltipKey="ATTRIBUTE.adpositional.phrase.postposed.tooltip" /]
  </div>
  <div class="form-check">
    [@input.createCheckboxWithTooltip
        id="particibleAppositive"
        name="clauseTypeAdditionals[]"
        labelKey="ATTRIBUTE.particible.appositive.label"
        value="@VN>"
        tooltipKey="ATTRIBUTE.particible.appositive.tooltip" /]
  </div>
  <div class="form-check">
    [@input.createCheckboxWithTooltip
        id="particiblePostposed"
        name="clauseTypeAdditionals[]"
        labelKey="ATTRIBUTE.particible.postposed.label"
        value="@<VN"
        tooltipKey="ATTRIBUTE.particible.postposed.tooltip" /]
  </div>
  <div class="form-check">
    [@input.createCheckboxWithTooltip
        id="verbAppositive"
        name="clauseTypeAdditionals[]"
        labelKey="ATTRIBUTE.verb.appositive.label"
        value="@INFN>"
        tooltipKey="ATTRIBUTE.verb.appositive.tooltip" /]
  </div>
  <div class="form-check">
    [@input.createCheckboxWithTooltip
        id="verbPostposed"
        name="clauseTypeAdditionals[]"
        labelKey="ATTRIBUTE.verb.postposed.label"
        value="@<INFN"
        tooltipKey="ATTRIBUTE.verb.postposed.tooltip" /]
  </div>
</div>
