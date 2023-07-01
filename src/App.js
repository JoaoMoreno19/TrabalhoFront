import './App.css';
import ListagemPaises from './pages/ListagemPaises';
import DetalhesPaises from './pages/DetalhesPaises';
import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <ListagemPaises />
    },
    {
      path: '/country/:name',
      element: <DetalhesPaises />
    },
  ])

  return (
    <div className = "App">
      <header className = "App-header">
          <RouterProvider router = {routes}/>
      </header>
    </div>
  );
}

export default App;
