import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import StudyMaterialCard from '../components/library/studymaterial/StudyMaterialCard';
import AddStudyMaterialButton from '../components/library/studymaterial/AddStudyMaterialButton';
import StudyMaterialModal from '../components/library/studymaterial/StudyMaterialModal';
import SearchBar from '../components/library/search/SearchBar';
import LibraryNavbar from '../components/library/shared/LibraryNavbar';
import CategoryFilters from '../components/library/search/CategoryFilters';
import LanguageFilters from '../components/library/search/LanguageFilters';
import SortButton from '../components/library/search/SortButton';
import './styles/Home.css';
import './styles/Library.css';
import { ElleOuterDivStyle } from '../const/StyleConstants';

export default function StudyMaterial() {
  const [modalOpen, setModalOpen] = useState(false);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      const url =
        process.env.NODE_ENV === 'production'
          ? '/api/study-material/all'
          : 'http://localhost:9090/api/study-material/all';

      try {
        const response = await fetch(url);
        const data = await response.json();
        setMaterials(data);
      } catch (err) {
        console.error('Viga õppematerjalide laadimisel:', err);
      }
    };

    fetchMaterials();
  }, []);

  return (
    <div>
      <StudyMaterialModal
        isOpen={modalOpen}
        setIsOpen={() => setModalOpen(false)}
        onSubmitSuccess={(newMaterial) => {
          setMaterials((prev) => [newMaterial, ...prev]);
        }}
      />
      <Box className="adding-rounded-corners" sx={ElleOuterDivStyle}>
        <Box className="library-container">
          <h1 style={{ textAlign: 'center' }}>Õppematerjalid</h1>

          <div className="library-search-container">
            <SearchBar />
          </div>
          <div className="library-menu">
            <LibraryNavbar />
          </div>

          <div className="library-main-content">
            <div className="library-filters">
              <CategoryFilters />
              <br />
              <LanguageFilters />
            </div>

            <div className="library-infoContainer">
              <div className="library-buttons">
                <AddStudyMaterialButton onClick={() => setModalOpen(true)} />
                <SortButton />
              </div>

              <div className="library-results-count">
                <Box>Leitud: {materials.length}</Box>
              </div>

              <div className="library-results">
                {materials.map((material) => (
                  <StudyMaterialCard key={material.id} material={material} />
                ))}
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </div>
  );
}
