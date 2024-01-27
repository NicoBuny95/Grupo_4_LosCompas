// Validación del formulario al enviar
document.querySelector('.registration-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    
    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/;

    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;


    if (!nameRegex.test(name)) {
        alert('Por favor, ingresa un nombre válido.');
        return false;
    }

   
    if (!emailRegex.test(email)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return false;
    }

    if (!passwordRegex.test(password)) {
       let error=alert('La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra mayúscula, una letra minúscula y un número.');
        return false;
    }

   
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return false;
    }

    
});