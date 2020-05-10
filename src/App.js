import React, {Component} from 'react';
import './App.css';
import playerForm from './Components/Form/playerForm'
import Home from './Components/Home/Home'
import { BrowserRouter as Router, Route, Switch, Redirect  } from 'react-router-dom';
import ScoreCard from './Components/ScoreCard/ScoreCard'



class App extends Component {

    render() {
        return (
            <Router>
                <div className={'App'}>
                    <Switch>
                        <Route exact path="/Home" component={Home} />
                        <Route exact path="/Add" component={playerForm} />
                        <Route exact path="/Scorecard" component={ScoreCard} />
                        <Route exact path="/">
                            <Redirect to="/Home" />
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}
export default App;
