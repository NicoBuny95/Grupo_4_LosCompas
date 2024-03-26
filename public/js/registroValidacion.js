
document.getElementById('registration-form').addEventListener('input', function(event) {
    var inputId = event.target.id; 
    var inputElement = event.target;
    var errorElement = document.getElementById('error-' + inputId);

    errorElement.innerHTML = '';

    // Validar el campo según su ID
    switch (inputId) {
        case 'username':
            if (validator.isEmpty(inputElement.value)) {
                errorElement.innerHTML = 'Este campo es obligatorio.';
            }
            break;
        case 'firstName':
            if (validator.isEmpty(inputElement.value)) {
                errorElement.innerHTML = 'Este campo es obligatorio.';
            } else if (!validator.isLength(inputElement.value, { min: 2 })) {
                errorElement.innerHTML = 'El nombre debe tener al menos 2 caracteres.';
            }
            break;
        case 'lastName':
            if (validator.isEmpty(inputElement.value)) {
                errorElement.innerHTML = 'Este campo es obligatorio.';
            } else if (!validator.isLength(inputElement.value, { min: 2 })) {
                errorElement.innerHTML = 'El apellido debe tener al menos 2 caracteres.';
            }
            break;
        case 'email':
            if (validator.isEmpty(inputElement.value)) {
                errorElement.innerHTML = 'Este campo es obligatorio.';
            } else if (!validator.isEmail(inputElement.value)) {
                errorElement.innerHTML = 'Introduce un correo electrónico válido.';
            }
            break;
        case 'password':
            if (validator.isEmpty(inputElement.value)) {
                errorElement.innerHTML = 'Este campo es obligatorio.';
            } else if (!validator.isLength(inputElement.value, { min: 8 })) {
                errorElement.innerHTML = 'La contraseña debe tener al menos 8 caracteres.';
            } else if (!validator.matches(inputElement.value, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.-])[A-Za-z\d@$!%*?&.-]{8,}$/)) {
                errorElement.innerHTML = 'La contraseña debe tener letras mayúsculas, minúsculas, un número y un carácter especial.';
            }
            break;
        case 'confirm-password':
            var passwordInput = document.getElementById('password');
            if (inputElement.value !== passwordInput.value) {
                errorElement.innerHTML = 'Las contraseñas no coinciden.';
            }
            break;
        default:
            break;
    }
});
document.getElementById('profileImage').addEventListener('change', function(event) {

    var errorElement = document.getElementById('error-profileImage'); 
    var allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    errorElement.innerHTML = '';

    var fileExtension = profileImageInput.files[0].name.split('.').pop().toLowerCase();

    if (!allowedExtensions.includes('.' + fileExtension)) {
        errorElement.innerHTML = 'Formato de imagen no válido. Por favor, selecciona una imagen con formato JPG, JPEG, PNG o GIF.';
        profileImageInput.value = ''; 
    }
});

var profileImageInput = document.getElementById('profileImage');
if (profileImageInput.files.length === 0) {
    var defaultImagePath = '/img/users/defaultProfile.jpg'; 

    fetch(defaultImagePath)
        .then(response => response.blob()) 
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