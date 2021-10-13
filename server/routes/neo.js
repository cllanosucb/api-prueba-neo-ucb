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
    const page_init = req.query.page;  
    let page = parseInt(page_init) || 1;
    let page_total = 0;
    console.log("Numero de pagina de inico: ", page);
    const lista = []; 
    try {
        do {  
            const response = await fetch(`${process.env.URL}/get_all_users?api_key=${process.env.API_KEY}&page=${page}`);
            const data = await response.json();
            //console.log(data);
            if(data.length > 0) {
                page += 1;
                page_total = page;
                for (let i = 0; i < data.length; i++) {
                    //await DBConnector.query(`INSERT INTO usuario(id_usuario,userid,joined_at,firts_login_at,last_login_at,login,firts_name,last_name,email,phone,teacher,student,assistant,administrator,monitor,student_id,teacher_id,birthdate,nick_name,pais,archived,gender,organization_id,registro_ucb,departamento,carrera) VALUES(${data[i].id},'${data[i].userid}','${moment(data[i].joined_at).format('YYYY-MM-DD HH:mm:ss')}','${moment(data[i].first_login_at).format('YYYY-MM-DD HH:mm:ss')}','${moment(data[i].last_login_at).format('YYYY-MM-DD HH:mm:ss')}',${data[i].logins},'${data[i].first_name}','${data[i].last_name}','${data[i].email}',${data[i].phone},${data[i].teacher},${data[i].student},${data[i].assistant},${data[i].administrator},${data[i].monitor},${data[i].student_id},${data[i].teacher_id},'${data[i].birthdate}',${data[i].nick_name},'${data[i].country}',${data[i].archived},'${data[i].gender}',${data[i].organization_id},'${data[i]["registro ucb"]}',${data[i].departamento},${data[i].carrera})`);
                    
                    await DBConnector.query(`INSERT INTO usuario`+
                    `(id_usuario,userid,joined_at,first_login_at,last_login_at,logins,first_name,last_name,email,phone,teacher,student,assistant,administrator,monitor,student_id,teacher_id,birthdate,nick_name,country,archived,gender,organization_id,registro_ucb,departamento,carrera)`+
                    `VALUES(`+
                    `'${data[i].id}',`+
                    `'${data[i].userid != null ? data[i].userid.replace(/'/gi, "") : 'null'}',`+
                    `'${moment(data[i].joined_at).format('YYYY-MM-DD HH:mm:ss')}',`+
                    `'${data[i].first_login_at != null ? moment(data[i].first_login_at).format('YYYY-MM-DD HH:mm:ss') : '0000-00-00 00:00:00'}',`+
                    `'${data[i].last_login_at != null ? moment(data[i].last_login_at).format('YYYY-MM-DD HH:mm:ss') : '0000-00-00 00:00:00'}',`+
                    `${data[i].logins},`+
                    `'${data[i].first_name != null ? data[i].first_name.replace(/'/gi, "") : 'null'}',`+
                    `'${data[i].last_name != null ? data[i].last_name.replace(/'/gi, "") : 'null'}',`+
                    `'${data[i].email != null ? data[i].email.replace(/'/gi, "") : 'null'}',`+
                    `'${data[i].phone != null ? data[i].phone.replace(/'/gi, "") : 'null'}',`+
                    `${data[i].teacher},`+
                    `${data[i].student},`+
                    `${data[i].assistant},`+
                    `${data[i].administrator},`+
                    `${data[i].monitor},`+
                    `'${data[i].student_id != null ? data[i].student_id.replace(/'/gi, "") : 'null'}',`+
                    `'${data[i].teacher_id != null ? data[i].teacher_id.replace(/'/gi, "") : 'null'}',`+
                    `'${data[i].birthdate != null ? moment(data[i].birthdate.replace(/'/gi, "")).format('YYYY-MM-DD') : '0000-00-00'}',`+
                    `'${data[i].nick_name != null ? data[i].nick_name.replace(/'/gi, "") : 'null'}',`+
                    `'${data[i].country != null ? data[i].country.replace(/'/gi, "") : 'null'}',`+
                    `${data[i].archived},`+
                    `'${data[i].gender != null ? data[i].gender.replace(/'/gi, "") : 'null'}',`+
                    `'${data[i].organization_id}',`+
                    `'${data[i]["registro ucb"] != null ? data[i]["registro ucb"].replace(/'/gi, "") : 'null'}',`+
                    `'${data[i].departamento != null ? data[i].departamento.replace(/'/gi, "") : 'null'}',`+
                    `'${data[i].carrera != null ? data[i].carrera.replace(/'/gi, "") : 'null'}');`);
                    
                    lista.push(data[i]);
                    //console.log(data[i]);
                }
            }else {
                page = 0;
            }
            console.log("==========> ",page);
            console.log("condicion", page != 0);
        } while (page != 0);
    } catch (error) {
        console.log(error);
    }
    
    
    res.json({
        page: "total de paginas recorridas "+page_total,
        total_users: lista.length,
        users: lista
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


//get_all_classes
app.get('/get_all_classes', async function(req,res) { 
    const page_init = req.query.page;  
    let page = parseInt(page_init) || 1;
    let page_total = 0;
    console.log("Numero de pagina de inico: ", page);
    const lista = []; 
    try {
        do {  
            const response = await fetch(`${process.env.URL}/get_all_classes?api_key=${process.env.API_KEY}&page=${page}`);
            const data = await response.json();
            //console.log(data);
            if(data.length > 0) {
                page += 1;
                page_total = page;
                for (let i = 0; i < data.length; i++) {
                    
                    await DBConnector.query(`INSERT INTO asignatura(`+
                    `id_asignatura,name,course_code,description,syllabus,credits,display_in_catalog,catalog_category,template,organization,archived,semester,subject,start,finish,price)`+
                    `VALUES(`+
                    `${data[i].id},`+
                    `'${data[i].name != null ? data[i].name.replace(/'/gi,"") : 'null'}',`+
                    `'${data[i].course_code != null ? data[i].course_code.replace(/'/gi,"") : 'null'}',`+
                    `'${data[i].description != null ? data[i].description.replace(/'/gi,"") : 'null'}',`+
                    `\'${data[i].syllabus != null ? data[i].syllabus.replace(/'/gi,"") : 'null'}\',`+
                    `${data[i].credits || 0},`+
                    `${data[i].display_in_catalog},`+
                    `'${data[i].catalog_category != null ? data[i].catalog_category.replace(/'/gi,"") : 'null'}',`+
                    `${data[i].template},`+
                    `'${data[i].organization != null ? data[i].organization.replace(/'/gi, "") : 'null'}',`+
                    `${data[i].archived},`+
                    `'${data[i].semester != null ? data[i].semester.replace(/'/gi,"") : 'null'}',`+
                    `'${data[i].subject != null ? data[i].subject.replace(/'/gi,"") : 'null'}',`+
                    `'${data[i].start != null ? moment(data[i].start.replace(/'/gi, "")).format('YYYY-MM-DD') : '0000-00-00'}',`+
                    `'${data[i].finish != null ? moment(data[i].finish.replace(/'/gi, "")).format('YYYY-MM-DD') : '0000-00-00'}',`+
                    `${data[i].price || 0});`  );
                    
                    lista.push(data[i]);
                    //console.log(data[i]);
                }
            }else {
                page = 0;
            }
            console.log("==========> ",page);
            console.log("condicion", page != 0);
        } while (page != 0);
    } catch (error) {
        console.log(error);
    }
    
    
    res.json({
        page: "total de paginas recorridas "+page_total,
        total_classes: lista.length,
        lessons: lista
    })
})



module.exports = app;
