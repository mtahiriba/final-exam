import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AddRecipie from './components/AddRecipie';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-reciepe" element={<AddRecipie edit={false}/>} />
      <Route path="/add-reciepe/:id" element={<AddRecipie edit={true}/>} />
    </Routes>
  );
}

export default App;
