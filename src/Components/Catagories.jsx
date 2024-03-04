import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Categories() {
    const [products, setProducts] = useState([]);

    //have to connect it with backend

    useEffect(() => {
        fetch('YOUR_BACKEND_ENDPOINT/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching data: ', error));
    }, []); 

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}> 
            {products.map((product) => (
                <Card key={product.id} style={{ width: '18rem' }}> 
                    <Card.Img variant="top" src={product.imageUrl || 'default-placeholder.png'} />
                    <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>
                            {product.description}
                        </Card.Text>
                        <Button variant="primary" href={product.link}>Go somewhere</Button>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}

export default Categories;
