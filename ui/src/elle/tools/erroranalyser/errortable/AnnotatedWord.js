import { List, ListItemText, Tooltip, Typography } from '@mui/material';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

export default function AnnotatedWord({
  item,
  // transformErrorType,
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
              <ListItemText
                primary={transformErrorType(item.errorType)}
                // secondary={parent.content}
              />
              {parent && (
                <ListItemText
                  primary={transformErrorType(parent.errorType)}
                  secondary={parent.content}
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
