import {SetWordContext} from "./Contexts/SetWordContext";
import {useState} from "react";
import {WordContext} from "./Contexts/WordContext";
import {FormContext} from "./Contexts/FormContext";
import {SetFormContext} from "./Contexts/SetFormContext";
import {TypeContext} from "./Contexts/TypeContext";
import {SetTypeContext} from "./Contexts/SetTypeContext";
import WordAnalyser from "./WordAnalyser";
import GrammaticalAnalysis from "./GrammaticalAnalysis";
import {AnalyseContext} from "./Contexts/AnalyseContext";
import TableComponent from "./TableComponent";
import {SyllableContext} from "./Contexts/SyllableContext";
import {SetSyllableContext} from "./Contexts/SetSyllableContext";
import {LemmaContext} from "./Contexts/LemmaContext";
import {SetLemmaContext} from "./Contexts/SetLemmaContext";
import Syllables from "./Syllables";
import LemmaView from "./LemmaView";
import {TabContext} from "./Contexts/TabContext";


export default function WordAnalyserParent() {

  const [wordValue, setWordValue] = useState("")
  const [formValue, setFormValue] = useState("")
  const [typeValue, setTypeValue] = useState("")
  const [analyseValue, setAnalyseValue] = useState({
    ids: [''],
    text: '',
    sentences: [''],
    words: [''],
    wordsOrig: [''],
    lemmas: [''],
    syllables: [''],
    wordtypes: [''],
    wordforms: ['']
  })
  const [syllableValue, setSyllableValue] = useState("")
  const [lemmaValue, setLemmaValue] = useState("")
  const [tabValue, setTabValue] = useState(0)

  return (
    <>
      <SetWordContext.Provider value={setWordValue}>
        <WordContext.Provider value={wordValue}>
          <FormContext.Provider value={formValue}>
            <SetFormContext.Provider value={setFormValue}>
              <TypeContext.Provider value={typeValue}>
                <SetTypeContext.Provider value={setTypeValue}>
                  <AnalyseContext.Provider value={[analyseValue, setAnalyseValue]}>
                    <SyllableContext.Provider value={syllableValue}>
                      <SetSyllableContext.Provider value={setSyllableValue}>
                        <LemmaContext.Provider value={lemmaValue}>
                          <SetLemmaContext.Provider value={setLemmaValue}>
                            <TabContext.Provider value={[tabValue, setTabValue]}>
                              <WordAnalyser/>
                              {tabValue === 1 || tabValue === 2 || tabValue === 3 ? <TableComponent/> : null}
                              {tabValue === 1 ? <Syllables/> : null}
                              {tabValue === 2 ? <LemmaView/> : null}
                              {tabValue === 3 ? <GrammaticalAnalysis/> : null}
                            </TabContext.Provider>
                          </SetLemmaContext.Provider>
                        </LemmaContext.Provider>
                      </SetSyllableContext.Provider>
                    </SyllableContext.Provider>
                  </AnalyseContext.Provider>
                </SetTypeContext.Provider>
              </TypeContext.Provider>
            </SetFormContext.Provider>
          </FormContext.Provider>
        </WordContext.Provider>
      </SetWordContext.Provider>
    </>
  )

}
