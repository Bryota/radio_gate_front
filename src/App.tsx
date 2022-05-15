import Top from './Top'
import { Route, Routes, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Top />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
