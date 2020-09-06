[#ftl output_format="HTML"]
<!DOCTYPE html>
<head>
  <title>Clusterfinder</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
  <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
  <style>
    html, body {
      background: transparent;
    }

    h5 {
      margin-bottom: 5px;
      margin-top: 5px;
    }

    .btn-primary {
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class="container">

    <div class="row">
      <div class="col-12">
        <p class="lead">Klastileidja võimaldab tuvastad erinevaid musterid tekstides</p>
      </div>
    </div>

    <form id="cluster-form">
      <div class="form-group">
        <label for="analysisLength">Sõnajärjendi pikkus</label>
        <select class="form-control">
          [#list 1..5 as length]
            <option value="${length!}">${length!}</option>
          [/#list]
        </select>
      </div>

      <div class="form-group">
        <label for="userText">Tekst</label>
        <textarea class="form-control" rows="5" name="userText" id="userText"></textarea>
      </div>

      <!-- Basic search checkboxes -->
      <h5>Analüüs</h5>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="morfoAnalysis" name="morfological" value="true">
        <label class="form-check-label" for="morfoAnalysis">Morfoloogiline</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="syntacticAnalysis" name="syntatic" value="true">
        <label class="form-check-label" for="syntacticAnalysis">Süntaktiline</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="punctuationAnalysis" name="punctuation" value="true">
        <label class="form-check-label" for="punctuationAnalysis">Arvestab kirjavahemärke</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="wordtypeAnalysis" name="wordtype" value="true">
        <label class="form-check-label" for="wordtypeAnalysis">Sõnaliik</label>
      </div>

      <!-- Sorting checkboxes -->
      <h5>Reasta</h5>
      <div class="form-check">
        <input class="form-check-input sorting-cbox" type="checkbox" id="sortingByFreq" name="sorting" value="freq">
        <label class="form-check-label" for="sortingByFreq">Sageduse järgi</label>
      </div>
      <div class="form-check">
        <input class="form-check-input sorting-cbox" type="checkbox" id="sortingByScomp" name="sorting" value="scomp">
        <label class="form-check-label" for="sortingByScomp">Alguskomponendi järgi</label>
      </div>
      <div class="form-check">
        <input class="form-check-input sorting-cbox" type="checkbox" id="sortingByEcomp" name="sorting" value="ecomp">
        <label class="form-check-label" for="sortingByEcomp">Lõpukomponendi järgi</label>
      </div>

      <!-- TODO: Loading spinner -->

      <!-- Dropdown options for punctuation -->
      <div id="punctuationSelectContainer" class="form-group" style="display: none">
        <label for="punctuationDropdown">Valige Kirjavahemärk</label>
        <select class="form-control" id="punctuationDropdown" name="punctuationType">
          <option value="All">Kõik</option>
          [#list punctuationTypes as punctuationValue, puncatuationLabel]
            <option value="${punctuationValue!}">${puncatuationLabel!}</option>
          [/#list]
        </select>
      </div>

      [#include "form/clauseTypeFragment.ftl" ]

      [#include "form/wordTypeFragment.ftl" ]

      <button id="submitBtn" type="submit" class="btn btn-primary">Otsi</button>
    </form>
  </div>
</body>
<script>
  const ClusterSearchForm = {
    init: function () {
      ClusterSearchForm.clauseType.init();
      ClusterSearchForm.wordType.init();
      ClusterSearchForm.initSortingCheckboxes();

      $(".additionals-container").hide();

      $("#morfoAnalysis, #syntacticAnalysis, #punctuationAnalysis").change(function () {
        $("#wordtypeAnalysis").prop("checked", false);
      });

      $("#wordtypeAnalysis").change(function () {
        $("#morfoAnalysis").prop("checked", false);
        $("#syntacticAnalysis").prop("checked", false);
        $("#punctuationAnalysis").prop("checked", false);
      });

      $("#punctuationAnalysis").change(function () {
        $("#punctuationSelectContainer").toggle($(this).is(":checked"));
      });


      $("#submitBtn").click(ClusterSearchForm.ajax.clusterText);
    },

    initSortingCheckboxes: function() {
      $(".sorting-cbox").change(function () {
        // Uncheck other options
        $(".sorting-cbox").not(this).prop("checked", false);

        if ($(this).is(":checked")) {
          if (ClusterSearchForm.helpers.isComponentSortingSelected($(this).val())) {
            ClusterSearchForm.handleComponentSortingSelection();
          } else {
            ClusterSearchForm.helpers.hideAndResetDropdowns();
          }
        } else {
          ClusterSearchForm.helpers.hideAndResetDropdowns();
        }
      });
    },

    handleComponentSortingSelection: function() {
      const isMorfo = $("#morfoAnalysis").is(":checked");
      const isSyntactic = $("#syntacticAnalysis").is(":checked");
      const isWordType = $("#wordtypeAnalysis").is(":checked");
      const isMorfoSyntatctic = isMorfo && isSyntactic;

      if (isMorfoSyntatctic) {
        $("#wordTypeSelectContainer").show();
        $("#clauseTypeSelectContainer").show();
      } else if (isMorfo) {
        $("#wordTypeSelectContainer").show();
      } else if (isSyntactic) {
        $("#clauseTypeSelectContainer").show();
      } else if (isWordType) {
        $("#wordTypeSelectContainer").show();
      }
    },

    clauseType: {
      MODIFIER_ADDITIONAL_OPTIONS: $("#modifier"),
      PREDICATE_ADDITIONAL_OPTIONS: $("#predicate"),

      init: function () {
        $("#clauseTypeDropdown").change(ClusterSearchForm.clauseType.toggleAdditionalOptions);
      },

      toggleAdditionalOptions: function () {
        ClusterSearchForm.helpers.resetAdditionalOptions();

        const selectedValue = $("#clauseTypeDropdown").val();
        switch(selectedValue) {
          case 'F':
            ClusterSearchForm.clauseType.MODIFIER_ADDITIONAL_OPTIONS.hide();
            ClusterSearchForm.clauseType.PREDICATE_ADDITIONAL_OPTIONS.show();
            break;
          case 'M':
            ClusterSearchForm.clauseType.PREDICATE_ADDITIONAL_OPTIONS.hide();
            ClusterSearchForm.clauseType.MODIFIER_ADDITIONAL_OPTIONS.show();
            break;
          default:
            ClusterSearchForm.clauseType.PREDICATE_ADDITIONAL_OPTIONS.hide();
            ClusterSearchForm.clauseType.MODIFIER_ADDITIONAL_OPTIONS.hide();
            break;
        }
      }
    },

    wordType: {
      init: function() {
        ClusterSearchForm.wordType.verb.init();
        ClusterSearchForm.wordType.adjective.init();
        ClusterSearchForm.wordType.pronoun.init();
        ClusterSearchForm.wordType.numeral.init();
        $("#wordtypeDropdown").change(ClusterSearchForm.wordType.toggleAdditionalFields);
      },


      toggleAdditionalFields: function () {
        // Additional options can only be shown when the word type analysis is not selected
        ClusterSearchForm.helpers.resetAdditionalOptions();
        const selectedValue = $("#wordtypeDropdown").val();

        // Hide other additional option checkboxes and show the correct ones
        $("div.additionals-container:not([data-group='"+ selectedValue +"'])").hide();
        $("div[data-group='"+ selectedValue +"']").show();
      },

      verb: {
        VERB_FINITE_TYPE_ADDITIONAL_FIELDS: $("div[data-subgroup='VP']"),
        VERB_NON_FINITE_TYPE_ADDITIONAL_FIELDS: $("div[data-subgroup='VK']"),

        init: function () {
          ClusterSearchForm.wordType.verb.VERB_NON_FINITE_TYPE_ADDITIONAL_FIELDS.hide();
          ClusterSearchForm.wordType.verb.VERB_FINITE_TYPE_ADDITIONAL_FIELDS.hide();

          $("#verbFiniteTypeP").change(function () {
            if($(this).is(":checked")) {
              ClusterSearchForm.wordType.verb.VERB_FINITE_TYPE_ADDITIONAL_FIELDS.show();
              ClusterSearchForm.helpers.resetAndHideWordTypeAdditionalOptions(ClusterSearchForm.wordType.verb.VERB_NON_FINITE_TYPE_ADDITIONAL_FIELDS);
            } else {
              ClusterSearchForm.helpers.resetAndHideWordTypeAdditionalOptions(ClusterSearchForm.wordType.verb.VERB_FINITE_TYPE_ADDITIONAL_FIELDS);
            }
          });

          $("#verbFiniteTypeK").change(function () {
            if($(this).is(":checked")) {
              ClusterSearchForm.wordType.verb.VERB_NON_FINITE_TYPE_ADDITIONAL_FIELDS.show();
              ClusterSearchForm.helpers.resetAndHideWordTypeAdditionalOptions(ClusterSearchForm.wordType.verb.VERB_FINITE_TYPE_ADDITIONAL_FIELDS);
            } else {
              ClusterSearchForm.helpers.resetAndHideWordTypeAdditionalOptions(ClusterSearchForm.wordType.verb.VERB_NON_FINITE_TYPE_ADDITIONAL_FIELDS);
            }
          });
        }
      },

      adjective: {
        SUB_TYPE_ADDITIONAL_FIELDS: $("#adjectiveSubTypeAdditionals"),

        init: function() {
          ClusterSearchForm.wordType.adjective.SUB_TYPE_ADDITIONAL_FIELDS.hide();

          $("#adjectiveSubTypeA").change(function() {
            if($(this).is(":checked")) {
              ClusterSearchForm.wordType.adjective.SUB_TYPE_ADDITIONAL_FIELDS.show();
            } else {
              ClusterSearchForm.helpers.resetAndHideWordTypeAdditionalOptions(ClusterSearchForm.wordType.adjective.SUB_TYPE_ADDITIONAL_FIELDS);
            }
          });

          $("#adjectiveSubTypeG").change(function () {
            if($(this).is(":checked")) {
              ClusterSearchForm.helpers.resetAndHideWordTypeAdditionalOptions(ClusterSearchForm.wordType.adjective.SUB_TYPE_ADDITIONAL_FIELDS);
            }
          })
        },
      },

      pronoun: {
        SUB_TYPE_ADDITIONAL_FIELDS: $("#pronounSubTypeAdditionals"),

        init: function() {
          ClusterSearchForm.wordType.pronoun.SUB_TYPE_ADDITIONAL_FIELDS.hide();

          $("#pronounSubTypePers").change(function() {
            if($(this).is(":checked")) {
              ClusterSearchForm.wordType.pronoun.SUB_TYPE_ADDITIONAL_FIELDS.show();
            } else {
              ClusterSearchForm.helpers.resetAndHideWordTypeAdditionalOptions(ClusterSearchForm.wordType.pronoun.SUB_TYPE_ADDITIONAL_FIELDS);
            }
          });

          // Other types subtypes must reset the additional options
          $("[data-group='P'] input[type='checkbox']").not("#pronounSubTypePers").change(function () {
            if($(this).is(":checked")) {
              ClusterSearchForm.helpers.resetAndHideWordTypeAdditionalOptions(ClusterSearchForm.wordType.pronoun.SUB_TYPE_ADDITIONAL_FIELDS);
            }
          });
        }
      },

      numeral: {
        SUB_TYPE_ADDITIONAL_FIELDS: $("#numeralSubTypeAdditionals"),

        init: function () {
          ClusterSearchForm.wordType.numeral.SUB_TYPE_ADDITIONAL_FIELDS.hide();

          $("#numeralSubTypeCard, #numeralSubTypeOrd").change(function () {
            if($(this).is(":checked")) {
              ClusterSearchForm.wordType.numeral.SUB_TYPE_ADDITIONAL_FIELDS.show();
            } else {
              ClusterSearchForm.helpers.resetAndHideWordTypeAdditionalOptions(ClusterSearchForm.wordType.numeral.SUB_TYPE_ADDITIONAL_FIELDS);
            }
          });

          $("[data-group='P'] input[type='checkbox']").not("#pronounSubTypePers").change(function () {
            if($(this).is(":checked")) {
              ClusterSearchForm.helpers.resetAndHideWordTypeAdditionalOptions(ClusterSearchForm.wordType.numeral.SUB_TYPE_ADDITIONAL_FIELDS);
            }
          });
        }
      }
    },

    ajax: {
      clusterText: function (e) {
        e.preventDefault();
        var data = $("#cluster-form").serializeArray();

        $.ajax({
          method: "POST",
          url: "${ajaxUrls.clusterText}",
          data: data,
          beforeSend: function() {
            ClusterSearchForm.loader.showLoadingSpinner();
          },
          success: function (response) {
            // TODO: Add response handling with List.js
          },
          error: function (error) {
            console.log("Error occured: " + error);
          },
          complete: function () {
            ClusterSearchForm.loader.hideLoadingSpinner();
          }
        });
      }
    },

    loader: {
      showLoadingSpinner: function() {
        $("#loadingSpinner").show();
      },

      hideLoadingSpinner: function () {
        $("#loadingSpinner").hide();
      }
    },

    helpers: {
      resetAdditionalOptions: function() {
        $(".additionals-container input[type='checkbox']").prop("checked", false);
      },

      isComponentSortingSelected: function(selectedValue) {
        return selectedValue === "ecomp" || selectedValue === "scomp";
      },

      hideAndResetDropdowns: function () {
        // Word type
        $("#wordTypeSelectContainer").hide();
        $("#wordtypeDropdown").val("All").trigger("change");

        // Clause type
        $("#clauseTypeSelectContainer").hide();
        $("#clauseTypeDropdown").val("All").trigger("change");
      },

      resetAndHideWordTypeAdditionalOptions: function (additionalsSelector) {
        $(additionalsSelector).find("input[type='checkbox']").prop("checked", false);
        $(additionalsSelector).hide();
      }
    }
  };
  $(document).ready(ClusterSearchForm.init);
</script>
</html>
