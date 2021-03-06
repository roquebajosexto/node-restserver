//=============================
//Puerto
//=============================

process.env.PORT = process.env.PORT || 3000


//=============================
//Entorno
//=============================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//=============================
//Vencimiento del Token
//=============================

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30

//=============================
//SEED de autenticacion
//=============================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo'

//=============================
//Base de datos
//=============================

let urlDB
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/ichamba'
} else {
    urlDB = process.env.MONGO_URI
}
process.env.URLDB = urlDB

//=============================
//GOOGLE ID
//=============================
process.env.CLIENT_ID = process.env.CLIENT_ID || '440719960242-0hrt6o6lan2ptkmoadjcme8s1n8ni2dp.apps.googleusercontent.com'