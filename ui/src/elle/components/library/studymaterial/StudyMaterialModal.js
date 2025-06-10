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
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

export default function StudyMaterialModal({ isOpen, setIsOpen, onSubmitSuccess }) {
  const [file, setFile] = useState(null);
  const [originalFilename, setOriginalFilename] = useState('');
  const [filename, setFilename] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('');
  const [type, setType] = useState('');
  const [link, setLink] = useState('');
  const [textContent, setTextContent] = useState('');

  useEffect(() => {
    if (isOpen) {
      setFile(null);
      setOriginalFilename('');
      setFilename('');
      setTitle('');
      setDescription('');
      setCategory('');
      setLevel('');
      setType('');
      setLink('');
      setTextContent('');
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    const formData = new FormData();

    if (type === 'fail') {
      if (!file) {
        alert('Palun vali fail');
        return;
      }

      const nameParts = originalFilename.split('.');
      const extension = nameParts.pop();
      let safeFilename = filename;

      if (!filename) {
        safeFilename = originalFilename;
      } else if (!filename.endsWith(`.${extension}`)) {
        safeFilename += `.${extension}`;
      }

      formData.append('file', file, safeFilename);
    }

    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('level', level);
    formData.append('type', type);

    if (type === 'link' || type === 'video') {
      formData.append('link', link);
    } else if (type === 'tekst') {
      formData.append('text', textContent);
    }

    const url = process.env.NODE_ENV === 'production'
      ? '/api/study-material/upload'
      : 'http://localhost:9090/api/study-material/upload';

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Serveri viga');

      const addedMaterial = await response.json();
      if (onSubmitSuccess) onSubmitSuccess(addedMaterial);
      setIsOpen(false);
    } catch (err) {
      console.error('Viga saatmisel:', err);
      alert('Midagi läks valesti');
    }
  };


  return (
    <ModalBase isOpen={isOpen} setIsOpen={setIsOpen} title="Õppematerjali üleslaadimine">
      <Box className="study-modal-form">
        <FormControl fullWidth>
          <InputLabel>Materjali tüüp</InputLabel>
          <Select value={type} label="Materjali tüüp" onChange={(e) => setType(e.target.value)}>
            <MenuItem value="fail">Fail</MenuItem>
            <MenuItem value="link">Link</MenuItem>
            <MenuItem value="video">Video</MenuItem>
            <MenuItem value="tekst">Tekst</MenuItem>
          </Select>
        </FormControl>

        {type === 'fail' && (
          <>
            <Button
              variant="contained"
              component="label"
              startIcon={<UploadFileIcon />}
              className="study-modal-upload-button"
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
            <Typography className="study-modal-upload-label">
              {originalFilename || 'Pole valitud'}
            </Typography>
            <TextField
              label="Salvesta nimega.."
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
            />
          </>
        )}

        {(type === 'link' || type === 'video') && (
          <TextField
            label="Sisesta link.."
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        )}

        {type === 'tekst' && (
          <Box>
            <Typography variant="body2" sx={{ mb: 1 }}>Sisesta tekst:</Typography>
            <ReactQuill
              theme="snow"
              value={textContent}
              onChange={setTextContent}
              style={{ height: '200px', marginBottom: '20px' }}
              modules={{
                toolbar: [
                  [{ 'header': [1, 2, false] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                  ['link'],
                  ['clean']
                ]
              }}
            />
          </Box>
        )}

        <Typography variant="h6" fontWeight="bold">Õppematerjali andmed</Typography>

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

        <Box display="flex" gap={2} flexWrap="wrap">
          <FormControl sx={{ flex: 1, minWidth: '200px' }}>
            <InputLabel id="category-label">Kategooria</InputLabel>
            <Select
              labelId="category-label"
              value={category}
              label="Kategooria"
              onChange={(e) => setCategory(e.target.value)}
              MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
            >
              {Categories.map((c) => (
                <MenuItem key={c.id} value={c.name}>{c.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ flex: 1, minWidth: '200px' }}>
            <InputLabel id="level-label">Keeletase</InputLabel>
            <Select
              labelId="level-label"
              value={level}
              label="Keeletase"
              onChange={(e) => setLevel(e.target.value)}
            >
              {LanguageLevels.map((l) => (
                <MenuItem key={l.id} value={l.level}>{l.level}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Button
          variant="contained"
          className="study-modal-submit-button"
          onClick={handleSubmit}
        >
          LAE ÜLES
        </Button>
      </Box>
    </ModalBase>
  );
}
