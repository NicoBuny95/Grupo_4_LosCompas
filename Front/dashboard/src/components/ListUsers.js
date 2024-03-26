import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false); 
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  // Estados para el formulario de creación
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  // Estados para el formulario de edición
  const [editedUsername, setEditedUsername] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedFirstName, setEditedFirstName] = useState('');
  const [editedLastName, setEditedLastName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); 
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    fetch('http://localhost:3001/user/users')
      .then(response => response.json())
      .then(data => setUsers(data.filter(user => user.users_active)))
      .catch(error => console.error('Error al obtener la lista de usuarios:', error));
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditedUsername(user.users_username);
    setEditedFirstName(user.users_firstName);
    setEditedLastName(user.users_lastName);
    setEditedEmail(user.users_email);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setSelectedUser(null);
    setEditedUsername('');
    setEditedEmail('');
  };

  const handleSave = () => {
    const editedUser = {
      username: editedUsername,
      firstName: editedFirstName,
      lastName: editedLastName,
      email: editedEmail
    };
  
    fetch(`http://localhost:3001/user/editUser/${selectedUser.users_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editedUser)
    })
    .then(response => {
      if (response.ok) {
        setUsers(prevUsers => {
          return prevUsers.map(user => {
            if (user.users_id === selectedUser.users_id) {
              return { ...user, ...editedUser };
            }
            return user;
          });
        });
        handleCloseModal();
      } else {
        throw new Error('Error al guardar los cambios del usuario');
      }
    })
    .catch(error => {
      console.error('Error al guardar los cambios del usuario:', error);
      alert('Hubo un error al guardar los cambios del usuario. Por favor, inténtalo de nuevo.');
    });
  };
  

  const handleOpenModal = () => {
    setShowCreateModal(true);
  };

  const handleCloseModalNew = () => {
    setShowCreateModal(false);
    setEditedUsername('');
    setEditedEmail('');
  };

  const handleSaveNewUser = () => {
    const newUser = {
      username: newUsername,
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
      password: newPassword
    };
  
    fetch('http://localhost:3001/user/addUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error al guardar el nuevo usuario');
      }
    })
    .then(data => {
      console.log(data.message);
    
      handleCloseModalNew(); 
    })
    .catch(error => {
      console.error('Error al guardar el nuevo usuario:', error);
      alert('Hubo un error al guardar el nuevo usuario. Por favor, inténtalo de nuevo.');
    });
  };
  const handleDelete = (userId) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este usuario?');
    if (confirmDelete) {
      fetch(`http://localhost:3001/user/deleteUser/${userId}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (response.ok) {
          setUsers(prevUsers => prevUsers.filter(user => user.users_id !== userId));
          console.log(`Usuario con ID ${userId} eliminado correctamente`);
        } else {
          throw new Error('Error al eliminar el usuario');
        }
      })
      .catch(error => {
        console.error('Error al eliminar el usuario:', error);
        alert('Hubo un error al eliminar el usuario. Por favor, inténtalo de nuevo.');
      });
    }
  };


 const indexOfLastUser = currentPage * usersPerPage;
 const indexOfFirstUser = indexOfLastUser - usersPerPage;
 const currentUsers = users
 .filter(user =>
   user.users_username.toLowerCase().includes(searchTerm.toLowerCase())
 )
 .slice(indexOfFirstUser, indexOfLastUser);

 // Cambiar de página
 const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='container'>
      <h2>Lista de Usuarios</h2>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar usuario..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      <button className="btn btn-success" onClick={handleOpenModal}>Crear Nuevo Usuario</button>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Username</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Correo Electrónico</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <tr key={user.users_id}>
              <td>{user.users_username}</td>
              <td>{user.users_firstName}</td>
              <td>{user.users_lastName}</td>
              <td>{user.users_email}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleEdit(user)}>Editar</button>
                <button className="btn btn-danger" onClick={() => handleDelete(user.users_id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="pagination">
        {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map((_, index) => (
          <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
            <button onClick={() => paginate(index + 1)} className="page-link">
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
      <Modal show={showCreateModal} onHide={handleCloseModalNew}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Nuevo Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>


            <div className="form-group">
              <label htmlFor="newUsername">Username:</label>
              <input
                type="text"
                className="form-control"
                id="newUsername"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
               </div>

               <div className="form-group">
              <label htmlFor="newUsername">Nombre:</label>
              <input
                type="text"
                className="form-control"
                id="newUsername"
                value={newFirstName}
                onChange={(e) => setNewFirstName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="newUsername">Apellido:</label>
              <input
                type="text"
                className="form-control"
                id="newUsername"
                value={newLastName}
                onChange={(e) => setNewLastName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="newEmail">Correo Electrónico:</label>
              <input
                type="email"
                className="form-control"
                id="newEmail"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="newpassword">Contraseña:</label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalNew}>Cerrar</Button>
          <Button variant="primary" onClick={handleSaveNewUser}>Guardar</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="editUsername">Usuario:</label>
              <input
                type="text"
                className="form-control"
                id="editUsername"
                value={editedUsername}
                onChange={(e) => setEditedUsername(e.target.value)}
              />
            </div>


            <div className="form-group">
              <label htmlFor="editFirstname">Nombre:</label>
              <input
                type="text"
                className="form-control"
                id="editFirstname"
                value={editedFirstName}
                onChange={(e) => setEditedFirstName(e.target.value)}
              />
            </div>

            
            <div className="form-group">
              <label htmlFor="editLastname">Apellido:</label>
              <input
                type="text"
                className="form-control"
                id="editLastname"
                value={editedLastName}
                onChange={(e) => setEditedLastName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="editEmail">Correo Electrónico:</label>
              <input
                type="email"
                className="form-control"
                id="editEmail"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
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

export default UserTable;