import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/navbar';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'

import Home from './components/home';
import Login from './components/login';
import SignUp from './components/signup';
import CreateRecipe from './components/create_recipe';


const App = () => {

    return (
        <Router>
            <div>
                <NavBar />
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/create-recipe' element={<CreateRecipe/>}/>
                    <Route path='/signup' element={<SignUp/>}/>
                    <Route path='/login' element={<Login/>}/>
                </Routes>
            </div>
        </Router>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

