
document.getElementById('registration-form').addEventListener('input', function(event) {
    var inputId = event.target.id; 
    var inputElement = event.target; 
    var errorElement = document.getElementById('error-' + inputId);

    errorElement.innerHTML = ''; 

    // Validar el campo según su ID
    switch (inputId) {
        case 'name':
            if (validator.isEmpty(inputElement.value)) {
                errorElement.innerHTML = 'El nombre del producto es un campo obligatorio.';
            } else if (!validator.isLength(inputElement.value, { min: 5 })) {
                errorElement.innerHTML = 'El nombre debe tener al menos 5 caracteres.';
            }
            break;
        case 'description':
            if (validator.isEmpty(inputElement.value)) {
                errorElement.innerHTML = 'La descripción del producto es un campo obligatorio.';
            } else if (!validator.isLength(inputElement.value, { min: 20 })) {
                errorElement.innerHTML = 'La descripción debe tener al menos 20 caracteres.';
            }
            break;
        case 'price':
            if (validator.isEmpty(inputElement.value)) {
                errorElement.innerHTML = 'El precio del producto es un campo obligatorio.';
            } else if (!validator.isNumeric(inputElement.value)) {
                errorElement.innerHTML = 'El precio debe ser un valor numérico.';
            }
            break;
        case 'discount':
            if (validator.isEmpty(inputElement.value)) {
                errorElement.innerHTML = 'El descuento del producto es un campo obligatorio.';
            } else if (!validator.isNumeric(inputElement.value)) {
                errorElement.innerHTML = 'El descuento debe ser un valor numérico.';
            }
            break;
        default:
            break;
    }
});


document.getElementById('image').addEventListener('change', function(event) {
    var errorElement = document.getElementById('error-image'); 
    var imageInput = event.target; 

    errorElement.innerHTML = ''; 

    var allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif']; 

    // Obtener la extensión del archivo seleccionado
    var fileExtension = imageInput.files[0].name.split('.').pop().toLowerCase();

    // Comprobar si la extensión está permitida
    if (!allowedExtensions.includes('.' + fileExtension)) {
        errorElement.innerHTML = 'Formato de imagen no válido. Por favor, selecciona una imagen con formato JPG, JPEG, PNG o GIF.';
        imageInput.value = ''; 
    }
});


var imageInput = document.getElementById('image');
if (imageInput.files.length === 0) {
    var defaultImagePath = '/img/users/defaultProfile.jpg'; 

   
    fetch(defaultImagePath)
        .then(response => response.blob())
        .then(blob => {
          
            var defaultImage = new File([blob], 'default-image.jpg', { type: 'image/jpeg' });
            var defaultImageFileList = new DataTransfer();
            defaultImageFileList.items.add(defaultImage);
            imageInput.files = defaultImageFileList.files;
        })
        .catch(error => {
            console.error('Error al cargar la imagen por defecto:', error);
        });
}
