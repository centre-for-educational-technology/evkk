//vaheleht, mis renderib harjutuste ja õppematerjali lehed

import React, { Component } from 'react';
import './styles/Home.css';
import './styles/Library.css';
import { withTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom'

class Library extends Component {
    render(){
        return (
            <div>
                <Outlet/>
            </div>
        )
    }
}


export default withTranslation()(Library)