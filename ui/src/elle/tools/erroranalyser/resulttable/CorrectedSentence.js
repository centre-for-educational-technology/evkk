import { Fragment } from 'react';
import { Box } from '@mui/material';
import './../ErrorAnalyser.css';
import AnnotatedWord from './AnnotatedWord';

export default function CorrectedSentence({
  sentence,
  filters,
  showAllErrors,
}) {
  const checkAnnotationVisibility = (errorType) => {
    if (showAllErrors) {
      return true;
    } else {
      if (filters.errorType.includes(errorType)) {
        return true;
      } else {
        return false;
      }
    }
  };
  return (
    <Box className="corrected-sentence">
      {sentence &&
        sentence.map((item, index) => {
          if (item.status !== 'replaced-deleted') {
            if (item.status === 'initial') {
              return (
                <Fragment key={index}>
                  <span>{item.content}</span>{' '}
                </Fragment>
              );
            } else if (!item.nested) {
              return (
                <AnnotatedWord
                  key={index}
                  item={item}
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
                        addSucceedingSpace={false}
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
                };

                tempItem
                  ? content.push(tempItem)
                  : content.push(
                      <AnnotatedWord
                        item={constructedItem}
                        addSucceedingSpace={false}
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
                      checkAnnotationVisibility(item.errorType) && item.category
                    }`}
                  >
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
