import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/navbar';

const App = () => {

    return (
        <div className='container'>
            <NavBar/>
        </div>
    )
}

ReactDOM.render(<App/>,document.getElementById('root'));

