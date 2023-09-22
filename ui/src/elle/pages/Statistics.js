import React, { useEffect, useState, useCallback } from "react";
import { loadFetch } from "../service/LoadFetch";
import { Checkbox, FormControlLabel } from "@mui/material";
import ChartComponent from "../components/ChartComponent.js";

function Statistics() {
  const [noResultsError, setNoResultsError] = useState(false);
  const [results, setResults] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [showChart, setShowChart] = useState(false);
  //const [selectedValues, setSelectedValues] = useState([]);
  //const [selectedGenders, setSelectedGenders] = useState([]);
  //const [selectedYears, setSelectedYears] = useState([]);
  //const [dataCount, setDataCount] = useState(0);
  //const [chartTitle, setChartTitle] = useState([]);
  //const [yAxisTitle, setYAxisTitle] = useState([]);
  const [corpusCheckboxes, setCorpusCheckboxes] = useState({
    allCorpusCheckboxes: false,
    clWmOIrLa: false,
    cFqPphvYi: false,
    cFOoRQekA: false,
    cYDRkpymb: false,
    cgSRJPKTr: false,
    cZjHWUPtD: false,
    cwUSEqQLt: false
  });

  const [textCheckboxes, setTextCheckboxes] = useState({
    allTextDataCheckboxes: false,
    type: false,
    language: false,
    level: false,
    materialsUsed: false,
    year: false,
    characters: false,
    words: false,
    sentences: false
  });

  const [authorCheckboxes, setAuthorCheckboxes] = useState({
    allAuthorDataCheckboxes: false,
    age: false,
    sex: false,
    education: false,
    motherTongue: false,
    residenceCountry: false
  });


  const [showGenderCheckboxes, setShowGenderCheckboxes] = useState(false);
  const [showAgeCheckboxes, setShowAgeCheckboxes] = useState(false);
  const [showEducationCheckboxes, setShowEducationCheckboxes] = useState(false);
  const [showMotherTongueCheckboxes, setShowMotherTongueCheckboxes] = useState(false);
  const [showCountryOfResidenceCheckboxes, setShowCountryOfResidenceCheckboxes] = useState(false);
  const [showLanguageCheckboxes, setShowLanguageCheckboxes] = useState(false);
  const [showLevelCheckboxes, setShowLevelCheckboxes] = useState(false);
  const [showMaterialCheckboxes, setShowMaterialCheckboxes] = useState(false);

  const checkboxGroups = {
    genderCheckboxes: {
      mees: false,
      naine: false,
    },
    ageCheckboxes: {
      kuni18: false,
      kuni26: false,
      kuni40: false,
      ["41plus"]: false
    },
    educationCheckboxes: {
      põhiharidus: false,
      keskharidus: false,
      kutseharidus: false,
      kõrgharidus: false
    },
    motherTongueCheckboxes: {
      eesti: false,
      vene: false,
      soome: false,
      saksa: false,
      ukraina: false,
      valgevene: false,
      läti: false,
      leedu: false,
      rootsi: false,
      inglise: false,
      jidiš: false,
      itaalia: false,
      jaapani: false,
      poola: false,
      hollandi: false,
      sloveenia: false,
      heebrea: false,
      prantsuse: false,
      katalaani: false,
      ungari: false,
      tšehhi: false
    },
    countryOfResidenceCheckboxes: {
      Eesti: false,
      Soome: false,
      Rootsi: false,
      Venemaa: false,
      Läti: false,
      Leedu: false,
      Saksamaa: false,
      Muu: false
    },
    languageCheckboxes: {
      eesti: false,
      vene: false
    },
    levelCheckboxes: {
      A: false,
      B: false,
      C: false,
      A1: false,
      A2: false,
      B1: false,
      B2: false,
      C1: false,
      C2: false
    },
    materialCheckboxes: {
      jah: false,
      ei: false
    }
  }

  const [checkboxes, setCheckboxes] = useState(checkboxGroups);
  const [dataCount, setDataCount] = useState(0);
  const [arr, setArr] = useState([]);
  const [arr1, setArr1] = useState([]);
  const [arr2, setArr2] = useState([]);
  const [openSubgroups, setOpenSubgroups] = useState([]);







  //getting the data on page load
  const fetchData = useCallback(() => {
    return loadFetch('/api/texts/getAllData', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json());
  }, []);

  useEffect(() => {
    fetchData()
      .then(result => {
        if (result.length > 0) {
          setNoResultsError(false);
          setResults(result);
        } else {
          setNoResultsError(true);
          setResults([]);
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setNoResultsError(true);
        setShowChart(false);
      });
  }, [fetchData]);





  //checkboxes
  const handleCorpusCheckboxChange = (event, checkboxName) => {
    const { value, checked } = event.target;
  
    if (value === "allCorpusCheckboxes") {
      // If the "kõik" checkbox is checked, add all corpus values to the array
      if (checked) {
        setArr([
          "clWmOIrLa",
          "cFqPphvYi",
          "cFOoRQekA",
          "cYDRkpymb",
          "cgSRJPKTr",
          "cZjHWUPtD",
          "cwUSEqQLt",
        ]);
  
        setCorpusCheckboxes({
          allCorpusCheckboxes: true,
          clWmOIrLa: true,
          cFqPphvYi: true,
          cFOoRQekA: true,
          cYDRkpymb: true,
          cgSRJPKTr: true,
          cZjHWUPtD: true,
          cwUSEqQLt: true
        });
      } else {
        // If the "kõik" checkbox is unchecked, clear the array (remove all corpus values)
        setArr([]);
        setCorpusCheckboxes({
          allCorpusCheckboxes: false,
          clWmOIrLa: false,
          cFqPphvYi: false,
          cFOoRQekA: false,
          cYDRkpymb: false,
          cgSRJPKTr: false,
          cZjHWUPtD: false,
          cwUSEqQLt: false
        });
      }
    } else {
      // For individual corpus checkboxes, update the state of the individual checkbox
      setCorpusCheckboxes((prevCheckboxes) => ({
        ...prevCheckboxes,
        [value]: checked,
      }));
  
      if (checked) {
        // Checkbox is checked, add its name to the array
        setArr((prevArr) => [...prevArr, value]);
      } else {
        // Checkbox is unchecked, remove its name from the array
        setArr((prevArr) => prevArr.filter((name) => name !== value));
      }
    }
  };

  const toggleSubgroup = (subgroup) => {
    if (openSubgroups.includes(subgroup)) {
      setOpenSubgroups(openSubgroups.filter((sg) => sg !== subgroup));
    } else {
      // Limit to 2 open subgroups
      if (openSubgroups.length < 2) {
        setOpenSubgroups([...openSubgroups, subgroup]);
      }
    }
    console.log(openSubgroups);
  };
  
  const handleTextCheckboxChange = (event) => {
    const { value, checked } = event.target;
  
    if (checked) {
      // Check if the maximum number of open subgroups is reached
      if (openSubgroups.length < 2) {
        setShowTextSubgroup(value, true);
        toggleSubgroup(value);
      }
    } else {
      setShowTextSubgroup(value, false);
      toggleSubgroup(value);
    }
  
    setTextCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [value]: checked
    }));
  };

  const setShowTextSubgroup = (subgroup, show) => {
    switch (subgroup) {
      case "language":
        setShowLanguageCheckboxes(show);
        break;
      case "level":
        setShowLevelCheckboxes(show);
        break;
      case "material":
        setShowMaterialCheckboxes(show);
        break;
      default:
        break;
    }
  };
  


  const handleAuthorCheckboxChange = (event) => {
    const { value, checked } = event.target;
  
    if (checked) {
      // Check if the maximum number of open subgroups is reached
      if (openSubgroups.length < 2) {
        setShowAuthorSubgroup(value, true);
        toggleSubgroup(value);
      } else {
        alert("You can only open a maximum of two subcategories.");
      }
    } else {
      setShowAuthorSubgroup(value, false);
      toggleSubgroup(value);
    }
  
    setAuthorCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [value]: checked
    }));
  };
  
  const setShowAuthorSubgroup = (subgroup, show) => {
    switch (subgroup) {
      case "age":
        setShowAgeCheckboxes(show);
        break;
      case "sex":
        setShowGenderCheckboxes(show);
        break;
      case "education":
        setShowEducationCheckboxes(show);
        break;
      case "motherTongue":
        setShowMotherTongueCheckboxes(show);
        break;
      case "residenceCountry":
        setShowCountryOfResidenceCheckboxes(show);
        break;
      default:
        break;
    }
  };
  
  

  
  const handleOtherCheckboxChange = (group, checkboxName, checked) => {
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [group]: {
        ...prevCheckboxes[group],
        [checkboxName]: checked,
      },
    }));
  
    if (checked) {
      if (arr1.length === 0) {
        // If arr1 is empty, create a new array with the current [group, checkboxName]
        setArr1([[group, checkboxName]]);
      } else if (!arr1.some(([g, _]) => g === group)) {
        // If arr1 is not empty and the group doesn't match arr1's group, create arr2
        setArr2((prevArr) => [...prevArr, [group, checkboxName]]);
      } else {
        // If arr1 is not empty and the group matches arr1's group, add [group, checkboxName] to arr1
        setArr1((prevArr) => [...prevArr, [group, checkboxName]]);
      }
    } else {
      // Checkbox is unchecked, remove the [group, checkboxName] from arr1 and arr2
      setArr1((prevArr) =>
        prevArr.filter(([g, name]) => !(g === group && name === checkboxName))
      );
      setArr2((prevArr) =>
        prevArr.filter(([g, name]) => !(g === group && name === checkboxName))
      );
    }
    console.log(arr1);
    console.log(arr2);
  };
  
  
  
  

  const countDataRows = () => {
    const filteredData = results.filter((row) => {
      const corpusCheckboxesSelected = Object.entries(corpusCheckboxes)
        .filter(([checkboxName, isChecked]) => isChecked)
        .map(([checkboxName]) => checkboxName);
  
      const arr1CheckboxesSelected = arr1.map(([_, checkboxName]) => checkboxName);
      const arr2CheckboxesSelected = arr2.map(([_, checkboxName]) => checkboxName);
  
      const isArr1Present = arr1CheckboxesSelected.some((checkboxName) => row.includes(checkboxName));
      const isArr2Present = arr2CheckboxesSelected.some((checkboxName) => row.includes(checkboxName));
  
      return (
        (corpusCheckboxesSelected.length === 0 || corpusCheckboxesSelected.some((checkboxName) => row.includes(checkboxName))) &&
        ((arr1CheckboxesSelected.length === 0 || isArr1Present) && (arr2CheckboxesSelected.length === 0 || isArr2Present))
      );
    });
  
    setDataCount(filteredData.length);
  };
  
  
  useEffect(() => {
    // Call countDataRows whenever arr, corpusCheckboxes, or other checkboxes change
    countDataRows();
  }, [arr, corpusCheckboxes, checkboxes]);
  
  
  useEffect(() => {
    // Call countDataRows whenever arr, corpusCheckboxes, or other checkboxes change
    countDataRows();
  }, [arr, corpusCheckboxes, checkboxes]);
  
  
  

  useEffect(() => {
    // Call countDataRows whenever arr changes
    countDataRows();
  }, [arr, corpusCheckboxes]);
  


  const renderCheckbox = (label, value, checked, onChange) => {
    // Determine if the checkbox should be disabled
    const isDisabled = openSubgroups.length >= 2 && !checked;
  
    return (
      <FormControlLabel
        control={
          <Checkbox
            value={value}
            checked={checked}
            onChange={onChange}
            disabled={isDisabled}
          />
        }
        label={label}
      />
    );
  };

  return (
    <>
    {openSubgroups.length >= 2 && (
      <p>You can only open a maximum of two subcategories.</p>
    )}

    



      <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '20px', margin: '50px' }}>
        
        {/* Corpus Checkboxes */}
        <div style={{ display: 'flex', flexDirection: 'column', marginRight: '50px' }}>
          <label>Korpus</label>
          <FormControlLabel
            control={<Checkbox value="allCorpusCheckboxes" 
              checked={Object.values(corpusCheckboxes).every(Boolean)} 
              onChange={handleCorpusCheckboxChange} />
            }
            label="kõik"
          />
          <FormControlLabel
            control={<Checkbox value="clWmOIrLa" checked={corpusCheckboxes.clWmOIrLa} onChange={handleCorpusCheckboxChange} />}
            label="K2 riiklikud eksamitööd"
          />
          <FormControlLabel
            control={<Checkbox value="cFqPphvYi" checked={corpusCheckboxes.cFqPphvYi} onChange={handleCorpusCheckboxChange} />}
            label="K2 olümpiaaditööd"
          />
          <FormControlLabel
            control={<Checkbox value="cFOoRQekA" checked={corpusCheckboxes.cFOoRQekA} onChange={handleCorpusCheckboxChange} />}
            label="K2 keeleõpe"
          />
          <FormControlLabel
            control={<Checkbox value="cYDRkpymb" checked={corpusCheckboxes.cYDRkpymb} onChange={handleCorpusCheckboxChange} />}
            label="K1 eesti keel"
          />
          <FormControlLabel
            control={<Checkbox value="cgSRJPKTr" checked={corpusCheckboxes.cgSRJPKTr} onChange={handleCorpusCheckboxChange} />}
            label="K1 vene keel"
          />
          <FormControlLabel
            control={<Checkbox value="cZjHWUPtD" checked={corpusCheckboxes.cZjHWUPtD} onChange={handleCorpusCheckboxChange} />}
            label="K3 vene keel"
          />
          <FormControlLabel
            control={<Checkbox value="cwUSEqQLt" checked={corpusCheckboxes.cwUSEqQLt} onChange={handleCorpusCheckboxChange} />}
            label="Akadeemiline eesti keel"
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '20px', margin: '50px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', marginRight: '50px' }}>
        {/* Render text data checkboxes */}
        <label>Teksti Andmed</label>
        {renderCheckbox("Liik", "type", textCheckboxes.type, handleTextCheckboxChange)}
        {renderCheckbox("Keel", "language", textCheckboxes.language, handleTextCheckboxChange)}
        {renderCheckbox("Tase", "level", textCheckboxes.level, handleTextCheckboxChange)}
        {renderCheckbox("Kasutatud õppematerjale", "materialsUsed", textCheckboxes.materialsUsed, handleTextCheckboxChange)}
        {renderCheckbox("Lisamise aasta", "year", textCheckboxes.year, handleTextCheckboxChange)}
        {renderCheckbox("Tähemärke", "characters", textCheckboxes.characters, handleTextCheckboxChange)}
        {renderCheckbox("Sõnu", "words", textCheckboxes.words, handleTextCheckboxChange)}
        {renderCheckbox("Lauseid", "sentences", textCheckboxes.sentences, handleTextCheckboxChange)}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', marginRight: '50px' }}>
        {/* Render author data checkboxes */}
        <label>Autori Andmed</label>
        {renderCheckbox("Vanus", "age", authorCheckboxes.age, handleAuthorCheckboxChange)}
        {renderCheckbox("Sugu", "sex", authorCheckboxes.sex, handleAuthorCheckboxChange)}
        {renderCheckbox("Haridus", "education", authorCheckboxes.education, handleAuthorCheckboxChange)}
        {renderCheckbox("Emakeel", "motherTongue", authorCheckboxes.motherTongue, handleAuthorCheckboxChange)}
        {renderCheckbox("Elukohariik", "residenceCountry", authorCheckboxes.residenceCountry, handleAuthorCheckboxChange)}
        {/* Add more author data checkboxes as needed */}
        </div>
        </div>

        {/* Text Data Checkboxes */}
        {/* <div style={{ display: 'flex', flexDirection: 'column', marginRight: '50px' }}>
          <label>Teksti Andmed</label>
          <FormControlLabel
            control={<Checkbox value="type" checked={textCheckboxes.type} onChange={handleTextCheckboxChange} />}
            label="Liik"
          />
          <FormControlLabel
            control={<Checkbox value="language" checked={textCheckboxes.language} onChange={handleTextCheckboxChange} />}
            label="Keel"
          />
          <FormControlLabel
            control={<Checkbox value="level" checked={textCheckboxes.level} onChange={handleTextCheckboxChange} />}
            label="Tase"
          />
          <FormControlLabel
            control={<Checkbox value="materialsUsed" checked={textCheckboxes.materialsUsed} onChange={handleTextCheckboxChange} />}
            label="Kasutatud õppematerjale"
          />
          <FormControlLabel
            control={<Checkbox value="year" checked={textCheckboxes.year} onChange={handleTextCheckboxChange} />}
            label="Lisamise aasta"
          />
          <FormControlLabel
            control={<Checkbox value="characters" checked={textCheckboxes.characters} onChange={handleTextCheckboxChange} />}
            label="Tähemärke"
          />
          <FormControlLabel
            control={<Checkbox value="words" checked={textCheckboxes.words} onChange={handleTextCheckboxChange} />}
            label="Sõnu"
          />
          <FormControlLabel
            control={<Checkbox value="sentences" checked={textCheckboxes.sentences} onChange={handleTextCheckboxChange} />}
            label="Lauseid"
          />
        </div> */}

        {/* Author Data Checkboxes */}
        {/* <div style={{ display: 'flex', flexDirection: 'column', marginRight: '50px' }}>
          <label>Autori Andmed</label>
          <FormControlLabel
            control={<Checkbox value="age" checked={authorCheckboxes.age} onChange={handleAuthorCheckboxChange} />}
            label="Vanus"
          />
          <FormControlLabel
            control={<Checkbox value="sex" checked={authorCheckboxes.sex} onChange={handleAuthorCheckboxChange} />}
            label="Sugu"
          />
          <FormControlLabel
            control={<Checkbox value="education" checked={authorCheckboxes.education} onChange={handleAuthorCheckboxChange} />}
            label="Haridus"
          />
          <FormControlLabel
            control={<Checkbox value="motherTongue" checked={authorCheckboxes.motherTongue} onChange={handleAuthorCheckboxChange} />}
            label="Emakeel"
          />
          <FormControlLabel
            control={<Checkbox value="residenceCountry" checked={authorCheckboxes.residenceCountry} onChange={handleAuthorCheckboxChange} />}
            label="Elukohariik"
          />
        </div> */}
      </div>




      {/* Language Checkboxes */}
      {showLanguageCheckboxes && (
        <div style={{ display: "flex", flexDirection: "column", marginRight: "50px" }}>
          <label>Keel</label>
          <FormControlLabel
            control={<Checkbox value="eesti" checked={checkboxes.languageCheckboxes.eesti} onChange={(e) => handleOtherCheckboxChange("languageCheckboxes", "eesti", e.target.checked)} />}
            label="eesti"
          />
          <FormControlLabel
            control={<Checkbox value="vene" checked={checkboxes.languageCheckboxes.vene} onChange={(e) => handleOtherCheckboxChange("languageCheckboxes", "vene", e.target.checked)} />}
            label="vene"
          />
        </div>
      )}

      {/* Level Checkboxes */}
      {showLevelCheckboxes && (
        <div style={{ display: "flex", flexDirection: "column", marginRight: "50px" }}>
          <label>Tase</label>
          <FormControlLabel
            control={<Checkbox value="A" checked={checkboxes.levelCheckboxes.A} onChange={(e) => handleOtherCheckboxChange("levelCheckboxes", "A", e.target.checked)} />}
            label="A"
          />
          <FormControlLabel
            control={<Checkbox value="B" checked={checkboxes.levelCheckboxes.B} onChange={(e) => handleOtherCheckboxChange("levelCheckboxes", "B", e.target.checked)} />}
            label="B"
          />
          <FormControlLabel
            control={<Checkbox value="C" checked={checkboxes.levelCheckboxes.C} onChange={(e) => handleOtherCheckboxChange("levelCheckboxes", "C", e.target.checked)} />}
            label="C"
          />
          <FormControlLabel
            control={<Checkbox value="A1" checked={checkboxes.levelCheckboxes.A1} onChange={(e) => handleOtherCheckboxChange("levelCheckboxes", "A1", e.target.checked)} />}
            label="A1"
          />
          <FormControlLabel
            control={<Checkbox value="A2" checked={checkboxes.levelCheckboxes.A2} onChange={(e) => handleOtherCheckboxChange("levelCheckboxes", "A2", e.target.checked)} />}
            label="A2"
          />
          <FormControlLabel
            control={<Checkbox value="B1" checked={checkboxes.levelCheckboxes.B1} onChange={(e) => handleOtherCheckboxChange("levelCheckboxes", "B1", e.target.checked)} />}
            label="B1"
          />
          <FormControlLabel
            control={<Checkbox value="B2" checked={checkboxes.levelCheckboxes.B2} onChange={(e) => handleOtherCheckboxChange("levelCheckboxes", "B2", e.target.checked)} />}
            label="B2"
          />
          <FormControlLabel
            control={<Checkbox value="C1" checked={checkboxes.levelCheckboxes.C1} onChange={(e) => handleOtherCheckboxChange("levelCheckboxes", "C1", e.target.checked)} />}
            label="C1"
          />
          <FormControlLabel
            control={<Checkbox value="C2" checked={checkboxes.levelCheckboxes.C2} onChange={(e) => handleOtherCheckboxChange("levelCheckboxes", "C2", e.target.checked)} />}
            label="C2"
          />
        </div>
      )}

      {/* Material Checkboxes */}
      {showMaterialCheckboxes && (
        <div style={{ display: "flex", flexDirection: "column", marginRight: "50px" }}>
          <label>Kasutatud õppematerjale</label>
          <FormControlLabel
            control={<Checkbox value="jah" checked={checkboxes.materialCheckboxes.jah} onChange={(e) => handleOtherCheckboxChange("materialCheckboxes", "jah", e.target.checked)} />}
            label="jah"
          />
          <FormControlLabel
            control={<Checkbox value="ei" checked={checkboxes.materialCheckboxes.ei} onChange={(e) => handleOtherCheckboxChange("materialCheckboxes", "ei", e.target.checked)} />}
            label="ei"
          />
        </div>
      )}




      {/* Age Checkboxes */}
      {showAgeCheckboxes && (
        <div style={{ display: "flex", flexDirection: "column", marginRight: "50px" }}>
          <label>Vanus</label>
          <FormControlLabel
            control={<Checkbox value="kuni18" checked={checkboxes.ageCheckboxes.kuni18} onChange={(e) => handleOtherCheckboxChange("ageCheckboxes", "kuni18", e.target.checked)} />}
            label="kuni 18"
          />
          <FormControlLabel
            control={<Checkbox value="kuni26" checked={checkboxes.ageCheckboxes.kuni26} onChange={(e) => handleOtherCheckboxChange("ageCheckboxes", "kuni26", e.target.checked)} />}
            label="18 - 26"
          />
          <FormControlLabel
            control={<Checkbox value="kuni40" checked={checkboxes.ageCheckboxes.kuni40} onChange={(e) => handleOtherCheckboxChange("ageCheckboxes", "kuni40", e.target.checked)} />}
            label="27 - 40"
          />
          <FormControlLabel
            control={<Checkbox value="41plus" checked={checkboxes.ageCheckboxes["41plus"]} onChange={(e) => handleOtherCheckboxChange("ageCheckboxes", "41plus", e.target.checked)} />}
            label="41 +"
          />
        </div>
      )}

      {/* Gender Checkboxes */}
      {showGenderCheckboxes && (
        <div style={{ display: "flex", flexDirection: "column", marginRight: "50px" }}>
          <label>Sugu</label>
          <FormControlLabel
            control={<Checkbox value="mees" checked={checkboxes.genderCheckboxes.mees} onChange={(e) => handleOtherCheckboxChange("genderCheckboxes", "mees", e.target.checked)} />}
            label="mees"
          />
          <FormControlLabel
            control={<Checkbox value="naine" checked={checkboxes.genderCheckboxes.naine} onChange={(e) => handleOtherCheckboxChange("genderCheckboxes", "naine", e.target.checked)} />}
            label="naine"
          />
        </div>
      )}

      {/* Education Checkboxes */}
      {showEducationCheckboxes && (
        <div style={{ display: "flex", flexDirection: "column", marginRight: "50px" }}>
          <label>Haridus</label>
          <FormControlLabel
            control={<Checkbox value="põhiharidus" checked={checkboxes.educationCheckboxes.põhiharidus} onChange={(e) => handleOtherCheckboxChange("educationCheckboxes", "põhiharidus", e.target.checked)} />}
            label="algharidus/põhiharidus"
          />
          <FormControlLabel
            control={<Checkbox value="keskharidus" checked={checkboxes.educationCheckboxes.keskharidus} onChange={(e) => handleOtherCheckboxChange("educationCheckboxes", "keskharidus", e.target.checked)} />}
            label="keskharidus"
          />
          <FormControlLabel
            control={<Checkbox value="kutseharidus" checked={checkboxes.educationCheckboxes.kutseharidus} onChange={(e) => handleOtherCheckboxChange("educationCheckboxes", "kutseharidus", e.target.checked)} />}
            label="keskeriharidus/kutseharidus"
          />
          <FormControlLabel
            control={<Checkbox value="kõrgharidus" checked={checkboxes.educationCheckboxes.kõrgharidus} onChange={(e) => handleOtherCheckboxChange("educationCheckboxes", "kõrgharidus", e.target.checked)} />}
            label="kõrgharidus"
          />
        </div>
      )}

      {/* MotherTongue Checkboxes */}
      {showMotherTongueCheckboxes && (
        <div style={{ display: "flex", flexDirection: "column", marginRight: "50px" }}>
          <label>Emakeel</label>
          <FormControlLabel
            control={<Checkbox value="eesti" checked={checkboxes.motherTongueCheckboxes.eesti} onChange={(e) => handleOtherCheckboxChange("motherTongueCheckboxes", "eesti", e.target.checked)} />}
            label="eesti"
          />
          <FormControlLabel
            control={<Checkbox value="vene" checked={checkboxes.motherTongueCheckboxes.vene} onChange={(e) => handleOtherCheckboxChange("motherTongueCheckboxes", "vene", e.target.checked)} />}
            label="vene"
          />
          <FormControlLabel
            control={<Checkbox value="soome" checked={checkboxes.motherTongueCheckboxes.soome} onChange={(e) => handleOtherCheckboxChange("motherTongueCheckboxes", "soome", e.target.checked)} />}
            label="soome"
          />
          <FormControlLabel
            control={<Checkbox value="saksa" checked={checkboxes.motherTongueCheckboxes.saksa} onChange={(e) => handleOtherCheckboxChange("motherTongueCheckboxes", "saksa", e.target.checked)} />}
            label="saksa"
          />
          <FormControlLabel
            control={<Checkbox value="ukraina" checked={checkboxes.motherTongueCheckboxes.ukraina} onChange={(e) => handleOtherCheckboxChange("motherTongueCheckboxes", "ukraina", e.target.checked)} />}
            label="ukraina"
          />
          <FormControlLabel
            control={<Checkbox value="valgevene" checked={checkboxes.motherTongueCheckboxes.valgevene} onChange={(e) => handleOtherCheckboxChange("motherTongueCheckboxes", "valgevene", e.target.checked)} />}
            label="valgevene"
          />
          <FormControlLabel
            control={<Checkbox value="läti" checked={checkboxes.motherTongueCheckboxes.läti} onChange={(e) => handleOtherCheckboxChange("motherTongueCheckboxes", "läti", e.target.checked)} />}
            label="läti"
          />
          <FormControlLabel
            control={<Checkbox value="leedu" checked={checkboxes.motherTongueCheckboxes.leedu} onChange={(e) => handleOtherCheckboxChange("motherTongueCheckboxes", "leedu", e.target.checked)} />}
            label="leedu"
          />
          <FormControlLabel
            control={<Checkbox value="rootsi" checked={checkboxes.motherTongueCheckboxes.rootsi} onChange={(e) => handleOtherCheckboxChange("motherTongueCheckboxes", "rootsi", e.target.checked)} />}
            label="rootsi"
          />
          <FormControlLabel
            control={<Checkbox value="inglise" checked={checkboxes.motherTongueCheckboxes.inglise} onChange={(e) => handleOtherCheckboxChange("motherTongueCheckboxes", "inglise", e.target.checked)} />}
            label="inglise"
          />
          <FormControlLabel
            control={<Checkbox value="jidiš" checked={checkboxes.motherTongueCheckboxes.jidiš} onChange={(e) => handleOtherCheckboxChange("motherTongueCheckboxes", "jidiš", e.target.checked)} />}
            label="jidiš"
          />
          <FormControlLabel
            control={<Checkbox value="itaalia" checked={checkboxes.motherTongueCheckboxes.itaalia} onChange={(e) => handleOtherCheckboxChange("motherTongueCheckboxes", "itaalia", e.target.checked)} />}
            label="itaalia"
          />
          <FormControlLabel
            control={<Checkbox value="jaapani" checked={checkboxes.motherTongueCheckboxes.jaapani} onChange={(e) => handleOtherCheckboxChange("motherTongueCheckboxes", "jaapani", e.target.checked)} />}
            label="jaapani"
          />
          <FormControlLabel
            control={<Checkbox value="poola" checked={checkboxes.motherTongueCheckboxes.poola} onChange={(e) => handleOtherCheckboxChange("motherTongueCheckboxes", "poola", e.target.checked)} />}
            label="poola"
          />
          <FormControlLabel
            control={<Checkbox value="hollandi" checked={checkboxes.motherTongueCheckboxes.hollandi} onChange={(e) => handleOtherCheckboxChange("motherTongueCheckboxes", "hollandi", e.target.checked)} />}
            label="hollandi"
          />
          <FormControlLabel
            control={<Checkbox value="sloveenia" checked={checkboxes.motherTongueCheckboxes.sloveenia} onChange={(e) => handleOtherCheckboxChange("motherTongueCheckboxes", "sloveenia", e.target.checked)} />}
            label="sloveenia"
          />
          <FormControlLabel
            control={<Checkbox value="heebrea" checked={checkboxes.motherTongueCheckboxes.heebrea} onChange={(e) => handleOtherCheckboxChange("motherTongueCheckboxes", "heebrea", e.target.checked)} />}
            label="heebrea"
          />
          <FormControlLabel
            control={<Checkbox value="prantsuse" checked={checkboxes.motherTongueCheckboxes.prantsuse} onChange={(e) => handleOtherCheckboxChange("motherTongueCheckboxes", "prantsuse", e.target.checked)} />}
            label="prantsuse"
          />
          <FormControlLabel
            control={<Checkbox value="katalaani" checked={checkboxes.motherTongueCheckboxes.katalaani} onChange={(e) => handleOtherCheckboxChange("motherTongueCheckboxes", "katalaani", e.target.checked)} />}
            label="katalaani"
          />
          <FormControlLabel
            control={<Checkbox value="ungari" checked={checkboxes.motherTongueCheckboxes.ungari} onChange={(e) => handleOtherCheckboxChange("motherTongueCheckboxes", "ungari", e.target.checked)} />}
            label="ungari"
          />
          <FormControlLabel
            control={<Checkbox value="tšehhi" checked={checkboxes.motherTongueCheckboxes.tšehhi} onChange={(e) => handleOtherCheckboxChange("motherTongueCheckboxes", "tšehhi", e.target.checked)} />}
            label="tšehhi"
          />
        </div>
      )}

      {/* CountryOfResidence Checkboxes */}
      {showCountryOfResidenceCheckboxes && (
        <div style={{ display: "flex", flexDirection: "column", marginRight: "50px" }}>
          <label>Elukohariik</label>
          <FormControlLabel
            control={<Checkbox value="Eesti" checked={checkboxes.countryOfResidenceCheckboxes.Eesti} onChange={(e) => handleOtherCheckboxChange("countryOfResidenceCheckboxes", "Eesti", e.target.checked)} />}
            label="Eesti"
          />
          <FormControlLabel
            control={<Checkbox value="Soome" checked={checkboxes.countryOfResidenceCheckboxes.Soome} onChange={(e) => handleOtherCheckboxChange("countryOfResidenceCheckboxes", "Soome", e.target.checked)} />}
            label="Soome"
          />
          <FormControlLabel
            control={<Checkbox value="Rootsi" checked={checkboxes.countryOfResidenceCheckboxes.Rootsi} onChange={(e) => handleOtherCheckboxChange("countryOfResidenceCheckboxes", "Rootsi", e.target.checked)} />}
            label="Rootsi"
          />
          <FormControlLabel
            control={<Checkbox value="Venemaa" checked={checkboxes.countryOfResidenceCheckboxes.Venemaa} onChange={(e) => handleOtherCheckboxChange("countryOfResidenceCheckboxes", "Venemaa", e.target.checked)} />}
            label="Venemaa"
          />
          <FormControlLabel
            control={<Checkbox value="Läti" checked={checkboxes.countryOfResidenceCheckboxes.Läti} onChange={(e) => handleOtherCheckboxChange("countryOfResidenceCheckboxes", "Läti", e.target.checked)} />}
            label="Läti"
          />
          <FormControlLabel
            control={<Checkbox value="Leedu" checked={checkboxes.countryOfResidenceCheckboxes.Leedu} onChange={(e) => handleOtherCheckboxChange("countryOfResidenceCheckboxes", "Leedu", e.target.checked)} />}
            label="Leedu"
          />
          <FormControlLabel
            control={<Checkbox value="Saksamaa" checked={checkboxes.countryOfResidenceCheckboxes.Saksamaa} onChange={(e) => handleOtherCheckboxChange("countryOfResidenceCheckboxes", "Saksamaa", e.target.checked)} />}
            label="Saksamaa"
          />
          <FormControlLabel
            control={<Checkbox value="Muu" checked={checkboxes.countryOfResidenceCheckboxes.Muu} onChange={(e) => handleOtherCheckboxChange("countryOfResidenceCheckboxes", "Muu", e.target.checked)} />}
            label="Muu"
          />
        </div>
      )}


      {/* Data Count */}
      <div style={{ marginLeft: '80px', marginTop: '80px', fontWeight: 'bold' }}>
        <p>Kirjeid: {dataCount}</p>
      </div>



      {/* Chart */}
      
      {/*{showChart && (
        <>
          {noResultsError ? (
            <p>No results found.</p>
          ) : (
            <ChartComponent
              data={[["Category", "Value"], ...chartData]}
              title={chartTitle}
              xAxisTitle="Tekstide arv"
              yAxisTitle={yAxisTitle}
            />
          )}
        </>
      )}*/}

    </>
  );
}

export default Statistics;
