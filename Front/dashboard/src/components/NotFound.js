import React from 'react';
import  '../assets/css/Error404.css';
function NotFound(){
    return (
  
        

        <div class="container">
        <section class="page_404">
          <div class="container">
            <div class="row">
              <div class="col-sm-12 ">
                <div class="col-sm-10 col-sm-offset-1  text-center">
                  <div class="four_zero_four_bg">
                    <h1 class="text-center">404</h1>
                  </div>
                  <div class="contant_box_404">
                    <h3 class="h2">Parece que estás perdido</h3>
                    <p>"La pagina no existe ".</p>
                    <a href="/" class="link_404">
                      Volver al inicio
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
</div>
    );
}


export default NotFound;