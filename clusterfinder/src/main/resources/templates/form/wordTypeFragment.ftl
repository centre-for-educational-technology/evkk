[#ftl output_format="HTML"]

[#-- START: Macros for reducing duplication for rendering logic --]
[#-- TODO: Try to separate into another file (currently caused by including logic) --]
[#macro createPluralTypeOptions wordType]
  [#if wordType?has_content]
    <h5>Arv</h5>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="${wordType!}pluralTypeSingle" name="${wordType!}-pluralType[]" value="sg" />
      <label class="form-check-label" for="${wordType!}pluralTypeSingle">Ainsus</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="${wordType!}pluralTypeMultiple" name="${wordType!}-pluralType[]" value="pl" />
      <label class="form-check-label" for="${wordType!}pluralTypeMultiple">Mitmus</label>
    </div>
  [/#if]
[/#macro]

[#macro createCaseTypeOptions wordType]
  [#if wordType?has_content]
    <h5>Kääne</h5>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="${wordType!}caseTypeNom" name="${wordType!}casetype[]" value="nom" />
      <label class="form-check-label" for="${wordType!}caseTypeNom">Nimetav</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="${wordType!}caseTypeGen" name="${wordType!}casetype[]" value="gen" />
      <label class="form-check-label" for="${wordType!}caseTypeGen">Omastav</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="${wordType!}caseTypePart" name="${wordType!}casetype[]" value="part" />
      <label class="form-check-label" for="${wordType!}caseTypePart">Osastav</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="${wordType!}caseTypeAdit" name="${wordType!}casetype[]" value="adit" />
      <label class="form-check-label" for="${wordType!}caseTYpeAdit">Lühike sisseütlev</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="${wordType!}caseTypeIll" name="${wordType!}casetype[]" value="ill" />
      <label class="form-check-label" for="${wordType!}caseTypeIll">Sisseütlev</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="${wordType!}caseTypeIn" name="${wordType!}casetype[]" value="in" />
      <label class="form-check-label" for="${wordType!}caseTypeIn">Seesütlev</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="${wordType!}caseTypeEl" name="${wordType!}casetype[]" value="el" />
      <label class="form-check-label" for="${wordType!}caseTypeEl">Seestütlev</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="${wordType!}caseTypeAll" name="${wordType!}'-casetype[]'" value="all" />
      <label class="form-check-label" for="${wordType!}caseTypeAll">Alaleütlev</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="${wordType!}caseTypeAd" name="${wordType!}casetype[]" value="ad" />
      <label class="form-check-label" for="${wordType!}caseTypeAd">Alalütlev</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="${wordType!}caseTypeAbl" name="${wordType!}caseType[]" value="abl" />
      <label class="form-check-label" for="${wordType!}caseTypeAbl">Alaltütlev</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="${wordType!}caseTypeTr" name="${wordType!}casetype[]" value="tr" />
      <label class="form-check-label" for="${wordType!}caseTypeTr">Saav</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="${wordType!}caseTypeTerm" name="${wordType!}casetype[]" value="term" />
      <label class="form-check-label" for="${wordType!}caseTypeTerm">Rajav</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="${wordType!}caseTypeEss" name="${wordType!}casetype[]" value="ess" />
      <label class="form-check-label" for="${wordType!}caseTypeEss">Olev</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="${wordType!}caseTypeAbes" name="${wordType!}casetype[]" value="abes" />
      <label class="form-check-label" for="${wordType!}caseTypeAbes">Ilmaütlev</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="${wordType!}caseTypeKom" name="${wordType!}casetype[]" value="kom" />
      <label class="form-check-label" for="${wordType!}caseTypeKom">Kaasaütlev</label>
    </div>
  [/#if]
[/#macro]
[#-- END --]

[#-- Real options START --]
<div id="wordTypeAdditionals">
  <!-- Dropdown for word type selection -->
  <div id="wordTypeSelectContainer" class="form-group" style="display: none">
    <label for="wordtypeDropdown">Valige Sõnaliik</label>
    <select class="form-control" id="wordtypeDropdown" name="wordType">
      <option value="All">Kõik</option>
      [#list wordTypes as wordTypeValue, wordTypeLabel]
        <option value="${wordTypeValue!}">${wordTypeLabel!}</option>
      [/#list]
    </select>
  </div>

  <div class="additionals-container" data-group="V">
    <!-- Subtype -->
    <h5>Liik</h5>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="verbSubTypeMain" name="VERB-subtype[]" value="V main" />
      <label class="form-check-label" for="verbSubTypeMain">Põhiverb</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="verbSubTypeAux" name="VERB-subtype[]" value="V aux" />
      <label class="form-check-label" for="verbSubTypeAux">Abiverb</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="verbSubTypeMod" name="VERB-subtype[]" value="V mod" />
      <label class="form-check-label" for="verbSubTypeMod">Modaalverb</label>
    </div>

    <!-- Finite type -->
    <h5>Finiitsus</h5>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="verbFiniteTypeP" name="VERB-finitetype[]" value="VP" />
      <label class="form-check-label" for="verbFiniteTypeP">Pöördeline vorm</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="verbFiniteTypeK" name="VERB-finitetype[]" value="VK" />
      <label class="form-check-label" for="verbFiniteTypeK">Käändeline vorm</label>
    </div>

    <!-- Finite type "VP" additional options -->
    <div data-subgroup="VP">
      <!-- Speech type -->
      <h5>Kõneviis</h5>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="verbSpeechTypeAffermative" name="VERB-speechtype[]" value="indic" />
        <label class="form-check-label" for="verbSpeechTypeAffermative">Kindel</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="verbSpeechTypeConditional" name="VERB-speechtype[]" value="cond" />
        <label class="form-check-label" for="verbSpeechTypeConditional">Tingiv</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="verbSpeechTypeImperative" name="VERB-speechtype[]" value="imper" />
        <label class="form-check-label" for="verbSpeechTypeImperative">Käskiv</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="verbSpeechTypeQuoting" name="VERB-speechtype[]" value="quot" />
        <label class="form-check-label" for="verbSpeechTypeQuoting">Kaudne</label>
      </div>

      <!-- Time tense type -->
      <h5>Aeg</h5>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="verbTimeTypePresent" name="VERB-timetype[]" value="pres" />
        <label class="form-check-label" for="verbTimeTypePresent">Olevik</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="verbTimeTypeImpf" name="VERB-timetype[]" value="impf" />
        <label class="form-check-label" for="verbTimeTypeImpf">Lihtminevik</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="verbTimeTypePast" name="VERB-timetype[]" value="past" />
        <label class="form-check-label" for="verbTimeTypePast">Üldminevik</label>
      </div>

      <!-- Voice type -->
      <h5>Tegumood</h5>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="verbVoiceTypePs" name="VERB-voicetype[]" value="ps" />
        <label class="form-check-label" for="verbVoiceTypePs">Isikuline</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="verbVoiceTypeImps" name="VERB-voicetype[]" value="imps" />
        <label class="form-check-label" for="verbVoiceTypeImps">Umbisikuline</label>
      </div>

      <!-- Perspective type -->
      <h5>Isik</h5>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="verbPerspectiveTypePs1" name="VERB-perspectivetype[]" value="ps1" />
        <label class="form-check-label" for="verbPerspectiveTypePs1">Esimene</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="verbPerspectiveTypePs2" name="VERB-perspectivetype[]" value="ps2" />
        <label class="form-check-label" for="verbPerspectiveTypePs2">Teine</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="verbPerspectiveTypePs3" name="VERB-perspectivetype[]" value="ps3" />
        <label class="form-check-label" for="verbPerspectiveTypePs3">Kolmas</label>
      </div>

      <!-- Plural type -->
      [@createPluralTypeOptions wordType="VERB" /]

      <!-- Speech subtype -->
      <h5>Kõneliik</h5>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="verbSpeechSubTypeAf" name="VERB-speechsubtype[]" value="af" />
        <label class="form-check-label" for="verbSpeechSubTypeAf">Jaatav</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="verbSpeechSubTypeNeg" name="VERB-speechsubtype[]" value="neg" />
        <label class="form-check-label" for="verbSpeechSubTypeNeg">Eitav</label>
      </div>
    </div>

    <!-- Finite type "VK" additional options -->
    <div data-subgroup="VK">
      <!-- VK sub type options -->
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="verbSubTypeVKInf" name="VERB-subtypeVK[]" value="neg" />
        <label class="form-check-label" for="verbSubTypeVKInf">da-tegevusnimi</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="verbSubTypeVKGer" name="VERB-subtypeVK[]" value="ger" />
        <label class="form-check-label" for="verbSubTypeVKGer">des-vorm</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="verbSubTypeVKPartic" name="VERB-subtypeVK[]" value="partic" />
        <label class="form-check-label" for="verbSubTypeVKPartic">Kesksõna</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="verbSubTypeVKSup" name="VERB-subtypeVK[]" value="sup" />
        <label class="form-check-label" for="verbSubTypeVKSup">ma-tegevusnimi</label>
      </div>

      <!-- Partic additional options -->
      <div id="verbSubTypeVKParticAdditionals">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="verbSubTypeVKParticPastPs" name="VERB-subtypeVKPartic[]" value="past ps" />
          <label class="from-check-label" for="verbSubTypeVKParticPastPs">Isikuline mineviku kesksõna</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="verbSubTypeVKParticPastImps" name="VERB-subtypeVKPartic[]" value="past imps" />
          <label class="form-check-label" for="verbSubTypeVKParticPastImps">Umbisikuline mineviku kesksõna</label>
        </div>
      </div>

      <!-- Sup additional options -->
      <div id="verbSubTypeVKSupAdditionals">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="verbSubTypeVKSupPsIll" name="VERB-subtypeVKSup[]" value="ps ill" />
          <label class="from-check-label" for="verbSubTypeVKSupPsIll">Sisseütlev</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="verbSubTypeVKSupPsIn" name="VERB-subtypeVKSup[]" value="ps in" />
          <label class="from-check-label" for="verbSubTypeVKSupPsIn">Seesütlev</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="verbSubTypeVKSupPsEl" name="VERB-subtypeVKSup[]" value="ps el" />
          <label class="from-check-label" for="verbSubTypeVKSupPsEl">Seestütlev</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="verbSubTypeVKSupPsTr" name="VERB-subtypeVKSup[]" value="ps tr" />
          <label class="from-check-label" for="verbSubTypeVKSupPsTr">Saav</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="verbSubTypeVKSupPsAb" name="VERB-subtypeVKSup[]" value="ps ab" />
          <label class="from-check-label" for="verbSubTypeVKSupPsAb">Ilmaütlev</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="verbSubTypeVKSupImps" name="VERB-subtypeVKSup[]" value="imps" />
          <label class="from-check-label" for="verbSubTypeVKSupImps">Umbisikuline</label>
        </div>
      </div>
    </div>

    <!-- Rection type -->
    <h5>Rektsioon</h5>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="verbRectionTypeIntr" name="VERB-rectiontype[]" value="#Intr" />
      <label class="form-check-label" for="verbRectionTypeIntr">Sihitu verb</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="verbRectionTypeNgpp" name="VERB-rectiontype[]" value="#NGP-P" />
      <label class="form-check-label" for="verbRectionTypeNgpp">Sihiline verb</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="verbRectionTypePart" name="VERB-rectiontype[]" value="#Part" />
      <label class="form-check-label" for="verbRectionTypePart">Osastavaline sihitis</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="verbRectionTypeInfp" name="VERB-rectiontype[]" value="#InfP" />
      <label class="form-check-label" for="verbRectionTypeInfp">da-tegevusnimi sihitisena</label>
    </div>
  </div>

  <div class="additionals-container" data-group="S">
    <h5>Liik</h5>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="nounSubTypeGeneral" name="NOUN-subtype[]" value="com" />
      <label class="form-check-label" for="nounSubTypeGeneral">Üldnimeline</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="nounSubTypeReal" name="NOUN-subtype[]" value="prop" />
      <label class="form-check-label" for="nounSubTypeReal">Pärisnimeline</label>
    </div>

    <!-- Plural type -->
    [@createPluralTypeOptions wordType="NOUN" /]

    <!-- Case type -->
    [@createCaseTypeOptions wordType="NOUN" /]
  </div>

  <div class="additionals-container" data-group="A">
    <!-- Subtype -->
    <h5>Liik</h5>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="adjectiveSubTypeA" name="ADJECTIVE-subtype[]" value="A" />
      <label class="form-check-label" for="adjectiveSubTypeA">Käänduv</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="adjectiveSubTypeG" name="ADJECTIVE-subtype[]" value="G" />
      <label class="form-check-label" for="adjectiveSubTypeG">Käändumatu</label>
    </div>

    <!-- Step type -->
    <div id="adjectiveSubTypeAdditionals">
      <h5>Võrdlusaste</h5>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="adjectiveStepTypePos" name="ADJECTIVE-stepType[]" value="pos" />
        <label class="form-check-label" for="adjectiveStepTypePos">Algvõrre</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="adjectiveStepTypeComp" name="ADJECTIVE-stepType[]" value="comp" />
        <label class="form-check-label" for="adjectiveStepTypeComp">Keskvõrre</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="adjectiveStepTypeSuper" name="ADJECTIVE-stepType[]" value="super" />
        <label class="form-check-label" for="adjectiveStepTypeSuper">Ülivõrre</label>
      </div>

      <!-- Plural type -->
      [@createPluralTypeOptions wordType="ADJECTIVE" /]

      <!-- Case type -->
      [@createCaseTypeOptions wordType="ADJECTIVE" /]
    </div>
  </div>

  <div class="additionals-container" data-group="P">
    <!-- Subtype -->
    <h5>Liik</h5>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="pronounSubTypePers" name="PRONOUN-subtype[]" value="pers" />
      <label class="form-check-label" for="pronounSubTypePers">Isikuline</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="pronounSubTypeRefl" name="PRONOUN-subtype[]" value="refl" />
      <label class="form-check-label" for="pronounSubTypeRefl">Enesekohane</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="pronounSubTypeRec" name="PRONOUN-subtype[]" value="rec" />
      <label class="form-check-label" for="pronounSubTypeRec">Vastastikune</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="pronounSubTypePos" name="PRONOUN-subtype[]" value="pos" />
      <label class="form-check-label" for="pronounSubTypePos">Omastav</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="pronounSubTypeDem" name="PRONOUN-subtype[]" value="dem" />
      <label class="form-check-label" for="pronounSubTypeDem">Näitav</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="pronounSubTypeInterRel" name="PRONOUN-subtype[]" value="inter rel" />
      <label class="form-check-label" for="pronounSubTypeInterRel">Küsiv-siduv</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="pronounSubTypeDet" name="PRONOUN-subtype[]" value="det" />
      <label class="form-check-label" for="pronounSubTypeDet">Määratlev</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="pronounSubTypeIndef" name="PRONOUN-subtype[]" value="indef" />
      <label class="form-check-label" for="pronounSubTypeIndef">Umbmäärane</label>
    </div>

    <!-- Plural type -->
    [@createPluralTypeOptions wordType="PRONOUN" /]

    <!-- Case type -->
    [@createCaseTypeOptions wordType="PRONOUN" /]

    <div id="pronounSubTypeAdditionals">
      <!-- Perspective type -->
      <h5>Isik</h5>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="pronounPerspectiveTypePs1" name="PRONOUN-persepctivetype[]" value="ps1" />
        <label class="form-check-label" for="pronounPerspectiveTypePs1">Esimene</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="pronounPerspectiveTypePs2" name="PRONOUN-persepctivetype[]" value="ps2" />
        <label class="form-check-label" for="pronounPerspectiveTypePs2">Teine</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="pronounPerspectiveTypePs3" name="PRONOUN-persepctivetype[]" value="ps3" />
        <label class="form-check-label" for="pronounPerspectiveTypePs3">Kolmas</label>
      </div>
    </div>
  </div>

  <div class="additionals-container" data-group="N">
    <!-- Subtype -->
    <h5>Liik</h5>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="numeralSubTypeCard" name="NUMERAL-subtype[]" value="card" />
      <label class="form-check-label" for="numeralSubTypeCard">Põhiarvsõna</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="numeralSubTypeOrd" name="NUMERAL-subtype[]" value="ord" />
      <label class="form-check-label" for="numeralSubTypeOrd">Järgarvsõna</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="numeralSubTypeDigit" name="NUMERAL-subtype[]" value="digit" />
      <label class="form-check-label" for="numeralSubTypeDigit">Number</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="numeralSubTypeRoman" name="NUMERAL-subtype[]" value="roman" />
      <label class="form-check-label" for="numeralSubTypeRoman">Rooma number</label>
    </div>

    <div id="numeralSubTypeAdditionals">
      <!-- Plural type -->
      [@createPluralTypeOptions wordType="NUMERAL" /]

      <!-- Case type -->
      [@createCaseTypeOptions wordType="NUMERAL" /]
    </div>
  </div>

  <div class="additionals-container" data-group="K">
    <!-- Subtype -->
    <h5>Liik</h5>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="ADPOSITIONSubTypeCoord" name="ADPOSITION-subtype[]" value="coord" />
      <label class="form-check-label" for="ADPOSITIONSubTypeCoord">Tagasõna</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="ADPOSITIONSubTypeSub" name="ADPOSITION-subtype[]" value="sub" />
      <label class="form-check-label" for="ADPOSITIONSubTypeSub">Kaassõna</label>
    </div>

    <!-- Case type -->
    <h5>Laiendi kääne</h5>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="ADPOSITIONcaseTypeNom" name="ADPOSITION-casetype[]" value="nom" />
      <label class="form-check-label" for="ADPOSITIONcaseTypeNom">Nimetav</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="ADPOSITIONcaseTypeGen" name="ADPOSITION-casetype[]" value="gen" />
      <label class="form-check-label" for="ADPOSITIONcaseTypeGen">Omastav</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="ADPOSITIONcaseTypePart" name="ADPOSITION-casetype[]" value="part" />
      <label class="form-check-label" for="ADPOSITIONcaseTypePart">Osastav</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="ADPOSITIONcaseTypeAll" name="ADPOSITION-casetype[]" value="all" />
      <label class="form-check-label" for="ADPOSITIONcaseTypeAll">Alaleütlev</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="ADPOSITIONcaseTypeTerm" name="ADPOSITION-casetype[]" value="term" />
      <label class="form-check-label" for="ADPOSITIONcaseTypeTerm">Rajav</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="ADPOSITIONcaseTypeAbes" name="ADPOSITION-casetype[]" value="abes" />
      <label class="form-check-label" for="ADPOSITIONcaseTypeAbes">Ilmaütlev</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="ADPOSTIIONcaseTypeKom" name="ADPOSITION-casetype[]" value="kom" />
      <label class="form-check-label" for="ADPOSTIIONcaseTypeKom">Kaasaütlev</label>
    </div>
  </div>
</div>
[#-- Real options END --]
