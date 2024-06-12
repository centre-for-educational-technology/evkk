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

  const checkAnnotationVisibility = (errorTypes) => {
    if (showAllErrors) {
      return true;
    }
    return errorTypes.some(errorType => filters.errorType.includes(errorType));
  };

  const checkForStatusInclusion = (status) => {
    const skipValuesForShowAllErrors = ['replaced-deleted'];
    const skipValuesForSelectedErrorsOnly = ['replaced-deleted', 'deleted'];
    return showAllErrors ? !skipValuesForShowAllErrors.includes(status) : !skipValuesForSelectedErrorsOnly.includes(status);
  };

  return (
    <Box className="nested-cell corrected-sentence">
      {sentence &&
        sentence.map((item, index) => {
          //console.log(item);
          const isLastItem = index === sentence.length - 1;
          let isFollowedByWhiteSpace = false;

          //
          //console.log(checkForStatusInclusion(item.status), item.status);
          if (checkForStatusInclusion(item.status) && !isLastItem) {
            //console.log(item.content);
            let nextItemIndex = 1;
            let nextItem = sentence[index + nextItemIndex];
            while (!checkForStatusInclusion(nextItem.status) && (index + nextItemIndex + 1) < sentence.length) {
              nextItemIndex++;
              nextItem = sentence[index + nextItemIndex];
            }

            if (checkForStatusInclusion(nextItem.status)) {

              //console.log(item);
              //console.log(item, nextItem);
              //console.log(nextItem);
              //console.log(nextItemContent);
              const nextItemContent = nextItem.content.split(' ');
              //console.log(item.content, item.status, nextItem.content, nextItemContent);
              if (!elementsWithoutPrecedingWhitespace.includes(nextItemContent[0])) {
                //console.log(nextItem.content, nextItemContent[0]);
                isFollowedByWhiteSpace = true;
                //console.log(isFollowedByWhiteSpace);
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
              //console.log(item);
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
              //WO with nested annotations
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
                  //console.log(contentArray[contentIndex]);
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
