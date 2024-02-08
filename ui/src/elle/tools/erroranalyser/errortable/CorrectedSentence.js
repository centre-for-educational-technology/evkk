import { Box } from "@mui/material";
import { Fragment } from "react";
import "./../ErrorAnalyser.css";

export default function CorrectedSentence({ annotations, sentence }) {
  const applyAnnotations = (annotations, sentence) => {
    const modifiedSentence = structuredClone(sentence);
    annotations.forEach((annotation, key) => {
      const errorType = annotation.errorType;

      switch (errorType[0]) {
        case "M": //missing => added
          const addedItem = { ...annotation, status: "added" };
          modifiedSentence.set(key, addedItem);
          break;
        case "U": //unnecessary => deleted
          const deletedItemKey = [
            annotation.scopeStart,
            annotation.scopeEnd,
            -1,
          ].join("::");

          const sourceDeletedItem = sentence.get(deletedItemKey);
          if (sourceDeletedItem) {
            const deletedItem = {
              ...sourceDeletedItem,
              status: "deleted",
            };
            modifiedSentence.set(deletedItemKey, deletedItem);
          }
          break;
        default: //"R" => replaced
          for (let i = annotation.scopeStart; i < annotation.scopeEnd; i++) {
            const replacedItemKey = [i, i + 1, -1].join("::");
            const sourceReplacedItem = sentence.get(replacedItemKey);
            if (sourceReplacedItem) {
              const replacedDeletedItem = {
                ...sourceReplacedItem,
                status: "replaced-deleted",
              };
              modifiedSentence.set(replacedItemKey, replacedDeletedItem);
            }
          }
          const replacedAddedItem = { ...annotation, status: "replaced-added" };
          modifiedSentence.set(key, replacedAddedItem);
      }
    });
    return modifiedSentence;
  };

  const sortSentence = (sentence) => {
    const sortedSentences = Array.from(sentence.entries())
      .map(([key, value]) => {
        const intKey = key.split("::").map(Number);
        return [intKey, value];
      })
      .sort((a, b) => {
        for (let i = 0; i < 3; i++) {
          if (a[0][i] !== b[0][i]) {
            return a[0][i] - b[0][i];
          }
        }
        return 0;
      })
      .map((entry) => entry[1]);

    return sortedSentences;
  };

  const compileSentence = (annotations, sentence) => {
    const modifiedSentence = applyAnnotations(annotations, sentence);
    const sortedSentence = sortSentence(modifiedSentence);
    return (
      <>
        {sortedSentence.map((value, index) => {
          return (
            <Fragment key={index}>
              <span className={value.status}>{value.content}</span>{" "}
            </Fragment>
          );
        })}
      </>
    );
  };

  return (
    <Box className="corrected-sentence">
      {compileSentence(annotations, sentence)}
    </Box>
  );
}
