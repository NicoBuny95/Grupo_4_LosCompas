
import React, { useState, useEffect } from 'react';


function LastMovieInDb() {
    const [lastProduct, setLastProduct] = useState(null);
    const baseUrl = 'http://localhost:3001/img/';

    useEffect(() => {
        fetch('http://localhost:3001/product/LastProduct')
            .then(response => response.json())
            .then(data => {
                setLastProduct(data);
            })
            .catch(error => {
                console.error('Error al obtener el último producto creado:', error);
            });
    }, []);

    return (
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Último Producto Agregado</h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        {lastProduct && <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: '10rem', height:'10rem' }} src={baseUrl + lastProduct.products_image} alt={lastProduct.products_name} />}
                    </div>
                    <p>{lastProduct ? lastProduct.products_description : 'Loading...'}</p>
                    <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">Ver Detalles del Producto</a>
                </div>
            </div>
        </div>
    );
}

export default LastMovieInDb;
