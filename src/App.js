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



class App extends Component {

    render() { 
        return (
            <Router>
                <div className={'App'}>
                    <Switch>
                        <AuthProvider>
                            <Route exact path="/Login" component={login} />
                            <Route exact path="/SignUp" component={SignUp} />
                            <Route exact path="/forgot-password" component={ForgotPassword} />
                            {/* Private Routes */}
                            <PrivateRoute exact path="/Home" component={Home} />
                            <PrivateRoute exact path="/Add" component={playerForm} />
                            <PrivateRoute exact path="/Profile" component={Profile} />
                            <PrivateRoute exact path="/update-profile" component={UpdateProfile} />
                            <PrivateRoute exact path="/Scorecard" component={ScoreCard} />
                            <PrivateRoute exact path="/">
                                <Redirect to="/Login" />
                            </PrivateRoute>
                        </AuthProvider>
                    </Switch>
                </div>
            </Router>
        );
    }
}
export default App;
