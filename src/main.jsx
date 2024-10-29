import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter , RouterProvider} from 'react-router-dom';
import Layout from './Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import TodoApp from './pages/TodoApp';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Login />,
      },
      {
        path: 'sign up',
        element: <Register />,
      },
      {
        path: 'todoapp',
        element: <TodoApp />,
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
)
