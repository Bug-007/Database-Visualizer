import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import AdminDashboard from "./Components/AdminDashboard";
import DataForm from "./Components/DataForm";
import UserManager from "./Components/UserManager";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import DataManager from "./Components/DataManager";
import Header from "./Components/Header";

function App() {
  return (
    <div className="App">

      <BrowserRouter>
      <Header/>
    <Routes>
    <Route path="/" element={<AdminDashboard />}>
      </Route>
      <Route path="/form" element={<DataForm />}>
      </Route>
      <Route path="/usermanager" element={<UserManager />}>
      </Route>
      <Route path="/datamanager" element={<DataManager />}>
      </Route>
      <Route path="/login" element={<Login />}>
        
      </Route><Route path="/signup" element={<Signup />}>
      </Route>

    </Routes>
    </BrowserRouter>


    </div>
  );
}

export default App;
