import { Routes, Route } from 'react-router-dom';
import Main from '@/views/Main';
import CommonHeader from '@/components/common/CommonHeader';
import ToDo from '@/views/todo/ToDo';
import RockPaperScissors from '@/views/RPS/RockPaperScissors';
import '@/styles/tailwind.css';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<CommonHeader />}
      >
        <Route
          index
          element={<Main />}
        />
        <Route
          path="todo"
          element={<ToDo />}
        />
        <Route
          path="rps"
          element={<RockPaperScissors />}
        />
      </Route>
    </Routes>
  );
}

export default App;
