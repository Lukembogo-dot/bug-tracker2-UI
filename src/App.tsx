import './App.css'
import UserLogin from './features/auth/userLogin'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router'
import LandingPage from './components/landingpage'
import Projects from './components/projects/Projects'
import Bugs from './components/bugs/Bugs'
import Comments from './components/comments/Comments'
function App() {
  const router = createBrowserRouter([
    {
     path: '/',
     element: <LandingPage /> 
    }
  , {
    path: '/userLogin',
    element: <UserLogin />
  },
  {
    path: '/projects',
    element: <Projects />
  },
  {
    path: '/bugs',
    element: <Bugs />
  },
  {
    path: '/comments',
    element: <Comments />
  }
  ])


  return (
    <>
      <RouterProvider router={router} />
      
    </>
  )
}

export default App
