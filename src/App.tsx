import './App.css'
import UserLogin from './auth/userLogin'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router'
import LandingPage from './components/home/landingpage'
import About from './components/about/about'
import Contact from './components/contact/contacts'
import Registration from './auth/registration'
import { Admindashboard } from './components/Dashboard/Admin dashboard/Aside/Admindashboard'
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
      element: <Admindashboard />
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
