//import area from 
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Error from './Pages/Error';
import Login from './Pages/Login';
import Uploadfile from './Pages/Uploadfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/uploadfile" element={<Uploadfile />} />
        <Route path="/uploadfile" element={<Uploadfile />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
