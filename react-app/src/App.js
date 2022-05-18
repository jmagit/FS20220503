import './App.css';
import Calculadora from './calculadora';
import { ErrorBoundary } from './comunes';
import Demos from './ejemplos';
import FotoMuro from './muro';


export default function App() {
  return (
    <div className='container-fluid'>
      <ErrorBoundary>
        <Demos />
      </ErrorBoundary>
    </div>
  )
}

// export default App;
