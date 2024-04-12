import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    useEffect(() => {
        fetch("/recipe/hello")
        .then(response => response.json())
        .then(data => console.log(data))
    }, []);

    const [message, setMessage] = useState("");
    return (
        <div>
            {message}
        </div>
    )
}

const root = ReactDOM.render(<App/>, document.getElementById('root'));
root.render(<App/>)
