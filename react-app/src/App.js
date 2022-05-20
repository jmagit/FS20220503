import './App.css';
import { ErrorBoundary } from './comunes';
import Calculadora from './calculadora';
import Demos from './ejemplos';
import Formulario from './formulario';
import {FotoMuro, FotoMuroEx} from './muro';
import PersonasMnt from './personas';


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
