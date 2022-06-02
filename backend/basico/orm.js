const { Sequelize, DataTypes, Op, QueryTypes } = require('sequelize');
const initModels = require("./models/init-models");
const sequelize = new Sequelize('mysql://root:root@localhost:3306/sakila')
const dbContext = initModels(sequelize);

console.log(`Inicio ${new Date().toLocaleTimeString('es')}`)
// dbContext.actor.findOne({where: { actor_id: {[Op.lt]:10} }}).then(row => console.log(row.toJSON()))

async function conUno() {
    let row = await dbContext.actor.findOne({ where: { actor_id: { [Op.lt]: 10 } } })
    // let row = await dbContext.actor.findByPk(1)
    console.log(row.toJSON())
}
async function conMuchos() {
    let rows = await dbContext.actor.findAll({ where: { actor_id: { [Op.gt]: 190 } } })
    rows.forEach(row => {
        console.log(row.toJSON())
    });
}
async function conPaginas(page=0, limit=20) {
    let rows = await dbContext.actor.findAll({ offset: page*limit, limit , order: ['first_name', 'last_name'] })
    console.log(rows.map(row => ({id: row.actor_id, name: row.first_name + ' ' + row.last_name})))
}
async function conAsociaciones() {
    // let row = await dbContext.actor.findByPk(1)
    // let rows = await row.getPeliculas()
    let row = await dbContext.actor.findByPk(1, { include: 'peliculas' })
    let rows = row.peliculas 
    console.log({id: row.actor_id, name: row.first_name + ' ' + row.last_name, films: rows.map(item => ({id: item.film_id, name: item.title}))})
}
async function insert() {
    let row = await dbContext.actor.build({first_name: 'Pepito', last_name: 'Grillo'})
    // if(!row.validate()) {
    //     console.log('400 Datos invalidos')
    //     return;
    // }
    // // let pelis = await dbContext.film.findAll({ where: { film_id: { [Op.lt]: 4 } } })
    // // pelis.forEach(item => row.).createPelicula({actor_id})
    // // row.createPelicula(await dbContext.film.findAll({ where: { film_id: { [Op.lt]: 4 } } }))
    // console.log(row)
    // console.log('Guardo ...')
    // await row.save()
    // let row = await dbContext.actor.create({first_name: 'Pepito', last_name: 'Grillo'})
    console.log(row)
    await conMuchos()
}
async function update() {
    let row = await dbContext.actor.findOne({ order: [['actor_id','DESC']] })
    console.log(row)
    row.first_name = row.first_name.toUpperCase()
    console.log('Guardo ...')
    await row.save()
    console.log(row)
    // await conMuchos()
}
async function remove() {
    let row = await dbContext.actor.findOne({ order: [['actor_id','DESC']] })
    console.log(row)
    await row.destroy()
    console.log(row)
    await conMuchos()
}

// conUno().then(()=> { console.log(`Termine ${new Date().toLocaleTimeString('es')}`); process.exit(0)}, err => console.error(`ERROR ${new Date().toLocaleTimeString('es')}: `, err))
// conMuchos().then(() => { console.log(`Termine ${new Date().toLocaleTimeString('es')}`); process.exit(0) }, err => console.error(`ERROR ${new Date().toLocaleTimeString('es')}: `, err))
// conPaginas(1, 10).then(()=> { console.log(`Termine ${new Date().toLocaleTimeString('es')}`); process.exit(0)}, err => console.error(`ERROR ${new Date().toLocaleTimeString('es')}: `, err))
// conAsociaciones().then(() => { console.log(`Termine ${new Date().toLocaleTimeString('es')}`); process.exit(0) }, err => console.error(`ERROR ${new Date().toLocaleTimeString('es')}: `, err))
// insert().then(() => { console.log(`Termine ${new Date().toLocaleTimeString('es')}`); process.exit(0) }, err => console.error(`ERROR ${new Date().toLocaleTimeString('es')}: `, err))
// update().then(() => { console.log(`Termine ${new Date().toLocaleTimeString('es')}`); process.exit(0) }, err => console.error(`ERROR ${new Date().toLocaleTimeString('es')}: `, err))
// remove().then(() => { console.log(`Termine ${new Date().toLocaleTimeString('es')}`); process.exit(0) }, err => console.error(`ERROR ${new Date().toLocaleTimeString('es')}: `, err))

// '/actores/:id'
// await sequelize.query('DELETE FROM `actor` WHERE `actor_id` = ' + req.params.id)
// DELETE http://localhost:4200/actores/1%20or%201=1
// [
//     '208',
//     '1 or 1=1',
//     '1; DROP TABLE ...',
//     '1; exec xp_cmdShell("FDISK ...")'
// ].forEach(id => console.log('delete from contactos where idContacto=' + +id))

// await sequelize.query('DELETE FROM `actor` WHERE `actor_id` = $id', { bind: {id:1}, type: QueryTypes.SELECT });
