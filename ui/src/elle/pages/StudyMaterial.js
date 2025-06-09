import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import StudyMaterialCard from '../components/library/studymaterial/StudyMaterialCard';
import StudyMaterialPopup from '../components/library/studymaterial/StudyMaterialPopup';
import AddStudyMaterialButton from '../components/library/studymaterial/AddStudyMaterialButton';
import StudyMaterialModal from '../components/library/studymaterial/StudyMaterialModal';
import SearchBar from '../components/library/SearchBar';
import LibraryNavbar from '../components/library/LibraryNavbar';
import CategoryFilters from '../components/library/search/CategoryFilters';
import LanguageFilters from '../components/library/search/LanguageFilters';
import SortButton from '../components/library/SortButton';
import './styles/Home.css';
import './styles/Library.css';
import { ElleOuterDivStyle } from '../const/StyleConstants';

export default function StudyMaterial() {
  const [modalOpen, setModalOpen] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);


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
            <div className="library-exercise-filters">
              <CategoryFilters />
              <br />
              <LanguageFilters />
            </div>

            <div className="library-exercise-infoContainer">
              <div className="library-exercise-buttons">
                <AddStudyMaterialButton onClick={() => setModalOpen(true)} />
                <SortButton />
              </div>

              <div className="library-exercise-results-count">
                <Box>Leitud: {materials.length}</Box>
              </div>

              <div className="library-exercise-results">
                {materials.map((material) => (
                  <StudyMaterialCard
                    key={material.id}
                    material={material}
                    onClick={() => {
                      setSelectedMaterial(material);
                      setPopupOpen(true);
                    }}
                  />
                ))}
              </div>

            </div>
          </div>
        </Box>
      </Box>

      {/* Popup õppematerjali kuvamiseks */}
      <StudyMaterialPopup
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        material={selectedMaterial}
      />
    </div>
  );
}

