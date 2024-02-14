function toggleUserOptions() {
    var userActions = document.querySelector('.user-actions');
    userActions.classList.toggle('show');
}

document.addEventListener('DOMContentLoaded', function() {
    var userInfo = document.querySelector('.user-info');
    userInfo.addEventListener('click', toggleUserOptions);
});



document.addEventListener("load", function() {
    const rememberCheckbox = document.getElementById("remember");
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');
  
    rememberCheckbox.addEventListener("change", function() {
      if (this.checked) {
        // Almacenar email en cookie con una duración de 30 días
        document.cookie = `rememberedEmail=${emailInput.value}; expires=${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;
      } else {
        // Borrar la cookie
        document.cookie = "rememberedEmail=;  path=/;";
      }
    });
  });
  