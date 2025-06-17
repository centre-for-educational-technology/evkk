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

import {
  validateLink,
  submitExercise,
} from '../../../util/ExerciseUtils';

import '../../../pages/styles/Library.css';
import { useTranslation } from 'react-i18next';
import ModalBase from '../../modal/ModalBase';
import { useState, useEffect, useCallback } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { DefaultButtonStyle, DefaultSliderStyle } from '../../../const/StyleConstants';
import { errorEmitter, successEmitter } from '../../../../App';
import { useFetch } from '../../../hooks/useFetch';
import { H5PPlayer } from './H5PPlayer.js';

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

  //const isStep1Valid = title && description && languageLevels.length > 0 && selectedCategoryIds.length > 0;

  const resetForm = useCallback(() => {
    setTitle('');
    setDescription('');
    setSelectedCategoryIds([]);
    setSelectedLanguageLevelId(null);
    setDuration(durationOptions[0]?.value || 5);
    setLink('');
    setValidationStatus(null);
    setExternalId(null);
    setStep(1);
  }, [durationOptions]);

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [resetForm, isOpen]);

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

  const handleValidateLink = async () => {
    const result = await validateLink(link, fetchData);

    if (result.status === 'EXERCISE_ALREADY_EXISTS') {
      setValidationStatus('error');
      setExternalId(null);
      errorEmitter.emit('error_link_already_exists');
    } else if (result.status === 'ok') {
       setValidationStatus('success');
      setExternalId(result.externalId);
      successEmitter.emit('success_generic');
    } else {
      setValidationStatus('error');
      setExternalId(null);
      errorEmitter.emit('error_generic_server_error');
    }
  };

  const handleSubmitExercise = async () => {
    try {
      await submitExercise({
        title,
        description,
        duration,
        selectedLanguageLevelId,
        selectedCategoryIds,
        categories,
        durationOptions,
        externalId,
      }, fetchData);
      successEmitter.emit('success_generic');
      setIsOpen(false);
    } catch {
      errorEmitter.emit('error_generic_server_error');
    }
  };


  return (
    <>
      <ModalBase
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        requireConfirmation={true}
        title={t('exercise_creation')}
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
                  <Typography variant="body2" style={{ marginTop: 40 }}>{t('exercise_modal_duration')} (min)</Typography>
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
                //disabled={!isStep1Valid}
                >
                  {t('exercise_modal_proceed')}
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
                  <Typography variant="subtitle1" fontWeight="bold">{t('exercise_creation_guide')}</Typography>
                </Box>
                <Typography variant="body2" component="div" sx={{ pl: 3 }}>
                  <ol style={{ paddingLeft: 16, margin: 0 }}>
                    <li>
                      {t('exercise_creation_guide_step_1') + ' '}
                      <Link href="https://sisuloome.e-koolikott.ee/node/add/interactive_content" target="_blank">
                        https://sisuloome.e-koolikott.ee/node/add/interactive_content
                      </Link>
                    </li>
                    <li>{t('exercise_creation_guide_step_2')}</li>
                    <li>{t('exercise_creation_guide_step_3')}</li>
                    <li>{t('exercise_creation_guide_step_4')}</li>
                    <li>{t('exercise_creation_guide_step_5')}</li>
                  </ol>
                </Typography>
              </Box>

              <Box display="flex" flexDirection="column" gap="20px">
                <Typography variant="body2">{t('exercise_creation_insert_link')}</Typography>
                <TextField
                  label="Link"
                  size="medium"
                  style={{ width: '50%' }}
                  value={link}
                  onChange={(e) => {
                    setLink(e.target.value);
                    setValidationStatus(null);
                  }}
                />
                <Button
                  variant="outlined"
                  size="medium"
                  sx={{ width: '30%' }}
                  onClick={handleValidateLink}
                  disabled={link.trim() === ''}
                >
                  {t('exercise_creation_verify_link')}
                </Button>

                <Box display="flex" justifyContent="space-between" gap={2}>
                  <Button
                    className='buttonRight'
                    sx={DefaultButtonStyle}
                    size="medium"
                    variant="contained"
                    onClick={() => setStep(step - 1)}
                  >
                    {t('exercise_creation_back')}
                  </Button>
                  <Button
                    className='buttonSecondLeft'
                    type="submit"
                    sx={DefaultButtonStyle}
                    size="medium"
                    variant="contained"
                    onClick={() => setStep(3)}
                    disabled={validationStatus !== 'success' || !externalId}
                  >
                    {t('exercise_creation_show_preview')}
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
              <Button
                className='buttonRight'
                sx={DefaultButtonStyle}
                size="medium"
                variant="contained"
                onClick={handleSubmitExercise}
              >
                Avalda
              </Button>
            </Box>
          )}
        </Box>
      </ModalBase>
    </>
  );
}
