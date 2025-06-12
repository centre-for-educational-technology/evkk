import React, { useState, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const allTypes = ['Video', 'Link', 'Tekst', 'Fail'];


export default function LanguageFilters({ selected = [], onChange }) {
  const [checked, setChecked] = useState(selected);

  useEffect(() => {
    if (JSON.stringify(selected) !== JSON.stringify(checked)) {
      setChecked(selected);
    }
  }, [selected]);

  const toggle = (value) => {
    const updated = checked.includes(value)
      ? checked.filter(v => v !== value)
      : [...checked, value];
    setChecked(updated);
    onChange(updated);
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#9C27B0' }} />}>
        <Typography sx={{ fontWeight: 'bold', color: '#9C27B0' }}>Tüübid</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormGroup>
          {allTypes.map(label => (
            <FormControlLabel
              key={label}
              control={
                <Checkbox
                  checked={checked.includes(label)}
                  onChange={() => toggle(label)}
                  sx={{ color: '#000', '&.Mui-checked': { color: '#9C27B0' } }}
                />
              }
              label={label}
            />
          ))}
        </FormGroup>
      </AccordionDetails>
    </Accordion>
  );
}
