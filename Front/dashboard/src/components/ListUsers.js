import React, { useState, useEffect } from 'react';

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Lógica para obtener la lista de usuarios desde el backend
    fetch('http://localhost:3001/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error al obtener la lista de usuarios:', error));
  }, []);


  const handleEdit = (productId) => {
    // Implementa la lógica para editar el producto con el ID proporcionado
    console.log('Editar producto con ID:', productId);
  };

  const handleDelete = (productId) => {
    // Implementa la lógica para eliminar el producto con el ID proporcionado
    console.log('Eliminar producto con ID:', productId);
  };

  const handleCreate = () => {
    // Implementa la lógica para crear un nuevo producto
    console.log('Crear nuevo producto');
  };

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo Electrónico</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleEdit(user.id)}>Editar</button>
                <button onClick={() => handleDelete(user.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleCreate}>Crear Nuevo Usuario</button>
    </div>
  );
};

export default UserTable;
