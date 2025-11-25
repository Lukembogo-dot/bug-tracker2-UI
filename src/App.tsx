import './App.css'
import UserLogin from './auth/userLogin'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router'
import LandingPage from './components/home/landingpage'
import About from './components/about/about'
import Contact from './components/contact/contacts'
import Registration from './auth/registration'
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
  ])


  return (
    <>
      <RouterProvider router={router} />
      
    </>
  )
}

export default App
