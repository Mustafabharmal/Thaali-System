import React from 'react'
function Footer() {
    return (
        <footer class="footer footer-transparent d-print-none">
        <div class="container-xl">
          <div class="row text-center align-items-center">
            <div class="col-lg">
              <ul class="list-inline list-inline-dots mb-0">
                <li class="list-inline-item"><a href="./"  class="link-secondary" rel="noopener">Documentation</a></li>
                <li class="list-inline-item"><a href="./" class="link-secondary">License</a></li>
                <li class="list-inline-item"><a href="https://github.com/Mustafabharmal/Thaali-System" target="_blank" class="link-secondary" rel="noopener">Source code</a></li>
                <li class="list-inline-item">
                  <a href="." class="link-secondary" rel="noopener"> Made With .   
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon text-pink icon-filled icon-inline" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>
                 . </a>
                </li>
              </ul>
            {/* </div>

            <div class="col-lg mt-3 mt-lg-0"> */}
            <br/>
              <ul class="list-inline list-inline-dots mb-0">
                <li class="list-inline-item">
                  Copyright &copy; 2024
                  <a href="https://www.linkedin.com/in/mustafabharmal23/" class="link-secondary"> Mustafa Bharmal</a>
                  {/* All rights reserved. */}
                </li>
                <li class="list-inline-item">
                  {/* Copyright &copy; 2024
                  <a href="https://www.linkedin.com/in/mustafabharmal23/" class="link-secondary"> Mustafa Bharmal</a> */}
                  All rights reserved.
                </li>
                {/* <li class="list-inline-item">
                  <a href="#" class="link-secondary" rel="noopener">
                    v1.0.0-beta20
                  </a>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </footer>
      
    )
}
export default Footer;