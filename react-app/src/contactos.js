import { useEffect, useState } from 'react';
import { Link, Outlet, useParams, Routes, Route, useNavigate, useSearchParams } from 'react-router-dom';
import { Esperando, PageNotFound } from './comunes';
import axios from "axios";
import store from "./store/store";

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
const API_URL = 'http://localhost:4321/api/contactos'

export function ContactosList() {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    let [searchParams, setSearchParams] = useSearchParams();
    let pagina = searchParams.get('page') || 0;
    useEffect(() => {
        //setLoading(true);
        axios.get(`${API_URL}?_page=${pagina}&_rows=10`)
            .then((response) => {
                setList(response.data);
                setLoading(false);
            })
            .catch((err) => {
                store.AddErrNotify(err);
                setLoading(false);
            });
    }, [setList]);

    if (loading) return <Esperando />;
    return (
        <ul>
            <div>
                {list.map((item) => (
                    <li key={item.id}>
                        <Link to={item.id+''}>{item.nombre} {item.apellidos}</Link> <Link to={item.id+"/edit"}>editar</Link>
                    </li>
                ))}
            </div>
        </ul>
    );
    // return (
    //     <ul>
    //         <li>1 <Link to="1">ver</Link> <Link to="1/edit">editar</Link></li>
    //         <li>2 <Link to="2">ver</Link> <Link to="2/edit">editar</Link></li>
    //         <li>3 <Link to="3">ver</Link> <Link to="3/edit">editar</Link></li>
    //     </ul>
    // )
}
