import './App.css'

import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Signin} from "./page/Signin"
import {User} from "./page/User"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={'/signin'} element={<Signin/>} />
          <Route path={'/user'} element={<User/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
