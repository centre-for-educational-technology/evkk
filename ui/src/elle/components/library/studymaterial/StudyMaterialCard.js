import React from 'react';
import '../../../pages/styles/Library.css';
import { Link } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export default function StudyMaterialCard({ material }) {
  return (
    <div className="exercise-card">
      {/* Materjali tüüp */}
      <div className="exercise-type-label">
        <MenuBookIcon fontSize="small" style={{ marginRight: 4 }} />
        ÕPPEMATERJAL
      </div>

      {/* Pealkiri ja kirjeldus */}
      <div style={{ marginTop: 24 }}>
        <h4>{material.title}</h4>
        <div>{material.description}</div>
        <div className="exercise-tags">
          {material.category} &nbsp;&nbsp;
          {material.level} &nbsp;&nbsp;
          .{material.filename?.split('.').pop() || 'pdf'}
        </div>
      </div>

      {/* Allalaadimine */}
      <div className="library-exercise-buttons" style={{ marginTop: 12, marginBottom: 8 }}>
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
    </div>
  );
}
