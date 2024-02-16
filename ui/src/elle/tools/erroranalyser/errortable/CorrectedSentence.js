import { Fragment } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import './../ErrorAnalyser.css';
import { useTranslation } from 'react-i18next';

export default function CorrectedSentence({ annotations, sentence }) {
  const { t } = useTranslation();
  const applyAnnotations = (annotations, sentence) => {
    // console.log(annotations);
    // console.log(sentence);
    const modifiedSentence = structuredClone(sentence);
    annotations.forEach((annotation, key) => {
      const errorType = annotation.errorType;

      switch (errorType[0]) {
        case 'M': //missing => added
          const addedItem = { ...annotation, status: 'added' };
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
          const replacedAddedItem = { ...annotation, status: 'replaced-added' };
          modifiedSentence.set(key, replacedAddedItem);
      }
    });
    // console.log(modifiedSentence);
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

  const transformErrorType = (errorType) => {
    return (
      'error_analyser_error_type_' + errorType.toLowerCase().replace(/:/g, '_')
    );
  };

  const modifiedSentence = applyAnnotations(annotations, sentence);
  const sortedSentence = sortSentence(modifiedSentence);

  return (
    <Box className="corrected-sentence">
      {sortedSentence.map((value, index) => {
        if (value.status !== 'deleted' && value.status !== 'replaced-deleted') {
          if (value.status === 'initial') {
            <Fragment key={index}>
              <span className={value.status}>{value.content}</span>{' '}
            </Fragment>;
          }
          return (
            <Fragment key={index}>
              {value.status === 'initial' ? (
                <Fragment key={index}>
                  <span>{value.content}</span>{' '}
                </Fragment>
              ) : (
                <>
                  <Tooltip
                    arrow
                    placement="top"
                    componentsProps={{
                      tooltip: {
                        sx: {
                          backgroundColor: '#f5f5f9',
                          color: 'rgba(0, 0, 0, 0.87)',
                          fontSize: 11,
                          border: '1px solid #dadde9',
                          '& .MuiTooltip-arrow': {
                            color: '#dadde9',
                          },
                        },
                      },
                    }}
                    title={
                      <Fragment>
                        <Typography>
                          {t(transformErrorType(value.errorType))}
                        </Typography>
                        {value.nested && (
                          <List dense>
                            {value.nested.map((annotation, index) => {
                              return (
                                <ListItem
                                  key={index}
                                  component="div"
                                  disablePadding
                                >
                                  <ListItemText
                                    primary={t(
                                      transformErrorType(annotation.errorType)
                                    )}
                                    secondary={annotation.content}
                                  />
                                </ListItem>
                              );
                            })}
                          </List>
                        )}
                      </Fragment>
                    }
                  >
                    <span className={`${value.status} annotated`}>
                      {value.content}
                    </span>
                  </Tooltip>{' '}
                </>
              )}
            </Fragment>
          );
        }
        return null;
      })}
    </Box>
  );
}
