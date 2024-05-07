import React from 'react'
import { Card, Button } from 'react-bootstrap'


const Recipe = ({ title, description, onClick, onClickDelete }) => {
    return (
        <Card className='container rounded-div mt-2'>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <p>{description}</p>
                <div className="d-flex justify-content-end">
                    <Button variant='primary' onClick={onClick}>Update</Button>
                    <Button variant='danger' onClick={onClickDelete} className="ml-2">Delete</Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default Recipe