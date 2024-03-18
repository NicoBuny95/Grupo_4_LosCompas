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

// Validar el campo Name
document.getElementById('name').addEventListener('blur', function() {
    if (validator.isEmpty(nameInput.value)) {
        errorName.innerHTML = 'El nombre del producto es un campo obligatorio.'
    } else if (!validator.isLength(nameInput.value, { min: 5 })) {        
        errorName.innerHTML = 'El nombre debe tener al menos 5 caracteres.';
    } else {errorName.innerHTML = ""} 

})
// Validar el campo de Descripcion 
document.getElementById('description').addEventListener('blur', function() {
    if (validator.isEmpty(descriptionInput.value)) {
        errorDescription.innerHTML = 'La descripción del producto es un campo obligatorio.';
    }
    else if (!validator.isLength(descriptionInput.value, { min: 20 })) {        
        errorDescription.innerHTML = 'El nombre debe tener al menos 20 caracteres.';
    }else {errorDescription.innerHTML = ""}
})
    // Validar el campo de Precio
    if (validator.isEmpty(priceInput.value)) {        
        errorPrice.innerHTML = 'El precio del producto es un campo obligatorio.';
    }
    else if (!validator.isNumeric(priceInput.value)) {        
        errorPrice.innerHTML = 'El precio debe ser un valor numérico.';
    }else {errorPrice.innerHTML = ""}

    // Validar el campo de Descuento
    if (validator.isEmpty(discountInput.value)) {
        errorDiscount.innerHTML = 'Este campo es obligatorio.';
    }
    else if (!validator.isNumeric(discountInput.value)) {        
        errorDiscount.innerHTML = 'El descuento debe ser numérico.';
    }else {errorDiscount.innerHTML = ""}

    // Verificar si se ha seleccionado una imagen
    if (imageInput.files.length === 0) {
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