import {Route, Routes} from 'react-router-dom'
import Login from './routes/Login'
import Home from './routes/Home'
import Navbar from './components/Navbar'
import RequireAuth from './components/RequireAuth'
import Register from './routes/register'
import { useContext } from 'react'
import { userContext } from './context/UserProvider'
import LayoutContainerForm from './components/LayoutContainerForm'

const App = () => {

  const {user} = useContext(userContext);

  if(user === false){
    return <p>Loading...</p>
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        } />
          <Route path='/' element={<LayoutContainerForm />} >
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route> 
      </Routes>
    </>
  )
}

export default App;
