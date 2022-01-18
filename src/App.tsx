import logo from './logo.svg';
import '@/styles/tailwind.css';

function App() {
  return (
    <div>
      <header>
        <img src={logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div className='bg-red-300 p-4'>
          Tailwind
        </div>
      </header>
    </div>
  );
}

export default App;
