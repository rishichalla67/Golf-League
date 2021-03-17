import React from 'react';
import { Link } from 'react-router-dom';
import "./Menu.css";



export default function Menu() {
    return(
        
                <header>
                    <h1 class="logo"><Link to="/Home">golFi</Link></h1>
                    <input type="checkbox" id="nav-toggle" class="nav-toggle"/>
                    <nav>
                        <ul>
                            <li><a href="/Home">Home</a></li>
                            <li><a href="/Profile">Profile</a></li>
                        </ul>
                    </nav>
                    <label for="nav-toggle" class="nav-toggle-label">
                        <span></span>
                    </label>
                </header>
        
    );
}
