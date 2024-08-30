import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Editor from './pages/Editor';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
   <> 
    <BrowserRouter>
   <div><Toaster  position="top-right" toastOptions={{
      success:{
          theme:{
            primary:'black'
          }
        }
     }}>
      
   
      </Toaster></div>
    <Routes>
      <Route element={<Home />} index />
      <Route path="/editor/:roomId" element={<Editor />} />
    </Routes>
  </BrowserRouter>
  </>
);
}

export default App;