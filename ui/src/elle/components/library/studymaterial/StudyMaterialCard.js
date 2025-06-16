import React from 'react';
import '../../../pages/styles/Library.css';
import { Link, Button, Tooltip, IconButton } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ShareLinkModal from './ShareLinkModal';
import ShareIcon from '@mui/icons-material/Share';
import { useTranslation } from 'react-i18next';


export default function StudyMaterialCard({ material, onClick }) {
  const [shareOpen, setShareOpen] = React.useState(false);
  const isFile = material.materialType?.type?.toLowerCase() === 'file';
  const extension = material.fileFormat;
  const size = material.fileSize;

  const { t } = useTranslation();

  const typeTranslation = {
    file: 'Fail',
    link: 'Link',
    text: 'Tekst',
    video: 'Video'
  };

  if (!material) return null;

  const type = material.materialType?.type?.toLowerCase();
  const translatedType = typeTranslation[type] || '-';
  console.log('Categories:', material.categories);



  return (
    <div
      className="content-card"
      onClick={onClick}
      style={{ cursor: 'pointer' }} // ← võimaldab kaardil klõpsamist
    >
      <div className="content-card-type-label">
        <MenuBookIcon fontSize="small" style={{ marginRight: 4 }} />
        {t('study_material')}
      </div>

      <Tooltip title="Loo jagatav link">
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            setShareOpen(true);
          }}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: '#852197',
            backgroundColor: 'white',
            border: '1px solid #ddd',
            padding: '4px',
            zIndex: 1
          }}
        >
          <ShareIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      {/* Materjali tüüp */}

      {/* Title and description */}
      <div style={{ marginTop: 30 }}>
        <div className='body2'><strong>{material.title}</strong></div>
        <div className='body2'>{material.description}</div>
        <div className="content-card-tags">
          <span className="tag">{translatedType}, </span>
          &nbsp;&nbsp;
          {material.categories?.map(c => c.name).join(', ') || '-'}, &nbsp;&nbsp;
          {material.languageLevel?.level || '-'} &nbsp;&nbsp;
          {isFile && extension  && <>, .{extension} &nbsp;&nbsp;</>}
          {isFile && (
            <>, ({((size || 0) / (1024 * 1024)).toFixed(2)} MB)</>
          )}
        </div>
      </div>

      <div
        className="library-buttons"
        style={{ marginTop: 12, marginBottom: 8 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="text"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          sx={{ textTransform: 'none', padding: 0, minWidth: 'auto' }}
        >
          {t('study_material_inspect')}
        </Button>
        <ShareLinkModal
          open={shareOpen}
          onClose={() => setShareOpen(false)}
          originalUrl={`${window.location.origin}/library/studymaterial?open=${material.id}`}
        />
      </div>
    </div>
  );
}
