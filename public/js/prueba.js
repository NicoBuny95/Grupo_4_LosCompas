// function toggleUserOptions() {
//     var userActions = document.querySelector('.user-actions');
//     userActions.classList.toggle('show');
// }

// document.addEventListener('DOMContentLoaded', function() {
//     var userInfo = document.querySelector('.user-info');
//     userInfo.addEventListener('click', toggleUserOptions);
// });



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
  
  document.getElementById('cart-table').addEventListener('click', function(event) {
    const target = event.target;
    if (target.classList.contains('sumar') || target.classList.contains('restar')) {
        const tdElement = target.parentElement;
        const precioElement = tdElement.previousElementSibling;
        const cantidadElement = tdElement.querySelector('.cantidad-productos');
        const precio = parseFloat(precioElement.innerText);
        let cantidad = parseInt(cantidadElement.innerText);
        
        if (target.classList.contains('sumar')) {
            cantidad++;
        } else if (target.classList.contains('restar') && cantidad > 1) {
            cantidad--;
        }
        
        cantidadElement.innerText = cantidad;

        // Calculamos el total nuevamente cuando se cambia la cantidad
        let total = 0;
        const rows = document.querySelectorAll('#cart-table tbody tr');
        rows.forEach(row => {
            const precioProducto = parseFloat(row.querySelector('.precio-producto').innerText);
            const cantidadProducto = parseInt(row.querySelector('.cantidad-productos').innerText);
            total += precioProducto * cantidadProducto;
        });
        document.getElementById('total-amount').innerText = total.toFixed(2);
    }

  
    
});  