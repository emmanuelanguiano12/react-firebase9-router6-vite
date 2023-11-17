import {Route, Routes} from 'react-router-dom'
import Login from './routes/Login'
import Home from './routes/Home'
import Navbar from './components/Navbar'
import RequireAuth from './components/RequireAuth'
import Register from './routes/register'
import { useContext } from 'react'
import { userContext } from './context/UserProvider'

const App = () => {

  const {user} = useContext(userContext);

  if(user === false){
    return <p>Loading...</p>
  }

  return (
    <>
      <Navbar />
      <h1>APP</h1>
      <Routes>
        <Route path='/' element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        } />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
      </Routes>
    </>
  )
}

export default App;
