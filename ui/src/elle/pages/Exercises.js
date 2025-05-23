import * as React from 'react';
import { Box } from '@mui/material';
import './styles/Home.css';
import './styles/Library.css';
import { withTranslation } from 'react-i18next';
import { ElleOuterDivStyle } from '../const/StyleConstants';
import LibraryNavbar from '../components/library/LibraryNavbar'
import SortButton from '../components/library/SortButton';
import CategoryFilters from '../components/library/search/CategoryFilters';
import LanguageFilters from '../components/library/search/LanguageFilters';
import SearchBar from '../components/library/SearchBar'
import ExerciseModal from '../components/library/ExerciseModal'
import { useState } from 'react';

export default function Exercise ()  {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div>
            <ExerciseModal isOpen={isModalOpen} setIsOpen={setIsModalOpen}/>
                <Box className="adding-rounded-corners" sx={ElleOuterDivStyle}>
                    <Box className="library-container">
                        <h1 style={{textAlign: 'center'}}>Harjutused</h1>
                        <div className="library-search-container">
                            <SearchBar/>
                        </div>
                        <div className="library-menu">
                            <LibraryNavbar/>
                        </div>
                        <div className="libary-exercise-container">
                            <div className="library-exercise-filters">
                                <CategoryFilters />
                                <br/>
                                <LanguageFilters />
                            </div>
                        </div>
                        <div className="library-exercise-infoContainer">
                            <SortButton/>
                            <div className="library-exercise-results">
                                <Box style={{border: '1px solid black'}}>Leitud: {}</Box>
                            </div>
                        </div>
                    </Box>
                </Box>
            </div>
    )
};
