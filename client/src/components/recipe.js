import React from 'react'
import { Card, Button } from 'react-bootstrap'


const Recipe = ({ title, description, onClick }) => {
    return (
        <Card className='container rounded-div mt-2'>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <p>{description}</p>
                <Button variant='primary' onClick={onClick}>Update</Button>
            </Card.Body>
        </Card>

    )
}

export default Recipe