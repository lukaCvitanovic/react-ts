import { Routes, Route } from 'react-router-dom';
import Main from '@/views/Main';
import CommonHeader from '@/components/common/CommonHeader';
import ToDo from '@/views/todo/ToDo';
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
      </Route>
    </Routes>
  );
}

export default App;
