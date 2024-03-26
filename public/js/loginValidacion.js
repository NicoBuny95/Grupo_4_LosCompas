
window.addEventListener('load', function() {
    if (typeof validator !== 'undefined') {

        var emailInput = document.getElementById('email');
        var passwordInput = document.getElementById('password');
        
        var errorEmail = document.getElementById('error-email');
        var errorPassword = document.getElementById('error-password');

        function validateEmail() {
            errorEmail.innerHTML = '';
            if (validator.isEmpty(emailInput.value)) {
                errorEmail.innerHTML = 'El email del usuario es un campo obligatorio.';
                return false;
            } else if (!validator.isEmail(emailInput.value)) {
                errorEmail.innerHTML = 'El email no es válido.';
                return false;
            }
            return true;
        }

        function validatePassword() {
            errorPassword.innerHTML = '';
            if (validator.isEmpty(passwordInput.value)) {
                errorPassword.innerHTML = 'El password es un campo obligatorio.';
                return false;
            }
            return true;
        }

        function validateForm() {
            var isEmailValid = validateEmail();
            var isPasswordValid = validatePassword();

            return isEmailValid && isPasswordValid;
        }

        // Validación en tiempo real al escribir en los campos de entrada
        emailInput.addEventListener('input', validateEmail);
        passwordInput.addEventListener('input', validatePassword);

   
        document.getElementById('login-form').addEventListener('submit', function(event) {
            if (!validateForm()) {
                event.preventDefault();
            }
        });
    } else {
        console.error('La biblioteca "validator" no está definida. Asegúrate de incluirla en tu página.');
    }
});
