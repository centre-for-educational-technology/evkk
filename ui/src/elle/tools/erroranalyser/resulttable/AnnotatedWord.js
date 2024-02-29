import { List, ListItemText, Tooltip } from '@mui/material';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

export default function AnnotatedWord({
  item,
  parent,
  addSucceedingSpace = true,
}) {
  const { t } = useTranslation();
  const transformErrorType = (errorType) => {
    return t(
      'error_analyser_error_type_' + errorType.toLowerCase().replace(/:/g, '_')
    );
  };

  return (
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
                if (!parent || (parent && item.errorType !== 'R:WO')) {
                  return (
                    <ListItemText
                      primary={transformErrorType(item.errorType)}
                      secondary={
                        item.sourceContent
                          ? `${item.sourceContent} → ${item.content}`
                          : `(${t('error_analyser_missing_word')}) → ${
                              item.content
                            }`
                      }
                    />
                  );
                }
                // return null;
              })()}

              {parent && (
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
        <span className={`${item.category} annotated`}>{item.content}</span>
      </Tooltip>
      {addSucceedingSpace && ' '}
    </Fragment>
  );
}
