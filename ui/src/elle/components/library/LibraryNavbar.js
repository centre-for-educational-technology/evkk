import React from 'react';
import { Link } from 'react-router-dom';

export default function LibraryNavbar(){
    return (
        <nav className="libary-navbar-container">
            <ul className="library-navbar-list">
                <Link to="/library/exercises">Harjutused</Link>
                <br/>
                <Link to="/library/studymaterial">Õppematerjalid</Link>
            </ul>
        </nav>
    )
}