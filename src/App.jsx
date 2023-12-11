import { Route, Routes } from "react-router-dom"

import SignIn from "./Components/SignIn"
import Main from "./Components/Main";
import Newsdetails from "./Components/Newsdetails";



function App() {
  return (
    <>
      <Routes>

        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<Main />}
        />
        <Route path="/details" element={<Newsdetails />} />
      </Routes>


    </ >
  )
}

export default App
