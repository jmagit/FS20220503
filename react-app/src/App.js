import logo from './logo.svg';
import './App.css';
import { Card, Saluda } from './ejemplos';
//import { Saluda } from './ejemplos.js'

const Despide = (props) => (<h1>Adios {props.nombre}</h1>)

export default function App() {
  const elelement = (
    <>
      <h1>Hola mundo</h1>
      <h2>Que tal</h2>
    </>
  )
  let nombre = 'Valladolid'
  let listado = [
    { "id": 1, "nombre": "Camelo", "apellidos": "Coton", "edad": 37, "telefonos": ["12342", "3453", "3334"] },
    { "id": 2, "nombre": "Pepito", "apellidos": "Grillo", "edad": 67 },
    { "id": 3, "nombre": "<b>Pierre</b>", "apellidos": "Nodoiuna", "edad": 55 },
    { "id": 4, "nombre": "Capitan", "apellidos": "Tan", "edad": 18 },
  ]
  function negrita(item) {
    if (item.id % 2) {
      return <b>{item.nombre}</b>
    } else {
      return <>{item.nombre}</>
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>{process.env.REACT_APP_NOMBRE}</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="btn btn-info"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <h1>Secreto: {process.env.REACT_APP_SECRET}</h1>
      </header>
      {elelement}
      {nombre && <h3 className='alert alert-danger'>Hola {nombre.toUpperCase()}!!!</h3>}
      <ul>
        {listado.map(item => (
          // <li key={item.id}><span dangerouslySetInnerHTML={{__html: item.nombre}} /> {item.apellidos}</li>
          <li key={item.id} className={item.id % 2 ? 'alert-danger' : 'alert-info'}>{negrita(item)} {item.apellidos}</li>
        ))}
      </ul>
      <Card title="Titulo de la tarjeta">
        <Saluda nombre="Don Pepito" />
        <Saluda nombre="Don Jose" />
        <Despide nombre="Don Pepito" />
        <Despide nombre="Don Jose" />
      </Card>
    </div>
  );
}

// export default App;
