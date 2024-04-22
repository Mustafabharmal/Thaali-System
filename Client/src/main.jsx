import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthContextProvider } from './store/auth-context.jsx'

// Import CSS stylesheets
// import './assets/dist/css/tabler.min.css?1692870487';
// import './assets/dist/css/tabler-flags.min.css?1692870487';
// import './assets/dist/css/tabler-payments.min.css?1692870487';
// import './assets/dist/css/tabler-vendors.min.css?1692870487';
// import './assets/dist/css/demo.min.css?1692870487';
// import './assets/dist/libs/fullcalendar/core/main.min.css';
// import './assets/dist/libs/fullcalendar/daygrid/main.min.css';
// import './assets/dist/libs/fullcalendar/timegrid/main.min.css';
// import './assets/dist/libs/fullcalendar/list/main.min.css';

// // Import JS scripts
// import './assets/dist/js/demo-theme.min.js?1692870487';
// import './assets/dist/libs/apexcharts/dist/apexcharts.min.js';
// import './assets/dist/libs/jsvectormap/dist/js/jsvectormap.min.js';
// import './assets/dist/libs/jsvectormap/dist/maps/world.js';
// import './assets/dist/libs/jsvectormap/dist/maps/world-merc.js';
// import './assets/dist/js/transliteration-input.bundle.js';
// import './assets/dist/js/transliteration-input.bundle1.js';
// import './assets/dist/js/tabler.min.js?1692870487';
// import './assets/dist/js/demo.min.js?1692870487';
// import './assets/dist/libs/fullcalendar/core/main.min.js';
// import './assets/dist/libs/fullcalendar/daygrid/main.min.js';
// import './assets/dist/libs/fullcalendar/interaction/main.min.js';
// import './assets/dist/libs/nouislider/dist/nouislider.min.js';
// import './assets/dist/libs/litepicker/dist/litepicker.js';
// import './assets/dist/libs/tom-select/dist/js/tom-select.base.min.js';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <div className="page">
        <App />
      </div>
    </AuthContextProvider>
  </React.StrictMode>,
)
