import logo from './logo.svg';
import './App.css';

function App() {
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
    { "id": 3, "nombre": "Pierre", "apellidos": "Nodoiuna", "edad": 55 },
    { "id": 4, "nombre": "Capitan", "apellidos": "Tan", "edad": 18 },
  ]
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
      <h3 className='alert alert-danger'>Hola {nombre.toUpperCase()}!!!</h3>
      <ul>
        {listado.map(item => (
          <li key={item.id}>{item.nombre} {item.apellidos}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
