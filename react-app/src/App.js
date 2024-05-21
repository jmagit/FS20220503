import './App.css';
import { ErrorBoundary, PageNotFound } from './utilidades/comunes';
import Calculadora from './ejercicios/calculadora';
import Demos from './ejemplos';
import Formulario from './formulario';
import { FotoMuro, FotoMuroEx } from './ejercicios/muro';
import PersonasMnt from './ajax/personas';
import { BrowserRouter, Link, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { ContactoAdd, ContactoEdit, Contactos, ContactosConRutas, ContactosList, ContactoView } from './ajax/contactos';
import { ContadorStored } from './contadorStored';
import { Notificaciones } from './utilidades/notificaciones';
import MainHeader from './main-header';
import Blog from './ajax/blog';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectIsInRole } from './store/auth-slice';


export default function App() {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const isEmpleado = useSelector(selectIsInRole('Empleados'))
  const isAdministrador = useSelector(selectIsInRole('Administradores'))

  return (
    <BrowserRouter>
      <MainHeader />
      <Notificaciones />
      <main className='container-fluid'>
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
            {/* <Route path='/personas' element={<PersonasRoute />}> */}
            {isAdministrador && <Route path='/personas'>
              <Route index element={<PersonasMnt />} />
              <Route path='add' element={<PersonasMnt />} />
              <Route path=':id' element={<PersonasMnt />} />
              <Route path=':id/edit' element={<PersonasMnt />} />
            </Route>}
            <Route path='/contactos/*' element={<ContactosConRutas />} />
            {/* <Route path='/contactos' element={<Outlet />}>
              <Route index element={<ContactosList />} />
              <Route path='add' element={<ContactoAdd />} />
              <Route path=':id' element={<ContactoView />} />
              <Route path=':id/edit' element={<ContactoEdit />} />
            </Route> */}
            <Route path='/cont' element={<ContadorStored />} />
            {isEmpleado && <Route path='/blog' element={<Blog />} >
              <Route index element={<Blog />} />
              <Route path='add' element={<Blog />} />
              <Route path=':id' element={<Blog />} />
              <Route path=':id/edit' element={<Blog />} />
            </Route>}


            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </ErrorBoundary>
      </main>
    </BrowserRouter>
  )
}

// export default App;
