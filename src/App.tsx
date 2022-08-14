import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/">
                        <Route index element={<Home />}></Route>
                        <Route path="login" element={<Login />}></Route>
                        <Route path="logout" element={<Logout />}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
