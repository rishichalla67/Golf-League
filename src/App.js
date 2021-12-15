import React, {Component} from 'react';
import './App.css';
import playerForm from './Components/Form/playerForm'
import Home from './Components/Home/Home'
import { BrowserRouter as Router, Route, Switch, Redirect  } from 'react-router-dom';
import ScoreCard from './Components/ScoreCard/ScoreCard'
import SignUp from './Components/Authentication/SignUp';
import { AuthProvider } from './contexts/AuthContext';
import login from './Components/Authentication/Login';
import Profile from './Components/Profile/Profile';
import UpdateProfile from './Components/Profile/UpdateProfile';
import PrivateRoute from "./Components/PrivateRoute"
import ForgotPassword from "./Components/Authentication/ForgotPassword"
import Friends from "./Components/Friends/Friends"
import Chat from './Components/Chatroom/Chat';
import SimpleSwap from './Components/Exchange/SimpleSwap';


class App extends Component {

    render() { 
        return (
            <div className='App'>
                <Router>
                    
                        <Switch>
                            <AuthProvider>
                                <Route exact path="/">
                                    <Redirect to="/Login" />
                                </Route>
                                <Route exact path="/Login" component={login} />
                                <Route exact path="/SignUp" component={SignUp} />
                                <Route exact path="/forgot-password" component={ForgotPassword} />
                                <Route exact path="/simpleswap-affiliate-widget" component={SimpleSwap} />
                                {/* Private Routes */}
                                <PrivateRoute exact path="/Home" component={Home} />
                                <PrivateRoute exact path="/Friends" component={Friends} />
                                <PrivateRoute exact path="/global-chat" component={Chat} />
                                <PrivateRoute exact path="/Add" component={playerForm} />
                                <PrivateRoute exact path="/Profile" component={Profile} />
                                <PrivateRoute exact path="/update-profile" component={UpdateProfile} />
                                <PrivateRoute exact path="/Scorecard" component={ScoreCard} />
                                
                            </AuthProvider>
                        </Switch>
                    
                </Router>
            </div>
        );
    }
}
export default App;
