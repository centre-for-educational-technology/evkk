import React from 'react';
import '../../../pages/styles/Library.css';
import { Link, Button, Tooltip, IconButton } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ShareLinkModal from './ShareLinkModal';
import ShareIcon from '@mui/icons-material/Share';


export default function StudyMaterialCard({ material, onClick }) {
  const [shareOpen, setShareOpen] = React.useState(false);
  const isFile = material.type === 'fail';
  const extension = material.filename?.split('.').pop();

  return (
    <div
      className="content-card"
      onClick={onClick}
      style={{ cursor: 'pointer' }} // ← võimaldab kaardil klõpsamist
    >
      <div className="content-card-type-label">
        <MenuBookIcon fontSize="small" style={{ marginRight: 4 }} />
        ÕPPEMATERJAL
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
          <span className="tag">{material.type}</span>
          &nbsp;&nbsp;
          {material.category} &nbsp;&nbsp;
          {material.level} &nbsp;&nbsp;
          {isFile && extension && <>.{extension} &nbsp;&nbsp;</>}
          {isFile && material.size != null && (
            <>({(material.size / (1024 * 1024)).toFixed(2)} MB)</>
          )}
        </div>
      </div>

      {/* Nupud: "Lae alla" ainult failile, "Vaata lähemalt" alati */}
      <div
        className="library-buttons"
        style={{ marginTop: 12, marginBottom: 8 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/*{isFile && material.filename && (
          <Link
            href={
              process.env.NODE_ENV === 'production'
                ? `/api/files/${material.filename}`
                : `http://localhost:9090/api/files/${material.filename}`
            }
            download
            underline="hover"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginRight: '1rem' }}
          >
            Lae alla
          </Link>
        )}*/}

        <Button
          variant="text"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          sx={{ textTransform: 'none', padding: 0, minWidth: 'auto' }}
        >
          Vaata lähemalt
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
