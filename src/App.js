//import area from 
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Error from './Pages/Error';
import Login from './Pages/Login';
import Login2 from './Pages/Login2';
import Uploadfile from './Pages/Uploadfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login2" element={<Login2 />} />
        <Route path="/uploadfile" element={<Uploadfile />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
