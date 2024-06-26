import { Fragment } from 'react';
import { Box } from '@mui/material';
import './../ErrorAnalyser.css';
import AnnotatedWord from './AnnotatedWord';

export default function CorrectedSentence({
                                            sentence,
                                            filters,
                                            showAllErrors,
                                          }) {
  const elementsWithoutPrecedingWhitespace = ['.', ',', ';', '!', '?', '...', ')', ']', '}', ':'];
  const elementsWithoutFollowingWhitespace = ['(', '[', '{'];
  const quotationMarks = ['"', '\''];
  let isQuotesEvenNumber = true;

  const checkAnnotationVisibility = (errorTypes) => {
    if (showAllErrors) {
      return true;
    }
    return errorTypes.some(errorType => filters.errorType.includes(errorType));
  };

  const checkInclusion = (item) => {
    const exclusionTagsForShowAll = ['replaced-deleted'];
    const exclusionTagsForShowSelected = ['replaced-deleted', 'deleted'];

    const status = item.status ?? '';
    const extractedErrorTypes = item.extractedErrorTypes ?? [];


    if (showAllErrors) {
      return !exclusionTagsForShowAll.includes(status);
    } else {
      if (filters.errorType.some(element => extractedErrorTypes.includes(element))) {
        return !exclusionTagsForShowAll.includes(status);
      } else {
        return !exclusionTagsForShowSelected.includes(status);
      }
    }
  };

  return (
    <Box className="nested-cell corrected-sentence">
      {sentence &&
        sentence.map((item, index) => {
          const isLastItem = index === sentence.length - 1;
          let isFollowedByWhiteSpace = true;
          const currentItemContent = item.content.split(' ');

          //kontrollib, kas eemaldada järgnevat tühikut
          if (checkInclusion(item) && !isLastItem) {
            let nextItemIndex = 1;
            let nextItem = sentence[index + nextItemIndex];

            while (!checkInclusion(nextItem) && (index + nextItemIndex + 1) < sentence.length) {
              nextItemIndex++;
              nextItem = sentence[index + nextItemIndex];
            }

            if (checkInclusion(nextItem)) {
              const nextItemContent = nextItem.content.split(' ');
              //kui praegune on kirjavahemärk, mille järel ei käi tühik
              if (elementsWithoutFollowingWhitespace.includes(currentItemContent[0])) {
                isFollowedByWhiteSpace = false;
              }
              //kui järgmine on kirjavahemärk, mille ees ei käi tühik
              if (elementsWithoutPrecedingWhitespace.includes(nextItemContent[0])) {
                isFollowedByWhiteSpace = false;
              }
              //kui praegune on jutumärk ja lahtisi jutumärke ei ole
              if (quotationMarks.includes(currentItemContent[0]) && isQuotesEvenNumber) {
                isFollowedByWhiteSpace = false;
              }
              //kui praegune on jutumärk ja jutumärgid on lahtised ja järgmine on kirjavahemärk
              if (quotationMarks.includes(currentItemContent[0]) && !isQuotesEvenNumber && ['.', '!', '?'].includes(nextItemContent[0])) {
                isFollowedByWhiteSpace = false;
              }
              //kui järgmine on jutumärk ja jutumärgid on lahtised
              if (quotationMarks.includes(nextItemContent[0]) && !isQuotesEvenNumber) {
                isFollowedByWhiteSpace = false;
              }
              //jutumärgi oleku arvestus
              if (quotationMarks.includes(currentItemContent[0])) {
                isQuotesEvenNumber = !isQuotesEvenNumber;
              }
            }
          }

          if (item.status !== 'replaced-deleted') {
            if (item.status === 'initial') {
              return (
                <Fragment key={index}>
                  <span>{item.content}</span>{isFollowedByWhiteSpace && ' '}
                </Fragment>
              );
            } else if (!item.nested) {
              return (
                <AnnotatedWord
                  key={index}
                  item={item}
                  addSucceedingSpace={isFollowedByWhiteSpace}
                  showAllErrors={showAllErrors}
                  checkAnnotationVisibility={checkAnnotationVisibility}
                />
              );
            } else {
              //Sõnajärjevead, milles sisalduvad teised vead
              const content = [];
              let splitContent = item.content.split(' ');
              item.nested.forEach((nestedItem) => {
                if (nestedItem.errorType === 'R:WS') {
                  const end = item.content.indexOf(nestedItem.content);
                  const tempString = item.content.substring(0, end);
                  const count = (tempString.match(/ /g) || []).length;
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

              splitContent.forEach((contentItem, contentIndex, contentArray) => {
                let tempItem;
                let contentItemIsFollowedByWhiteSpace = false;
                if (contentIndex + 1 < contentArray.length) {
                  if (!elementsWithoutPrecedingWhitespace.includes(contentArray[contentIndex + 1])) {
                    contentItemIsFollowedByWhiteSpace = true;
                  }
                }

                item.nested.forEach((nestedItem) => {
                  if (
                    nestedItem.content.toLowerCase() ===
                    contentItem.toLowerCase()
                  ) {
                    const modifiedNestedItem = {
                      ...nestedItem,
                      content: contentItem,
                    };
                    tempItem = (
                      <AnnotatedWord
                        item={modifiedNestedItem}
                        addSucceedingSpace={contentItemIsFollowedByWhiteSpace}
                        parent={item}
                        showAllErrors={showAllErrors}
                        checkAnnotationVisibility={checkAnnotationVisibility}
                      />
                    );
                  }
                });

                const constructedItem = {
                  content: contentItem,
                  errorType: 'R:WO',
                  extractedErrorTypes: item.extractedErrorTypes,
                };

                tempItem
                  ? content.push(tempItem)
                  : content.push(
                    <AnnotatedWord
                      item={constructedItem}
                      addSucceedingSpace={contentItemIsFollowedByWhiteSpace}
                      parent={item}
                      showAllErrors={showAllErrors}
                      checkAnnotationVisibility={checkAnnotationVisibility}
                    />
                  );
              });

              return (
                <Fragment key={index}>
                  <span
                    className={`${
                      checkAnnotationVisibility(item.extractedErrorTypes) && item.category
                    }`}
                  >
                    {content.map((contentItem, contentIndex) => (
                      <Fragment key={contentIndex}>
                        {contentItem}
                        {/*{contentIndex !== content.length - 1 && <span> </span>}*/}
                        {/*{contentIndex !== content.length - 1 && <span> </span>}*/}
                      </Fragment>
                    ))}
                  </span>{isFollowedByWhiteSpace && ' '}
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
