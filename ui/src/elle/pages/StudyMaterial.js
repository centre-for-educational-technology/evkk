import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams  } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import ContentCard from '../components/library/shared/ContentCard';
import AddStudyMaterialButton from '../components/library/studymaterial/AddStudyMaterialButton';
import AddStudyMaterial from '../components/library/studymaterial/AddStudyMaterial';
import StudyMaterialPopup from '../components/library/studymaterial/StudyMaterialPopup';
import SearchBar from '../components/library/search/SearchBar';
import LibraryNavbar from '../components/library/shared/LibraryNavbar';
import CategoryFilters from '../components/library/search/CategoryFilters';
import TypeFilters from '../components/library/search/TypeFilters';
import LanguageFilters from '../components/library/search/LanguageFilters';
import SortButton from '../components/library/search/SortButton';
import Pagination from '../components/library/shared/Pagination';
import usePagination from '../hooks/library/usePagination';
import './styles/Home.css';
import './styles/Library.css';
import { ElleOuterDivStyle } from '../const/StyleConstants';
import { useTranslation } from 'react-i18next';


export default function StudyMaterial() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const openId = searchParams.get('open');
  const [modalOpen, setModalOpen] = useState(false);
  const [materials, setMaterials] = useState([]);
  const materialsPerPage = 5;
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);

  const { t } = useTranslation();

  const handleCardClick = (material) => {
    setSelectedMaterial(material);
    setPopupOpen(true);

    // Lisame URL-i ?open=<id> ilma lehte uuesti laadimata
    const newSearch = new URLSearchParams(location.search);
    newSearch.set('open', material.id);
    navigate(`${location.pathname}?${newSearch.toString()}`, { replace: true });
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    setSelectedMaterial(null);

    const newSearch = new URLSearchParams(location.search);
    newSearch.delete('open');
    navigate(`${location.pathname}?${newSearch.toString()}`, { replace: true });
  };

  useEffect(() => {
    if (openId && materials.length > 0) {
      const match = materials.find(m => m.id === parseInt(openId));
      if (match) {
        setSelectedMaterial(match);
        setPopupOpen(true);
      }
    }
  }, [openId, materials]);


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
      <AddStudyMaterial
        isOpen={modalOpen}
        setIsOpen={() => setModalOpen(false)}
        onSubmitSuccess={newMaterial => {
          setMaterials(prev => [newMaterial, ...prev]);
          setCurrentPage(1);
        }}
      />
      <StudyMaterialPopup
        open={popupOpen}
        onClose={handleClosePopup}
        material={selectedMaterial}
      />
      <Box className="adding-rounded-corners" sx={ElleOuterDivStyle}>
        <Box className="library-container">
          <h1 style={{ textAlign: 'center' }}>{t('study_materials')}</h1>
          <div className="library-search-container"><SearchBar /></div>
          <div className="library-menu"><LibraryNavbar /></div>
          <div className="library-main-content">
            <div className="library-filters"><CategoryFilters /><br /><LanguageFilters /><br /><TypeFilters/></div>
            <div className="library-infoContainer">
              <div className="library-buttons">
                <AddStudyMaterialButton onClick={() => setModalOpen(true)} />
                <SortButton />
              </div>
              <div className="library-results-count"><Box>{t('query_found') + ':'} {materials.length}</Box></div>
              <div className="library-results">
                {currentMaterials.map(m => (
                  <ContentCard key={m.id} item={m} type="material" onClick={() => handleCardClick(m)} />
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
