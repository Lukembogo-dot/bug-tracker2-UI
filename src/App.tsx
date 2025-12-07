import './App.css'
import UserLogin from './auth/userLogin'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router'
import LandingPage from './components/home/landingpage'
import About from './components/about/about'
import Contact from './components/contact/contacts'
import Registration from './auth/registration'
import { Userdashboard } from './components/Dashboard/Userdashbord/Aside/Userdashboard'
import { Admindashboard } from './components/Dashboard/Admindashboard.tsx/Aside/Admindashboard'
import ProtectedRoute from './components/ProtectedRoute'
import LogoutButton from './components/LogoutButton'
function App() {
  const router = createBrowserRouter([
    {
     path: '/',
     element: <LandingPage />
    },
    {
      path: '/about',
      element: <About />
    },
    {
      path: '/contact',
      element: <Contact />
    },
    {
      path: '/userLogin',
      element: <UserLogin />
    },
    {
      path: '/register',
      element: <Registration />
    },
    {
      path: '/admin/dashboard',
      element: <ProtectedRoute><Admindashboard /></ProtectedRoute>
    },
    {
      path: '/user/dashboard',
      element: <ProtectedRoute><Userdashboard /></ProtectedRoute>
    }
  ])

  return (
    <>
      <LogoutButton />
      <RouterProvider router={router} />
    </>
  )
}

export default App
