import React from 'react';
import '../../../pages/styles/Library.css';
import { Link } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export default function StudyMaterialCard({ material }) {
  const isFile = material.type === 'fail';
  const extension = material.filename?.split('.').pop();

  return (
    <div className="content-card">
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
          {/* Õppematerjali tüüp  */}
          <span className="tag">{material.type}</span>
          &nbsp;&nbsp;

          {/* Kategooria ja keeletase */}
          {material.category} &nbsp;&nbsp;
          {material.level} &nbsp;&nbsp;

          {/* Kui fail, näita laiendit ja suurust */}
          {isFile && extension && <>.{extension} &nbsp;&nbsp;</>}
          {isFile && material.size != null && (
            <>({(material.size / (1024 * 1024)).toFixed(2)} MB)</>
          )}
        </div>
      </div>

      {/* Allalaadimislink ainult failide puhul */}
      {isFile && material.filename && (
        <div className="library-buttons" style={{ marginTop: 12, marginBottom: 8 }}>
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
          >
            Lae alla
          </Link>
        </div>
      )}
    </div>
  );
}
