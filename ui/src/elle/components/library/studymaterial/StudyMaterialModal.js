import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Typography
} from '@mui/material';
import ModalBase from '../../modal/ModalBase';
import Categories from '../json/categories.json';
import LanguageLevels from '../json/languageLevels.json';
import UploadFileIcon from '@mui/icons-material/UploadFile';

export default function StudyMaterialModal({ isOpen, setIsOpen, onSubmitSuccess }) {
  const [file, setFile] = useState(null);
  const [originalFilename, setOriginalFilename] = useState('');
  const [filename, setFilename] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('');

  useEffect(() => {
    if (isOpen) {
      setFile(null);
      setOriginalFilename('');
      setFilename('');
      setTitle('');
      setDescription('');
      setCategory('');
      setLevel('');
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!file) {
      alert('Palun vali fail');
      return;
    }

    const formData = new FormData();

    const nameParts = originalFilename.split('.');
    const extension = nameParts.pop();
    let safeFilename = originalFilename;

    if (filename) {
      safeFilename = filename.endsWith(`.${extension}`)
        ? filename
        : `${filename}.${extension}`;
    }

    formData.append('file', file, safeFilename);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('level', level);

    const urlBase =
      process.env.NODE_ENV === 'production'
        ? '/api/study-material/upload'
        : 'http://localhost:9090/api/study-material/upload';

    try {
      const response = await fetch(urlBase, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Serveripoolne viga');
      }

      const addedMaterial = await response.json();
      if (onSubmitSuccess) onSubmitSuccess(addedMaterial);

      setIsOpen(false);
    } catch (err) {
      console.error('Viga saatmisel:', err);
      alert('Midagi läks valesti');
    }
  };


  return (
    <ModalBase
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Õppematerjali üleslaadimine"
    >
      <Box display="flex" flexDirection="column" gap={2}>
        <Button
          variant="contained"
          component="label"
          startIcon={<UploadFileIcon />}
          sx={{ backgroundColor: '#9C27B0', color: 'white', alignSelf: 'flex-start' }}
        >
          VALI FAIL
          <input
            type="file"
            hidden
            onChange={(e) => {
              const selected = e.target.files[0];
              setFile(selected);
              setOriginalFilename(selected?.name || '');
            }}
          />
        </Button>

        <Typography variant="body2">
          {originalFilename || 'Pole valitud'}
        </Typography>

        <TextField
          label="Salvesta nimega"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
        />

        <Typography variant="subtitle1">Õppematerjali andmed</Typography>

        <TextField
          label="Pealkiri"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          label="Kirjeldus"
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <FormControl fullWidth>
          <InputLabel>Kategooria</InputLabel>
          <Select
            value={category}
            label="Kategooria"
            onChange={(e) => setCategory(e.target.value)}
          >
            {Categories.map((c) => (
              <MenuItem key={c.id} value={c.name}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Keeletase</InputLabel>
          <Select
            value={level}
            label="Keeletase"
            onChange={(e) => setLevel(e.target.value)}
          >
            {LanguageLevels.map((l) => (
              <MenuItem key={l.id} value={l.level}>
                {l.level}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          sx={{ backgroundColor: '#9C27B0', color: 'white', marginTop: 2 }}
          onClick={handleSubmit}
        >
          LAE ÜLES
        </Button>
      </Box>
    </ModalBase>
  );
}
