import {
  Select,
  Checkbox,
  TextField,
  ListItemText,
  OutlinedInput,
  InputLabel,
  FormControl,
  MenuItem,
  Button,
  Box,
  Grid,
  Slider,
  Typography,
  Link,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import ModalBase from '../modal/ModalBase';
import { useState, useEffect } from 'react';
import LanguageLevels from "./json/languageLevels.json"
import Categories from "./json/categories.json"
import Time from "./json/time.json"
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { DefaultButtonStyle, DefaultSliderStyle } from '../../const/StyleConstants';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


export default function ExerciseModal({ isOpen, setIsOpen }) {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [languageLevels, setlanguageLevels] = useState([]);
  const [categories, setCategories] = useState([]);
  const [time, setTime] = useState(5);
  const [step, setStep] = useState(1);
  const [link, setLink] = useState('');
  const isStep1Valid = title && description && languageLevels.length > 0 && categories.length > 0;


  const handleChangeLevel = (event) => {
    const {
      target: { value },
    } = event;
    setlanguageLevels(typeof value === 'string' ? value.split(',') : value)
  };

  const handleChangeCategory = (event) => {
    const {
      target: { value },
    } = event;
    setCategories(typeof value === 'string' ? value.split(',') : value)
  };

  const handleSliderChange = (_, value) => {
    setTime(value);
  };

  useEffect(() => {
    if (isOpen) {
      setStep(1);
    }
  }, [isOpen]);


  return (
    <>
      {/* {{TODO: "teha translation ülejäänud"}}
    {{TODO: teha classnames for buttons"}} */}
      <Button onClick={() => setIsOpen(true)}>Loo Uus Harjutus</Button>
      <ModalBase
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Harjutuse koostamine"
      >
        <Box display="flex" width="100%">
          {step === 1 && (
            <Box display="flex" flexDirection="column" width="100%">
              <TextField
                label={t('publish_your_text_title')}
                size="medium"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: '65%' }}
              />
              <TextField
                label={t('publish_your_text_exercise_description')}
                size="medium"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: '75%', marginTop: 20 }}
              />
              <Box style={{ display: "flex", flexDirection: "row", gap: "30px" }}>
                <FormControl size="medium" className="form-control" >
                  <InputLabel>{t('query_text_data_level')} </InputLabel>
                  <Select
                    labelId="tag-label"
                    multiple
                    value={languageLevels}
                    onChange={handleChangeLevel}
                    input={<OutlinedInput label={t('query_text_data_level')} />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {LanguageLevels.map((level) => (
                      <MenuItem key={level.id} value={level.level}>
                        <Checkbox checked={languageLevels.includes(level.level)} />
                        <ListItemText primary={level.level} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl size="medium" className="form-control">
                  <InputLabel>{t('publish_your_text_text_data_academic_category')}</InputLabel>
                  <Select
                    labelId="tag-label"
                    multiple
                    value={categories}
                    onChange={handleChangeCategory}
                    input={<OutlinedInput label={t('publish_your_text_text_data_academic_category')} />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {Categories.map((category) => (
                      <MenuItem key={category.id} value={category.name}>
                        <Checkbox checked={categories.includes(category.name)} />
                        <ListItemText primary={category.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box display="flex">
                <Grid item m
                  style={{ width: "50%" }}>
                  <Typography
                    variant="body2"
                    style={{ marginTop: 40 }}>
                    Kestvus (min)
                  </Typography>
                  <Slider
                    sx={DefaultSliderStyle}
                    value={time}
                    onChange={handleSliderChange}
                    step={null}
                    min={Time[0].value}
                    max={Time[Time.length - 1].value}
                    valueLabelDisplay="auto"
                    marks={Time}
                  />
                </Grid>
              </Box>

              <Box display="flex" justifyContent="flex-end" width="100%" mt={3}>
                <Button
                  type="submit"
                  sx={DefaultButtonStyle}
                  size="medium"
                  variant="contained"
                  onClick={() => {
                    setStep(step + 1)
                  }
                  }
                  disabled={!isStep1Valid}
                >
                  Jätka
                </Button>
              </Box>
            </Box>
          )}

          {step === 2 && (
            <Box display="flex" flexDirection="column" width="100%">
              <Box
                width="65%"
                sx={{
                  backgroundColor: '#FFD0FD',
                  borderRadius: 4,
                  padding: 2,
                  mb: 3,
                }}
              >
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <InfoOutlinedIcon fontSize="medium" />
                  <Typography variant="subtitle1" fontWeight="bold">
                    Harjutuste loomise juhend
                  </Typography>
                </Box>

                <Typography variant="body2" component="div" sx={{ pl: 3 }}>
                  <ol style={{ paddingLeft: 16, margin: 0 }}>
                    <li>
                      Ava sisuloome tööriist{' '}
                      <Link
                        href="https://sisuloome.e-koolikott.ee/node/add/interactive_content"
                        target="_blank"
                      >
                        https://sisuloome.e-koolikott.ee/node/add/interactive_content
                      </Link>
                    </li>
                    <li>Logi sisse.</li>
                    <li>Täida harjutuse sisu ja vali sobiv harjutuse tüüp.</li>
                    <li>Vajuta "Salvesta", et harjutus salvestada.</li>
                    <li>Vajuta "Kopeeri link", et saada harjutuse link.</li>
                    <li>Kleebi kopeeritud link allolevasse lahtrisse.</li>
                  </ol>
                </Typography>
              </Box>

              <Box display={"flex"} flexDirection={"column"} gap={"20px"}>
                <Typography variant="body2">Sisesta Link</Typography>
                <Box>
                  <TextField
                    label="Link"
                    size="medium"
                    style={{ width: '50%' }}
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                  />
                </Box>
                <Box display="flex" justifyContent="space-between" gap={2}>
                  <Button
                    className='buttonRight'
                    sx={DefaultButtonStyle}
                    size="medium"
                    variant="contained"
                    onClick={() => setStep(1)}>Tagasi</Button>
                  <Button
                    className='buttonSecondLeft'
                    type="submit"
                    sx={DefaultButtonStyle}
                    size="medium"
                    variant="contained"
                    onClick={() => {
                      alert("working")
                    }}
                  //disabled={!isStep1Valid}
                  >
                    Kuva Eelvade
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </ModalBase>
    </>
  );
}
