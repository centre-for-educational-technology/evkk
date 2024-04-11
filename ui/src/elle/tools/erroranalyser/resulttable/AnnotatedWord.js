import { List, ListItemText, Tooltip } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { errorTypeOptionsFull } from '../../../const/Constants';

export default function AnnotatedWord({
  item,
  parent,
  addSucceedingSpace = true,
  showAllErrors,
  checkAnnotationVisibility,
}) {
  const [isAnnotationVisible, setIsAnnotationVisible] = useState(false);
  const { t } = useTranslation();
  const transformErrorType = (errorType) => {
    return t(errorTypeOptionsFull[errorType]);
  };

  useEffect(() => {
    setIsAnnotationVisible(checkAnnotationVisibility(item.errorType));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAllErrors]);

  // console.log(item, item.status === 'deleted');

  return (
    <>
      {isAnnotationVisible ? (
        <Fragment>
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
                <List dense>
                  {(() => {
                    if (
                      checkAnnotationVisibility(item.errorType) &&
                      (!parent || (parent && item.errorType !== 'R:WO'))
                    ) {
                      return (
                        <ListItemText
                          primary={transformErrorType(item.errorType)}
                          secondary={
                            item.status === 'deleted'
                              ? ` ${item.content}→(${t(
                                  'error_analyser_deleted_word'
                                )})`
                              : item.sourceContent
                              ? `${item.sourceContent} → ${item.content}`
                              : `(${t('error_analyser_missing_word')}) → ${
                                  item.content
                                }`
                          }
                        />
                      );
                    }
                  })()}
                  {parent && checkAnnotationVisibility(parent.errorType) && (
                    <ListItemText
                      primary={transformErrorType(parent.errorType)}
                      secondary={
                        parent.sourceContent
                          ? `${parent.sourceContent} → ${parent.content}`
                          : `(${t('error_analyser_missing_word')}) → ${
                              item.content
                            }`
                      }
                    />
                  )}
                </List>
              </Fragment>
            }
          >
            <span
              className={`${
                checkAnnotationVisibility(item.errorType) ? item.category : ''
              } ${item.status === 'deleted' ? 'deleted' : ''} annotated`}
            >
              {item.content}
            </span>
          </Tooltip>
          {addSucceedingSpace && ' '}
        </Fragment>
      ) : item.status === 'deleted' ? null : (
        <Fragment>
          <span>{item.content}</span>{' '}
        </Fragment>
      )}
    </>
  );
}
