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

//Prueba
app.get('/prueba', async function(req,res) { 
    const page_init = req.query.page;  
    let page = parseInt(page_init) || 1;
    let page_total = 0;
    console.log("Numero de pagina de inico: ", page);
    const lista = []; 
    //try {

        const response = await fetch(`${process.env.URL}/get_all_users?api_key=${process.env.API_KEY}&page=${page}`);
        const data = await response.json();
        //console.log(data);
        if(data.length > 0) {
            page += 1;
            page_total = page;
            for (let i = 0; i < 7; i++) {
                
                const [dbresp=null, meta] = await DBConnector.query(`SELECT * `+
                `FROM usuario `+
                `WHERE id_usuario = ${data[i].id}`);

                if(dbresp != null){
                    console.log("Hacer update");
                    console.log("user id", dbresp.id_usuario);
                    const dbupdate = await DBConnector.query(`UPDATE usuario SET `+
                    `id_usuario = '${data[i].id}',`+
                    `userid = '${data[i].userid != null ? data[i].userid.replace(/'/gi, "") : 'null'}',`+
                    `joined_at = '${moment(data[i].joined_at).format('YYYY-MM-DD HH:mm:ss')}',`+
                    `first_login_at = '${data[i].first_login_at != null ? moment(data[i].first_login_at).format('YYYY-MM-DD HH:mm:ss') : '0000-00-00 00:00:00'}',`+
                    `last_login_at = '${data[i].last_login_at != null ? moment(data[i].last_login_at).format('YYYY-MM-DD HH:mm:ss') : '0000-00-00 00:00:00'}',`+
                    `logins = ${data[i].logins},`+
                    `first_name = '${data[i].first_name != null ? data[i].first_name.replace(/'/gi, "") : 'null'}',`+
                    `last_name = '${data[i].last_name != null ? data[i].last_name.replace(/'/gi, "") : 'null'}',`+
                    `email = '${data[i].email != null ? data[i].email.replace(/'/gi, "") : 'null'}',`+
                    `phone = '${data[i].phone != null ? data[i].phone.replace(/'/gi, "") : 'null'}',`+
                    `teacher = ${data[i].teacher},`+
                    `student = ${data[i].student},`+
                    `assistant = ${data[i].assistant},`+
                    `administrator = ${data[i].administrator},`+
                    `monitor = ${data[i].monitor},`+
                    `student_id = '${data[i].student_id != null ? data[i].student_id.replace(/'/gi, "") : 'null'}',`+
                    `teacher_id = '${data[i].teacher_id != null ? data[i].teacher_id.replace(/'/gi, "") : 'null'}',`+
                    `birthdate = '${data[i].birthdate != null ? moment(data[i].birthdate.replace(/'/gi, "")).format('YYYY-MM-DD') : '0000-00-00'}',`+
                    `nick_name = '${data[i].nick_name != null ? data[i].nick_name.replace(/'/gi, "") : 'null'}',`+
                    `country = '${data[i].country != null ? data[i].country.replace(/'/gi, "") : 'null'}',`+
                    `archived = ${data[i].archived},`+
                    `gender = '${data[i].gender != null ? data[i].gender.replace(/'/gi, "") : 'null'}',`+
                    `organization_id = '${data[i].organization_id}',`+
                    `registro_ucb = '${data[i]["registro ucb"] != null ? data[i]["registro ucb"].replace(/'/gi, "") : 'null'}',`+
                    `departamento = '${data[i].departamento != null ? data[i].departamento.replace(/'/gi, "") : 'null'}',`+
                    `carrera = '${data[i].carrera != null ? data[i].carrera.replace(/'/gi, "") : 'null'}'`+
                    `WHERE id_usuario = ${data[i].id}`);
                    console.log("update ",dbupdate);    
                }else{
                    console.log("Hacer insert");
                    const resp = await DBConnector.query(`INSERT INTO usuario`+
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
                    console.log(resp);
                }

                
                lista.push(data[i]);
                //console.log(data[i]);
            }
        }else {
            page = 0;
        }

        /*do {  
            
            console.log("==========> ",page);
            console.log("condicion", page != 0);
        } while (page != 0);*/
    /*} catch (error) {
        console.log("========try Error=========");
        console.log(error);
        console.log("========try Error=========");
    }*/
    
    
    res.json({
        page: "total de paginas recorridas "+page_total,
        total_users: lista.length,
        users: lista
    })
})

//get_all_users
app.get('/get_all_users', async function(req,res) { 
    const page_init = req.query.page;  
    let page = parseInt(page_init) || 1;
    let cant_update= 0;
    let cant_insert= 0;
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
                    
                    const [dbresp=null, meta] = await DBConnector.query(`SELECT * `+
                    `FROM usuario `+
                    `WHERE id_usuario = ${data[i].id}`);

                    if(dbresp != null){
                        console.log("update");
                        const dbupdate = await DBConnector.query(`UPDATE usuario SET `+
                        `id_usuario = ${data[i].id},`+
                        `userid = '${data[i].userid != null ? data[i].userid.replace(/'/gi, "") : 'null'}',`+
                        `joined_at = '${moment(data[i].joined_at).format('YYYY-MM-DD HH:mm:ss')}',`+
                        `first_login_at = '${data[i].first_login_at != null ? moment(data[i].first_login_at).format('YYYY-MM-DD HH:mm:ss') : '0000-00-00 00:00:00'}',`+
                        `last_login_at = '${data[i].last_login_at != null ? moment(data[i].last_login_at).format('YYYY-MM-DD HH:mm:ss') : '0000-00-00 00:00:00'}',`+
                        `logins = ${data[i].logins},`+
                        `first_name = '${data[i].first_name != null ? data[i].first_name.replace(/'/gi, "") : 'null'}',`+
                        `last_name = '${data[i].last_name != null ? data[i].last_name.replace(/'/gi, "") : 'null'}',`+
                        `email = '${data[i].email != null ? data[i].email.replace(/'/gi, "") : 'null'}',`+
                        `phone = '${data[i].phone != null ? data[i].phone.replace(/'/gi, "") : 'null'}',`+
                        `teacher = ${data[i].teacher},`+
                        `student = ${data[i].student},`+
                        `assistant = ${data[i].assistant},`+
                        `administrator = ${data[i].administrator},`+
                        `monitor = ${data[i].monitor},`+
                        `student_id = '${data[i].student_id != null ? data[i].student_id.replace(/'/gi, "") : 'null'}',`+
                        `teacher_id = '${data[i].teacher_id != null ? data[i].teacher_id.replace(/'/gi, "") : 'null'}',`+
                        `birthdate = '${data[i].birthdate != null ? moment(data[i].birthdate.replace(/'/gi, "")).format('YYYY-MM-DD') : '0000-00-00'}',`+
                        `nick_name = '${data[i].nick_name != null ? data[i].nick_name.replace(/'/gi, "") : 'null'}',`+
                        `country = '${data[i].country != null ? data[i].country.replace(/'/gi, "") : 'null'}',`+
                        `archived = ${data[i].archived},`+
                        `gender = '${data[i].gender != null ? data[i].gender.replace(/'/gi, "") : 'null'}',`+
                        `organization_id = '${data[i].organization_id}',`+
                        `registro_ucb = '${data[i]["registro ucb"] != null ? data[i]["registro ucb"].replace(/'/gi, "") : 'null'}',`+
                        `departamento = '${data[i].departamento != null ? data[i].departamento.replace(/'/gi, "") : 'null'}',`+
                        `carrera = '${data[i].carrera != null ? data[i].carrera.replace(/'/gi, "") : 'null'}'`+
                        `WHERE id_usuario = ${data[i].id}`);
                        console.log("update ",dbupdate);  
                        cant_update++;
                    }else{
                        const resp = await DBConnector.query(`INSERT INTO usuario`+
                        `(id_usuario,userid,joined_at,first_login_at,last_login_at,logins,first_name,last_name,email,phone,teacher,student,assistant,administrator,monitor,student_id,teacher_id,birthdate,nick_name,country,archived,gender,organization_id,registro_ucb,departamento,carrera)`+
                        `VALUES(`+
                        `id_usuario = '${data[i].id}',`+
                        `userid = '${data[i].userid != null ? data[i].userid.replace(/'/gi, "") : 'null'}',`+
                        `joined_at = '${moment(data[i].joined_at).format('YYYY-MM-DD HH:mm:ss')}',`+
                        `first_login_at = '${data[i].first_login_at != null ? moment(data[i].first_login_at).format('YYYY-MM-DD HH:mm:ss') : '0000-00-00 00:00:00'}',`+
                        `last_login_at = '${data[i].last_login_at != null ? moment(data[i].last_login_at).format('YYYY-MM-DD HH:mm:ss') : '0000-00-00 00:00:00'}',`+
                        `logins = ${data[i].logins},`+
                        `first_name = '${data[i].first_name != null ? data[i].first_name.replace(/'/gi, "") : 'null'}',`+
                        `last_name = '${data[i].last_name != null ? data[i].last_name.replace(/'/gi, "") : 'null'}',`+
                        `email = '${data[i].email != null ? data[i].email.replace(/'/gi, "") : 'null'}',`+
                        `phone = '${data[i].phone != null ? data[i].phone.replace(/'/gi, "") : 'null'}',`+
                        `teacher = ${data[i].teacher},`+
                        `student = ${data[i].student},`+
                        `assistant = ${data[i].assistant},`+
                        `administrator = ${data[i].administrator},`+
                        `monitor = ${data[i].monitor},`+
                        `student_id = '${data[i].student_id != null ? data[i].student_id.replace(/'/gi, "") : 'null'}',`+
                        `teacher_id = '${data[i].teacher_id != null ? data[i].teacher_id.replace(/'/gi, "") : 'null'}',`+
                        `birthdate = '${data[i].birthdate != null ? moment(data[i].birthdate.replace(/'/gi, "")).format('YYYY-MM-DD') : '0000-00-00'}',`+
                        `nick_name = '${data[i].nick_name != null ? data[i].nick_name.replace(/'/gi, "") : 'null'}',`+
                        `country = '${data[i].country != null ? data[i].country.replace(/'/gi, "") : 'null'}',`+
                        `archived = ${data[i].archived},`+
                        `gender = '${data[i].gender != null ? data[i].gender.replace(/'/gi, "") : 'null'}',`+
                        `organization_id = '${data[i].organization_id}',`+
                        `registro_ucb = '${data[i]["registro ucb"] != null ? data[i]["registro ucb"].replace(/'/gi, "") : 'null'}',`+
                        `departamento = '${data[i].departamento != null ? data[i].departamento.replace(/'/gi, "") : 'null'}',`+
                        `carrera = '${data[i].carrera != null ? data[i].carrera.replace(/'/gi, "") : 'null'}'`
                        `WHERE id_usuario = ${data[i].id}>;`);
                        
                        cant_insert++;
                        console.log("insert", resp);
                    }

                    lista.push(data[i]);
                    //console.log(data[i]);
                }
            }else {
                page = 0;
            }
            console.log("Paginas ==========> ",page);
            console.log("condicion", page != 0);
        } while (page != 0);
    } catch (error) {
        console.log(error);
    }
    
    
    res.json({
        page_total,
        cant_insert,
        cant_update, 
        total_users: lista.length,
        users: lista
    })
})

//get_all_organizations
app.get('/get_all_organizations', async function(req, res) {
    const lista = [];
    let page = 1; 
    let cant_update= 0;
    let cant_insert= 0;
    let page_total = 0;
    const resp = null;
    
    do {  
        const response = await fetch(`${process.env.URL}/get_all_organizations?api_key=${process.env.API_KEY}&page=${page}`);
        const data = await response.json();
        if(data.length > 0) {
            page += 1;
            page_total = page;
            for (let i = 0; i < data.length; i++) {

                const [dbresp=null, meta] = await DBConnector.query(`SELECT * `+
                `FROM organizacion `+
                `WHERE id_organizacion = ${data[i].id}`);

                if(dbresp != null){
                    console.log("update");
                    await DBConnector.query(`UPDATE organizacion SET `+
                    `id_organizacion = '${data[i].id }',`+
                    `name = '${data[i].name }',`+
                    `description = '${data[i].description}',`+
                    `internal = ${data[i].internal } `+
                    `WHERE id_organizacion = ${data[i].id}`);
                    cant_update++;
                }else{
                    console.log("insert");
                    const resp = await DBConnector.query(`INSERT INTO organizacion`+
                    `(id_organizacion,`+
                    `name,`+
                    `description,`+
                    `internal)`+
                    `VALUES`+
                    `(${data[i].id },`+
                    `'${data[i].name }',`+
                    `'${data[i].description }',`+
                    `${data[i].internal });`);
                    cant_insert++;
                    console.log(resp);
                }

                lista.push(data[i]);
                //console.log(data[i]);
            }
        }else {
            page = 0;
        }
        console.log("Paginas ==========> ",page);
        console.log("condicion", page != 0);
    } while (page != 0);
    
    
    res.json({
        page_total,
        cant_insert,
        cant_update,
        total_organizacion: lista.length, 
        organization: lista,
    })  
})


//get_all_classes
app.get('/get_all_classes', async function(req,res) { 
    const page_init = req.query.page;  
    let page = parseInt(page_init) || 1;
    let cant_update= 0;
    let cant_insert= 0;
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

                    const [dbresp=null, meta] = await DBConnector.query(`SELECT * `+
                    `FROM asignatura `+
                    `WHERE id_asignatura = ${data[i].id}`);
                    
                    if(dbresp != null){
                        const dbupdate = await DBConnector.query(`UPDATE asignatura SET `+
                        `id_asignatura = ${data[i].id},`+
                        `name = '${data[i].name != null ? data[i].name.replace(/'/gi,"") : 'null'}',`+
                        `course_code = '${data[i].course_code != null ? data[i].course_code.replace(/'/gi,"") : 'null'}',`+
                        `description = '${data[i].description != null ? data[i].description.replace(/'/gi,"") : 'null'}',`+
                        `syllabus = \'${data[i].syllabus != null ? data[i].syllabus.replace(/'/gi,"") : 'null'}\',`+
                        `credits = ${data[i].credits || 0},`+
                        `display_in_catalog = ${data[i].display_in_catalog},`+
                        `catalog_category = '${data[i].catalog_category != null ? data[i].catalog_category.replace(/'/gi,"") : 'null'}',`+
                        `template = ${data[i].template},`+
                        `organization = '${data[i].organization != null ? data[i].organization.replace(/'/gi, "") : 'null'}',`+
                        `archived = ${data[i].archived},`+
                        `semester = '${data[i].semester != null ? data[i].semester.replace(/'/gi,"") : 'null'}',`+
                        `subject = '${data[i].subject != null ? data[i].subject.replace(/'/gi,"") : 'null'}',`+
                        `start = '${data[i].start != null ? moment(data[i].start.replace(/'/gi, "")).format('YYYY-MM-DD') : '0000-00-00'}',`+
                        `finish = '${data[i].finish != null ? moment(data[i].finish.replace(/'/gi, "")).format('YYYY-MM-DD') : '0000-00-00'}',`+
                        `price = ${data[i].price || 0} `+
                        `WHERE id_asignatura = ${data[i].id};`);
                        console.log("update ",dbupdate);  
                        cant_update++;
                    }else{
                        const resp = await DBConnector.query(`INSERT INTO asignatura(`+
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
                        cant_insert++;
                        console.log("insert", resp);
                    }

                    
                    lista.push(data[i]);
                    //console.log(data[i]);
                }
            }else {
                page = 0;
            }
            console.log("Paginas ==========> ",page);
            console.log("condicion", page != 0);
        } while (page != 0);
    } catch (error) {
        console.log(error);
    }
    
    
    res.json({
        page_total,
        cant_insert,
        cant_update,
        total_classes: lista.length,
        lessons: lista
    })
})


//get_lessons_for_class 
//todo ! revisar
app.get('/get_lessons_for_class', async function(req,res) {
    let cant_lessons_update = 0;
    let cant_lessons_insert = 0;
    let cant_section_update = 0;
    let cant_section_insert = 0;
    let cant_lessons = 0;
    //const dbasignatura = []; 
    try {

        const dbasignatura = await DBConnector.query("SELECT id_asignatura FROM asignatura");

        for (let i = 0; i < dbasignatura.length-1; i++) {
    
            const response = await fetch(`${process.env.URL}/get_lessons_for_class?api_key=${process.env.API_KEY}&class_id=${dbasignatura[i].id_asignatura}`);
            const data = await response.json();

            if(data.length > 0) {
                cant_lessons ++;
                const [dblesson=null, meta] = await DBConnector.query(`SELECT * `+
                    `FROM leccion `+
                    `WHERE id_leccion = ${data[i].id}`);

                if(dblesson != null){
                    //update
                    const dbupdate = await DBConnector.query(`UPDATE leccion SET `+
                    `id_leccion = ${data[i].id},`+
                    `id_asignatura = '${dbasignatura[i].id_asignatura}',`+
                    `name = '${data[i].name}',`+
                    `start_at = '${data[i].start_at != null ? moment(data[i].start.replace(/'/gi, "")).format('YYYY-MM-DD') : '0000-00-00'}',`+
                    `end_at = '${data[i].end_at != null ? moment(data[i].end_at.replace(/'/gi, "")).format('YYYY-MM-DD') : '0000-00-00'}',`+
                    `description = '${data[i].description}'`+
                    `WHERE id_leccion = ${data[i].id};`);

                    if(data[i].sections.length > 0) {
                        for (let j = 0; j < data[i].sections.length; j++) {
                            const [dbsection=null, meta] = await DBConnector.query(`SELECT * `+
                            `FROM seccion `+
                            `WHERE id_seccion = ${data[i].sections[j].id}`);

                            if(dbsection != null) {
                                //update
                                const dbupdatesection = await DBConnector.query(`UPDATE seccion SET `+
                                `id_seccion = ${data[i].sections[j].id},`+
                                `id_leccion = ${data[i].id},`+
                                `name = '${data[i].sections[j].name}',`+
                                `assignment_id = ${data[i].sections[j].assignment_id || ''},`+
                                `type = '${data[i].sections[j].type}'`+
                                `WHERE id_seccion = ${data[i].sections[j].id};`);
                                console.log("secction update ", dbupdatesection);
                                cant_section_update++;
                            }else {
                                //insert
                                const dbinsertsecction = await DBConnector.query(`INSERT INTO seccion(`+
                                `id_seccion,id_leccion,name,assignment_id,type)`+
                                `VALUES(`+
                                `${data[i].sections[j].id},`+
                                `${data[i].id},`+
                                `'${data[i].sections[j].name}',`+
                                `${data[i].sections[j].assignment_id || ''},`+
                                `'${data[i].sections[j].type}');`);
                                console.log("secction insert ", dbinsertsecction);
                                cant_section_insert++;
                            }

                        }

                    }

                    console.log("update ",dbupdate);  
                    cant_lessons_update++;
                }else{
                    //insert
                    const resp = await DBConnector.query(`INSERT INTO leccion`+
                    `(id_leccion,id_asignatura,name,start_at,end_at,description)`+
                    `VALUES (`+ 
                    `${data[i].id},`+
                    `'${dbasignatura[i].id_asignatura}',`+
                    `'${data[i].name}',`+
                    `'${data[i].start_at != null ? moment(data[i].start.replace(/'/gi, "")).format('YYYY-MM-DD') : '0000-00-00'}',`+
                    `'${data[i].end_at != null ? moment(data[i].end_at.replace(/'/gi, "")).format('YYYY-MM-DD') : '0000-00-00'}',`+
                    `'${data[i].description}');`);

                    if(data[i].sections.length > 0) {
                        //insert
                        for (let k = 0; k < array.length; k++) {
                            const dbinsertsecction = await DBConnector.query(`INSERT INTO seccion(`+
                            `id_seccion,id_leccion,name,assignment_id,type)`+
                            `VALUES(`+
                            `${data[i].sections[k].id},`+
                            `${data[i].id},`+
                            `'${data[i].sections.sections[k].name}',`+
                            `${data[i].sections.sections[k].assignment_id || ''},`+
                            `'${data[i].sections.sections[k].type}');`);
                            console.log("secction insert ", dbinsertsecction);
                            cant_section_insert++;
                        }

                    }

                    cant_lessons_insert++;
                    console.log("insert", resp);
                }

            }

        }

    } catch (error) {
        console.log(error);
    }
    
    
    res.json({
        cant_lessons_update,
        cant_lessons_insert,
        cant_section_update,
        cant_section_insert,
        cant_lessons
    })
})

//get_assignments_for_class
app.get('/get_assignments_for_class', async function(req,res) {

    let cant_insert_asignacion = 0;
    let cant_update_asignacion = 0;
    let cant_asignaturas = 0;
    
    try {

        const dbasignatura = await DBConnector.query("SELECT id_asignatura FROM asignatura");

        for (let i = 0; i < dbasignatura.length-1; i++) {
    
            const response = await fetch(`${process.env.URL}/get_assignments_for_class?api_key=${process.env.API_KEY}&class_id=${dbasignatura[i].id_asignatura}`);
            const data = await response.json();
            
            if(data.length > 0) {
                cant_asignaturas++;
                for (let j = 0; j < data.length; j++) {
                    
                    const [dbasignacion=null, meta] = await DBConnector.query(`SELECT * `+
                    `FROM asignacion `+
                    `WHERE id_asignacion = ${data[j].id}`);

                    if(dbasignacion != null) {
                        //update
                        const dbupdate = await DBConnector.query(`UPDATE asignacion SET `+
                        `id_asignacion = ${data[j].id},`+
                        `name = \'${data[j].name.replace(/'/gi, "")}\',`+
                        `type = \'${data[j].type}\',`+
                        `points = ${data[j].points || 0},`+
                        `weight = ${data[j].weight || 0},`+
                        `category = \'${data[j].category}\',`+
                        `grading = \'${data[j].grading}\',`+
                        `gateway = ${data[j].gateway},`+
                        `lesson = \'${data[j].lesson != null ? data[j].lesson : ""}\',`+
                        `begin = '${data[j].begin != null ? moment(data[j].begin.replace(/'/gi, "")).format('YYYY-MM-DD HH:mm:ss') : '0000-00-00 00:00:00'}',`+
                        `end = '${data[j].end != null ? data[j].end === "-" ? '0000-00-00 00:00:00' : moment(data[j].end.replace(/'/gi, "")).format('YYYY-MM-DD HH:mm:ss') : '0000-00-00 00:00:00'}',`+
                        `given = ${data[j].given != undefined ? data[j].given : true},`+
                        `id_asignatura = ${dbasignatura[i].id_asignatura} `+
                        `WHERE id_asignacion = ${data[j].id};`);
                        console.log("asignatura", dbasignatura[i].id_asignatura);
                        console.log("update", dbupdate);
                        cant_update_asignacion++;
                    }else {
                        //insert
                        const dbinsert = await DBConnector.query(`INSERT INTO asignacion`+
                        `(id_asignacion,name,type,points,weight,category,grading,gateway,lesson,begin,end,given,id_asignatura)`+
                        `VALUES(`+
                        `${data[j].id},`+
                        `\'${data[j].name.replace(/'/gi, "")}\',`+
                        `\'${data[j].type}\',`+
                        `${data[j].points || 0},`+
                        `${data[j].weight || 0},`+
                        `\'${data[j].category}\',`+
                        `\'${data[j].grading}\',`+
                        `${data[j].gateway},`+
                        `\'${data[j].lesson != null ? data[j].lesson : ""}\',`+
                        `'${data[j].begin != null ? moment(data[j].begin.replace(/'/gi, "")).format('YYYY-MM-DD HH:mm:ss') : '0000-00-00 00:00:00'}',`+
                        `'${data[j].end != null ? data[j].end === "-" ? '0000-00-00 00:00:00' : moment(data[j].end.replace(/'/gi, "")).format('YYYY-MM-DD HH:mm:ss') : '0000-00-00 00:00:00'}',`+
                        `${data[j].given != undefined ? data[j].given : true},`+
                        `${dbasignatura[i].id_asignatura});`
                        );
                        console.log("asignatura", dbasignatura[i].id_asignatura);
                        console.log("insert", dbinsert);
                        cant_insert_asignacion++;
                    }

    
                }
            }


        }

    } catch (error) {
        console.log(error);
    }
    
    
    res.json({
        cant_insert_asignacion,
        cant_update_asignacion,
        cant_asignaturas
    })
})


app.get('/get_assignments_for_class2', async function(req,res) {

    let cant_insert_asignacion = 0;
    let cant_update_asignacion = 0;
    let cant_asignaturas = 0;
    
    try {

        const dbasignatura = await DBConnector.query("SELECT id_asignatura FROM asignatura");

        for (let i = 0; i < dbasignatura.length-1; i++) {
    
            const response = await fetch(`${process.env.URL}/get_assignments_for_class?api_key=${process.env.API_KEY}&class_id=${dbasignatura[i].id_asignatura}`);
            const data = await response.json();
            
            if(data.length > 0) {
                cant_asignaturas++;
                for (let j = 0; j < data.length; j++) {
                    
                    const [dbasignacion=null, meta] = await DBConnector.query(`SELECT * `+
                    `FROM asignacion `+
                    `WHERE id_asignacion = ${data[j].id}`);

                    if(dbasignacion != null) {
                        //update
                        const dbupdate = await DBConnector.query(`UPDATE asignacion SET `+
                        `id_asignacion = ${data[j].id},`+
                        `name = \'${data[j].name.replace(/'/gi, "")}\',`+
                        `type = \'${data[j].type}\',`+
                        `points = ${data[j].points || 0},`+
                        `weight = ${data[j].weight || 0},`+
                        `category = \'${data[j].category}\',`+
                        `grading = \'${data[j].grading}\',`+
                        `gateway = ${data[j].gateway},`+
                        `lesson = \'${data[j].lesson != null ? data[j].lesson : ""}\',`+
                        `begin = '${data[j].begin != null ? moment(data[j].begin.replace(/'/gi, "")).format('YYYY-MM-DD HH:mm:ss') : '0000-00-00 00:00:00'}',`+
                        `end = '${data[j].end != null ? data[j].end === "-" ? '0000-00-00 00:00:00' : moment(data[j].end.replace(/'/gi, "")).format('YYYY-MM-DD HH:mm:ss') : '0000-00-00 00:00:00'}',`+
                        `given = ${data[j].given != undefined ? data[j].given : true},`+
                        `id_asignatura = ${dbasignatura[i].id_asignatura} `+
                        `WHERE id_asignacion = ${data[j].id};`);
                        console.log("asignatura", dbasignatura[i].id_asignatura);
                        console.log("update", dbupdate);
                        cant_update_asignacion++;
                    }else {
                        //insert
                        const dbinsert = await DBConnector.query(`INSERT INTO asignacion`+
                        `(id_asignacion,name,type,points,weight,category,grading,gateway,lesson,begin,end,given,id_asignatura)`+
                        `VALUES(`+
                        `${data[j].id},`+
                        `\'${data[j].name.replace(/'/gi, "")}\',`+
                        `\'${data[j].type}\',`+
                        `${data[j].points || 0},`+
                        `${data[j].weight || 0},`+
                        `\'${data[j].category}\',`+
                        `\'${data[j].grading}\',`+
                        `${data[j].gateway},`+
                        `\'${data[j].lesson != null ? data[j].lesson : ""}\',`+
                        `'${data[j].begin != null ? moment(data[j].begin.replace(/'/gi, "")).format('YYYY-MM-DD HH:mm:ss') : '0000-00-00 00:00:00'}',`+
                        `'${data[j].end != null ? data[j].end === "-" ? '0000-00-00 00:00:00' : moment(data[j].end.replace(/'/gi, "")).format('YYYY-MM-DD HH:mm:ss') : '0000-00-00 00:00:00'}',`+
                        `${data[j].given != undefined ? data[j].given : true},`+
                        `${dbasignatura[i].id_asignatura});`
                        );
                        console.log("asignatura", dbasignatura[i].id_asignatura);
                        console.log("insert", dbinsert);
                        cant_insert_asignacion++;
                    }

    
                }
            }


        }

    } catch (error) {
        console.log(error);
    }
    
    
    res.json({
        cant_insert_asignacion,
        cant_update_asignacion,
        cant_asignaturas
    })
})



module.exports = app;
