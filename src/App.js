import './App.css';
import {Routes, Route} from "react-router-dom";
import Home from './components/Home';
import Auth from './components/Auth';
import CreateRecipe from './components/create-recipe';
import SavedRecipe from './components/saved-recipe';
import Register from './components/Register';


function App() {
  return (
    <div className="flex flex-col justify-center items-center font-sans">
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/auth' element={<Auth/> } />
        <Route path='/register' element={<Register/> } />
        <Route path='/create-recipe' element={<CreateRecipe/>} />
        <Route path='/saved-recipe' element={<SavedRecipe/>} />
      </Routes>
    </div>
  );
}

export default App;
