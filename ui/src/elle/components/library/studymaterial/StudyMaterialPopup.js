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

export default function StudyMaterialPopup({ open, onClose, material }) {
  const [metadataExpanded, setMetadataExpanded] = useState(true);

  if (!material) return null;

  const fileUrl =
    process.env.NODE_ENV === 'production'
      ? `/api/files/${material.filename}`
      : `http://localhost:9090/api/files/${material.filename}`;

  return (
    <ModalBase isOpen={open} setIsOpen={onClose} title={material.title.toUpperCase()}>
      <Box display="flex" flexDirection="column" gap={2}>

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
            <strong>Kategooria:</strong> {material.category || '-'}<br />
            <strong>Keeletase:</strong> {material.level || '-'}<br />
            <strong>Õppematerjali tüüp:</strong> {material.type || '-'}<br />
          </AccordionDetails>
        </Accordion>

        {/* Õppematerjali sisu */}
        {material.type === 'fail' && material.filename && (
          <FileTemplate filename={material.filename} />
        )}

        {material.type === 'tekst' && material.text && (
          <div style={{ marginTop: 12 }}>
            <TextTemplate html={material.text} />
          </div>
        )}

        {material.type === 'video' && material.link && (
          <div style={{ marginTop: 12 }}>
            <VideoTemplate videoUrl={material.link} />
          </div>
        )}

        {material.type === 'link' && material.link && (
          <div style={{ marginTop: 12 }}>
            <LinkTemplate url={material.link} />
          </div>
        )}
      </Box>
    </ModalBase>
  );
}
