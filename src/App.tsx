// ** Routes
import { RouterProvider } from 'react-router-dom';
import {router} from './router/routes';
// ** utils
import { ToastContainer } from 'react-toastify';
import ScrollToTop from './components/ScrollToTop';
import { useTheme } from './context/ThemeContext';
// ** CSS
import 'react-toastify/dist/ReactToastify.css';


function App() {
  <ScrollToTop /> // make sure to scorll top on every page
  const { theme } = useTheme();
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer theme={theme === "dark" ? "dark" :  "light"} />
    </>
  )
}

export default App
