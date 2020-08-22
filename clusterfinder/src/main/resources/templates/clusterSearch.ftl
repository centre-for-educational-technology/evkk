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
  </style>
</head>
<body>
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
      <textarea class="form-control" rows="5" id="userText"></textarea>
    </div>

    <!-- Basic search checkboxes -->
    <h5>Analüüs</h5>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="morfoAnalysis" name="analysisType[]" value="morfo">
      <label for="morfoAnalysis">Morfoloogiline</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="syntacticAnalysis" name="analysisType[]" value="syntactic">
      <label for="syntacticAnalysis">Süntaktiline</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="punctuationAnalysis" name="analysisType[]" value="punctuation">
      <label for="punctuationAnalysis">Arvestab kirjavahemärke</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="wordtypeAnalysis" name="analysisType[]" value="wordtype">
      <label for="wordtypeAnalysis">Sõnaliik</label>
    </div>

    <!-- Sorting checkboxes -->
    <h5>Reasta</h5>
    <div class="form-check">
      <input class="form-check-input sorting-cbox" type="checkbox" id="sortingByFreq" name="sorting" value="freq">
      <label for="sortingByFreq">Sageduse järgi</label>
    </div>
    <div class="form-check">
      <input class="form-check-input sorting-cbox" type="checkbox" id="sortingByScomp" name="sorting" value="scomp">
      <label for="sortingByScomp">Alguskomponendi järgi</label>
    </div>
    <div class="form-check">
      <input class="form-check-input sorting-cbox" type="checkbox" id="sortingByEcomp" name="sorting" value="ecomp">
      <label for="sortingByEcomp">Lõpukomponendi järgi</label>
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
          let checkedValue = $(this).val();
          if (ClusterSearchForm.helpers.isComponentSortingSelected(checkedValue)) {
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
      let isMorfo = $("#morfoAnalysis").is(":checked");
      let isSyntactic = $("#syntacticAnalysis").is(":checked");
      let isWordType = $("#wordtypeAnalysis").is(":checked");
      let isMorfoSyntatctic = isMorfo && isSyntactic;

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
        ClusterSearchForm.wordType.adjective.init();
        ClusterSearchForm.wordType.pronoun.init();
        ClusterSearchForm.wordType.numeral.init();
        $("#wordtypeDropdown").change(ClusterSearchForm.wordType.toggleAdditionalFields);
      },


      toggleAdditionalFields: function () {
        // Additional options can only be shown when the word type analysis is not selected
        ClusterSearchForm.helpers.resetAdditionalOptions();
        let selectedValue = $("#wordtypeDropdown").val();

        // Hide other additional option checkboxes and show the correct ones
        $("div.additionals-container:not([data-group='"+ selectedValue +"'])").hide();
        $("div[data-group='"+ selectedValue +"']").show();
      },

      adjective: {
        SUB_TYPE_ADDITIONAL_FIELDS: $("#adjectiveSubTypeAdditionals"),

        init: function() {
          $("#adjectiveSubTypeA").change(function() {
            if($(this).is("checked")) {
              ClusterSearchForm.wordType.adjective.SUB_TYPE_ADDITIONAL_FIELDS.show();
            }
          });

          $("#adjectiveSubTypeG").change(function () {
            if($(this).is(":checked")) {
              ClusterSearchForm.wordType.adjective.SUB_TYPE_ADDITIONAL_FIELDS
                .find("input[type='checkbox']")
                .prop("checked", false)
                .hide();
            }
          })
        },
      },

      pronoun: {
        SUB_TYPE_ADDITIONAL_FIELDS: $("#pronounSubTypeAdditionals"),

        init: function() {
          $("#pronounSubTypePers").change(function() {
            if($(this).is(":checked")) {
              ClusterSearchForm.wordType.pronoun.SUB_TYPE_ADDITIONAL_FIELDS.show();
            }
          });

          // Other types subtypes must reset the additional options
          $("[data-group='P'] input[type='checkbox']").not("#pronounSubTypePers").change(function () {
            ClusterSearchForm.wordType.pronoun.SUB_TYPE_ADDITIONAL_FIELDS
              .find("input[type='checkbox']")
              .prop("checked", false)
              .hide();
          });
        }
      },

      numeral: {
        SUB_TYPE_ADDITIONAL_FIELDS: $("#numeralSubTypeAdditionals"),

        init: function () {
          $("#numeralSubTypeCard, #numeralSubTypeOrd").change(function () {
            if($(this).is(":checked")) {
              ClusterSearchForm.wordType.numeral.SUB_TYPE_ADDITIONAL_FIELDS.show();
            }
          });

          $("[data-group='P'] input[type='checkbox']").not("#pronounSubTypePers").change(function () {
            ClusterSearchForm.wordType.numeral.SUB_TYPE_ADDITIONAL_FIELDS
              .find("input[type='checkbox']")
              .prop("checked", false)
              .hide();
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
          url: "http://localhost:9092/${ajaxUrls.clusterText}",
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

      resetDropdownOptions: function ($dropdown) {
        $dropdown.val("All").change().hide();
      },

      isComponentSortingSelected: function(selectedValue) {
        return selectedValue === "ecomp" || selectedValue === "scomp";
      },

      hideAndResetDropdowns: function () {
        // Punctuation
        $("#punctuationSelectContainer").hide()
        $("#punctuationDropdown").val("All").trigger("change");

        // Word type
        $("#wordTypeSelectContainer").hide();
        $("#wordtypeDropdown").val("All").trigger("change");

        // Clause type
        $("#clauseTypeSelectContainer").hide();
        $("#clauseTypeDropdown").val("All").trigger("change");
      }
    }
  };
  $(document).ready(ClusterSearchForm.init);
</script>
</html>
