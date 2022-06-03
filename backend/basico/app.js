// require('dotenv').config();
// const http = require('http');

// const hostname = '127.0.0.1';
// let port = process.env.PORT || 3000;

// process.argv.slice(2).forEach((val, index) => {
//     console.log(`${index}: ${val.includes('=') ? `name: ${val.split('=')[0]} value: ${val.split('=')[1]}` : val}`);
//     if(val.includes('=') && val.split('=')[0] === 'PORT')
//         port=val.split('=')[1]
// });

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Adios mundo.\n');
//   console.clear()
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

// let nombre = 'mundo'

// console.log(`Adios ${nombre}`)
// console.log('Mi %s tiene %d patas' , 'gato' , 4)
// console.log(port, nombre, hostname)
// // console.log(server)

// const readline = require('readline').createInterface({
//     input: process.stdin, output: process.stdout,
// });
// readline.question(`¿Como te llamas? `, name => {
//     console.log(`Hola ${name}`);
//     readline.close();
// });
// import {esNIF} from './modules/biblioteca.js'

// const circulo = require('./modules/circulo')
// console.log( 'El área de un círculo con radio 4 es ' + circulo.area(4));
// console.log( 'La circunferencia de un círculo con radio 4 es ' + circulo.circumference(4));
// console.log(circulo)
// const Cuadrado = require('./modules/cuadrado')
// console.log(Cuadrado)
// let cuadrado = new Cuadrado(4)
// console.log( 'El área de un cuadrado con lado 4 es ' + cuadrado.area());
// console.log( 'La perímetro de un cuadrado con lado 4 es ' + cuadrado.perimetro());
// console.log( 'La circunferencia de un círculo con radio 4 es ' + Cuadrado.circumference(4));
// console.log('El 12345678Z' + (esNIF('12345678Z') ? 'es NIF' : 'no es NIF'))

// const fs = require('fs');
// // const data = fs.readFileSync('app.js'); // blocks here until file is read
// // console.log('Termine')

// fs.readFile('package-lock.json', (err, data) => {
//     if (err) throw err;
//     console.log('Termine con package-lock.json')
// });
// fs.readFile('app.js', (err, data) => {
//     if (err) throw err;
//     console.log('Termine con app.js')
// });

// console.log('Sigo')

// const EventEmitter = require('events');
// class MyEmitter extends EventEmitter {}
// const myEmitter = new MyEmitter();
// function eventControler(msg) {
//     //setImmediate(() => console.log(`EXTRA: ${msg}`))
//     process.nextTick(() => console.log(`EXTRA: ${msg}`))
//     console.log(`Termina con EXTRA`)
// } 
// myEmitter.on('pinta', msg => {
//     if(!msg) {
//         throw new Error('Falta el mensaje');
//         // myEmitter.emit('error', new Error('Falta el mensaje'));
//     }

//     console.log(`NORMAL: ${msg}`)
// });
// myEmitter.on('pinta', eventControler);
// // myEmitter.on('error', error => console.log('ERROR: ' +  error.message))
// process.on('uncaughtException', (error, origin) => console.log('ERROR RAIZ: ' +  error.message));

// myEmitter.emit('pinta', 'uno');
// myEmitter.off('pinta', eventControler)
// myEmitter.emit('pinta', 'dos');
// myEmitter.once('pinta', msg => console.log(`ONCE: ${msg}`));
// myEmitter.emit('pinta', 'tres');
// myEmitter.emit('pinta', 'cuatro');
// //myEmitter.removeAllListeners('pinta')
// myEmitter.emit('pinta', 'cinco');
// try {
//     myEmitter.emit('pinta');
// } catch (error) {
//     console.log('Error', error)
// }

// const fs = require('fs')
// fs.readFile('app.js', (err, data) => {
//     if (err) {
//         console.log('ERROR: ' + err.message)
//         return
//     }
//     console.log('Leido')
//     fs.writeFile('out.txt', data, err => {
//         if (err) {
//             console.log('ERROR: ' + err.message)
//             return
//         } else {
//             console.log('Escrito')
//             console.log('Copiado')
//         }
//     })
// })
// const fs = require('fs/promises');

// (async () => {
//     try {
//         let data = await fs.readFile('app.js')
//         console.log('Leido')
//         await fs.writeFile('out.txt', data)
//         console.log('Escrito')
//     } catch (error) {
//         console.log('ERROR: ' + error.message)
//     }
// })().then(() => console.log('Copiado'))

// var mysql = require('mysql')
// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'sakila'
// })

// connection.connect()

// // connection.query('SELECT * FROM `sakila`.`category`', function (err, rows, fields) {
// //   if (err) throw err
// //   // rows.forEach(item => {
// //   //   console.log(`${item.category_id}\t${item.name}`)
// //   // });
// //   console.log(JSON.stringify(rows.map(item => ({ id: item.category_id, categoria: item.name}))))
// // })
// connection.query(' SELECT actor_id id, first_name nombre , last_name apellidos FROM sakila.actor', function (err, rows, fields) {
//   if (err) throw err
//   // rows.forEach(item => {
//   //   console.log(`${item.category_id}\t${item.name}`)
//   // });
//   //console.log(rows)
//   console.log(JSON.stringify(rows.map(item => item.RowDataPacket)))
// })
// const MongoClient = require('mongodb').MongoClient;

// const url = 'mongodb://localhost:27017';
// const dbName = 'curso';

// const client = new MongoClient(url);

// client.connect(function (err) {
//     if(err) throw err;
//     const db = client.db(dbName);
//     const collection = db.collection('personas');
//     collection.find({}).toArray(function (err, docs) {
//         if(err) throw err;
//         console.log(docs);
//         client.close();
//     });
// });

const bcrypt = require('bcrypt');
const saltRounds = 10;

async function encriptaPassword(password) {
    const salt = await bcrypt.genSalt(saltRounds)
    const hash = await bcrypt.hash(password, salt)
    console.log(hash)
    return hash
}
async function verificaPassword(password, hash) {
    return await bcrypt.compare(password, hash)
    // try {
    //     let rslt = await bcrypt.compare(password, hash)
    //     console.log("Return: " + rslt)
    //     return true;
    // } catch (error) {
    //     console.log(error)
    //     return false;
    // }
}


// // encriptaPassword('P@$$w0rd')
// // encriptaPassword('P@$$w0rd')
// verificaPassword('P@$$w0rd', '$2b$10$oRUQiRh4HImiCoD2wIlyyul/V.KwOh/lCAebDa9G5m1C/667NutzG')
//     .then(rslt => console.log(rslt ? 'OK': 'KO'), () => console.log('KO'))
// verificaPassword('P@$$w0rd', '$2b$10$Yot/z1BPEB9qnZPPjkDU6eKNtNClSV.IuBbg3JQgPsehicP/jn/b6')
//     .then(rslt => console.log(rslt ? 'OK': 'KO'), () => console.log('KO'))
// //console.log(verificaPassword('P@$$w0rd', '$2b$10$YoT/z1BPEB9qnZPPjkDU6eKNtNClSV.IuBbg3JQgPsehicP/jn/b6') ? 'OK' : 'KO')
// // console.log(verificaPassword('P@$$w0rd', "$2b$10$5i7NYY8y3qmK3bmLmU8uMOHTawhPq7ddD7F6SfOf9ZKz76V8XssM6"))

const jwt = require('jsonwebtoken')
const APP_SECRET = 'Es segura al 99%'
const AUTHENTICATION_SCHEME = 'Bearer '

// let token = AUTHENTICATION_SCHEME + jwt.sign({
//     usr: 'admin',
//     name: 'Pepito Grillo',
//     roles: ['inversor']
// }, APP_SECRET, { expiresIn: '1h' })
// console.log(token)

try {
    let decoded = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3IiOiJhZG1pbiIsIm5hbWUvOiJQZXBpdG8gR3JpbGxvIiwicm9sZXMiOlsiaW52ZXJzb3IiXSwiaWF0IjoxNjU0MjU3MTAxLCJleHAiOjE2NTQyNjA3MDF9.zFg9UzCtjGItCyt7Pi38L3iyzXwahtWuyaZDAsPBN8A', APP_SECRET);
    console.log(decoded)
} catch (err) {
    console.log(err)
}
