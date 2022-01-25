import { BrowserRouter as Router } from 'react-router-dom'

import './styles/style.scss'
import Main from './components/Main.jsx'
import GlobalProvider from './providers/GlobalProvider';

function App() {
  return (
      <Router>
        <GlobalProvider>
          <Main/>
        </GlobalProvider>
      </Router>
  );
}

export default App;
