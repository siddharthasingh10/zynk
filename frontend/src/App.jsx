
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import MainLayout from './components/Mainlayout'
import Home from './components/Home'
import Profile from './components/Profile'
import EditProfile from './components/EditProfile'
import ChatPage from './components/ChatPage'
import { io } from 'socket.io-client'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSocket } from './redux/socketSlice'
import { setOnlineUsers } from './redux/chatSlice'
import { setLikeNotification } from './redux/rtnSlice' 
const browserRouter = createBrowserRouter(

  [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: '/',
          element: <Home />
        }, {
          path: '/profile/:id',
          element: <Profile />
        }, {
          path: 'account/edit',
          element: <EditProfile />
        }, {
          path: '/chat',
          element: <ChatPage />
        }
      ]
    },
    {
      path: '/signup',
      element: <Signup />
    },
    {
      path: '/login',
      element: <Login />
    }


  ]

)
function App() {
  const { user } = useSelector((store) => store.auth)
  const {socket}=useSelector((store)=>store.socketio)
  const dispatch = useDispatch();


  useEffect(() => {
    if (user) {
      const socketio = io('http://localhost:5000', {
        query: {
          userId: user?._id
        },
        // transports: ['websocket']
      });
      dispatch(setSocket(socketio));

      // listen all the events
      socketio.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      socketio.on('notification', (notification) => {
        dispatch(setLikeNotification(notification));
      });

      return () => {
        socketio.close();
        dispatch(setSocket(null));
      }
    } else if (socket) {
      socket.close();
      dispatch(setSocket(null));
    }
  }, [user, dispatch]);


  return (

    <div>
      <RouterProvider router={browserRouter} />

    </div>

  )
}

export default App
