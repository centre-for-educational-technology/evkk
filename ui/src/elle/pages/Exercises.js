import { Box, Button } from '@mui/material';
import './styles/Home.css';
import './styles/Library.css';
import { ElleOuterDivStyle } from '../const/StyleConstants';
import LibraryNavbar from '../components/library/shared/LibraryNavbar'
import SortButton from '../components/library/search/SortButton';
import CategoryFilters from '../components/library/search/CategoryFilters';
import LanguageFilters from '../components/library/search/LanguageFilters';
import SearchBar from '../components/library/search/SearchBar'
import ExerciseModal from '../components/library/exercises/ExerciseModal'
import EditNoteIcon from '@mui/icons-material/EditNote';
import { DefaultButtonStyleSmall } from '../const/StyleConstants';
import { useState, useEffect } from 'react';
import ContentCard from '../components/library/shared/ContentCard';
import Can from '../components/security/Can';


export default function Exercise() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        fetch("http://localhost:9090/api/exercises")
            .then(res => res.json())
            .then(setExercises);
    }, []);

    return (
        <div>
            <ExerciseModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
            <Box className="adding-rounded-corners" sx={ElleOuterDivStyle}>
                <Box className="library-container">
                    <h1 style={{ textAlign: 'center' }}>Harjutused</h1>
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
                                <Can requireAuth={true}>
                                  <Button onClick={() => setIsModalOpen(true)}
                                      sx={DefaultButtonStyleSmall}
                                      className="library-add-button"
                                  ><EditNoteIcon />Loo Uus Harjutus</Button>
                                </Can>
                                <SortButton />
                            </div>

                            <div className="library-results-count">
                                <Box>Leitud: {exercises.length}</Box>
                            </div>

                            <div className="library-results">
                                {exercises.map(item => (
                                    <ContentCard
                                        key={item.id}
                                        item={item}
                                        type="exercise"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </Box>
            </Box>
        </div>
    )
};
