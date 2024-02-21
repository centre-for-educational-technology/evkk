import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function Multiselect({
  selected,
  setSelected,
  handleChange,
  options,
  label,
  id,
}) {
  const { t } = useTranslation();

  return (
    <FormControl className="optional-input">
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        multiple
        value={selected}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) =>
          selected.map((item) => t(options[item])).join(', ')
        }
      >
        <MenuItem>
          <ListItemText
            primary={t('reset_button')}
            onClick={(event) => {
              event.stopPropagation();
              setSelected([]);
            }}
          />
        </MenuItem>
        {Object.keys(options).map((item) => (
          <MenuItem key={item} value={item}>
            <Checkbox checked={selected.indexOf(item) > -1} />
            <ListItemText primary={t(options[item])} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
