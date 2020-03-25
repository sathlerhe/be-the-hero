const express = require('express') //Vai requerir/armazenar o micro-framework express

const ongController = require('./controller/ongController') //Vai pegar o Controller da ONG e importar
const incidentController = require('./controller/incidentController') //Vai pegar o Controller do Incident e importar
const profileController = require('./controller/profileController') //Vai pegar o Controller do profile e importar
const sessionController = require('./controller/sessionController') //Vai pegar o Controller do session e importar

const routes = express.Router()

routes.post('/sessions', sessionController.create)

routes.get('/ongs', ongController.index) //Vai criar uma rota a partir do método 'index()' criado no arquivo 'ongController.js'
routes.post('/ongs', ongController.create) //Vai criar a rota a partir do método 'create()' criado no arquivo 'ongController.js'

routes.get('/profile', profileController.index) //Vai criar a rota a partir do método 'index()' criado no 

routes.get('/incidents', incidentController.index) //Vai criar uma rota a partir do método 'index()' criado no arquivo 'ongController.js'
routes.post('/incidents', incidentController.create) //Vai criar a rota a partir do método 'create()' criado no arquivo 'incidentController.js'
routes.delete('/incidents/:id', incidentController.delete) //Vai criar a rota a partir do método 'delete()' criado no arquivo 'incidentController.js'


module.exports = routes; //Forma de exportar aquivos pelo node.js