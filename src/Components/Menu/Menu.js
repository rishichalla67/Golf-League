import React from 'react';
import "./Menu.css";
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink} from './NavBar';


export default function Menu() {
    return(
        <>
            <Nav> 
                <NavLink to="/Home">
                    <h1>Logo</h1>
                </NavLink>
                <Bars />
                <NavMenu>
                    <NavLink to="/Scorecard" activeStyle>
                        ScoreCard
                    </NavLink>
                    <NavLink to="/Profile" activeStyle>
                        My Profile
                    </NavLink>
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to="/Login">Log In</NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    );
}
