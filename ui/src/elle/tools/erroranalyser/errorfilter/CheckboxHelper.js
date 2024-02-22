import { Fragment } from 'react';
import { Box, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import './../ErrorAnalyser.css';
import { useTranslation } from 'react-i18next';

export default function CheckboxHelper({ nodes, ancestors, onBoxChecked }) {
  const { t } = useTranslation();
  return (
    <>
      {nodes.map(({ label, type, checked, childrenNodes }) => {
        let children = null;
        if (childrenNodes.length > 0) {
          children = (
            <CheckboxHelper
              nodes={childrenNodes}
              ancestors={[...ancestors, type]}
              onBoxChecked={onBoxChecked}
            />
          );
        }

        const checkbox = (
          <FormControlLabel
            label={t(label)}
            control={
              <Checkbox
                value={type}
                checked={checked}
                onChange={(e) => onBoxChecked(e, ancestors)}
              />
            }
          />
        );

        return (
          <Fragment key={type}>
            {ancestors.length === 0 ? (
              <FormGroup className="checkbox-group">
                <Box className="checkbox-item">{checkbox}</Box>
                {children && <Box className="checkbox-item">{children}</Box>}
              </FormGroup>
            ) : (
              <>{checkbox}</>
            )}
          </Fragment>
        );
      })}
    </>
  );
}
