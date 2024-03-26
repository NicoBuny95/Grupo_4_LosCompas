import React, { useState, useEffect } from 'react';
import SmallCard from './SmallCard';


function ContentRowDashboard() {
    const [cardProps, setCardProps] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/product/Totals')
            .then(response => response.json())
            .then(data => {
                setCardProps(data);
            })
            .catch(error => {
                console.error('Error al obtener datos del dashboard:', error);
            });
    }, []);

    return (
        <div className="row">
            {cardProps.map((card, index) => (
                <SmallCard {...card} key={index} />
            ))}
        </div>
    );
}

export default ContentRowDashboard;