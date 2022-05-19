import './App.css';
import Calculadora from './calculadora';
import { ErrorBoundary } from './comunes';
import Demos from './ejemplos';
import Formulario from './formulario';
import FotoMuro from './muro';


export default function App() {
  return (
    <div className='container-fluid'>
      <ErrorBoundary>
        <Formulario />
      </ErrorBoundary>
    </div>
  )
}

// export default App;
