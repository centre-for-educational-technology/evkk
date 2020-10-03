[#ftl output_format="HTML"]
<!-- Dropdown for clause types -->
<div id="clauseTypeSelectContainer" class="form-group" style="display: none">
  <label id="clauseType" for="clauseTypeDropdown">Valige Lauseliige</label>
  <select class="form-control" id="clauseTypeDropdown" name="clauseType">
    [#list clauseTypes as clauseTypeValue, clauseTypeLabel]
      <option value="${clauseTypeValue!}">${clauseTypeLabel!}</option>
    [/#list]
  </select>
</div>

<!-- Additional options for clause types -->
<!-- Predicate additional options -->
<div class="additionals-container" id="predicate">
  <h5>Liik</h5>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="finitePredicate" name="clauseTypeAdditionals[]" value="@+FMV" />
    <label class="form-check-label" for="finitePredicate">Pöördeline</label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="nonFinitePredicate" name="clauseTypeAdditionals[]" value="@-FMV" />
    <label class="form-check-label" for="nonFinitePredicate">Käändeline</label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="auxiliaryFinitePredicate" name="clauseTypeAdditionals[]" value="@+FCV" />
    <label class="form-check-label" for="auxiliaryFinitePredicate">Abiverbid liitaegades ja modaalverbid ahelverbides (pöördeline vorm)</label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="auxiliaryNonFinitePredicate" name="clauseTypeAdditionals[]" value="@-FCV" />
    <label class="form-check-label" for="auxiliaryNonFinitePredicate">Abiverbid liitaegades ja modaalverbid ahelverbides (käändeline vorm)</label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="negationPredicate" name="clauseTypeAdditionals[]" value="@NEG" />
    <label class="form-check-label" for="negationPredicate">Verbi eitus</label>
  </div>
</div>

<!-- Modifier additional options -->
<div class="additionals-container" id="modifier">
  <h5>Liik</h5>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="modifierAdjectiveAppositive" name="clauseTypeAdditionals[]" value="@AN>" />
    <label class="form-check-label" for="modifierAdjectiveAppositive">Omadus- ja järgarvsõna eestäiendina</label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="modifierAdjectivePostposed" name="clauseTypeAdditionals[]" value="@<AN" />
    <label class="form-check-label" for="modifierAdjectivePostposed">Omadus- ja järgarvsõna järeltäiendina</label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="modifierAdverbAppositive" name="clauseTypeAdditionals[]" value="@AD>" />
    <label class="form-check-label" for="modifierAdverbAppositive">Määrsõna eestäiendina</label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="modifierAdverbPosposed" name="clauseTypeAdditionals[]" value="@<AD" />
    <label class="form-check-label" for="modifierAdjectivePostposed">Määrsõna järeltäiendina</label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="modifierAdpositionAppositive" name="clauseTypeAdditionals[]" value="@PN>" />
    <label class="form-check-label" for="modifierAdpositionAppositive">Kaassõna eestäiendina</label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="modifierAdpositionPostposed" name="clauseTypeAdditionals[]" value="@<PN" />
    <label class="form-check-label" for="modifierAdpositionPostposed">Kaassõna järeltäiendina</label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="modifierNounAppositive" name="clauseTypeAdditionals[]" value="@NN>" />
    <label class="form-check-label" for="modifierNounAppositive">Nimi-, ase- ja põhiarvsõna eestäiendina</label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="modifierNounPostposed" name="clauseTypeAdditionals[]" value="@<NN" />
    <label class="form-check-label" for="modifierNounPostposed">Nimi-, ase- ja põhiarvsõna järeltäiendina</label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="modifierParticibleAppositive" name="clauseTypeAdditionals[]" value="@VN>" />
    <label class="form-check-label" for="modifierParticibleAppositive">Kesksõna eestäiendina</label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="modifierParticiblePostposed" name="clauseTypeAdditionals[]" value="@<VN" />
    <label class="form-check-label" for="modifierParticiblePostposed">Kesksõna järeltäiendina</label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="modifierVerbAppositive" name="clauseTypeAdditionals[]" value="@INF_N>" />
    <label class="form-check-label" for="modifierVerbAppositive">Verbi käändeline vorm eestäiendina</label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="modifierVerbPostposed" name="clauseTypeAdditionals[]" value="@<INF_N" />
    <label class="form-check-label" for="modifierVerbPostposed">Verbi käändeline vorm järeltäiendina</label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="modifierPrepositionAppositive" name="clauseTypeAdditionals[]" value="@PP>" />
    <label class="form-check-label" for="modifierPrepositionAppositive">Eessõna laiend</label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="modifierPostpositionPostposed" name="clauseTypeAdditionals[]" value="@<PP" />
    <label class="form-check-label" for="modifierPostpositionPostposed">Tagasõna laiend</label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="modifierQuantifierAppositive" name="clauseTypeAdditionals[]" value="@Q>" />
    <label class="form-check-label" for="modifierQuantifierAppositive">Hulgasõna eeslaiend</label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="modifierQuantifierPostposed" name="clauseTypeAdditionals[]" value="@<Q" />
    <label class="form-check-label" for="modifierQuantifierPostposed">Hulgasõna järellained</label>
  </div>
</div>
