const express = require('express') //llamamos a Express
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
var moment = require('moment');
require('dotenv').config();

//conect DB
const DBConnector = require('../db/dbconnector')

var app = express()

//Primera ruta principal para prueba.
app.get('/', function(req, res) {
  res.json({ mensaje: '¡Bienvenido a nuestra API!' })
  
  //var datetime = moment("2021-01-22T21:01:55.000-04:00").format('YYYY-MM-DD  HH:mm:ss.000'); 
  //console.log(datetime);
  //console.log(process.env.URL); 
})

//get_all_users
app.get('/get_all_users', async function(req,res) { 
    
    const lista = [];
    let page = 1; 
    const resp = null;
    
    /*const response = await fetch(`${process.env.URL}/get_all_users?api_key=${process.env.API_KEY}&page=${page}`);
        const data = await response.json();
        if(data.length > 0) {
            page += 1;
            for (let i = 0; i < 3; i++) {

                await DBConnector.query(`INSERT INTO usuario(id_usuario,userid,joined_at,firts_login_at,last_login_at,login,firts_name,last_name,email,phone,teacher,student,assistant,administrator,monitor,student_id,teacher_id,birthdate,nick_name,pais,archived,gender,organization_id,registro_ucb,departamento,carrera) VALUES(${data[i].id},'${data[i].userid}','${moment(data[i].joined_at).format('YYYY-MM-DD HH:mm:ss')}','${moment(data[i].first_login_at).format('YYYY-MM-DD HH:mm:ss')}','${moment(data[i].last_login_at).format('YYYY-MM-DD HH:mm:ss')}',${data[i].logins},'${data[i].first_name}','${data[i].last_name}','${data[i].email}',${data[i].phone},${data[i].teacher},${data[i].student},${data[i].assistant},${data[i].administrator},${data[i].monitor},${data[i].student_id},${data[i].teacher_id},'${data[i].birthdate}',${data[i].nick_name},'${data[i].country}',${data[i].archived},'${data[i].gender}',${data[i].organization_id},'${data[i]["registro ucb"]}',${data[i].departamento},${data[i].carrera})`);
                
                lista.push(data[i]);
                console.log("==================");
                console.log(data[i].first_name);
                console.log(data[i].last_name);
                console.log(data[i]['registro ucb']);
                console.log(data[i].birthdate);
                console.log("==================");
            }
        }*/

    
    do {  
        const response = await fetch(`${process.env.URL}/get_all_users?api_key=${process.env.API_KEY}&page=${page}`);
        const data = await response.json();
        if(data.length > 0) {
            page += 1;
            for (let i = 0; i < data.length; i++) {
                await DBConnector.query(`INSERT INTO usuario(id_usuario,userid,joined_at,firts_login_at,last_login_at,login,firts_name,last_name,email,phone,teacher,student,assistant,administrator,monitor,student_id,teacher_id,birthdate,nick_name,pais,archived,gender,organization_id,registro_ucb,departamento,carrera) VALUES(${data[i].id},'${data[i].userid}','${moment(data[i].joined_at).format('YYYY-MM-DD HH:mm:ss')}','${moment(data[i].first_login_at).format('YYYY-MM-DD HH:mm:ss')}','${moment(data[i].last_login_at).format('YYYY-MM-DD HH:mm:ss')}',${data[i].logins},'${data[i].first_name}','${data[i].last_name}','${data[i].email}',${data[i].phone},${data[i].teacher},${data[i].student},${data[i].assistant},${data[i].administrator},${data[i].monitor},${data[i].student_id},${data[i].teacher_id},'${data[i].birthdate}',${data[i].nick_name},'${data[i].country}',${data[i].archived},'${data[i].gender}',${data[i].organization_id},'${data[i]["registro ucb"]}',${data[i].departamento},${data[i].carrera})`);
                
                //console.log(data[i]);
            }
        }else {
            page = 0;
        }
        console.log("==========> ",page);
        console.log("condicion", page != 0);
    } while (page != 0);
    
    
    res.json({
        users: lista,
    })  
})

//get_all_organizations
app.get('/get_all_organizations', async function(req, res) {
    const lista = [];
    let page = 1; 
    const resp = null;
    
    do {  
        const response = await fetch(`${process.env.URL}/get_all_organizations?api_key=${process.env.API_KEY}&page=${page}`);
        const data = await response.json();
        if(data.length > 0) {
            page += 1;
            for (let i = 0; i < data.length; i++) {
                await DBConnector.query(`INSERT INTO organizacion`+
                `(id_organizacion,`+
                `name,`+
                `description,`+
                `internal)`+
                `VALUES`+
                `(${data[i].id },`+
                `'${data[i].name }',`+
                `'${data[i].description }',`+
                `${data[i].internal });`);
                
                lista.push(data[i]);
                //console.log(data[i]);
            }
        }else {
            page = 0;
        }
        console.log("==========> ",page);
        console.log("condicion", page != 0);
    } while (page != 0);
    
    
    res.json({
        users: lista,
    })  
})


module.exports = app;
