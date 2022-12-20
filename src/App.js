import './App.css';
import AllRoutes from './Pages/AllRoutes';
import Navbar from "./Components/Navbar/Navbar"
import SearchNav from './Components/Navbar/SearchNav';
import Category from './Components/Navbar/Category';

function App() {
  return (
    <div className="App">
      <Navbar />
      <SearchNav />
      <Category />
      <AllRoutes />
    </div>
  );
}

export default App;
