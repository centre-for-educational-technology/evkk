import { Fragment } from "react";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import "./../ErrorAnalyser.css";

export default function CheckboxHelper({ nodes, ancestors, onBoxChecked }) {
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
            label={label}
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
              // <Paper variant="outlined" className="checkbox-group">
              <Box className="checkbox-group">
                <Box className="checkbox-item">{checkbox}</Box>
                <Box className="checkbox-item">{children}</Box>
              </Box>
            ) : (
              // </Paper>
              <>{checkbox}</>
            )}
          </Fragment>
        );
      })}
    </>
  );
}
