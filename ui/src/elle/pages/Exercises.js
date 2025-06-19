import { Box, Button } from '@mui/material';
import './styles/Home.css';
import './styles/Library.css';
import { ElleOuterDivStyle } from '../const/StyleConstants';
import LibraryNavbar from '../components/library/shared/LibraryNavbar';
import SortButton from '../components/library/search/SortButton';
import CategoryFilters from '../components/library/search/CategoryFilters';
import LanguageFilters from '../components/library/search/LanguageFilters';
import TypeFilters from '../components/library/search/TypeFilters';
import SearchBar from '../components/library/search/SearchBar'
import ExerciseModal from '../components/library/exercises/ExerciseModal'
import EditNoteIcon from '@mui/icons-material/EditNote';
import { DefaultButtonStyleSmall } from '../const/StyleConstants';
import { useState, useEffect } from 'react';
import ContentCard from '../components/library/shared/ContentCard';
import Can from '../components/security/Can';
import usePagination from '../hooks/library/usePagination';
import Pagination from '../components/library/shared/Pagination';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Exercise() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const itemsPerPage = 5;
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    currentPage,
    totalPages,
    currentItems: currentExercises,
    goToPrev: prev,
    goToNext: next,
    setCurrentPage
  } = usePagination(exercises, itemsPerPage);

  const handleCategoriesChange = (selected) => {
    setSelectedCategories(selected);
  }
  const handleLanguagesChange = (selected) => {
    setSelectedLanguages(selected);
  }

  const fetchData = () => {
    const params = new URLSearchParams();
    if(selectedCategories.length) {
      params.append('categories', selectedCategories.join(','));
    }
    if(selectedLanguages.length) {
      params.append('languageLevel', selectedLanguages.join(','));
    }
    fetch(`http://localhost:9090/api/exercises/results?${params.toString()}`)
      .then(res => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return res.json();
      })
      .then(json => { setExercises(json); })
      .catch(err => {
        console.error(err);
        setExercises([]);
      });
  }

  useEffect(() => {
    fetchData();
  }, [selectedCategories, selectedLanguages, selectedTypes]);

  return (
    <div>
      <ExerciseModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      <Box className="adding-rounded-corners" sx={ElleOuterDivStyle}>
        <Box className="library-container">
          <h1 className="library-page-title">{t('exercises')}</h1>

          <div className="library-main-content">
            <div className="library-filters">
              <div className="library-navbar-section">
                <LibraryNavbar />
              </div>
              <div className="library-filters-section">
                <CategoryFilters selected={selectedCategories} onChange={handleCategoriesChange}/>
                <br />
                <LanguageFilters selected={selectedLanguages} onChange={handleLanguagesChange}/>
                <br />
                <TypeFilters />
              </div>
            </div>

            <div className="library-infoContainer">
              <SearchBar />
              <div className="library-header-actions">
                <div>
                  <Can requireAuth={true}>
                    <Button
                      onClick={() => setIsModalOpen(true)}
                      sx={DefaultButtonStyleSmall}
                      className="library-add-button"
                    >
                      <EditNoteIcon />
                      {t('exercise_page_create_new_exercise')}
                    </Button>
                  </Can>
                </div>
                <SortButton />
              </div>

              <div className="library-results-count">
                <Box>{t('query_found')}: {currentExercises.length}</Box>
              </div>

              <div className="library-results">
                {currentExercises.map(item => (
                  <div key={item.id} onClick={() => navigate(`/library/exercises/${item.id}`)} style={{ cursor: 'pointer' }}>
                    <ContentCard item={item} type="exercise" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrev={prev}
            onNext={next}
          />
        </Box>
      </Box>
    </div>
  );
}
