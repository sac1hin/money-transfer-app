import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProviders } from './auth/AuthProvider';
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'

function App() {

  return (
    <div className='h-full w-full '>
      <AuthProviders>
        <Router>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<Login />} />
            <Route element={<AuthOutlet fallbackPath='/signin' />}>
              <Route path="/" element={<Dashboard />} />
            </Route>
          </Routes>
        </Router>
        <ToastContainer />
      </AuthProviders>
    </div>
  )
}

export default App
