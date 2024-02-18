document.getElementById('registration-form').addEventListener('change', function(event) {
    var usernameInput = document.getElementById('username');
    var firstNameInput = document.getElementById('firstName');
    var lastNameInput = document.getElementById('lastName');
    var emailInput = document.getElementById('email');
    var passwordInput = document.getElementById('password');
    var confirmPasswordInput = document.getElementById('confirm-password');
    var profileImageInput = document.getElementById('profileImage');
    var errorUsername = document.getElementById('error-username');
    var errorFirstName = document.getElementById('error-firstName');
    var errorLastName = document.getElementById('error-lastName');
    var errorEmail = document.getElementById('error-email');
    var errorPassword = document.getElementById('error-password');
    var errorConfirmPassword = document.getElementById('error-confirm-password');
    var errorProfileImage = document.getElementById('error-profileImage');

    // Reiniciar los mensajes de error
    errorUsername.innerHTML = '';
    errorFirstName.innerHTML = '';
    errorLastName.innerHTML = '';
    errorEmail.innerHTML = '';
    errorPassword.innerHTML = '';
    errorConfirmPassword.innerHTML = '';
    errorProfileImage.innerHTML = '';




     // Validar Username
     if (validator.isEmpty(usernameInput.value)) {
        event.preventDefault();
        errorUsername.innerHTML = 'Este campo es obligatorio.';
       
    }
    // Validar el campo de nombre 
    if (validator.isEmpty(firstNameInput.value)) {
        event.preventDefault();
        errorFirstName.innerHTML = 'Este campo es obligatorio.';
    }
    else if (!validator.isLength(firstNameInput.value, { min: 2 })) {
        event.preventDefault();
        errorFirstName.innerHTML = 'El nombre debe tener al menos 2 caracteres.';
    }

    // Validar el campo de apellido
    if (validator.isEmpty(lastNameInput.value)) {
        event.preventDefault();
        errorLastName.innerHTML = 'Este campo es obligatorio.';
    }
   else if (!validator.isLength(lastNameInput.value, { min: 2 })) {
        event.preventDefault();
        errorLastName.innerHTML = 'El apellido debe tener al menos 2 caracteres.';
    }

    // Validar el campo de correo electrónico
    if (validator.isEmpty(emailInput.value)) {
        event.preventDefault();
        errorEmail.innerHTML = 'Este campo es obligatorio.';
    }
    else if (!validator.isEmail(emailInput.value)) {
        event.preventDefault();
        errorEmail.innerHTML = 'Introduce un correo electrónico válido.';
    }

    // Validar el campo de contraseña
    if (validator.isEmpty(passwordInput.value)) {
        event.preventDefault();
        errorPassword.innerHTML = 'Este campo es obligatorio.';
    }
    else if (!validator.isLength(passwordInput.value, { min: 8 })) {
        event.preventDefault();
        errorPassword.innerHTML = 'La contraseña debe tener al menos 8 caracteres.';
    } else if (!validator.matches(passwordInput.value, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
        event.preventDefault();
        errorPassword.innerHTML = 'La contraseña debe tener letras mayúsculas, minúsculas, un número y un carácter especial.';
    }

    // Validar el campo de confirmar contraseña
    if (passwordInput.value !== confirmPasswordInput.value) {
        event.preventDefault();
        errorConfirmPassword.innerHTML = 'Las contraseñas no coinciden.';
    }

  // Verificar si se ha seleccionado una imagen
if (profileImageInput.files.length === 0) {
    // Si no se ha seleccionado ninguna imagen, asigna una imagen por defecto
    var defaultImagePath = '/img/users/defaultProfile.jpg'; 

    // Realizar una solicitud para cargar la imagen por defecto
    fetch(defaultImagePath)
        .then(response => response.blob()) // Convertir la respuesta en un blob (buffer)
        .then(blob => {
            // Crear un objeto File a partir del blob y asignarlo al campo de imagen de perfil
            var defaultImage = new File([blob], 'default-image.jpg', { type: 'image/jpeg' });
            var defaultImageFileList = new DataTransfer();
            defaultImageFileList.items.add(defaultImage);
            profileImageInput.files = defaultImageFileList.files;
        })
        .catch(error => {
            console.error('Error al cargar la imagen por defecto:', error);
        });
}


   
});