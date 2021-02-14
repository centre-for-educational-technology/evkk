[#ftl output_format="HTML"]
[#import "../common/inputs.ftl" as input]
[#import "../common/wordTypeOptions.ftl" as wordTypeOptions]
[#import "../common/translations.ftl" as translations]

[#-- Real options START --]
<div id="wordTypeAdditionals">
  <!-- Dropdown for word type selection -->
  <div id="wordTypeSelectContainer" class="form-group hidden">
    [@input.createDropdown
        id="wordTypeDropdown"
        name="wordType"
        valuesMap=wordTypes
        labelKey="word.type.dropdown.label" /]
  </div>

  <div class="additionals-container" data-group="V">
    <!-- Subtype -->
    <h5>[@translations.retrieveTranslation "common.sub.type.header" /]</h5>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id="verbSubTypeMain"
          name="VERB-subtype[]"
          labelKey="VERB.subtype.main.label"
          value="main"
          tooltipKey="VERB.subtype.main.tooltip" /]
    </div>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id="verbSubTypeAux"
          name="VERB-subtype[]"
          labelKey="VERB.subtype.aux.label"
          value="aux"
          tooltipKey="VERB.subtype.aux.tooltip" /]
    </div>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id="verbSubTypeMod"
          name="VERB-subtype[]"
          labelKey="VERB.subtype.mod.label"
          value="mod"
          tooltipKey="VERB.subtype.mod.tooltip" /]
    </div>

    <!-- Finite type -->
    <h5>[@translations.retrieveTranslation "common.finite.type.header" /]</h5>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id="verbFiniteTypeP"
          name="VERB-finitetype[]"
          labelKey="VERB.finite.type.p.label"
          value="VP"
          tooltipKey="VERB.finite.type.p.tooltip" /]
    </div>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id="verbFiniteTypeK"
          name="VERB-finitetype[]"
          labelKey="VERB.finite.type.k.label"
          value="VK"
          tooltipKey="VERB.finite.type.k.tooltip" /]
    </div>

    <!-- Finite type "VP" additional options -->
    <div class="hidden" data-subgroup="VP">
      <!-- Speech type -->
      <h5>[@translations.retrieveTranslation "common.speech.type.header" /]</h5>
      <div class="form-check">
        [@input.createCheckboxWithTooltip
            id="verbSpeechTypeAffirmative"
            name="VERB-speechtype[]"
            labelKey="VERB.speech.type.affirmative.label"
            value="indic"
            tooltipKey="VERB.speech.type.affirmative.tooltip" /]
      </div>
      <div class="form-check">
        [@input.createCheckboxWithTooltip
            id="verbSpeechTypeConditional"
            name="VERB-speechtype[]"
            labelKey="VERB.speech.type.conditional.label"
            value="cond"
            tooltipKey="VERB.speech.type.conditional.tooltip" /]
      </div>
      <div class="form-check">
        [@input.createCheckboxWithTooltip
            id="verbSpeechTypeImperative"
            name="VERB-speechtype[]"
            labelKey="VERB.speech.type.imperative.label"
            value="imper"
            tooltipKey="VERB.speech.type.imperative.tooltip" /]
      </div>
      <div class="form-check">
        [@input.createCheckboxWithTooltip
            id="verbSpeechTypeQuoting"
            name="VERB-speechtype[]"
            labelKey="VERB.speech.type.quoting.label"
            value="quot"
            tooltipKey="VERB.speech.type.quoting.tooltip" /]
      </div>

      <!-- Time tense type -->
      <h5>[@translations.retrieveTranslation "common.time.tense.type.header" /]</h5>
      <div class="form-check">
        [@input.createCheckboxWithTooltip
            id="verbTimeTypePresent"
            name="VERB-timetype[]"
            labelKey="VERB.time.tense.type.present.label"
            value="pres"
            tooltipKey="VERB.time.tense.type.present.tooltip" /]
      </div>
      <div class="form-check">
        [@input.createCheckboxWithTooltip
            id="verbTimeTypeImpf"
            name="VERB-timetype[]"
            labelKey="VERB.time.tense.type.impf.label"
            value="impf"
            tooltipKey="VERB.time.tense.type.impf.tooltip" /]
      </div>
      <div class="form-check">
        [@input.createCheckboxWithTooltip
            id="verbTimeTypePast"
            name="VERB-timetype[]"
            labelKey="VERB.time.tense.type.past.label"
            value="past"
            tooltipKey="VERB.time.tense.type.past.tooltip" /]
      </div>

      <!-- Voice type -->
      <h5>[@translations.retrieveTranslation "common.voice.type.header" /]</h5>
      <div class="form-check">
        [@input.createCheckboxWithTooltip
            id="verbVoiceTypePs"
            name="VERB-voicetype[]"
            labelKey="VERB.voice.type.ps.label"
            value="ps"
            tooltipKey="VERB.voice.type.ps.tooltip" /]
      </div>
      <div class="form-check">
        [@input.createCheckboxWithTooltip
            id="verbVoiceTypeImps"
            name="VERB-voicetype[]"
            labelKey="VERB.voice.type.imps.label"
            value="imps"
            tooltipKey="VERB.voice.type.imps.tooltip" /]
      </div>

      <!-- Perspective type -->
      [@wordTypeOptions.createPerspectiveTypeOptions wordType="VERB" /]

      <!-- Plural type -->
      [@wordTypeOptions.createPluralTypeOptions wordType="VERB" /]

      <!-- Speech subtype -->
      <h5>[@translations.retrieveTranslation "common.speech.subtype.header" /]</h5>
      <div class="form-check">
        [@input.createCheckboxWithTooltip
            id="verbSpeechSubTypeAffirmative"
            name="VERB-speechsubtype[]"
            labelKey="VERB.speech.subtype.affirmative.label"
            value="af"
            tooltipKey="VERB.speech.subtype.affirmative.tooltip" /]
      </div>
      <div class="form-check">
        [@input.createCheckboxWithTooltip
            id="verbSpeechSubTypeNegative"
            name="VERB-speechsubtype[]"
            labelKey="VERB.speech.subtype.negative.label"
            value="neg"
            tooltipKey="VERB.speech.subtype.negative.tooltip" /]
      </div>
    </div>

    <!-- Finite type "VK" additional options -->
    <div data-subgroup="VK">
      <!-- VK sub type options -->
      <div class="form-check">
        [@input.createCheckboxWithTooltip
            id="verbSubTypeVKInf"
            name="VERB-subtypeVK[]"
            labelKey="VERB.subtype.vk.inf.label"
            value="inf"
            tooltipKey="VERB.subtype.vk.inf.tooltip" /]
      </div>
      <div class="form-check">
        [@input.createCheckboxWithTooltip
            id="verbSubTypeVKGer"
            name="VERB-subtypeVK[]"
            labelKey="VERB.subtype.vk.ger.label"
            value="get"
            tooltipKey="VERB.subtype.vk.ger.tooltip" /]
      </div>
      <div class="form-check">
        [@input.createCheckboxWithTooltip
            id="verbSubTypeVKPartic"
            name="VERB-subtypeVK[]"
            labelKey="VERB.subtype.vk.partic.label"
            value="partic"
            tooltipKey="VERB.subtype.vk.partic.tooltip" /]
      </div>
      <div class="form-check">
        [@input.createCheckboxWithTooltip
            id="verbSubTypeVKSup"
            name="VERB-subtypeVK[]"
            labelKey="VERB.subtype.vk.sup.label"
            value="sup"
            tooltipKey="VERB.subtype.vk.sup.tooltip" /]
      </div>

      <!-- Partic additional options -->
      <div class="hidden" id="verbSubTypeVKParticAdditionals">
        <div class="form-check">
          [@input.createCheckboxWithTooltip
              id="verbSubTypeVKParticPastPs"
              name="VERB-subtypeVKPartic[]"
              labelKey="VERB.subtype.vk.partic.past.ps.label"
              value="past ps"
              tooltipKey="VERB.subtype.vk.partic.past.ps.tooltip" /]
        </div>
        <div class="form-check">
          [@input.createCheckboxWithTooltip
              id="verbSubTypeVKParticPastImps"
              name="VERB-subtypeVKPartic[]"
              labelKey="VERB.subtype.vk.partic.past.imps.label"
              value="past imps"
              tooltipKey="VERB.subtype.vk.partic.past.imps.tooltip" /]
        </div>
      </div>

      <!-- Sup additional options -->
      <div class="hidden" id="verbSubTypeVKSupAdditionals">
        <div class="form-check">
          [@input.createCheckboxWithTooltip
              id="verbSubTypeVKSupPsIll"
              name="VERB-subtypeVKSup[]"
              labelKey="VERB.subtype.vk.sup.ps.ill.label"
              value="ps ill"
              tooltipKey="VERB.subtype.vk.sup.ps.ill.tooltip" /]
        </div>
        <div class="form-check">
          [@input.createCheckboxWithTooltip
              id="verbSubTypeVKSupPsIn"
              name="VERB-subtypeVKSup[]"
              labelKey="VERB.subtype.vk.sup.ps.in.label"
              value="ps in"
              tooltipKey="VERB.subtype.vk.sup.ps.in.tooltip" /]
        </div>
        <div class="form-check">
          [@input.createCheckboxWithTooltip
              id="verbSubTypeVKSupPsEl"
              name="VERB-subtypeVKSup[]"
              labelKey="VERB.subtype.vk.sup.ps.el.label"
              value="ps el"
              tooltipKey="VERB.subtype.vk.sup.ps.el.tooltip" /]
        </div>
        <div class="form-check">
          [@input.createCheckboxWithTooltip
              id="verbSubTypeVKSupPsTr"
              name="VERB-subtypeVKSup[]"
              labelKey="VERB.subtype.vk.sup.ps.tr.label"
              value="ps tr"
              tooltipKey="VERB.subtype.vk.sup.ps.tr.tooltip" /]
        </div>
        <div class="form-check">
          [@input.createCheckboxWithTooltip
              id="verbSubTypeVKSupPsAb"
              name="VERB-subtypeVKSup[]"
              labelKey="VERB.subtype.vk.sup.ps.ab.label"
              value="ps ab"
              tooltipKey="VERB.subtype.vk.sup.ps.ab.tooltip" /]
        </div>
        <div class="form-check">
          [@input.createCheckboxWithTooltip
              id="verbSubTypeVKSupImps"
              name="VERB-subtypeVKSup[]"
              labelKey="VERB.subtype.vk.sup.imps.label"
              value="imps"
              tooltipKey="VERB.subtype.vk.sup.imps.tooltip" /]
        </div>
      </div>
    </div>
  </div>

  <div class="additionals-container" data-group="S">
    <h5>[@translations.retrieveTranslation "common.sub.type.header" /]</h5>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id="subjectSubTypeGeneral"
          name="SUBJECT-subtype[]"
          labelKey="SUBJECT.subtype.general.label"
          value="com"
          tooltipKey="SUBJECT.subtype.general.tooltip" /]
    </div>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id="subjectSubTypeReal"
          name="SUBJECT-subtype[]"
          labelKey="SUBJECT.subtype.real.label"
          value="prop"
          tooltipKey="SUBJECT.subtype.real.tooltip" /]
    </div>

    <!-- Plural type -->
    [@wordTypeOptions.createPluralTypeOptions wordType="SUBJECT" /]

    <!-- Case type -->
    [@wordTypeOptions.createCaseTypeOptions wordType="SUBJECT" /]
  </div>

  <div class="additionals-container" data-group="A">
    <!-- Subtype -->
    <h5>[@translations.retrieveTranslation "common.sub.type.header" /]</h5>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id="adjectiveSubTypeA"
          name="ADJECTIVE-subtype[]"
          labelKey="ADJECTIVE.subtype.a.label"
          value="A"
          tooltipKey="ADJECTIVE.subtype.a.tooltip" /]
    </div>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id="adjectiveSubTypeG"
          name="ADJECTIVE-subtype[]"
          labelKey="ADJECTIVE.subtype.g.label"
          value="G"
          tooltipKey="ADJECTIVE.subtype.g.tooltip" /]
    </div>

    <!-- Step type -->
    <div id="adjectiveSubTypeAdditionals">
      <h5>[@translations.retrieveTranslation "common.step.type.header" /]</h5>
      <div class="form-check">
        [@input.createCheckboxWithTooltip
            id="adjectiveStepTypePos"
            name="ADJECTIVE-stepType[]"
            labelKey="ADJECTIVE.step.type.pos.label"
            value="pos"
            tooltipKey="ADJECTIVE.step.type.pos.tooltip" /]
      </div>
      <div class="form-check">
        [@input.createCheckboxWithTooltip
            id="adjectiveStepTypeComp"
            name="ADJECTIVE-stepType[]"
            labelKey="ADJECTIVE.step.type.comp.label"
            value="comp"
            tooltipKey="ADJECTIVE.step.type.comp.tooltip" /]
      </div>
      <div class="form-check">
        [@input.createCheckboxWithTooltip
            id="adjectiveStepTypeSuper"
            name="ADJECTIVE-stepType[]"
            labelKey="ADJECTIVE.step.type.super.label"
            value="super"
            tooltipKey="ADJECTIVE.step.type.super.tooltip" /]
      </div>

      <!-- Plural type -->
      [@wordTypeOptions.createPluralTypeOptions wordType="ADJECTIVE" /]

      <!-- Case type -->
      [@wordTypeOptions.createCaseTypeOptions wordType="ADJECTIVE" /]
    </div>
  </div>

  <div class="additionals-container" data-group="P">
    <!-- Subtype -->
    <h5>[@translations.retrieveTranslation "common.sub.type.header" /]</h5>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id="pronounSubTypePers"
          name="PRONOUN-subtype[]"
          labelKey="PRONOUN.subtype.pers.label"
          value="pers"
          tooltipKey="PRONOUN.subtype.pers.tooltip" /]
    </div>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id="pronounSubTypeRefl"
          name="PRONOUN-subtype[]"
          labelKey="PRONOUN.subtype.refl.label"
          value="refl"
          tooltipKey="PRONOUN.subtype.refl.tooltip" /]
    </div>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id="pronounSubTypeRec"
          name="PRONOUN-subtype[]"
          labelKey="PRONOUN.subtype.rec.label"
          value="rec"
          tooltipKey="PRONOUN.subtype.rec.tooltip" /]
    </div>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id="pronounSubTypePos"
          name="PRONOUN-subtype[]"
          labelKey="PRONOUN.subtype.pos.label"
          value="pos"
          tooltipKey="PRONOUN.subtype.pos.tooltip" /]
    </div>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id="pronounSubTypeDem"
          name="PRONOUN-subtype[]"
          labelKey="PRONOUN.subtype.dem.label"
          value="dem"
          tooltipKey="PRONOUN.subtype.dem.tooltip" /]
    </div>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id="pronounSubTypeInterRel"
          name="PRONOUN-subtype[]"
          labelKey="PRONOUN.subtype.inter.rel.label"
          value="inter rel"
          tooltipKey="PRONOUN.subtype.inter.rel.tooltip" /]
    </div>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id="pronounSubTypeDet"
          name="PRONOUN-subtype[]"
          labelKey="PRONOUN.subtype.det.label"
          value="det"
          tooltipKey="PRONOUN.subtype.det.tooltip" /]
    </div>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id="pronounSubTypeIndef"
          name="PRONOUN-subtype[]"
          labelKey="PRONOUN.subtype.indef.label"
          value="indef"
          tooltipKey="PRONOUN.subtype.indef.tooltip" /]
    </div>

    <!-- Plural type -->
    [@wordTypeOptions.createPluralTypeOptions wordType="PRONOUN" /]

    <!-- Case type -->
    [@wordTypeOptions.createCaseTypeOptions wordType="PRONOUN" /]

    <div id="pronounSubTypeAdditionals">
      <!-- Perspective type -->
      [@wordTypeOptions.createPerspectiveTypeOptions wordType="PRONOUN" /]
    </div>
  </div>

  <div class="additionals-container" data-group="N">
    <!-- Subtype -->
    <h5>[@translations.retrieveTranslation "common.sub.type.header" /]</h5>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id="numeralSubTypeCard"
          name="NUMERAL-subtype[]"
          labelKey="NUMERAL.subtype.card.label"
          value="card"
          tooltipKey="NUMERAL.subtype.card.tooltip" /]
    </div>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id="numeralSubTypeOrd"
          name="NUMERAL-subtype[]"
          labelKey="NUMERAL.subtype.ord.label"
          value="ord"
          tooltipKey="NUMERAL.subtype.ord.tooltip" /]
    </div>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id="numeralSubTypeDigit"
          name="NUMERAL-subtype[]"
          labelKey="NUMERAL.subtype.digit.label"
          value="digit"
          tooltipKey="NUMERAL.subtype.digit.tooltip" /]
    </div>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id="numeralSubTypeRoman"
          name="NUMERAL-subtype[]"
          labelKey="NUMERAL.subtype.roman.label"
          value="roman"
          tooltipKey="NUMERAL.subtype.roman.tooltip" /]
    </div>

    <div id="numeralSubTypeAdditionals">
      <!-- Plural type -->
      [@wordTypeOptions.createPluralTypeOptions wordType="NUMERAL" /]

      <!-- Case type -->
      [@wordTypeOptions.createCaseTypeOptions wordType="NUMERAL" /]
    </div>
  </div>

  <div class="additionals-container" data-group="K">
    <!-- Subtype -->
    <h5>[@translations.retrieveTranslation "common.sub.type.header" /]</h5>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id="adpositionSubTypePost"
          name="ADPOSITION-subtype[]"
          labelKey="ADPOSITION.subtype.post.label"
          value="post"
          tooltipKey="ADPOSITION.subtype.post.tooltip" /]
    </div>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id="adpositionSubTypePrep"
          name="ADPOSITION-subtype[]"
          labelKey="ADPOSITION.subtype.prep.label"
          value="sub"
          tooltipKey="ADPOSITION.subtype.prep.tooltip" /]
    </div>
  </div>

  <div class="additionals-container" data-group="J">
    <!-- Subtype -->
    <h5>[@translations.retrieveTranslation "common.sub.type.header" /]</h5>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id="conjunctionSubTypeCoord"
          name="CONJUNCTION-subtype[]"
          labelKey="CONJUNCTION.subtype.coord.label"
          value="coord"
          tooltipKey="CONJUNCTION.subtype.coord.tooltip" /]
    </div>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id="conjunctionSubTypeSub"
          name="CONJUNCTION-subtype[]"
          labelKey="CONJUNCTION.subtype.sub.label"
          value="sub"
          tooltipKey="CONJUNCTION.subtype.sub.tooltip" /]
    </div>
  </div>

  <div class="additionals-container" data-group="Z">
    <!-- Sub type (Symbol for punctuation) -->
    <h5>[@translations.retrieveTranslation "common.symbol.header" /]</h5>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id="punctuationSymbolFullStop"
          name="PUNCTUATION-subtype[]"
          labelKey="PUNCTUATION.subtype.full.stop"
          value="Fst"
          tooltipKey="PUNCTUATION.subtype.full.stop.tooltip" /]
    </div>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id="punctuationSymbolComma"
          name="PUNCTUATION-subtype[]"
          labelKey="PUNCTUATION.subtype.comma"
          value="Com"
          tooltipKey="PUNCTUATION.subtype.comma.tooltip" /]
    </div><div class="form-check">
      [@input.createCheckboxWithTooltip
          id="punctuationSymbolExclamationMark"
          name="PUNCTUATION-subtype[]"
          labelKey="PUNCTUATION.subtype.exclamation.mark"
          value="Exc"
          tooltipKey="PUNCTUATION.subtype.exclamation.mark.tooltip" /]
    </div>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id="punctuationSymbolQuestionMark"
          name="PUNCTUATION-subtype[]"
          labelKey="PUNCTUATION.subtype.question.mark"
          value="Int"
          tooltipKey="PUNCTUATION.subtype.question.mark.tooltip" /]
    </div>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id="punctuationSymbolDash"
          name="PUNCTUATION-subtype[]"
          labelKey="PUNCTUATION.subtype.dash"
          value="Dsh"
          tooltipKey="PUNCTUATION.subtype.dash.tooltip" /]
    </div>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id="punctuationSymbolColon"
          name="PUNCTUATION-subtype[]"
          labelKey="PUNCTUATION.subtype.colon"
          value="Col"
          tooltipKey="PUNCTUATION.subtype.colon.tooltip" /]
    </div>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id="punctuationSymbolSemiColon"
          name="PUNCTUATION-subtype[]"
          labelKey="PUNCTUATION.subtype.semicolon"
          value="Scl"
          tooltipKey="PUNCTUATION.subtype.semicolon.tooltip" /]
    </div>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id="punctuationSymbolOpeningBracket"
          name="PUNCTUATION-subtype[]"
          labelKey="PUNCTUATION.subtype.opening.bracket"
          value="Opr"
          tooltipKey="PUNCTUATION.subtype.opening.bracket.tooltip" /]
    </div>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id="punctuationSymbolClosingBracket"
          name="PUNCTUATION-subtype[]"
          labelKey="PUNCTUATION.subtype.closing.bracket"
          value="Cpr"
          tooltipKey="PUNCTUATION.subtype.closing.bracket.tooltip" /]
    </div>
    <div class="form-check">
      [@input.createCheckboxWithTooltip
          id="punctuationSymbolQuote"
          name="PUNCTUATION-subtype[]"
          labelKey="PUNCTUATION.subtype.quote"
          value="Quo"
          tooltipKey="PUNCTUATION.subtype.quote.tooltip" /]
    </div>
  </div>
</div>
[#-- Real options END --]
