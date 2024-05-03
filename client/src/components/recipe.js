import React from 'react'


const Recipe = ({ title, description }) => {
    return (
        <div className='container'> 
            <h2>{title}</h2>
            <p>{description}</p>
        </div>

    )
}

export default Recipe