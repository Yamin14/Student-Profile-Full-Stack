
import {BrowserRouter, Routes, Route} from "react-router-dom"
import HomePage from "./Pages/HomePage"
import CreateStudent from "./Pages/CreateStudent"
import EditStudent from "./Pages/EditStudent"
import NoPage from "./Pages/NoPage"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<HomePage />} />
          <Route path='create-student' element={<CreateStudent />} />
          <Route path='students/:id' element={<EditStudent />} />
          <Route path='*' element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
