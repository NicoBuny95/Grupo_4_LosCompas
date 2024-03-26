import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false); 
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedPrice, setEditedPrice] = useState('');
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5); 
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/product/allProductsJson')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error al obtener la lista de productos:', error));
  }, []);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditedName(product.products_name);
    setEditedPrice(product.products_price);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setSelectedProduct(null);
    setEditedName('');
    setEditedPrice('');
  };

  const handleSave = () => {
    const editedProduct = { ...selectedProduct, products_name: editedName, products_price: editedPrice };
    fetch(`http://localhost:3001/product/editProductJson/${selectedProduct.products_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editedProduct)
    })
    .then(response => {
      if (response.ok) {
        setProducts(prevProducts => {
          return prevProducts.map(product => {
            if (product.products_id === editedProduct.products_id) {
              return editedProduct;
            }
            return product;
          });
        });
        handleCloseModal();
      } else {
        throw new Error('Error al guardar los cambios del producto');
      }
    })
    .catch(error => {
      console.error('Error al guardar los cambios del producto:', error);
      alert('Hubo un error al guardar los cambios del producto. Por favor, inténtalo de nuevo.');
    });
  };

  const handleOpenModal = () => {
    setShowCreateModal(true);
  };

  const handleCloseModalNew = () => {
    setShowCreateModal(false);
    setNewProductName('');
    setNewProductPrice('');
  };

  const handleSaveNewProduct = () => {
    const newProduct = {
      products_name: newProductName,
      products_price: newProductPrice
    };
    fetch('http://localhost:3001/product/addProduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProduct)
    })
    .then(response => {
      if (response.ok) {
        setProducts(prevProducts => [...prevProducts, newProduct]);
        handleCloseModalNew();
      } else {
        throw new Error('Error al guardar el nuevo producto');
      }
    })
    .catch(error => {
      console.error('Error al guardar el nuevo producto:', error);
      alert('Hubo un error al guardar el nuevo producto. Por favor, inténtalo de nuevo.');
    });
  };

  const handleDelete = (productId) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (confirmDelete) {
      fetch(`http://localhost:3001/product/deleteProductJson/${productId}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (response.ok) {
          setProducts(prevProducts => prevProducts.filter(product => product.products_id !== productId));
          console.log(`Producto con ID ${productId} eliminado correctamente`);
        } else {
          throw new Error('Error al eliminar el producto');
        }
      })
      .catch(error => {
        console.error('Error al eliminar el producto:', error);
        alert('Hubo un error al eliminar el producto. Por favor, inténtalo de nuevo.');
      });
    }
  };


 // Obtener los productos actuales basados en la página actual
 const indexOfLastProduct = currentPage * productsPerPage;
 const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
 const currentProducts = products
 .filter(product =>
   product.products_name.toLowerCase().includes(searchTerm.toLowerCase())
 )
 .slice(indexOfFirstProduct, indexOfLastProduct);

 // Cambiar de página
 const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='container'>
      <h2>Lista de Productos</h2>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      <button className="btn btn-success" onClick={handleOpenModal}>Crear Nuevo Producto</button>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map(product => (
            <tr key={product.products_id}>
              <td>{product.products_name}</td>
              <td>{product.products_price}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleEdit(product)}>Editar</button>
                <button className="btn btn-danger" onClick={() => handleDelete(product.products_id)}>Dar Baja</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="pagination">
        {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map((_, index) => (
          <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
            <button onClick={() => paginate(index + 1)} className="page-link">
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
      <Modal show={showCreateModal} onHide={handleCloseModalNew}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Nuevo Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="newProductName">Nombre:</label>
              <input
                type="text"
                className="form-control"
                id="newProductName"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="newProductPrice">Precio:</label>
              <input
                type="number"
                className="form-control"
                id="newProductPrice"
                value={newProductPrice}
                onChange={(e) => setNewProductPrice(e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalNew}>Cerrar</Button>
          <Button variant="primary" onClick={handleSaveNewProduct}>Guardar</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="productName">Nombre:</label>
              <input
                type="text"
                className="form-control"
                id="productName"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="productPrice">Precio:</label>
              <input
                type="number"
                className="form-control"
                id="productPrice"
                value={editedPrice}
                onChange={(e) => setEditedPrice(e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseModal}>Cerrar</Button>
    <Button variant="primary" onClick={handleSave}>Guardar Cambios</Button>
  </Modal.Footer>
</Modal>
</div>
);
};

export default ProductTable;