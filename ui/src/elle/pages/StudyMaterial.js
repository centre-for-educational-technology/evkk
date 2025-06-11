import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import StudyMaterialCard from '../components/library/studymaterial/StudyMaterialCard';
import AddStudyMaterialButton from '../components/library/studymaterial/AddStudyMaterialButton';
import StudyMaterialModal from '../components/library/studymaterial/StudyMaterialModal';
import StudyMaterialPopup from '../components/library/studymaterial/StudyMaterialPopup';
import SearchBar from '../components/library/search/SearchBar';
import LibraryNavbar from '../components/library/shared/LibraryNavbar';
import CategoryFilters from '../components/library/search/CategoryFilters';
import LanguageFilters from '../components/library/search/LanguageFilters';
import SortButton from '../components/library/search/SortButton';
import Pagination from '../components/library/shared/Pagination';
import usePagination from '../hooks/library/usePagination';
import './styles/Home.css';
import './styles/Library.css';
import { ElleOuterDivStyle } from '../const/StyleConstants';

export default function StudyMaterial() {
  const [modalOpen, setModalOpen] = useState(false);
  const [materials, setMaterials] = useState([]);
  const materialsPerPage = 5;
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);

  const handleCardClick = (material) => {
    setSelectedMaterial(material);
    setPopupOpen(true);
  };

  const {
    currentPage,
    totalPages,
    currentItems: currentMaterials,
    goToPrev: prev,
    goToNext: next,
    setCurrentPage
  } = usePagination(materials, materialsPerPage);

  useEffect(() => {
    const fetchMaterials = async () => {
      const url = process.env.NODE_ENV === 'production'
        ? '/api/study-material/all'
        : 'http://localhost:9090/api/study-material/all';
      try {
        const res = await fetch(url);
        setMaterials(await res.json());
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
        onSubmitSuccess={newMaterial => {
          setMaterials(prev => [newMaterial, ...prev]);
          setCurrentPage(1); // Hookist
        }}
      />
      <StudyMaterialPopup
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        material={selectedMaterial}
      />
      <Box className="adding-rounded-corners" sx={ElleOuterDivStyle}>
        <Box className="library-container">
          <h1 style={{ textAlign: 'center' }}>Õppematerjalid</h1>
          <div className="library-search-container"><SearchBar /></div>
          <div className="library-menu"><LibraryNavbar /></div>
          <div className="library-main-content">
            <div className="library-filters"><CategoryFilters /><br /><LanguageFilters /></div>
            <div className="library-infoContainer">
              <div className="library-buttons">
                <AddStudyMaterialButton onClick={() => setModalOpen(true)} />
                <SortButton />
              </div>
              <div className="library-results-count"><Box>Leitud: {materials.length}</Box></div>
              <div className="library-results">
                {currentMaterials.map(m => (
                  <StudyMaterialCard key={m.id} material={m} onClick={() => handleCardClick(m)} />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPrev={prev}
                onNext={next}
              />
            </div>
          </div>
        </Box>
      </Box>
    </div>
  );
}
