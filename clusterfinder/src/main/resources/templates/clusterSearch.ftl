[#ftl output_format="HTML"]
[#import "common/inputs.ftl" as input]
[#import "common/translations.ftl" as translations]

<!DOCTYPE html>
<html lang="et">
<head>
  <title>Klastrileidja</title>
  <meta http-equiv="Content-Type"
        content="text/html; charset=UTF-8"/>
  <!-- Bootstrap -->
  <link rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
        crossorigin="anonymous">
  <!-- jQuery -->
  <script src="https://code.jquery.com/jquery-3.5.1.min.js"
          integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
          crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
          integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
          crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
          integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
          crossorigin="anonymous"></script>
  <!-- jQuery Datatable -->
  <link rel="stylesheet"
        type="text/css"
        href="https://cdn.datatables.net/v/dt/jszip-2.5.0/dt-1.11.3/b-2.0.1/b-html5-2.0.1/datatables.min.css"/>
  <script type="text/javascript"
          src="https://cdn.datatables.net/v/dt/jszip-2.5.0/dt-1.11.3/b-2.0.1/b-html5-2.0.1/datatables.min.js"></script>
  <!-- jQuery validation -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.3/jquery.validate.min.js"
          integrity="sha512-37T7leoNS06R80c8Ulq7cdCDU5MNQBwlYoy1TX/WUsLFC2eYNqtKlV0QjH7r8JpG/S0GUMZwebnVFLPd6SU5yg=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"></script>
  <script defer>
    function handleChange(input) {
      document.getElementById("file_name").textContent = input.files[0].name
    }
  </script>

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

    .w-top-margin {
      margin-top: 25px;
    }

    .w-separation {
      margin-top: 10px;
      margin-bottom: 10px;
    }

    .large-spinner {
      width: 3rem;
      height: 3rem;
    }

    label.error {
      color: red;
    }

    .partial-results, .all-results {
      white-space: pre;
    }

    .show-more, .show-less {
      cursor: pointer;
      color: blue !important;
    }

    .show-more:after {
      content: ' > ';
    }

    .show-less:after {
      content: ' < ';
    }

    .smallspacer {
      margin-bottom: 20px;
    }
  </style>
</head>
<body>
<div class="container">

  <div class="row">
    <div class="col-12">
      <h2>[@translations.retrieveTranslation "clusterfinder.app.title" /]</h2>
      <p class="lead">[@translations.retrieveTranslation "clusterfinder.app.short.description" /]</p>
    </div>
  </div>

  <form id="cluster-form">
    <input type="hidden"
           name="formId"
           id="formId"
           value="${formId!}">
    <input type="hidden"
           name="fileName"
           id="fileName"
           value="">
    <input type="hidden"
           name="inputType"
           id="inputType"
           value="FREE_TEXT">

    <div class="form-group">
      <label for="analysisLength">[@translations.retrieveTranslation "common.analysis.length.label" /]</label>
      <select id="analysisLength"
              name="analysisLength"
              class="form-control">
        <option value="">[@translations.retrieveTranslation "common.select.one.analysis.length" /]</option>
          [#list 1..5 as length]
            <option value="${length!}">${length!}</option>
          [/#list]
      </select>
    </div>

    <!-- Input type selection -->
    <h5>[@translations.retrieveTranslation "common.input.type.header" /]</h5>
    <div class="form-group">
      <label for="userText">[@translations.retrieveTranslation "common.text.input.label" /]</label>
      <textarea class="form-control"
                rows="5"
                name="userText"
                id="userText"></textarea>
    </div>
    <div id="fileText"
         class="custom-file w-separation"
         style="z-index: 0">
      <input type="file"
             class="custom-file-input"
             id="userFile"
             onchange="handleChange(this)"
             accept=".txt,.pdf,.docx,.doc,.odt">
      <label id="file_name" class="custom-file-label"
             for="userFile">[@translations.retrieveTranslation "common.choose.file" /]</label>
    </div>

    <!-- Basic search checkboxes -->
    <h5>[@translations.retrieveTranslation "common.analysis.header" /]</h5>
    <div class="form-check">
        [@input.createCheckboxWithTooltip
        id="wordtypeAnalysis"
        name="wordtype"
        labelKey="wordtype.analysis.label"
        tooltipKey="wordtype.analysis.tooltip"/]
    </div>
    <div class="form-check">
        [@input.createCheckboxWithTooltip
        id="syntacticAnalysis"
        name="syntactic"
        labelKey="syntactic.analysis.label"
        tooltipKey="syntactic.analysis.tooltip" /]
    </div>
    <div class="form-check">
        [@input.createCheckboxWithTooltip
        id="morfoAnalysis"
        name="morfological"
        labelKey="morfological.analysis.label"
        tooltipKey="morfological.analysis.tooltip" /]
    </div>
    <h5>[@translations.retrieveTranslation "common.punctuation.header" /]</h5>
    <div class="form-check">
        [@input.createCheckboxWithTooltip
        id="punctuationAnalysis"
        name="punctuation"
        labelKey="punctuation.analysis.label"
        tooltipKey="punctuation.analysis.tooltip" /]
    </div>

    <!-- Sorting checkboxes -->

    <div class="form-check hidden"
         data-word-sort="1">
      <h5 style="margin-left: -20px">[@translations.retrieveTranslation "common.sorting.header" /]</h5>
        [@input.createCheckbox id="sortByFirstWord" name="sorting" labelKey="sorting.by.first.word" value="fwrd" /]
    </div>
    <div class="form-check hidden"
         data-word-sort="2">
        [@input.createCheckbox id="sortBySecondWord" name="sorting" labelKey="sorting.by.second.word" value="swrd" /]
    </div>
    <div class="form-check hidden"
         data-word-sort="3">
        [@input.createCheckbox id="sortByThirdWord" name="sorting" labelKey="sorting.by.third.word" value="twrd" /]
    </div>
    <div class="form-check hidden"
         data-word-sort="4">
        [@input.createCheckbox id="sortByFourthWord" name="sorting" labelKey="sorting.by.fourth.word" value="fowrd" /]
    </div>
    <div class="form-check hidden"
         data-word-sort="5">
        [@input.createCheckbox id="sortByFifthWord" name="sorting" labelKey="sorting.by.fifth.word" value="fiwrd" /]
    </div>

      [#include "form/clauseTypeFragment.ftl" ]

      [#include "form/wordTypeFragment.ftl" ]

    <button id="submitBtn"
            type="submit"
            class="btn btn-primary">[@translations.retrieveTranslation "common.search" /]</button>
  </form>
</div>

<div class="smallspacer"></div>

<!-- Results section -->
<div id="clusters"
     class="container hidden">
  <table class="table table-bordered w-top-margin"
         id="clustersTable">
    <thead>
    <tr>
      <th>[@translations.retrieveTranslation "common.sorting.header.markups"/]</th>
      <th>[@translations.retrieveTranslation "common.sorting.header.description" /]</th>
      <th>[@translations.retrieveTranslation "common.sorting.header.frequency" /]</th>
      <th>[@translations.retrieveTranslation "common.sorting.header.usages" /]</th>
    </tr>
    </thead>
  </table>
</div>

<!-- Loading spinner -->
<div id="loadingSpinner"
     class="spinner-overlay hidden text-center">
  <div class="spinner-border centered-spinner text-primary large-spinner"
       role="status">
    <span class="sr-only">[@translations.retrieveTranslation "common.loading.text" /]</span>
  </div>
</div>
</body>
<script>
  const ClusterSearchForm = {

    SORTING_OPTIONS: undefined,
    CLUSTERS_DATA_TABLE: undefined,
    CLUSTER_SEARCH_FORM: $("#cluster-form"),

    init: function () {
      ClusterSearchForm.clauseType.init();
      ClusterSearchForm.wordType.init();
      ClusterSearchForm.prepareSortingOptions();
      ClusterSearchForm.initSortingCheckboxes();
      ClusterSearchForm.validation.setupValidation();

      $("#analysisLength").change(ClusterSearchForm.handleAnalysisLengthChange);

      // Initialize tooltips
      $('[data-toggle="tooltip"]').tooltip()

      // Initially hide all the additional option containers
      $(".additionals-container").hide();

      // File upload initialization
      $("#userFile").change(ClusterSearchForm.ajax.uploadFile);

      // Initialize the results table
      ClusterSearchForm.CLUSTERS_DATA_TABLE = $("#clustersTable").DataTable({
        dom: 'Bfrtip',
        "paging": true,
        "pageLength": 100,
        "pagingType": "full_numbers",
        language: {
          "processing": "[@translations.retrieveTranslation "cluster.result.table.processing" /]",
          "lengthMenu": "[@translations.retrieveTranslation "cluster.result.table.length.menu" /]",
          "zeroRecords": "[@translations.retrieveTranslation "cluster.result.table.no.records" /]",
          "info": "[@translations.retrieveTranslation "cluster.result.table.info" /]",
          "infoEmpty": "", // Needs to be an empty string in order to hide it from the UI (defaults to "Showing 0 of 0 entries" if the key is not provided)
          "infoFiltered": "[@translations.retrieveTranslation "cluster.result.table.filtered.info" /]",
          "search": "[@translations.retrieveTranslation "cluster.result.table.search" /]",
          "paginate": {
            "first": "[@translations.retrieveTranslation "cluster.result.table.pagination.first" /]",
            "previous": "[@translations.retrieveTranslation "cluster.result.table.pagination.previous" /]",
            "next": "[@translations.retrieveTranslation "cluster.result.table.pagination.next" /]",
            "last": "[@translations.retrieveTranslation "cluster.result.table.pagination.last" /]"
          }
        },
        order: [[2, 'desc']],
        columns: [
          {data: 'markups'},
          {data: 'description'},
          {data: 'frequency'},
          {
            data: 'usages', render: function (data, type, row, meta) {
              return type === 'display' ? ClusterSearchForm.util.renderUsagesColumn(data) : data.split("<br>").map(u => u).join(",");
            }
          }
        ],
        buttons: [
          {
            extend: 'csv',
            charset: 'utf-8',
            title: 'clusters',
            text: "[@translations.retrieveTranslation "common.export.clusters.csv" /]",
            bom: true,
            exportOptions: {orthogonal: 'export'}
          },
          {
            extend: 'excel',
            title: 'clusters',
            text: "[@translations.retrieveTranslation "common.export.clusters.excel" /]",
            exportOptions: {orthogonal: 'export'}
          }
        ],
      });

      // Need to bind these events on the whole document, since these elements do not exist yet during initial load
      $(document).on('click', 'a.show-more', function () {
        const parentDiv = $(this).closest("div.truncated-results");
        parentDiv.find("span.all-results").removeClass("hidden");
        parentDiv.find("span.partial-results").addClass("hidden");
      });

      $(document).on('click', 'a.show-less', function () {
        const parentDiv = $(this).closest("div.truncated-results");
        parentDiv.find("span.all-results").addClass("hidden");
        parentDiv.find("span.partial-results").removeClass("hidden");
      });

      $("#morfoAnalysis, #syntacticAnalysis").change(function () {
        ClusterSearchForm.helpers.hideAndResetDropdowns();
        ClusterSearchForm.helpers.resetWordTypeAnalysis();
        if (ClusterSearchForm.helpers.isComponentSortingSelected()) {
          ClusterSearchForm.handleComponentSortingSelection();
        }
      });

      $("#syntacticAnalysis").change(function () {
        if (!$("#morfoAnalysis").is(":checked")) {
          $("#punctuationAnalysis").prop("checked", false);
        }
      });

      $("#punctuationAnalysis").change(function () {
        if ($("#syntacticAnalysis").is(":checked") && !$("#morfoAnalysis").is(":checked")) {
          $("#syntacticAnalysis").prop("checked", false);
        }
      });

      $("#wordtypeAnalysis").change(ClusterSearchForm.handleWordTypeAnalysisChange);

      $("#submitBtn").click(ClusterSearchForm.ajax.clusterText);

    },

    prepareSortingOptions: function () {
      const $sortingByFirst = $("div[data-word-sort='1']");
      const $sortingBySecond = $("div[data-word-sort='2']");
      const $sortingByThird = $("div[data-word-sort='3']");
      const $sortingByFourth = $("div[data-word-sort='4']");
      const $sortingByFifth = $("div[data-word-sort='5']");

      // Constructing an object containing references to different option selectors for better accessibility
      ClusterSearchForm.SORTING_OPTIONS = {
        "1": [$sortingByFirst],
        "2": [$sortingByFirst, $sortingBySecond],
        "3": [$sortingByFirst, $sortingBySecond, $sortingByThird],
        "4": [$sortingByFirst, $sortingBySecond, $sortingByThird, $sortingByFourth],
        "5": [$sortingByFirst, $sortingBySecond, $sortingByThird, $sortingByFourth, $sortingByFifth]
      };
    },

    initSortingCheckboxes: function () {
      $("input[name='sorting']").change(function () {
        // Uncheck other options
        $("input[name='sorting']").not(this).prop("checked", false);

        if (ClusterSearchForm.helpers.isComponentSortingSelected()) {
          ClusterSearchForm.handleComponentSortingSelection();
        } else {
          ClusterSearchForm.helpers.hideAndResetDropdowns();
        }
      });

      // Sorting by frequency should be checked by default
      $("#sortByFreq").prop("checked", true).change();
      $("#wordtypeAnalysis").prop("checked", true);
    },

    handleComponentSortingSelection: function () {
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

    handleAnalysisLengthChange: function () {
      ClusterSearchForm.helpers.hideAndResetWordSortingCheckboxes();
      if ($(this).val() !== "") {
        ClusterSearchForm.SORTING_OPTIONS[$(this).val()].forEach(element => element.show())
      }
    },

    handleWordTypeAnalysisChange: function () {
      $("#morfoAnalysis").prop("checked", false);
      $("#syntacticAnalysis").prop("checked", false);

      ClusterSearchForm.helpers.hideAndResetDropdowns();
      if (ClusterSearchForm.helpers.isComponentSortingSelected()) {
        ClusterSearchForm.handleComponentSortingSelection();
      }
    },

    clauseType: {
      QUANTIFIER_ADDITIONAL_OPTIONS: $("#quantifier"),
      PREDICATE_ADDITIONAL_OPTIONS: $("#predicate"),
      PREPOSITION_ADDITIONAL_OPTIONS: $("#preposition"),
      ATTRIBUTE_ADDITIONAL_OPTIONS: $("#attribute"),

      init: function () {
        $("#clauseTypeDropdown option[value='ALL']").click();
        $(".clause-additionals-container").hide();
        $("#clauseTypeDropdown").change(ClusterSearchForm.clauseType.toggleAdditionalOptions);
      },

      toggleAdditionalOptions: function () {
        const selectedValue = $("#clauseTypeDropdown").val();
        if (selectedValue === "ALL") {
          $("div.clause-additionals-container").hide();
          $("div.clause-additionals-container").find("input[type='checkbox']").prop("checked", false);
        } else {
          $("div.clause-additionals-container:not([data-clause-group='" + selectedValue + "'])").hide();
          $("div.clause-additionals-container:not([data-clause-group='" + selectedValue + "'])").find("input[type='checkbox']").prop("checked", false);
          $("div.clause-additionals-container[data-clause-group='" + selectedValue + "']").show();
        }
      }
    },

    wordType: {
      init: function () {
        $("#wordTypeDropdown option[value='ALL']").click();
        ClusterSearchForm.wordType.verb.init();
        ClusterSearchForm.wordType.adjective.init();
        ClusterSearchForm.wordType.pronoun.init();
        ClusterSearchForm.wordType.numeral.init();
        $("#wordTypeDropdown").change(ClusterSearchForm.wordType.toggleAdditionalFields);
      },


      toggleAdditionalFields: function () {
        // Additional options can only be shown when the word type analysis is not selected
        const selectedValue = $("#wordTypeDropdown").val();
        const wordTypeAnalysisSelected = $("#wordtypeAnalysis").is(":checked");

        // Hide other additional option checkboxes and show the correct ones
        if (selectedValue === "ALL" || wordTypeAnalysisSelected) {
          $("div.additionals-container").hide();
          $("div.additionals-container").find("input[type='checkbox']").prop("checked", false);
        } else {
          $("div.additionals-container:not([data-group='" + selectedValue + "'])").hide();
          $("div.additionals-container:not([data-group='" + selectedValue + "'])").find("input[type='checkbox']").prop("checked", false);
          $("div[data-group='" + selectedValue + "']").show();
        }
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

        initFiniteTypeHandlers: function () {
          $("#verbFiniteTypeP").change(function () {
            if ($(this).is(":checked")) {
              ClusterSearchForm.wordType.verb.VERB_FINITE_TYPE_ADDITIONAL_FIELDS.show();
              ClusterSearchForm.helpers.resetAndHideWordTypeAdditionalOptions(ClusterSearchForm.wordType.verb.VERB_NON_FINITE_TYPE_ADDITIONAL_FIELDS);
              $("#verbFiniteTypeK").prop("checked", false).change();
            } else {
              ClusterSearchForm.helpers.resetAndHideWordTypeAdditionalOptions(ClusterSearchForm.wordType.verb.VERB_FINITE_TYPE_ADDITIONAL_FIELDS);
            }
          });

          $("#verbFiniteTypeK").change(function () {
            if ($(this).is(":checked")) {
              ClusterSearchForm.wordType.verb.VERB_NON_FINITE_TYPE_ADDITIONAL_FIELDS.show();
              ClusterSearchForm.helpers.resetAndHideWordTypeAdditionalOptions(ClusterSearchForm.wordType.verb.VERB_FINITE_TYPE_ADDITIONAL_FIELDS);
              $("#verbFiniteTypeP").prop("checked", false).change();
            } else {
              ClusterSearchForm.helpers.resetAndHideWordTypeAdditionalOptions(ClusterSearchForm.wordType.verb.VERB_NON_FINITE_TYPE_ADDITIONAL_FIELDS);
            }
          });
        },

        initSubTypeHandlers: function () {
          $("#verbSubTypeVKPartic").change(function () {
            if ($(this).is(":checked")) {
              ClusterSearchForm.wordType.verb.VERB_NON_FINITE_TYPE_PARTIC_ADDITIONAL_FIELDS.show();
            } else {
              ClusterSearchForm.helpers.resetAndHideWordTypeAdditionalOptions(ClusterSearchForm.wordType.verb.VERB_NON_FINITE_TYPE_PARTIC_ADDITIONAL_FIELDS);
            }
          });

          $("#verbSubTypeVKSup").change(function () {
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

        init: function () {
          ClusterSearchForm.wordType.adjective.SUB_TYPE_ADDITIONAL_FIELDS.hide();

          $("#adjectiveSubTypeA").change(function () {
            if ($(this).is(":checked")) {
              ClusterSearchForm.wordType.adjective.SUB_TYPE_ADDITIONAL_FIELDS.show();
              $("#adjectiveSubTypeG").prop("checked", false);
            } else {
              ClusterSearchForm.helpers.resetAndHideWordTypeAdditionalOptions(ClusterSearchForm.wordType.adjective.SUB_TYPE_ADDITIONAL_FIELDS);
            }
          });

          $("#adjectiveSubTypeG").change(function () {
            if ($(this).is(":checked")) {
              ClusterSearchForm.helpers.resetAndHideWordTypeAdditionalOptions(ClusterSearchForm.wordType.adjective.SUB_TYPE_ADDITIONAL_FIELDS);
              $("#adjectiveSubTypeA").prop("checked", false);
            }
          })
        },
      },

      pronoun: {
        SUB_TYPE_ADDITIONAL_FIELDS: $("#pronounSubTypeAdditionals"),

        init: function () {
          ClusterSearchForm.wordType.pronoun.SUB_TYPE_ADDITIONAL_FIELDS.hide();

          $("#pronounSubTypePers").change(function () {
            if ($(this).is(":checked")) {
              ClusterSearchForm.wordType.pronoun.SUB_TYPE_ADDITIONAL_FIELDS.show();
            } else {
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
            if ($(this).is(":checked")) {
              ClusterSearchForm.wordType.numeral.SUB_TYPE_ADDITIONAL_FIELDS.show();
            } else {
              ClusterSearchForm.helpers.resetAndHideWordTypeAdditionalOptions(ClusterSearchForm.wordType.numeral.SUB_TYPE_ADDITIONAL_FIELDS);
            }
          });
        }
      }
    },

    ajax: {
      clusterText: function (e) {
        e.preventDefault();

        // Only execute the search when the form is valid
        if (ClusterSearchForm.CLUSTER_SEARCH_FORM.valid()) {
          const data = $("#cluster-form").serializeArray();
          data.push({name: "partialFilters", value: ClusterSearchForm.helpers.hasPartialFilters()})

          $.ajax({
            method: "POST",
            url: "${ajaxUrls.clusterText}",
            data: data,
            beforeSend: function () {
              ClusterSearchForm.CLUSTERS_DATA_TABLE.clear();
              $("#clusters").hide();
              ClusterSearchForm.loader.showLoadingSpinner();
            },
            success: function (response) {
              if (response.clusters.length > 0) {
                ClusterSearchForm.ajax.showResults(response.clusters, response.separator);
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
        }
      },

      showResults: function (data, separator) {
        const clusters = [];
        for (let i = 0; i < data.length; i++) {
          const cluster = {
            frequency: data[i].frequency,
            description: data[i].descriptions.join(" + "),
            markups: data[i].markups.map(ClusterSearchForm.util.escapeValueAndReplace).join(" + "),
            usages: data[i].usages.join("<br>")
          };

          clusters.push(cluster);
        }

        ClusterSearchForm.CLUSTERS_DATA_TABLE.rows.add(clusters);
        ClusterSearchForm.CLUSTERS_DATA_TABLE.draw();
        $("#clusters").show();
      },

      showNoResults: function () {
        ClusterSearchForm.CLUSTERS_DATA_TABLE.clear();
        ClusterSearchForm.CLUSTERS_DATA_TABLE.draw();
        $("#clusters").show();
      },

      uploadFile: function (event) {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("file", file);

        $.ajax({
          type: "POST",
          enctype: 'multipart/form-data',
          url: "http://localhost:3000/api/textfromfile",
          data: formData,
          processData: false,
          contentType: false,
          cache: false,
          success: function (data) {
            document.getElementById("userText").value = data;
          },
          error: function (e) {
            console.log("ERROR: ", e);
            alert("Tekkis viga faili üleslaadimisel! Kontrolli, et valisid lubatud formaadis faili või proovi hiljem uuesti.")
          }
        });
      }
    },

    loader: {
      showLoadingSpinner: function () {
        $("#loadingSpinner").show();
      },

      hideLoadingSpinner: function () {
        $("#loadingSpinner").hide();
      }
    },

    validation: {
      setupValidation: function () {
        ClusterSearchForm.CLUSTER_SEARCH_FORM.validate({
          rules: {
            analysisLength: "required",
            userText: {
              required: function () {
                return $("#inputType").val() === "FREE_TEXT";
              }
            },
          },
          messages: {
            analysisLength: "[@translations.retrieveTranslation "validation.analysis.length.error" /]",
            userText: "[@translations.retrieveTranslation "validation.user.text.error" /]",
          }
        });
      }
    },

    helpers: {
      isComponentSortingSelected: function () {
        const selectedValue = $("input[name='sorting']:checked").val();
        return selectedValue === "fwrd" ||
          selectedValue === "swrd" ||
          selectedValue === "twrd" ||
          selectedValue === "fowrd" ||
          selectedValue === "fiwrd";
      },

      hideAndResetWordSortingCheckboxes: function () {
        ClusterSearchForm.SORTING_OPTIONS["5"].forEach(element => element.hide().find("input[type='checkbox']").prop("checked", false).change());

        // Need to re-check the frequency checkbox here to ensure that at least one sorting option is selected by default
        $("#sortByFreq").prop("checked", true).change();
      },

      hideAndResetDropdowns: function () {
        // Word type
        $("#wordTypeSelectContainer").hide();
        $("#wordTypeDropdown").val("ALL").trigger("change");

        // Clause type
        $("#clauseTypeSelectContainer").hide();
        $("#clauseTypeDropdown").val("ALL").trigger("change");
      },

      resetAndHideWordTypeAdditionalOptions: function (additionalsSelector) {
        $(additionalsSelector).find("input[type='checkbox']").prop("checked", false);
        $(additionalsSelector).hide();
      },

      resetWordTypeAnalysis: function () {
        $("#wordtypeAnalysis").prop("checked", false);
      },

      hasPartialFilters: function () {
        const isMorfo = $("#morfoAnalysis").is(":checked");
        const isSyntactic = $("#syntacticAnalysis").is(":checked");
        const isMorfoSyntatctic = isMorfo && isSyntactic;

        if (isMorfoSyntatctic || isMorfo) {
          const selectedWordType = $("#wordTypeDropdown").val();
          return ClusterSearchForm.helpers.hasPartialWordTypeFilters(selectedWordType);
        }

        return false;
      },

      hasPartialWordTypeFilters: function (wordType) {
        if (wordType === "ALL") {
          return false;
        }

        const wordTypeCheckboxes = $("div.additionals-container[data-group='" + wordType + "']").find("input[type='checkbox']:visible:not(:disabled)");
        return ClusterSearchForm.util.hasPartialFilters(wordTypeCheckboxes);
      }
    },

    util: {
      escapeValueAndReplace: function (unsafeValue) {
        return unsafeValue
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/_/g, "");
      },

      hasPartialFilters: function (checkboxes) {
        let hasPartialFilters = false;
        const groupNames = [];

        checkboxes.each(function () {
          let groupName = $(this).attr("name");
          if ($.inArray(groupName, groupNames) === -1) {
            groupNames.push(groupName);
          }
        });

        $.each(groupNames, function (index, name) {
          if (checkboxes.filter("[name='" + name + "']:checked").length === 0) {
            hasPartialFilters = true;
            return false;
          }
        });

        return hasPartialFilters;
      },

      renderUsagesColumn: function (data) {
        const usages = data.split("<br>");
        if (usages.length > 10) {
          return ClusterSearchForm.util.createUsagesColumn(usages);
        }

        return data;
      },

      createUsagesColumn: function (data) {
        // Container for usages displaying
        const truncatedResultsContainer = $("<div>", {class: "truncated-results"});

        // Partial results span and it's link
        const partialResultsSpan = $("<span>", {
          class: "partial-results",
          title: "[@translations.retrieveTranslation "common.truncated.results" /]",
          "data-toggle": "tooltip",
          "data-placement": "right",
        });

        // jQuery cannot create text nodes the same way as other elements, so using regular JS here
        const partialResultsContent = document.createTextNode(data.slice(0, 10).map(u => u).join("\n"));
        const partialResultsLink = $("<a>", {class: "show-more"});

        partialResultsSpan.append(partialResultsContent);
        partialResultsSpan.append(partialResultsLink);

        // All results span
        const allResultsSpan = $("<span>", {
          class: "all-results hidden",
          title: "[@translations.retrieveTranslation "common.truncated.results" /]",
          "data-toggle": "tooltip",
          "data-placement": "right",
        });
        const allResultsContent = document.createTextNode(data.map(u => u).join("\n"));
        const allResultsLink = $("<a>", {class: "show-less"});

        // jQuery cannot create text nodes the same way as other elements, so using regular JS here
        allResultsSpan.append(allResultsContent);
        allResultsSpan.append(allResultsLink);

        // Appending all the children of the corresponding container
        truncatedResultsContainer.append(partialResultsSpan);
        truncatedResultsContainer.append(allResultsSpan);

        // Datatables expects a string as a returnable so need to convert it to an HTML string here
        // NB! Extra warpping is done due to jQuery behaviour (.html() returns children nodes only)
        return truncatedResultsContainer
          .wrap("<div></div>")
          .parent()
          .html();
      }
    }
  };
  $(document).ready(ClusterSearchForm.init);
</script>
</html>
