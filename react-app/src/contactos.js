import { Link, Outlet, useParams, Routes, Route, useNavigate } from 'react-router-dom';
import { PageNotFound } from './comunes';

export function Contactos() {
    return (
        <>
            <h1>Contactos</h1>
            <Outlet />
        </>
    )
}
export function ContactosConRutas() {
    return (
        <>
            <h1>Contactos</h1>
            <Routes>
                <Route path='/' element={<ContactosList />} />
                <Route path='add' element={<ContactoAdd />} />
                <Route path=':id' element={<ContactoView />} />
                <Route path=':id/edit' element={<ContactoEdit />} />
                <Route path='*' element={<ContactosList />} />
            </Routes>

        </>
    )
}

export function ContactoView() {
    const { id } = useParams()
    const navigate = useNavigate();
    return (
        <>
            <p>Detalles del contacto {id}</p>
            <input type="button" value="Volver" onClick={() => navigate(-1)} />
            <input type="button" value="Calcular" onClick={() => navigate('/chisme/de/hacer/numeros')} />
        </>
    )
}
export function ContactoEdit() {
    const { id } = useParams()
    return (
        <>
            <p>Formulario de editar el contacto {id}</p>
        </>
    )
}
export function ContactoAdd() {
    return (
        <>
            <p>Formulario de crear el contacto</p>
        </>
    )
}
export function ContactosList() {
    return (
        <ul>
            <li>1 <Link to="1">ver</Link> <Link to="1/edit">editar</Link></li>
            <li>2 <Link to="2">ver</Link> <Link to="2/edit">editar</Link></li>
            <li>3 <Link to="3">ver</Link> <Link to="3/edit">editar</Link></li>
        </ul>
    )
}
