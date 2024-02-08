import { Box } from "@mui/material";
import { useEffect } from "react";

export default function CorrectedSentence({ annotations, sentence }) {
  const applyAnnotations = (annotations, sentence) => {
    let modiefiedSentence = sentence;
    annotations.forEach((annotation, key) => {
      const errorType = annotation.errorType;

      switch (errorType[0]) {
        case "M":
          return modiefiedSentence.set(key, annotation);
        case "U":
          return modiefiedSentence.set(key, annotation);
        case "R":
          return modiefiedSentence.set(key, annotation);
      }

      //   let start = annotation.scopeStart;
      //   const end = annotation.scopeEnd;
      //   //   for (start; end; start++) {
      //   //     //TODO
      //   //   }

      //   modiefiedSentence.set(key, annotation);
    });
    console.log(modiefiedSentence);
    return sentence;
  };

  const sortSentence = (sentence) => {
    return Array.from(sentence.values());

    // const compiledItems = sentence.concat(annotations).sort((a, b) => {
    //       const keyA = a.key;
    //       const keyB = b.key;

    //       for (let i = 0; i < 3; i++) {
    //         if (keyA[i] !== keyB[i]) {
    //           return keyA[i] - keyB[i];
    //         }
    //       }

    //       return 0; // The keys are equal
    //     });
  };

  const compileSentence = (sentence) => {
    const sortedSentence = sortSentence(sentence);
    return (
      <span>
        {sortedSentence.map((value, index) => {
          return <span key={index}>{value.content + " "} </span>;
        })}
      </span>
    );
  };

  useEffect(() => {
    //const temp = applyAnnotationsToSentence(annotations, sentence);
    // console.log(compileSentence(sentence));
    // console.log(sentence);
  }, [annotations, sentence]);

  //     const compileCorrectedSentence = (annotations, sentence) => {
  //     const compiledItems = sentence.concat(annotations).sort((a, b) => {
  //       const keyA = a.key;
  //       const keyB = b.key;

  //       for (let i = 0; i < 3; i++) {
  //         if (keyA[i] !== keyB[i]) {
  //           return keyA[i] - keyB[i];
  //         }
  //       }

  //       return 0; // The keys are equal
  //     });
  //     console.log(compiledItems);
  //   };

  //   compileCorrectedSentence(annotations, sentence);
  return <Box>{compileSentence(sentence)}</Box>;
}
