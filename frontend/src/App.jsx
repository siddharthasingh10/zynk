
import { createBrowserRouter,  RouterProvider } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import MainLayout from './components/Mainlayout'
import Home from './components/Home'
import Profile from './components/Profile'
import EditProfile from './components/EditProfile'

const browserRouter=createBrowserRouter(

  [
    {
      path:'/',
      element:<MainLayout/>,
      children:[
        {
          path:'/',
          element:<Home/>
        },{
          path:'/profile/:id',
          element:<Profile/>
        },{
          path:'account/edit',
          element:<EditProfile/>
        }
      ]
    },
    {
      path:'/signup',
      element:<Signup/>
    },
    {
      path:'/login',
      element:<Login/>
    }
   

  ]

)
function App() {
  return (

    <div>
    <RouterProvider router={browserRouter}/>

    </div>
   
  )
}

export default App
