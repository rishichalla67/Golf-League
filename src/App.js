import React, {Component} from 'react';
import './App.css';
import playerForm from './Components/Form/playerForm'
import Home from './Components/Home/Home'
import { BrowserRouter as Router, Route, Switch, Redirect  } from 'react-router-dom';
import ScoreCard from './Components/ScoreCard/ScoreCard'
import SignUp from './Components/Authentication/SignUp';
import { AuthProvider } from './contexts/AuthContext';
import login from './Components/Authentication/Login';



class App extends Component {

    render() { 
        return (
            <Router>
                <div className={'App'}>
                    <Switch>
                        <AuthProvider>
                            <Route exact path="/Home" component={Home} />
                            <Route exact path="/SignUp" component={SignUp} />
                            <Route exact path="/Login" component={login} />
                            <Route exact path="/Add" component={playerForm} />
                            <Route exact path="/Scorecard" component={ScoreCard} />
                            <Route exact path="/">
                                <Redirect to="/SignUp" />
                            </Route>
                        </AuthProvider>
                    </Switch>
                </div>
            </Router>
        );
    }
}
export default App;
