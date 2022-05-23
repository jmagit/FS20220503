import './App.css';
import { ErrorBoundary, PageNotFound } from './comunes';
import Calculadora from './calculadora';
import Demos from './ejemplos';
import Formulario from './formulario';
import { FotoMuro, FotoMuroEx } from './muro';
import PersonasRoute, { PersonasMnt, PersonasForm, PersonasList, PersonasView } from './personas';
import { BrowserRouter, Link, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { ContactoAdd, ContactoEdit, Contactos, ContactosConRutas, ContactosList, ContactoView } from './contactos';


export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">inicio</Link>&nbsp;|&nbsp;
        <Link to="/contactos">contactos</Link>&nbsp;|&nbsp;
        <Link to="/chisme/de/hacer/numeros">calculadora</Link>&nbsp;|&nbsp;
        <Link to="/calculadora">calculadora</Link>&nbsp;|&nbsp;
        <Link to="/muro">muro</Link>&nbsp;|&nbsp;
        <Link to="/formularios">formulario</Link>&nbsp;|&nbsp;
        <Link to="/falsa.html">html</Link>&nbsp;|&nbsp;
      </nav>
      <div className='container-fluid'>
        <ErrorBoundary>
          <Routes>
            <Route path='/' element={<Demos />} />
            <Route path='/chisme/de/hacer/numeros' element={<Calculadora />} />
            <Route path='/calculadora' element={<Navigate to='/chisme/de/hacer/numeros' />} />
            <Route path='/formularios' element={<Formulario />} />
            <Route path='/muro' element={<FotoMuro />} />
            <Route path='/falsa.html' element={<FotoMuroEx />} />
            {/* 
              /personas --> list
              /personas/1  --> view
              /personas/1/edit  --> edit
              /personas/add  --> add
             */}
            <Route path='/personas' element={<PersonasRoute />}>
              <Route index element={<PersonasMnt />} />
              <Route path='add' element={<PersonasMnt />} />
              <Route path=':id' element={<PersonasMnt />} />
              <Route path=':id/edit' element={<PersonasMnt />} />
            </Route>
            <Route path='/contactoss/*' element={<ContactosConRutas />} />
            {/* <Route path='/contactos' element={<Contactos />}>
              <Route index element={<ContactosList />} />
              <Route path='add' element={<ContactoAdd />} />
              <Route path=':id' element={<ContactoView />} />
              <Route path=':id/edit' element={<ContactoEdit />} />
            </Route> */}
            <Route path='/contactos' element={<Outlet />}>
              <Route index element={<ContactosList />} />
              <Route path='add' element={<ContactoAdd />} />
              <Route path=':id' element={<ContactoView />} />
              <Route path=':id/edit' element={<ContactoEdit />} />
            </Route>


            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </ErrorBoundary>
      </div>
    </BrowserRouter>
  )
}

// export default App;
