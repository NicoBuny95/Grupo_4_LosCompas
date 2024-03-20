window.addEventListener('load', function() {
    // Capturas de elementos input
    var emailInput = document.getElementById('email');
    var passwordInput = document.getElementById('password');
    // Captura de elemento span para los mensajes de error
    var errorEmail = document.getElementById('error-email');
    var errorPassword = document.getElementById('error-password');
    // Reiniciar los mensajes de error
    errorEmail.innerHTML = '';
    errorPassword.innerHTML = '';

    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault();
    });

    // Validar el campo Email
    emailInput.addEventListener('blur', function() {
        if (validator.isEmpty(emailInput.value)) {
            errorEmail.innerHTML = 'El email del usuario es un campo obligatorio.';
        } else if (!validator.isEmail(emailInput.value)) {
            errorEmail.innerHTML = 'El email no es correcto.';
        } else {
            errorEmail.innerHTML = "";
        }
    });

    // Validar el campo de Password 
    passwordInput.addEventListener('blur', function() {
        if (validator.isEmpty(passwordInput.value)) {
            errorPassword.innerHTML = 'EL password es un campo obligatorio.';
        } else {
            errorPassword.innerHTML = '';
        }
    });
});
