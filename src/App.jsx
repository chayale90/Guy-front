import { BrowserRouter as Router } from 'react-router-dom';

import './App.css'
import AppRoutes from './helpers/AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <main>
      <Router>
        <AppRoutes />
      </Router>
      <ToastContainer />
    </main>
  )
}

export default App;
