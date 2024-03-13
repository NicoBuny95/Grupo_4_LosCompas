window.addEventListener('load',()=> {
//Capturas de elementos input
var nameInput = document.getElementById('name');
var marcaInput = document.getElementById('marca');
var descriptionInput = document.getElementById('description');
var priceInput = document.getElementById('price');
var discountInput = document.getElementById('descuento');
var categoryInput = document.getElementById('category');
var imageInput = document.getElementById('image');
//Captura de elemneto span para los mensajes de error
var errorName = document.getElementById('error-name');
var errorMarca = document.getElementById('error-marca');
var errorDescription = document.getElementById('error-description');
var errorPrice = document.getElementById('error-price');
var errorDiscount = document.getElementById('error-discount');
var errorCategory = document.getElementById('error-category');
var errorImage = document.getElementById('error-image');
// Reiniciar los mensajes de error
errorName.innerHTML = '';
errorMarca.innerHTML = '';
errorDescription.innerHTML = '';
errorPrice.innerHTML = '';
errorDiscount.innerHTML = '';
errorCategory.innerHTML = '';
errorImage.innerHTML = '';

document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();
    if (!errorName ){}
});

// Validar Username
document.getElementById('name').addEventListener('blur', function() {
    if (validator.isEmpty(nameInput.value)) {
        errorName.innerHTML = 'Este campo es obligatorio.'
    } else if (!validator.isLength(nameInput.value, { min: 5 })) {        
        errorName.innerHTML = 'El nombre debe tener al menos 5 caracteres.';
    } else {errorName.innerHTML = ""} 

})
// Validar el campo de nombre 
document.getElementById('registration-form').addEventListener('blur', function(event) {
    if (validator.isEmpty(firstNameInput.value)) {
        errorFirstName.innerHTML = 'Este campo es obligatorio.';
    }
    else if (!validator.isLength(firstNameInput.value, { min: 2 })) {
        event.preventDefault();
        errorFirstName.innerHTML = 'El nombre debe tener al menos 2 caracteres.';
    }
})
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
    } else if (!validator.matches(passwordInput.value, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.-])[A-Za-z\d@$!%*?&.-]{8,}$/)) {
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
};
});