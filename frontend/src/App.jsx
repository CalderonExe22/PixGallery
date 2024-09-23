import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Create from './pages/Create'
import CreateProfile from "./pages/CreateProfile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}/>
            <Route path="login" element={<Login />}/>
            <Route path="register" element={<Register />}/>
            <Route path="createProfile" element={<CreateProfile />}/>
            <Route path="create" element={<Create />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
