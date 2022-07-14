import { Component, useEffect, useState } from 'react';
import { NavLink, Outlet, useParams, Routes, Route, useNavigate, useSearchParams } from 'react-router-dom';
import axios from "axios";
import { Esperando, PageNotFound, Paginacion } from '../utilidades/comunes';
import { esPasado } from '../utilidades/biblioteca';
import store from "../store/store";

function ValidationMessage({ msg }) {
    if (msg) {
        return <output className="invalid-feedback">{msg}</output>;
    }
    return null;
}

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

const API_URL = (process.env.REACT_APP_API_URL || 'http://localhost:4321/api/') + 'contactos'

export function ContactosList() {
    const ROWS = 7
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [pagina, setPagina] = useState({ pagina: +searchParams.get('page') || 0 })
    const [paginas, setPaginas] = useState(0)
    //console.log({ pagina, paginas, page: searchParams.get('page') || 0 })
    if (pagina !== (+searchParams.get('page') || 0))
        setPagina(+searchParams.get('page') || 0);
    useEffect(() => {
        axios
            .get(`${API_URL}?_page=${pagina}&_rows=${ROWS}&_sort=nombre,apellidos`)
            .then(resp => {
                let totalPaginas = resp.data.totalPages;
                let paginaActual = resp.data.number - 1;
                setList(resp.data.content);
                setLoading(false);
                if (paginaActual !== pagina) setPagina(paginaActual);
                if (totalPaginas !== paginas) setPaginas(totalPaginas);
            }).catch(err => {
                store.AddErrNotify(err);
                setLoading(false);
            });
    }, [pagina]);

    const borrar = () => { }

    if (loading) return <Esperando />;

    return (
        <>
            <table className="table table-striped table-hover">
                <thead>
                    <tr className="table-info">
                        <th>Lista de contactos</th>
                        <th className="text-end"><NavLink className="btn btn-success" to={'add'}>Añadir</NavLink></th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-12 col-sm-2">
                                            <img className="rounded-circle float-left" src={item.avatar} alt={`Foto de ${item.nombre} ${item.apellidos}`} width="75" height="75" />
                                        </div>
                                        <div className="col-12 col-sm-10 container-fluid">
                                            <div className="row">
                                                <div className='col'>
                                                    <NavLink className="btn btn-link" to={item.id + ''}>{item.tratamiento} {item.nombre} {item.apellidos}</NavLink>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className='col container-fluid'>
                                                    <div className="row">
                                                        <b className='col'>Tlfn.:</b> <span className='col-8'>{item.telefono}</span>
                                                    </div>
                                                </div>
                                                <div className='col container-fluid'>
                                                    <div className="row">
                                                        <b className='col'>Correo:</b>  <span className='col'>{item.email}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="align-middle text-end">
                                <div className="btn-group-vertical">
                                    {/* <NavLink className="btn btn-info" aria-label="ver" to={item.id + ''}><i className="fas fa-eye"></i></NavLink> */}
                                    <NavLink className="btn btn-success" aria-label="editar" to={item.id + '/edit'}><i className="fas fa-pen"></i></NavLink>
                                    <button className="btn btn-danger" aria-label="borrar" onClick={() => borrar(item.id)}><i className="far fa-trash-alt"></i></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Paginacion actual={pagina} total={paginas} url="/contactos?page=" />
        </>
    );
}
export function ContactoView() {
    const { id } = useParams()
    const navigate = useNavigate();
    const [elemento, setElemento] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get(`${API_URL}/${id}`)
            .then((response) => {
                setElemento(response.data);
                setLoading(false);
            })
            .catch((err) => {
                store.AddErrNotify(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <Esperando />;

    return (
        <>
            <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-6">
                    <div className="well well-sm">
                        <div className="row">
                            <div className="col-sm-6 col-md-4">
                                <img src={elemento.avatar}
                                    alt={`Foto de ${elemento.nombre} ${elemento.apellidos}`} className="rounded" />
                            </div>
                            <div className="col-sm-6 col-md-8">
                                <h4>{elemento.tratamiento} {elemento.nombre} {elemento.apellidos}</h4>
                                {elemento.conflictivo &&
                                    <p><small className="text-danger">
                                        <i className="fas fa-skull-crossbones mr-2"></i>Persona conflictiva</small></p>}
                                <p>
                                    <i className="fas fa-phone-alt mr-2"></i>{elemento.telefono}
                                    <br />
                                    <i className="fas fa-envelope mr-2"></i>
                                    <a href="mailto:{elemento.email}}">{elemento.email}</a>
                                    <br />
                                    <i className="fas fa-gifts mr-2"></i>{elemento.nacimiento && new Date(elemento.nacimiento).toLocaleDateString()}
                                    <i className="fas fa-gifts mr-2"></i>{elemento.nacimiento}
                                </p>
                                <div className="btn-group">
                                    <button type="button" className="btn btn-primary">
                                        Social</button>
                                    <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                                        <span className="caret"></span><span className="sr-only">Social</span>
                                    </button>
                                    <ul className="dropdown-menu" role="menu">
                                        <li><a href="#">Twitter</a></li>
                                        <li><a href="https://plus.google.com/+Jquery2dotnet/posts">Google +</a></li>
                                        <li><a href="https://www.facebook.com/jquery2dotnet">Facebook</a></li>
                                        <li className="divider"></li>
                                        <li><a href="#">Github</a></li>
                                    </ul>
                                    <input className="btn btn-secondary" type="button" value="Volver" onClick={() => navigate(-1)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export function ContactoEdit() {
    const { id } = useParams()
    const navigate = useNavigate();
    const [elemento, setElemento] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get(`${API_URL}/${id}`)
            .then((response) => {
                setElemento(response.data);
                setLoading(false);
            })
            .catch((err) => {
                store.AddErrNotify(err);
                setLoading(false);
            });
    }, [id]);

    const send = elemento => {
        setLoading(true)
        axios
            .put(`${API_URL}/${id}`, elemento)
            .then(data => navigate(-1))
            .catch(err => {
                store.AddErrNotify(err);
                setLoading(false)
            });
    }

    if (loading) return <Esperando />;

    return (
        <ContactosForm
            elemento={elemento}
            onCancel={() => navigate(-1)}
            onSend={e => send(e)}
        />
    );

    // return (
    //     <>
    //         <p>Formulario de editar el contacto {id}</p>
    //         <p>{JSON.stringify(elemento)}</p>
    //         <input type="button" value="Volver" onClick={() => navigate(-1)} />
    //     </>
    // )
}
export function ContactoAdd() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const send = elemento => {
        setLoading(true)
        axios
            .post(API_URL, elemento)
            .then(data => navigate(-1))
            .catch(err => {
                store.AddErrNotify(err);
                setLoading(false)
            });
    }

    if (loading) return <Esperando />;

    return (
        <ContactosForm
            isAdd
            elemento={{}}
            onCancel={() => navigate(-1)}
            onSend={e => send(e)}
        />
    )
}

export class ContactosForm extends Component {
    constructor(props) {
        super(props);
        this.state = { elemento: props.elemento, msgErr: [], invalid: false };
        this.handleChange = this.handleChange.bind(this);
        this.onSend = () => {
            if (this.props.onSend) this.props.onSend(this.state.elemento);
        };
        this.onCancel = () => {
            if (this.props.onCancel) this.props.onCancel();
        };
    }
    handleChange(event) {
        const cmp = event.target.name;
        const valor = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        this.setState(prev => {
            prev.elemento[cmp] = valor;
            return { elemento: prev.elemento };
        });
        this.validar();
    }
    validarCntr(cntr) {
        if (cntr.name) {
            // eslint-disable-next-line default-case
            switch (cntr.name) {
                case "nacimiento":
                    cntr.setCustomValidity(!esPasado(cntr.value) ? 'No puede ser una fecha futura' : '');
                    break;
            }
        }
    }
    validar() {
        if (this.form) {
            const errors = {};
            let invalid = false;
            for (var cntr of this.form.elements) {
                if (cntr.name) {
                    this.validarCntr(cntr);
                    errors[cntr.name] = cntr.validationMessage;
                    invalid = invalid || !cntr.validity.valid;
                }
            }
            this.setState({ msgErr: errors, invalid: invalid });
        }
    }
    componentDidMount() {
        this.validar();
    }
    render() {
        return (
            <form
                ref={tag => {
                    this.form = tag;
                }}
            >
                {this.props.isAdd && (
                    <div className="form-group">
                        <label htmlFor="id">Código:</label>
                        <input
                            type="number"
                            className={"form-control" + (this.state.msgErr.id ? " is-invalid" : "")}
                            id="id"
                            name="id"
                            value={this.state.elemento.id}
                            onChange={this.handleChange}
                            required
                        />
                        <ValidationMessage msg={this.state.msgErr.id} />
                    </div>
                )}
                {!this.props.isAdd && (
                    <div className="form-group">
                        <label>Código: </label>
                        {' ' + this.state.elemento.id}
                    </div>
                )}
                <div className="row">
                    <div className="form-group col-md-2">
                        <label className="form-label" htmlFor="tratamiento">Tratamiento:</label>
                        <select className="form-control form-select" name="tratamiento" id="tratamiento" value={this.state.elemento.tratamiento} onChange={this.handleChange}>
                            <option>Sr.</option>
                            <option>Sra.</option>
                            <option>Srta.</option>
                            <option>Dr.</option>
                            <option>Dra.</option>
                            <option>Ilmo.</option>
                            <option>Ilma.</option>
                            <option>Excmo.</option>
                            <option>Excma.</option>
                        </select>
                    </div>
                    <div className="form-group col-md-5">
                        <label htmlFor="nombre">Nombre:</label>
                        <input
                            type="text"
                            className={"form-control" + (this.state.msgErr.nombre ? " is-invalid" : "")}
                            id="nombre"
                            name="nombre"
                            value={this.state.elemento.nombre}
                            onChange={this.handleChange}
                            required
                            minLength="2"
                            maxLength="10"
                        />
                        <ValidationMessage msg={this.state.msgErr.nombre} />
                    </div>
                    <div className="form-group col-md-5">
                        <label htmlFor="apellidos">Apellidos:</label>
                        <input
                            type="text"
                            className={"form-control" + (this.state.msgErr.apellidos ? " is-invalid" : "")}
                            id="apellidos"
                            name="apellidos"
                            value={this.state.elemento.apellidos}
                            onChange={this.handleChange}
                            minLength="2"
                            maxLength="10"
                        />
                        <ValidationMessage msg={this.state.msgErr.apellidos} />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-2">
                        <label className="form-label" htmlFor="telefono">Teléfono:</label>
                        <input className={"form-control" + (this.state.msgErr.telefono ? " is-invalid" : "")} type="tel" name="telefono" id="telefono"
                            value={this.state.elemento.telefono} maxLength="11" onChange={this.handleChange} />
                        <ValidationMessage msg={this.state.msgErr.telefono} />
                    </div>
                    <div className="form-group col-md-4">
                        <label className="form-label" htmlFor="email">Correo:</label>
                        <input className={"form-control" + (this.state.msgErr.email ? " is-invalid" : "")} type="email" name="email" id="email"
                            value={this.state.elemento.email} maxLength="100" onChange={this.handleChange} />
                        <ValidationMessage msg={this.state.msgErr.email} />
                    </div >
                    <div className="form-group col-md-2">
                        <label className="form-label" htmlFor="nacimiento">F. Nacimiento:</label>
                        <input className={"form-control" + (this.state.msgErr.nacimiento ? " is-invalid" : "")} type="date" name="nacimiento" id="nacimiento" value={this.state.elemento.nacimiento} onChange={this.handleChange} />
                        <ValidationMessage msg={this.state.msgErr.nacimiento} />
                    </div>
                    <fieldset className="form-group col-md-2">
                        <legend className="col-form-label col-sm-2 pt-0">Sexo:</legend>
                        <div className="col-sm-10">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="sexo" id="sexo1" value="H" checked={this.state.elemento.sexo === 'H'} onChange={this.handleChange} />
                                <label className="form-check-label" htmlFor="sexo1">Hombre</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="sexo" id="sexo2" value="M" checked={this.state.elemento.sexo === 'M'} onChange={this.handleChange} />
                                <label className="form-check-label" htmlFor="sexo2">Mujer</label>
                            </div>
                        </div>
                    </fieldset>
                    <div className="form-group col-md-2">
                        <div>Situación:</div>
                        <div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="conflictivo" name="conflictivo"
                                    checked={this.state.elemento.conflictivo} onChange={this.handleChange} />
                                <label className="form-check-label" htmlFor="conflictivo">Conflictivo</label>
                            </div>
                        </div>
                    </div>
                </div >
                <div className="form-group">
                    <label className="form-label" htmlFor="avatar">Avatar:</label>
                    <input className={"form-control" + (this.state.msgErr.avatar ? " is-invalid" : "")} type="url" name="avatar" id="avatar"
                        value={this.state.elemento.avatar} onChange={this.handleChange} />
                    <ValidationMessage msg={this.state.msgErr.avatar} />
                </div >

                <div className="form-group">
                    <button
                        className="btn btn-primary"
                        type="button"
                        disabled={this.state.invalid}
                        onClick={this.onSend}
                    >
                        Enviar
                    </button>
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={this.onCancel}
                    >
                        Volver
                    </button>
                </div>
            </form >
        );
    }
}
