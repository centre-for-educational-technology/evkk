[#ftl output_format="HTML"]
<!DOCTYPE html>
<head>
  <title>Clusterfinder</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
  <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/list.js/1.5.0/list.min.js"></script>
  <!-- TODO: Separate global styles to a separate CSS file -->
  <!-- TODO: Add support for other devices (tablets) -->
  <style>
    html, body {
      background: transparent;
    }

    .hidden {
      display: none;
    }

    h5 {
      margin-bottom: 5px;
      margin-top: 5px;
    }

    .btn-primary {
      margin-top: 10px;
    }

    .spinner-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: darkgray;
      opacity: .5;
    }

    .centered-spinner {
      position: fixed;
      top: 45%;
      left: 45%;
    }

    .no-results-row {
      text-align: center;
      display: none;
    }

    .w-top-margin {
      margin-top: 25px;
    }

    .label-w-top-margin {
      margin-top: 15px;
    }

    .large-spinner {
      width: 3rem;
      height: 3rem;
    }
  </style>
</head>
<body>
  <div class="container">

    <div class="row">
      <div class="col-12">
        <p class="lead">Klastileidja aitab tuvastada erinevaid musterid tekstides</p>
      </div>
    </div>

    <form id="cluster-form">
      <input type="hidden" name="formId" id="formId" value="${formId!}">
      <div class="form-group">
        <label for="analysisLength" >Sõnajärjendi pikkus</label>
        <select id="analysisLength" name="analysisLength" class="form-control">
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
        <input class="form-check-input" type="checkbox" id="syntacticAnalysis" name="syntactic" value="true">
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

      <!-- Dropdown options for punctuation -->
      <div id="punctuationSelectContainer" class="form-group" style="display: none">
        <label class="label-w-top-margin" for="punctuationDropdown">Valige Kirjavahemärk</label>
        <select class="form-control" id="punctuationDropdown" name="punctuationType">
          [#list punctuationTypes as punctuationValue, puncatuationLabel]
            <option value="${punctuationValue!}">${puncatuationLabel!}</option>
          [/#list]
        </select>
      </div>

      [#include "form/clauseTypeFragment.ftl" ]

      [#include "form/wordTypeFragment.ftl" ]

      <button id="submitBtn" type="submit" class="btn btn-primary">Uuri</button>
    </form>
  </div>

  <!-- Results section -->
  <div id="clusters" class="container hidden">
    <table class="table table-bordered w-top-margin" id="clustersTable">
      <thead>
        <tr>
          <th class="sort" data-sort="frequency">Sagedus</th>
          <th class="sort" data-sort="description">Kirjeldus</th>
          <th class="sort" data-sort="markups">Märgendid</th>
          <th class="sort" data-sort="usages">Kasutused tekstis</th>
        </tr>
      </thead>
      <tbody class="list">
        <tr class="no-results-row">
          <td colspan="4">Vasteid ei leitud</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Loading spinner -->
  <div id="loadingSpinner" class="spinner-overlay hidden text-center">
    <div class="spinner-border centered-spinner text-primary large-spinner" role="status">
      <span class="sr-only">Klasterdan...</span>
    </div>
  </div>
</body>
<script>
  const ClusterSearchForm = {

    STARTING_COMPONENT_SORT: $("#sortingByScomp"),
    ENDING_COMPONENT_SORT: $("#sortingByEcomp"),
    CLUSTERS_LIST: undefined,
    OPTIONS: {
      valueNames: ["frequency", "description", "markups", "usages"],
      item: '<tr>' +
              '<td class="frequency"></td>' +
              '<td class="description"></td>' +
              '<td class="markups"></td>' +
              '<td class="usages"></td>' +
            '</tr>'
    },

    init: function () {
      ClusterSearchForm.clauseType.init();
      ClusterSearchForm.wordType.init();
      ClusterSearchForm.initSortingCheckboxes();

      $(".additionals-container").hide();

      $("#morfoAnalysis, #syntacticAnalysis, #punctuationAnalysis").change(function () {
        $("#wordtypeAnalysis").prop("checked", false);
      });

      $("#morfoAnalysis, #syntacticAnalysis").change(function() {
        if (ClusterSearchForm.helpers.isComponentSortingSelected()) {
          ClusterSearchForm.handleComponentSortingSelection();
        }
      });

      $("#wordtypeAnalysis").change(function () {
        $("#morfoAnalysis").prop("checked", false);
        $("#syntacticAnalysis").prop("checked", false);
        $("#punctuationAnalysis").prop("checked", false);
        if (ClusterSearchForm.helpers.isComponentSortingSelected()) {
          ClusterSearchForm.handleComponentSortingSelection();
        }
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

        if (ClusterSearchForm.helpers.isComponentSortingSelected()) {
          ClusterSearchForm.handleComponentSortingSelection();
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
        $("#clauseTypeSelectContainer").hide();
        $("#wordTypeSelectContainer").show();
      } else if (isSyntactic) {
        $("#wordTypeSelectContainer").hide();
        $("#clauseTypeSelectContainer").show();
      } else if (isWordType) {
        $("#wordTypeSelectContainer").show();
        $("#clauseTypeSelectContainer").hide();
      } else {
        $("#clauseTypeSelectContainer").hide();
        $("#wordTypeSelectContainer").hide();
      }
    },

    clauseType: {
      MODIFIER_ADDITIONAL_OPTIONS: $("#modifier"),
      PREDICATE_ADDITIONAL_OPTIONS: $("#predicate"),

      init: function () {
        $("#clauseTypeDropdown option[value='ALL']").click();
        $("#clauseTypeDropdown").change(ClusterSearchForm.clauseType.toggleAdditionalOptions);
      },

      toggleAdditionalOptions: function () {
        // Reset additional option selections on type change
        $(".clause-additionals-container input[type='checkbox']").prop("checked", false);

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
        $("#wordtypeDropdown option[value='ALL']").click();
        ClusterSearchForm.wordType.verb.init();
        ClusterSearchForm.wordType.adjective.init();
        ClusterSearchForm.wordType.pronoun.init();
        ClusterSearchForm.wordType.numeral.init();
        $("#wordtypeDropdown").change(ClusterSearchForm.wordType.toggleAdditionalFields);
      },


      toggleAdditionalFields: function () {
        // Additional options can only be shown when the word type analysis is not selected
        const selectedValue = $("#wordtypeDropdown").val();

        // Hide other additional option checkboxes and show the correct ones
        $("div.additionals-container:not([data-group='"+ selectedValue +"'])").prop("checked", false).hide();
        $("div.additionals-container:not([data-group'"+ selectedValue + "'])").find("input[type='checkbox']").prop("checked", false);
        $("div[data-group='"+ selectedValue +"']").show();
      },

      verb: {
        VERB_FINITE_TYPE_ADDITIONAL_FIELDS: $("div[data-subgroup='VP']"),
        VERB_NON_FINITE_TYPE_ADDITIONAL_FIELDS: $("div[data-subgroup='VK']"),
        VERB_NON_FINITE_TYPE_PARTIC_ADDITIONAL_FIELDS: $("#verbSubTypeVKParticAdditionals"),
        VERB_NON_FINITE_TYPE_SUP_ADDITIONAL_FIELDS: $("#verbSubTypeVKSupAdditionals"),

        init: function () {
          ClusterSearchForm.wordType.verb.VERB_NON_FINITE_TYPE_ADDITIONAL_FIELDS.hide();
          ClusterSearchForm.wordType.verb.VERB_FINITE_TYPE_ADDITIONAL_FIELDS.hide();
          ClusterSearchForm.wordType.verb.initFiniteTypeHandlers();
          ClusterSearchForm.wordType.verb.initSubTypeHandlers();
        },

        initFiniteTypeHandlers: function() {
          $("#verbFiniteTypeP").change(function () {
            if($(this).is(":checked")) {
              ClusterSearchForm.wordType.verb.VERB_FINITE_TYPE_ADDITIONAL_FIELDS.show();
              ClusterSearchForm.helpers.resetAndHideWordTypeAdditionalOptions(ClusterSearchForm.wordType.verb.VERB_NON_FINITE_TYPE_ADDITIONAL_FIELDS);
              $("#verbFiniteTypeK").prop("checked", false).change();
            } else {
              ClusterSearchForm.helpers.resetAndHideWordTypeAdditionalOptions(ClusterSearchForm.wordType.verb.VERB_FINITE_TYPE_ADDITIONAL_FIELDS);
            }
          });

          $("#verbFiniteTypeK").change(function () {
            if($(this).is(":checked")) {
              ClusterSearchForm.wordType.verb.VERB_NON_FINITE_TYPE_ADDITIONAL_FIELDS.show();
              ClusterSearchForm.helpers.resetAndHideWordTypeAdditionalOptions(ClusterSearchForm.wordType.verb.VERB_FINITE_TYPE_ADDITIONAL_FIELDS);
              $("#verbFiniteTypeP").prop("checked", false).change();
            } else {
              ClusterSearchForm.helpers.resetAndHideWordTypeAdditionalOptions(ClusterSearchForm.wordType.verb.VERB_NON_FINITE_TYPE_ADDITIONAL_FIELDS);
            }
          });
        },

        initSubTypeHandlers: function() {
          $("#verbSubTypeVKPartic").change(function () {
            if ($(this).is(":checked")) {
              ClusterSearchForm.wordType.verb.VERB_NON_FINITE_TYPE_PARTIC_ADDITIONAL_FIELDS.show();
            } else {
              ClusterSearchForm.helpers.resetAndHideWordTypeAdditionalOptions(ClusterSearchForm.wordType.verb.VERB_NON_FINITE_TYPE_PARTIC_ADDITIONAL_FIELDS);
            }
          });

          $("#verbSubTypeVKSup").change(function() {
            if ($(this).is(":checked")) {
              ClusterSearchForm.wordType.verb.VERB_NON_FINITE_TYPE_SUP_ADDITIONAL_FIELDS.show();
            } else {
              ClusterSearchForm.helpers.resetAndHideWordTypeAdditionalOptions(ClusterSearchForm.wordType.verb.VERB_NON_FINITE_TYPE_SUP_ADDITIONAL_FIELDS);
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
              $("#adjectiveSubTypeG").prop("checked", false);
            } else {
              ClusterSearchForm.helpers.resetAndHideWordTypeAdditionalOptions(ClusterSearchForm.wordType.adjective.SUB_TYPE_ADDITIONAL_FIELDS);
            }
          });

          $("#adjectiveSubTypeG").change(function () {
            if($(this).is(":checked")) {
              ClusterSearchForm.helpers.resetAndHideWordTypeAdditionalOptions(ClusterSearchForm.wordType.adjective.SUB_TYPE_ADDITIONAL_FIELDS);
              $("#adjectiveSubTypeA").prop("checked", false);
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
        const data = $("#cluster-form").serializeArray();

        $.ajax({
          method: "POST",
          url: "${ajaxUrls.clusterText}",
          data: data,
          beforeSend: function() {
            ClusterSearchForm.ajax.resetTable();
            $(".no-results-row").hide();
            $("#clusters").hide();
            ClusterSearchForm.loader.showLoadingSpinner();
          },
          success: function (response) {
            if (response.clusters.length > 0) {
              ClusterSearchForm.ajax.showResults(response.clusters);
            } else {
              ClusterSearchForm.ajax.showNoResults();
            }
          },
          error: function (error) {
            ClusterSearchForm.ajax.showNoResults();
          },
          complete: function () {
            ClusterSearchForm.loader.hideLoadingSpinner();
          }
        });
      },

      showResults: function(data) {
        const clusters = [];
        for ( let i = 0; i < data.length; i++)
        {
          const cluster = {
            frequency: data[i].frequency,
            description: "Placeholder",
            markups: data[i].markups.map(ClusterSearchForm.util.escapeValue).join(" + "),
            usages: data[i].usages.join(", ")
          };

          clusters.push(cluster);
        }

        ClusterSearchForm.CLUSTERS_LIST = new List("clustersTable", ClusterSearchForm.OPTIONS, clusters);
        $("#clusters").show();
      },

      showNoResults: function () {
        $("#clusters").show();
        $(".no-results-row").show();
      },

      resetTable: function () {
        if (ClusterSearchForm.CLUSTERS_LIST) {
          ClusterSearchForm.CLUSTERS_LIST.clear();
        }
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
      isComponentSortingSelected: function() {
        return ClusterSearchForm.STARTING_COMPONENT_SORT.is(":checked") || ClusterSearchForm.ENDING_COMPONENT_SORT.is(":checked");
      },

      hideAndResetDropdowns: function () {
        // Word type
        $("#wordTypeSelectContainer").hide();
        $("#wordtypeDropdown").val("ALL").trigger("change");

        // Clause type
        $("#clauseTypeSelectContainer").hide();
        $("#clauseTypeDropdown").val("ALL").trigger("change");
      },

      resetAndHideWordTypeAdditionalOptions: function (additionalsSelector) {
        $(additionalsSelector).find("input[type='checkbox']").prop("checked", false);
        $(additionalsSelector).hide();
      }
    },

    util: {
      escapeValue: function (unsafeValue) {
        return unsafeValue
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
      }
    }
  };
  $(document).ready(ClusterSearchForm.init);
</script>
</html>
