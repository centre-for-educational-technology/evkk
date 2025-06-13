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
import '../../../pages/styles/Library.css';
import { useTranslation } from 'react-i18next';
import ModalBase from '../../modal/ModalBase';
import { useState, useEffect } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { DefaultButtonStyle, DefaultSliderStyle } from '../../../const/StyleConstants';
import { errorEmitter, successEmitter } from '../../../../App';
import { useFetch } from '../../../hooks/useFetch';
import H5PPlayer from './H5PPlayer.js';

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
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [languageLevels, setlanguageLevels] = useState([]);
  const [selectedLanguageLevelId, setSelectedLanguageLevelId] = useState(null);
  const [duration, setDuration] = useState(5);
  const [durationOptions, setDurationOptions] = useState([]);
  const [step, setStep] = useState(1);
  const [link, setLink] = useState('');
  const [validationStatus, setValidationStatus] = useState(null);
  const [externalId, setExternalId] = useState(null);
  const { fetchData } = useFetch();

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

  //extractId on pandud "Exercise" - extractId. See on vaja selle jaoks, et pärast saaks seda kuvada ja kontrollida, kas selline extractedId exists or not
  const extractId = (link) => {
    const match = link.match(/\/node\/(\d+)/);
    return match ? match[1] : null;
  };

  //valideeritakse kas link on õige ja kas see sobib
  const validateLink = async () => {
    const id = extractId(link);
    if (!id) {
      errorEmitter.emit('error_invalid_link');
      return;
    }

    try {
      const urlObj = new URL(link);
      if (urlObj.hostname !== 'sisuloome.e-koolikott.ee') {
        errorEmitter.emit('error_invalid_link');
        return;
      }
    } catch (err) {
      errorEmitter.emit('error_invalid_link');
      return;
    }

    try {
      const data = await fetchData('/api/exercises/validate-link', {
        method: 'POST',
        body: JSON.stringify({ link }),
        headers: { 'Content-Type': 'application/json' }
      }
);
      if (data.status === 'ok' || data.status === 'already_exists') {
        setValidationStatus('success');
        setExternalId(data.external_id);
      } else {
        setValidationStatus('error');
        setExternalId(null);
        alert("Link ei sobi või faili ei leitud.");
      }
    } catch (error) {
      setValidationStatus('error');
      setExternalId(null);
      alert("Viga valideerimisel.");
    }
  };

  //harjutuse salvestamine exercies/h5p/storage/{id}/{filename}.h5p
  const saveExercise = async (externalId) => {
    const categoriesMap = selectedCategoryIds.map(id => categories.find(c => c.id === id));

    const durationEntry = durationOptions.find(d => d.value === duration);
    const durationId = durationEntry?.id;

    const data = {
      title,
      description,
      durationId,
      languageLevelId: selectedLanguageLevelId,
      createdByEmail: 'test@example.com',
      externalId,
      views: 0,
      likes: 0,
      filePath: `/uploads/exercises/${externalId}.h5p`,
      categories: categoriesMap
    };

    try {
      await fetchData('http://localhost:9090/api/exercises', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      successEmitter.emit('success_generic');
    } catch (err) {
      errorEmitter.emit('error_generic_server_error');
    }
  };

   const uploadByExternalId = async (externalId) => {
    try {
      await fetchData(`http://localhost:9090/api/exercises/upload?externalId=${externalId}`, {
        method: 'POST'
      });
    } catch (err) {
      errorEmitter.emit('error_generic_server_error');
    }
  };

  const handleChangeLevel = (event) => {
    const { target: { value } } = event;
    setSelectedLanguageLevelId(value);
  };

  const handleChangeCategory = (event) => {
    const { target: { value } } = event;
    setSelectedCategoryIds(value);
  };

  const handleSliderChange = (_, value) => {
    setDuration(value);
  };

  useEffect(() => {
    if (isOpen) {
      setStep(1);
    }
  }, [isOpen]);

  return (
    <>
      <ModalBase
        isOpen={isOpen}
        setIsOpen={(value) => {
          if (!value) {
            const confirmed = window.confirm('Kas oled kindel, et soovid katkestada? Muudatusi ei salvestata.');
            if (confirmed) {
              setIsOpen(false);
            }
          } else {
            setIsOpen(true);
          }
        }}
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
                <FormControl size="medium" className="form-control">
                  <InputLabel>{t('query_text_data_level')}</InputLabel>
                  <Select
                    labelId="tag-label"
                    value={selectedLanguageLevelId ?? ''}
                    onChange={handleChangeLevel}
                    input={<OutlinedInput label={t('query_text_data_level')} />}
                    MenuProps={MenuProps}
                  >
                    {languageLevels.map((level) => (
                      <MenuItem key={level.id} value={level.id}>
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
                        const selectedCategory = categories.find(c => c.id === id);
                        return selectedCategory?.name ?? '';
                      })
                      .filter(Boolean)
                      .join(', ')
                    }
                    MenuProps={MenuProps}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        <Checkbox checked={selectedCategoryIds.includes(category.id)} />
                        <ListItemText primary={category.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box display="flex">
                <Grid item style={{ width: "50%" }}>
                  <Typography variant="body2" style={{ marginTop: 40 }}>Kestvus (min)</Typography>
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
                  onClick={() => setStep(step + 1)}
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
                sx={{ backgroundColor: '#FFD0FD', borderRadius: 4, padding: 2, mb: 3 }}
              >
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <InfoOutlinedIcon fontSize="medium" />
                  <Typography variant="subtitle1" fontWeight="bold">Harjutuste loomise juhend</Typography>
                </Box>
                <Typography variant="body2" component="div" sx={{ pl: 3 }}>
                  <ol style={{ paddingLeft: 16, margin: 0 }}>
                    <li>
                      Ava sisuloome tööriist{' '}
                      <Link href="https://sisuloome.e-koolikott.ee/node/add/interactive_content" target="_blank">
                        https://sisuloome.e-koolikott.ee/node/add/interactive_content
                      </Link>
                    </li>
                    <li>Täida harjutuse sisu ja vali sobiv harjutuse tüüp.</li>
                    <li>Vajuta "Salvesta", et harjutus salvestada.</li>
                    <li>Vajuta "Kopeeri link", et saada harjutuse link.</li>
                    <li>Kleebi kopeeritud link allolevasse lahtrisse.</li>
                  </ol>
                </Typography>
              </Box>

              <Box display="flex" flexDirection="column" gap="20px">
                <Typography variant="body2">Sisesta Link</Typography>
                <TextField
                  label="Link"
                  size="medium"
                  style={{ width: '50%' }}
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
                <Button
                  variant="outlined"
                  size="medium"
                  sx={{ width: '30%' }}
                  onClick={validateLink}
                  disabled={link.trim() === ''}
                >
                  Kontrolli linki
                </Button>

                <Box display="flex" justifyContent="space-between" gap={2}>
                  <Button
                    className='buttonRight'
                    sx={DefaultButtonStyle}
                    size="medium"
                    variant="contained"
                    onClick={() => setStep(1)}
                  >
                    Tagasi
                  </Button>
                  <Button
                    className='buttonSecondLeft'
                    type="submit"
                    sx={DefaultButtonStyle}
                    size="medium"
                    variant="contained"
                    //disabled={link.trim() === ''}
                   onClick={async () => {
                     if (validationStatus === 'success' && externalId) {
                       await saveExercise(externalId);            // мета-данные
                       await uploadByExternalId(externalId);      // загрузка и распаковка
                       successEmitter.emit('success_generic');
                       setStep(3);
                     } else {
                       errorEmitter.emit('error_invalid_link');
                     }
                   }}
                  >
                    Kuva Eelvaade
                  </Button>
                </Box>
              </Box>
            </Box>
          )}

          {step === 3 && externalId && (
            <Box>
              <Typography>Siin saad harjutust ise proovida enne avalikustamist.</Typography>
              <H5PPlayer externalId={externalId} />
              <Button
                className='buttonRight'
                sx={DefaultButtonStyle}
                size="medium"
                variant="contained"
                onClick={() => setStep(step - 1)}
              >

                Tagasi
              </Button>
            </Box>
          )}
        </Box>
      </ModalBase>
    </>
  );
}
