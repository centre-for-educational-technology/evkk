import React, { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography
} from '@mui/material';
import ModalBase from '../../modal/ModalBase';
import TextTemplate from "./templates/TextTemplate";
import VideoTemplate from "./templates/VideoTemplate";
import LinkTemplate from "./templates/LinkTemplate";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DownloadIcon from '@mui/icons-material/Download';
import FileTemplate from "./templates/FileTemplate";
import ShareButton from '../shared/ShareButton';

export default function StudyMaterialPopup({ open, onClose, material }) {
  const [metadataExpanded, setMetadataExpanded] = useState(true);

  const typeTranslation = {
    file: 'Fail',
    link: 'Link',
    text: 'Tekst',
    video: 'Video'
  };

  if (!material) return null;

  const type = material.materialType?.type?.toLowerCase();
  const translatedType = typeTranslation[type] || '-';

  if (!material) return null;

  const fileUrl =
    process.env.NODE_ENV === 'production'
      ? `/api/files/${material.filePath}`
      : `http://localhost:9090/api/files/${material.filePath}`;

  return (
    <ModalBase isOpen={open} setIsOpen={onClose} title={material.title.toUpperCase()}>
      <Box display="flex" flexDirection="column" gap={2}>
        <ShareButton
          originalUrl={`http://localhost:3000/library/studymaterial?open=${material.id}`}
          sx={{ position: 'absolute', top: 22, right: 60, }}
        />

        {/* METAINFOT KUVAV ACCORDION */}
        <Accordion
          expanded={metadataExpanded}
          onChange={() => setMetadataExpanded(!metadataExpanded)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id="material-metadata-header"
          >
            <Typography>Õppematerjali metainfo</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="metainfo-subtitle">Õppematerjali andmed</div>

            <strong>Pealkiri:</strong> {material.title || '-'}<br />
            {material.description && (
              <>
                <strong>Kirjeldus:</strong> {material.description}<br />
              </>
            )}
            <strong>Kategooria:</strong> {material.categories?.map(c => c.name).join(', ') || '-'}<br />
            <strong>Keeletase:</strong> {material.languageLevel?.level || '-'}<br />
            <strong>Õppematerjali tüüp:</strong> {translatedType}<br />
          </AccordionDetails>
        </Accordion>

        {/* Õppematerjali sisu */}
        {type === 'file' && material.filePath && (
          <FileTemplate filename={material.filePath} />
        )}

        {type === 'text' && material.text && (
          <div style={{ marginTop: 12 }}>
            <TextTemplate html={material.text} />
          </div>
        )}

        {type === 'video' && (
          <div style={{ marginTop: 12 }}>
            <VideoTemplate
              videoUrl={material.videoUrl}
              embedCode={material.embedCode}
            />
          </div>
        )}

        {type === 'link' && material.link && (
          <div style={{ marginTop: 12 }}>
            <LinkTemplate url={material.link} />
          </div>
        )}
      </Box>
    </ModalBase>
  );
}
