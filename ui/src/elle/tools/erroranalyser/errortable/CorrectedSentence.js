import { Fragment, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import './../ErrorAnalyser.css';
import AnnotatedWord from './AnnotatedWord';

export default function CorrectedSentence({ annotations, sentence }) {
  const [sortedSentence, setSortedSentence] = useState();
  const applyAnnotations = (annotations, sentence) => {
    const modifiedSentence = structuredClone(sentence);
    annotations.forEach((annotation, key) => {
      const errorType = annotation.errorType;

      switch (errorType[0]) {
        case 'M': //missing => added
          const addedItem = {
            ...annotation,
            status: 'added',
          };
          modifiedSentence.set(key, addedItem);
          break;
        case 'U': //unnecessary => deleted
          const deletedItemKey = [
            annotation.scopeStart,
            annotation.scopeEnd,
            -1,
          ].join('::');

          const sourceDeletedItem = sentence.get(deletedItemKey);
          if (sourceDeletedItem) {
            const deletedItem = {
              ...sourceDeletedItem,
              status: 'deleted',
            };
            modifiedSentence.set(deletedItemKey, deletedItem);
          }
          break;
        default: //"R" => replaced
          for (let i = annotation.scopeStart; i < annotation.scopeEnd; i++) {
            const replacedItemKey = [i, i + 1, -1].join('::');
            const sourceReplacedItem = sentence.get(replacedItemKey);
            if (sourceReplacedItem) {
              const replacedDeletedItem = {
                ...sourceReplacedItem,
                status: 'replaced-deleted',
              };
              modifiedSentence.set(replacedItemKey, replacedDeletedItem);
            }
          }
          const replacedAddedItem = {
            ...annotation,
            status: 'replaced-added',
          };
          modifiedSentence.set(key, replacedAddedItem);
      }
    });
    return modifiedSentence;
  };

  const sortSentence = (sentence) => {
    const sortedSentences = Array.from(sentence.entries())
      .map(([key, value]) => {
        const intKey = key.split('::').map(Number);
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

  useEffect(() => {
    const modifiedSentence = applyAnnotations(annotations, sentence);
    setSortedSentence(sortSentence(modifiedSentence));
  }, [annotations, sentence]);

  return (
    <Box className="corrected-sentence">
      {sortedSentence &&
        sortedSentence.map((item, index) => {
          if (item.status !== 'deleted' && item.status !== 'replaced-deleted') {
            if (item.status === 'initial') {
              return (
                <Fragment key={index}>
                  <span>{item.content}</span>{' '}
                </Fragment>
              );
            } else if (!item.nested) {
              return <AnnotatedWord key={index} item={item} />;
            } else {
              //WO with nested annotations
              const content = [];
              let splitContent = item.content.split(' ');
              item.nested.forEach((nestedItem) => {
                if (nestedItem.errorType === 'R:WS') {
                  const end = item.content.indexOf(nestedItem.content);
                  var tempString = item.content.substring(0, end);
                  var count = (tempString.match(/ /g) || []).length;
                  splitContent[count] = nestedItem.content;
                  for (
                    let i = count + 1;
                    i < nestedItem.content.split(' ').length + 1;
                    i++
                  ) {
                    splitContent[i] = null;
                  }
                }
              });
              splitContent = splitContent.filter((n) => n);

              splitContent.forEach((contentItem) => {
                let tempItem;
                item.nested.forEach((nestedItem, nestedItemIndex) => {
                  if (nestedItem.content === contentItem.toLowerCase()) {
                    const modifiedNestedItem = {
                      ...nestedItem,
                      content: contentItem,
                    };
                    tempItem = (
                      <AnnotatedWord
                        item={modifiedNestedItem}
                        addSucceedingSpace={false}
                        parent={item}
                      />
                    );
                  }
                });

                const constructedItem = {
                  content: contentItem,
                  errorType: 'R:WO',
                };

                tempItem
                  ? content.push(tempItem)
                  : content.push(
                      <AnnotatedWord
                        item={constructedItem}
                        addSucceedingSpace={false}
                        parent={item}
                      />
                    );
              });

              return (
                <Fragment key={index}>
                  <span className={item.category}>
                    {content.map((contentItem, contentIndex) => (
                      <Fragment key={contentIndex}>
                        {contentItem}
                        {contentIndex !== content.length - 1 && <span> </span>}
                      </Fragment>
                    ))}
                  </span>{' '}
                </Fragment>
              );
            }
          } else {
            return null;
          }
        })}
    </Box>
  );
}
