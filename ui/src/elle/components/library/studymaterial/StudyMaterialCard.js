import React from 'react';
import '../../../pages/styles/Library.css';
import { Link, Button } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export default function StudyMaterialCard({ material, onClick }) {
  const isFile = material.type === 'fail';
  const extension = material.filename?.split('.').pop();

  return (
    <div
      className="content-card"
      onClick={onClick}
      style={{ cursor: 'pointer' }} // ← võimaldab kaardil klõpsamist
    >
      {/* Materjali tüüp */}
      <div className="content-card-type-label">
        <MenuBookIcon fontSize="small" style={{ marginRight: 4 }} />
        ÕPPEMATERJAL
      </div>

      {/* Pealkiri ja kirjeldus */}
      <div style={{ marginTop: 24 }}>
        <h4>{material.title}</h4>
        <div>{material.description}</div>
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
        {isFile && material.filename && (
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
        )}

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
      </div>
    </div>
  );
}
