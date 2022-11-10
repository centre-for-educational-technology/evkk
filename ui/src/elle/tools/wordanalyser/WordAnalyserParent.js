import {
  AnalyseContext,
  FormContext,
  LemmaContext,
  SetFormContext,
  SetLemmaContext,
  SetSyllableContext,
  SetTypeContext,
  SetWordContext,
  SyllableContext,
  TabContext,
  TypeContext,
  WordContext
} from "./Contexts";
import {useState} from "react";
import WordAnalyser from "./WordAnalyser";
import GrammaticalAnalysis from "./GrammaticalAnalysis";
import TableComponent from "./TableComponent";
import Syllables from "./Syllables";
import LemmaView from "./LemmaView";

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
