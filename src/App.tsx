import { Routes, Route } from 'react-router-dom';
import Main from '@/views/Main';
import CommonHeader from '@/components/common/CommonHeader';
import ToDo from '@/views/todo/ToDo';
import RockPaperScissors from '@/views/RPS/RockPaperScissors';
import NavBar from '@/components/space/common/navigation/NavBar';
import SpaceLanding from '@/views/space/SpaceLanding';
import destinations from '@/views/space/Destinations';
import Crews from '@/views/space/Crews';
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
        <Route
          path="space"
          element={<NavBar />}
        >
          <Route
            path="home"
            element={<SpaceLanding />}
          />
          <Route
            path="destinations"
          >
            <>
              {destinations}
            </>
          </Route>
          <Route
            path="crews"
            element={<Crews />}
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
