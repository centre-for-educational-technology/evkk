import React, { Component } from 'react';
import { Box } from '@mui/material';
import './styles/Home.css';
import { withTranslation } from 'react-i18next';
import { ElleOuterDivStyle } from '../const/StyleConstants';
import { Link } from 'react-router-dom';

import AddStudyMaterialButton from '../components/studymaterial/AddStudyMaterialButton';
import StudyMaterialModal from '../components/studymaterial/StudyMaterialModal';
import SearchBar from '../components/library/SearchBar';
import LibraryNavbar from '../components/library/LibraryNavbar';
import CategoryFilters from '../components/library/search/CategoryFilters';
import LanguageFilters from '../components/library/search/LanguageFilters';
import SortButton from '../components/library/SortButton';

class StudyMaterial extends Component {
  state = {
    modalOpen: false
  };

  handleOpenModal = () => {
    this.setState({ modalOpen: true });
  };

  handleCloseModal = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    return (
      <div>
        <Box className="adding-rounded-corners" sx={ElleOuterDivStyle}>
          <Box className="library-container">

            <h1 style={{ textAlign: 'center' }}>Õppematerjalid</h1>

            <div className="library-search-container">
              <SearchBar />
            </div>

            <div className="add-material-button">
              <AddStudyMaterialButton onClick={this.handleOpenModal} />
            </div>

            {/* Õppematerjali popup */}
            <StudyMaterialModal
              isOpen={this.state.modalOpen}
              setIsOpen={this.handleCloseModal}
            />

            <div className="library-menu">
              <LibraryNavbar />
            </div>

            <div className="libary-exercise-container">
              <div className="library-exercise-filters">
                <CategoryFilters />
                <br />
                <LanguageFilters />
              </div>
            </div>

            <div className="library-exercise-infoContainer">
              <SortButton />
              <div className="library-exercise-results">
                <Box style={{ border: '1px solid black' }}>Leitud: {}</Box>
              </div>
            </div>
          </Box>
        </Box>
      </div>
    );
  }
}

export default withTranslation()(StudyMaterial);
