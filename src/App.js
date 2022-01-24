import { BrowserRouter as Router } from 'react-router-dom'

import './styles/style.scss'
import Main from './components/Main.jsx'

function App() {
  return (
    <div className="App">
      <Router>
        <Main/>
      </Router>
    </div>
  );
}

export default App;
