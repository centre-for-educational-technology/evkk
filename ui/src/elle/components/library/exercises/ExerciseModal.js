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
import '../../../pages/styles/Library.css'
import { useTranslation } from 'react-i18next';
import ModalBase from '../../modal/ModalBase';
import { useState, useEffect } from 'react';
//import LanguageLevels from "../json/languageLevels.json"
//import Categories from "../json/categories.json"
//import Duration from "../json/duration.json"
import { getH5PFile, uploadH5PFile } from "./h5p/H5PProcessing";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { DefaultButtonStyle, DefaultSliderStyle } from '../../../const/StyleConstants';

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

let usedLinks = []


export default function ExerciseModal({ isOpen, setIsOpen }) {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [languageLevels, setlanguageLevels] = useState([]);
  const [selectedLanguageLevelsIds, setSelectedLanguageLevelsIds] = useState([]);
  const [duration, setDuration] = useState(5);
  const [durationOptions, setDurationOptions] = useState([]);
  const [step, setStep] = useState(1);
  const [link, setLink] = useState('');
  const isStep1Valid = title && description && languageLevels.length > 0 && selectedCategoryIds.length > 0;


  useEffect(() => {
    fetch("http://localhost:9090/api/categories")
      .then(res => res.json())
      .then(json => setCategories(json));
  }, []);

  useEffect(() => {
    fetch("http://localhost:9090/api/language-levels")
      .then(res => res.json())
      .then(json => setlanguageLevels(json));
  }, []);

  useEffect(() => {
    fetch("http://localhost:9090/api/durations")
      .then(res => res.json())
      .then(json => {
        setDurationOptions(json);
        setDuration(json[0]?.value || 5);
      });
  }, []);

  const handleChangeLevel = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedLanguageLevelsIds(typeof value === 'string' ? value.split(',') : value)
  };

  const handleChangeCategory = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCategoryIds(typeof value === 'string' ? value.split(',') : value);
  };

  const handleSliderChange = (_, value) => {
    setDuration(value);
  };

  const saveLink = () => {
    usedLinks.push(link)
  }

  useEffect(() => {
    if (isOpen) {
      setStep(1);
    }
  }, [isOpen]);

  return (
    <>
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
                    value={selectedLanguageLevelsIds}
                    onChange={handleChangeLevel}
                    input={<OutlinedInput label={t('query_text_data_level')} />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {languageLevels.map((level) => (
                      <MenuItem key={level.id} value={level.level}>
                        <Checkbox checked={selectedLanguageLevelsIds.includes(level.level)} />
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
                    value={selectedCategoryIds}
                    onChange={handleChangeCategory}
                    input={<OutlinedInput label={t('publish_your_text_text_data_academic_category')} />}
                    renderValue={(selected) =>
                      selected.map(id => {
                        const item = categories.find(c => c.id === id);
                        return item?.name || id;
                      }).join(', ')
                    }
                    MenuProps={MenuProps}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.name}>
                        <Checkbox checked={selectedCategoryIds.includes(category.name)} />
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
                    value={duration}
                    onChange={handleSliderChange}
                    step={null}
                    min={durationOptions[0]?.value || 0}
                    max={durationOptions[durationOptions.length - 1]?.value || 60}
                    marks={durationOptions.map(d => ({ value: d.value, label: d.label }))}
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
                    onChange={(e) => {
                      setLink(e.target.value)
                      //getH5PFile(e.target.value)
                    }
                    }
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
                    onClick={async () => {
                      if (!usedLinks.includes(link)) {
                        saveLink();
                        setStep(step + 2);
                        //await uploadH5PFile();
                      }
                      else {
                        setStep(step + 1)
                      }
                    }}
                  //disabled={!isStep1Valid}
                  >
                    Kuva Eelvade
                  </Button>
                </Box>
              </Box>
            </Box>
          )}

          {step === 3 && (
            <Box>
              <Typography>Oled juba varem kasutanud ülesannet {link} , soovid jätkata?</Typography>
              <Button
                type="submit"
                sx={DefaultButtonStyle}
                size="medium"
                variant="contained"
                onClick={async () => {
                  setStep(step + 1)
                  await uploadH5PFile();
                }
                }
                disabled={!isStep1Valid}>
                Jätka
              </Button>
              <Button
                className='buttonRight'
                sx={DefaultButtonStyle}
                size="medium"
                variant="contained"
                onClick={() => setStep(1)}>
                Tagasi</Button>
            </Box>
          )}

          {step === 4 && (
            <Box>
              <Typography>Siin saad harjutust ise proovida enne avalikustamist.</Typography>
              <Box>
                Siia tuleb harjutuse eelvaade
              </Box>
              <Button
                className='buttonRight'
                sx={DefaultButtonStyle}
                size="medium"
                variant="contained"
                onClick={() => setStep(step - 2)}>
                Tagasi</Button>
            </Box>
          )}
        </Box>
      </ModalBase>
    </>
  );
}
