import { Box } from '@mui/material';
import './styles/Home.css';
import './styles/Library.css';
import { ElleOuterDivStyle } from '../const/StyleConstants';
import LibraryNavbar from '../components/library/LibraryNavbar'
import SortButton from '../components/library/SortButton';
import CategoryFilters from '../components/library/search/CategoryFilters';
import LanguageFilters from '../components/library/search/LanguageFilters';
import SearchBar from '../components/library/SearchBar';
import ExerciseModal from '../components/library/ExerciseModal';
import ExerciseCard from '../components/library/ExerciseCard';
import { useState } from 'react';

export default function Exercise () {
    const [isModalOpen, setIsModalOpen] = useState(false);
        return (
            <div>
                <Box className="adding-rounded-corners" sx={ElleOuterDivStyle}>
                    <Box className="library-container">
                        <h1 style={{textAlign: 'center'}}>Harjutused</h1>
                        <div className="library-search-container">
                            <SearchBar/>
                        </div>
                        <div className="library-menu">
                            <LibraryNavbar/>
                        </div>
                        <div className="library-exercise-infoContainer">
                            <div className="library-exercise-buttons">
                                <ExerciseModal isOpen={isModalOpen} setIsOpen={setIsModalOpen}/>
                                <SortButton/>
                            </div>
                            <div className="library-exercise-results-count">
                                <Box>Leitud: {}</Box>
                            </div>
                            <div className="library-exercise-results">
                                <ExerciseCard/>
                            </div>
                        </div>
                        <div className="libary-exercise-container">
                            <div className="library-exercise-filters">
                                <CategoryFilters />
                                <br/>
                                <LanguageFilters />
                            </div>
                        </div>
                    </Box>
                </Box>
            </div>
        )
}
