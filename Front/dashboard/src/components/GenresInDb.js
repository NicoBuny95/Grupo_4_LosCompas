import React, { useState, useEffect } from 'react';


function GenresInDb() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Realizar solicitud al backend para obtener las categorías con el total de productos
    fetch('http://localhost:3001/product/TotalsByCategory')
      .then(response => response.json())
      .then(data => {
        setCategories(data);
      })
      .catch(error => {
        console.error('Error al obtener las categorías con el total de productos:', error);
      });
  }, []);

  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            Total de Productos por categoria
          </h5>
        </div>
        <div className="card-body">
          <div className="row">
            {categories.map((category, index) => (
              <div className="col-lg-6 mb-4" key={index}>
                <div className="card bg-dark text-white shadow">
                  <div className="card-body">
                    <h6 className="card-title">{category.name}</h6>
                    <p className="card-text">Total Productos: {category.totalProducts}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


export default GenresInDb;
