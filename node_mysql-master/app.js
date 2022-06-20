const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());

// MySql
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'jytcomercializadora'
});

// Route
app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

/*************************************************************************************************
**************************************************************************************************
**************************************************************************************************
MODULO CLIENTES
**************************************************************************************************
**************************************************************************************************
**************************************************************************************************/
//TABLA DEPARTAMENTO
//SELECT DE TODOS LOS DATOS DE LA TABLA DEPARTAMENTO
app.get('/departamento', (req, res) => {
  const query= `CALL mc_sel_todo_departamento;`

  connection.query(query, (err, 
      rows, fields) => {
      if (!err) {
          res.json(rows[0]);
      } else {
          console.log(err);
      }
  });
});

//SELECT DE LA TABLA DEPARTAMENTO
app.get('/departamento/:departamento_id', (req, res) => {
  const { departamento_id } = req.params;
  const query= 'CALL mc_sel_departamento (?);'

  connection.query(query, [departamento_id], (err, 
      rows, fields) => {
      if (!err) {
          res.json(rows[0]);
      } else {
          console.log(err);
      }
  });
});

//TABLA MUNICIPIO
//SELECT DE TODOS LOS DATOS DE LA TABLA MUNICIPIO
app.get('/municipio', (req, res) => {
  const query= 'CALL mc_sel_todo_municipio;'

  connection.query(query, (err, 
      rows, fields) => {
      if (!err) {
          res.json(rows[0]);
      } else {
          console.log(err);
      }
  });
});

//SELECT DE LA TABLA MUNICIPIO
app.get('/municipio/:municipio_id', (req, res) => {
  const { municipio_id } = req.params;
  const query= 'CALL mc_sel_municipio (?);'

  connection.query(query, [municipio_id], (err, 
      rows, fields) => {
      if (!err) {
          res.json(rows[0]);
      } else {
          console.log(err);
      }
  });
});

//TABLA DIRECCION CLIENTE
//SELECT DE TODOS LOS DATOS DE LA TABLA DIRECCION CLIENTE
app.get('/direccion_cliente', (req, res) => {
  const query= 'CALL mc_sel_todo_direccion_cliente;'

  connection.query(query, (err, 
      rows, fields) => {
      if (!err) {
          res.json(rows[0]);
      } else {
          console.log(err);
      }
  });
});

//SELECT DE LA TABLA DIRECCION CLIENTE
app.get('/direccion_cliente/:cod_direccion', (req, res) => {
  const { cod_direccion } = req.params;
  const query='CALL mc_sel_direccion_cliente (?);'

  connection.query(query, [cod_direccion], (err, 
      rows, fields) => {
      if (!err) {
          res.json(rows[0]);
      } else {
          console.log(err);
      }
  });
});

//DELETE TABLA DIRECCION CLIENTE
app.delete('/direccion_cliente/eliminar/:cod_direccion',(req,res)=>{
  const {cod_direccion}=req.params;
  const query= 'CALL mc_del_direccion_cliente (?);'

  connection.query(query,[cod_direccion],(err,
      rows,fields)=>{
          if(!err){
              res.json({status:'Registro eliminado'});
          }else{
              console.log(err);
          }
      });
});

//INSERT TABLA DIRECCION CLIENTE
app.post('/direccion_cliente/insertar',(req,res)=>{
  const{cod_direccion,cliente_nombre,direccion,ciudad,departamento_id,municipio_id} =req.body;
  const query= 'CALL mc_ins_direccion_cliente (?,?,?,?,?,?);'

  connection.query(query,[cod_direccion,cliente_nombre,direccion,ciudad,departamento_id,municipio_id],(err,rows,fields)=>{
if (!err){
  res.json({status: 'Registro guardado'});
}else{
  console.log(err);
}
  });
});

//UPDATE TABLA DIRECCION CLIENTE
app.put('/direccion_cliente/actualizar/:cod_direccion', (req, res) => {
  const {cod_direccion}=req.params;
  const{cliente_nombre,direccion,ciudad,departamento_id,municipio_id} = req.body;
  const query ="CALL mc_upd_direccion_cliente (?,?,?,?,?,?);"
 
  connection.query(query,[cod_direccion,cliente_nombre,direccion,ciudad,departamento_id,municipio_id], (err, rows, fields) => {
      if (!err) {
          res.json({status: 'Registro actualizado'});
      } else {
          console.log(err);
      }
  });
});

//TABLA CLIENTE
//SELECT DE TODOS LOS DATOS DE LA TABLA CLIENTE
app.get('/cliente', (req, res) => {
  const query= 'CALL mc_sel_todo_cliente;'

  connection.query(query, (err, 
      rows, fields) => {
      if (!err) {
          res.json(rows[0]);
      } else {
          console.log(err);
      }
  });
});

//SELECT DE LA TABLA CLIENTE
app.get('/cliente/:cod_cliente', (req, res) => {
  const { cod_cliente } = req.params;
  const query='CALL mc_sel_cliente (?);'

  connection.query(query, [cod_cliente], (err, 
      rows, fields) => {
      if (!err) {
          res.json(rows[0]);
      } else {
          console.log(err);
      }
  });
});

//DELETE TABLA CLIENTE
app.delete('/cliente/eliminar/:cod_cliente',(req,res)=>{
  const {cod_cliente}=req.params;
  const query= 'CALL mc_del_cliente (?);'

  connection.query(query,[cod_cliente],(err,
      rows,fields)=>{
          if(!err){
              res.json({status:'Registro eliminado'});
          }else{
              console.log(err);
          }
      });
});

//INSERT TABLA CLIENTE
app.post('/cliente/insertar',(req,res)=>{
  const{cod_cliente,cliente_nombre,cliente_apellido,cliente_dni,compañia_nombre,compania_rtn,cliente_fecha} =req.body;
  const query= 'CALL mc_ins_cliente (?,?,?,?,?,?,?);'

  connection.query(query,[cod_cliente,cliente_nombre,cliente_apellido,cliente_dni,compañia_nombre,compania_rtn,cliente_fecha],(err,rows,fields)=>{
if (!err){
  res.json({status: 'Registro guardado'});
}else{
  console.log(err);
}
  });
});

//UPDATE TABLA CLIENTE
app.put('/cliente/actualizar/:cod_cliente',(req,res)=>{
  const {cod_cliente}=req.params;
  const{cliente_nombre,cliente_apellido,cliente_dni,compañia_nombre,compania_rtn,cliente_fecha} =req.body;
  const query= 'CALL mc_upd_cliente (?,?,?,?,?,?,?);'

  connection.query(query,[cod_cliente,cliente_nombre,cliente_apellido,cliente_dni,compañia_nombre,compania_rtn,cliente_fecha],(err,rows,fields)=>{
if (!err){
  res.json({status: 'Registro guardado'});
}else{
  console.log(err);
}
  });
});

//TABLA COMPAÑIA
//SELECT DE TODOS LOS DATOS DE LA TABLA COMPAÑIA
app.get('/compania', (req, res) => {
  const query= 'CALL mc_sel_todo_compañia;'

  connection.query(query, (err, 
      rows, fields) => {
      if (!err) {
          res.json(rows[0]);
      } else {
          console.log(err);
      }
  });
});

//SELECT DE LA TABLA COMPAÑIA
app.get('/compania/:cod_compania', (req, res) => {
  const { cod_compania } = req.params;
  const query='CALL mc_sel_compañia (?);'

  connection.query(query, [cod_compania], (err, 
      rows, fields) => {
      if (!err) {
          res.json(rows[0]);
      } else {
          console.log(err);
      }
  });
});

//DELETE TABLA COMPAÑIA
app.delete('/compania/eliminar/:cod_compania',(req,res)=>{
  const {cod_compania}=req.params;
  const query= 'CALL mc_del_compañia (?);'

  connection.query(query,[cod_compania],(err,
      rows,fields)=>{
          if(!err){
              res.json({status:'Registro eliminado'});
          }else{
              console.log(err);
          }
      });
});

//INSERT TABLA COMPAÑIA
app.post('/compania/insertar',(req,res)=>{
  const{cod_compania,compania_rtn,compañia_cai,compañia_legal_nom,compañia_comercial_nom,compañia_facebook,compañia_instagram} =req.body;
  const query= 'CALL mc_ins_compañia (?,?,?,?,?,?,?);'

  connection.query(query,[cod_compania,compania_rtn,compañia_cai,compañia_legal_nom,compañia_comercial_nom,compañia_facebook,compañia_instagram],(err,rows,fields)=>{
if (!err){
  res.json({status: 'Registro guardado'});
}else{
  console.log(err);
}
  });
});

//UPDATE TABLA COMPAÑIA
app.put('/compania/actualizar/:cod_compania',(req,res)=>{
  const {cod_compania}=req.params;
  const{compania_rtn,compañia_cai,compañia_legal_nom,compañia_comercial_nom,compañia_facebook,compañia_instagram} =req.body;
  const query= "CALL mc_upd_compañia (?,?,?,?,?,?,?);"

  connection.query(query,[cod_compania,compania_rtn,compañia_cai,compañia_legal_nom,compañia_comercial_nom,compañia_facebook,compañia_instagram],(err,rows,fields)=>{
if (!err){
  res.json({status: 'Registro guardado'});
}else{
  console.log(err);
}
  });
});


//TABLA COMPAÑIA OFICINA
//SELECT DE TODOS LOS DATOS DE LA TABLA COMPAÑIA OFICINA
app.get('/compania_oficina', (req, res) => {
  const query= 'CALL mc_sel_todo_compañia_oficina;'

  connection.query(query, (err, 
      rows, fields) => {
      if (!err) {
          res.json(rows[0]);
      } else {
          console.log(err);
      }
  });
});

//SELECT DE LA TABLA COMPAÑIA OFICINA
app.get('/compania_oficina/:cod_oficina', (req, res) => {
  const { cod_oficina } = req.params;
  const query='CALL mc_sel_compañia_oficina (?);'

  connection.query(query, [cod_oficina], (err, 
      rows, fields) => {
      if (!err) {
          res.json(rows[0]);
      } else {
          console.log(err);
      }
  });
});

//DELETE TABLA COMPAÑIA OFICINA
app.delete('/compania_oficina/eliminar/:cod_oficina',(req,res)=>{
  const {cod_oficina}=req.params;
  const query= 'CALL mc_del_compañia_oficina (?);'

  connection.query(query,[cod_oficina],(err,
      rows,fields)=>{
          if(!err){
              res.json({status:'Registro eliminado'});
          }else{
              console.log(err);
          }
      });
});

//INSERT TABLA COMPAÑIA OFICINA
app.post('/compania_oficina/insertar',(req,res)=>{
  const{cod_oficina,compania_rtn,oficina_nombre,oficina_direccion,departamento_id,municipio_id,oficina_telefono_1,oficina_telefono_2} =req.body;
  const query= 'CALL mc_ins_compañia_oficina (?,?,?,?,?,?,?,?);'

  connection.query(query,[cod_oficina,compania_rtn,oficina_nombre,oficina_direccion,departamento_id,municipio_id,oficina_telefono_1,oficina_telefono_2],(err,rows,fields)=>{
if (!err){
  res.json({status: 'Registro guardado'});
}else{
  console.log(err);
}
  });
});

//UPDATE TABLA COMPAÑIA
app.put('/compania_oficina/actualizar/:cod_oficina',(req,res)=>{
  const {cod_oficina}=req.params;
  const{compania_rtn,oficina_nombre,oficina_direccion,departamento_id,municipio_id,oficina_telefono_1,oficina_telefono_2} =req.body;
  const query= "CALL mc_upd_compañia_oficina (?,?,?,?,?,?,?,?);"

  connection.query(query,[cod_oficina,compania_rtn,oficina_nombre,oficina_direccion,departamento_id,municipio_id,oficina_telefono_1,oficina_telefono_2],(err,rows,fields)=>{
if (!err){
  res.json({status: 'Registro guardado'});
}else{
  console.log(err);
}
  });
});

/*************************************************************************************************
**************************************************************************************************
**************************************************************************************************
MODULO EMPLEADOS
**************************************************************************************************
**************************************************************************************************
**************************************************************************************************/
//TABLA TIPO DE OPERACION
//SELECT DE TODOS LOS DATOS DE LA TABLA TIPO DE OPERACION
app.get('/tipo_operacion', (req, res) => {
  const query='CALL me_sel_todo_tipo_operacion;'

  connection.query(query, (err, 
      rows, fields) => {
      if (!err) {
          res.json(rows[0]);
      } else {
          console.log(err);
      }
  });
});

//SELECT DE LA TABLA TIPO DE OPERACION
app.get('/tipo_operacion/:cod_tipo_operacion', (req, res) => {
  const { cod_tipo_operacion } = req.params;
  const query= 'CALL me_sel_tipo_operacion (?);'

  connection.query(query, [cod_tipo_operacion], (err, 
      rows, fields) => {
      if (!err) {
          res.json(rows[0]);
      } else {
          console.log(err);
      }
  });
});

//DELETE TABLA TIPO DE OPERACION
app.delete('/tipo_operacion/eliminar/:cod_tipo_operacion',(req,res)=>{
  const {cod_tipo_operacion}=req.params;
  const query= 'CALL me_del_tipo_operacion (?);'

  connection.query(query,[cod_tipo_operacion],(err,
      rows,fields)=>{
          if(!err){
              res.json({status:'Registro eliminado'});
          }else{
              console.log(err);
          }
      });
});

//INSERT TABLA TIPO DE OPERACION
app.post('/tipo_operacion/insertar',(req,res)=>{
  const{cod_tipo_operacion,nombre_operacion} =req.body;
  const query= 'CALL me_ins_tipo_operacion (?,?);'

  connection.query(query,[cod_tipo_operacion,nombre_operacion],(err,rows,fields)=>{
if (!err){
  res.json({status: 'Registro guardado'});
}else{
  console.log(err);
}
  });
});

//UPDATE TABLA TIPO DE OPERACION
app.put('/tipo_operacion/actualizar/:cod_tipo_operacion', (req, res) => {
  const {cod_tipo_operacion}=req.params;
  const{nombre_operacion} = req.body;
  const query ="CALL me_upd_tipo_operacion(?,?);"
 
  connection.query(query,[cod_tipo_operacion,nombre_operacion], (err, rows, fields) => {
      if (!err) {
          res.json({status: 'Registro actualizado'});
      } else {
          console.log(err);
      }
  });
});

//TABLA REGISTRO OPERACION
//SELECT DE TODOS LOS DATOS DE LA TABLA REGISTRO OPERACION 
app.get('/registro_operacion', (req, res) => {
  const query='CALL me_sel_todo_registro_operacion;'

  connection.query(query, (err, 
      rows, fields) => {
      if (!err) {
          res.json(rows[0]);
      } else {
          console.log(err);
      }
  });
});

//SELECT DE LA TABLA REGISTRO OPERACION
app.get('/registro_operacion/:cod_operacion', (req, res) => {
  const { cod_operacion } = req.params;
  const query= 'CALL me_sel_registro_operacion (?);'

  connection.query(query, [cod_operacion], (err, 
      rows, fields) => {
      if (!err) {
          res.json(rows[0]);
      } else {
          console.log(err);
      }
  });
});

//DELETE TABLA REGISTRO OPERACION
app.delete('/registro_operacion/eliminar/:cod_operacion',(req,res)=>{
  const {cod_operacion}=req.params;
  const query= 'CALL me_del_registro_operacion (?);'

  connection.query(query,[cod_operacion],(err,
      rows,fields)=>{
          if(!err){
              res.json({status:'Registro eliminado'});
          }else{
              console.log(err);
          }
      });
});

//INSERT TABLA REGISTRO OPERACION
app.post('/registroperacion/insertar',(req,res)=>{
  const{cod_operacion,nom_user,evento,Tabla,fecha_operacion} =req.body;
  const query= 'CALL me_ins_registro_operacion (?,?,?,?,?);'

  connection.query(query,[cod_operacion,nom_user,evento,Tabla,fecha_operacion],(err,rows,fields)=>{
if (!err){
  res.json({status: 'Registro guardado'});
}else{
  console.log(err);
}
  });
});

//TABLA PAGO SALARIO
//SELECT DE TODOS LOS DATOS DE LA TABLA PAGO SALARIO
app.get('/pago_salario', (req, res) => {
  const query='CALL me_sel_todo_pago_salario;'

  connection.query(query, (err, 
      rows, fields) => {
      if (!err) {
          res.json(rows[0]);
      } else {
          console.log(err);
      }
  });
});

//SELECT DE LA TABLA PAGO SALARIO
app.get('/pago_salario/:cod_pago', (req, res) => {
  const { cod_pago } = req.params;
  const query= 'CALL me_sel_pago_salario (?);'

  connection.query(query, [cod_pago], (err, 
      rows, fields) => {
      if (!err) {
          res.json(rows[0]);
      } else {
          console.log(err);
      }
  });
});

//DELETE TABLA PAGO SALARIO
app.delete('/pago_salario/eliminar/:cod_pago',(req,res)=>{
  const {cod_pago}=req.params;
  const query= 'CALL me_del_pago_salario (?);'

  connection.query(query,[cod_pago],(err,
      rows,fields)=>{
          if(!err){
              res.json({status:'Registro eliminado'});
          }else{
              console.log(err);
          }
      });
});

//INSERT TABLA PAGO SALARIO
app.post('/pago_salario/insertar',(req,res)=>{
  const{cod_pago,name,sueldo_bruto,IHSS,RAP,otras_deducciones,vacaciones,descripcion_vacaciones,salario} =req.body;
  const query='CALL me_ins_pago_salario (?,?,?,?,?,?,?,?,?);'

  connection.query(query,[cod_pago,name,sueldo_bruto,IHSS,RAP,otras_deducciones,vacaciones,descripcion_vacaciones,salario],(err,rows,fields)=>{
if (!err){
  res.json({status: 'Registro guardado'});
}else{
  console.log(err);
}
  });
});

//UPDATE TABLA PAGO SALARIO
app.put('/pago_salario/actualizar/:cod_pago', (req, res) => {
  const {cod_pago}=req.params;
  const{name,sueldo_bruto,IHSS,RAP,otras_deducciones,vacaciones,descripcion_vacaciones,salario} = req.body;
  const query ="CALL me_upd_pago_salario (?,?,?,?,?,?,?,?,?);"
 
  connection.query(query,[cod_pago,name,sueldo_bruto,IHSS,RAP,otras_deducciones,vacaciones,descripcion_vacaciones,salario], (err, rows, fields) => {
      if (!err) {
          res.json({status: 'Registro actualizado'});
      } else {
          console.log(err);
      }
  });
});

// TABLA USERS
//SELECT DE TODOS LOS DATOS DE LA TABLA USERS
app.get('/users', (req, res) => {
  const query='CALL me_sel_todo_users;'

  connection.query(query, (err, 
      rows, fields) => {
      if (!err) {
          res.json(rows[0]);
      } else {
          console.log(err);
      }
  });
});

//SELECT DE LA TABLA USERS
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const query= 'CALL me_sel_users (?);'

  connection.query(query, [id], (err, 
      rows, fields) => {
      if (!err) {
          res.json(rows[0]);
      } else {
          console.log(err);
      }
  });
});

//DELETE TABLA USERS
app.delete('/users/eliminar/:id',(req,res)=>{
  const {id}=req.params;
  const query= 'CALL me_del_users (?);'

  connection.query(query,[id],(err,
      rows,fields)=>{
          if(!err){
              res.json({status:'Registro eliminado'});
          }else{
              console.log(err);
          }
      });
});

//UPDATE TABLA USERS
app.put('/users/actualizar/:id', (req, res) => {
  const {id}=req.params;
  const{name,email,password} = req.body;
  const query ="CALL me_upd_users (?,?,?,?);"
 
  connection.query(query,[id,name,email,password], (err, rows, fields) => {
      if (!err) {
          res.json({status: 'Registro actualizado'});
      } else {
          console.log(err);
      }
  });
});

//DELETE TABLA ROLES
app.delete('/roles/eliminar/:id',(req,res)=>{
  const {id}=req.params;
  const query= 'CALL me_del_roles (?);'

  connection.query(query,[id],(err,
      rows,fields)=>{
          if(!err){
              res.json({status:'Registro eliminado'});
          }else{
              console.log(err);
          }
      });
});

//TABLA CORREO
//SELECT DE TODOS LOS DATOS DE LA TABLA CORREO
app.get('/correo', (req, res) => {
  const query= 'CALL mp_sel_todo_correos;'

  connection.query(query, (err, 
      rows, fields) => {
      if (!err) {
          res.json(rows[0]);
      } else {
          console.log(err);
      }
  });
});

//SELECT DE LA TABLA CORREO
app.get('/correo/:cod_correo', (req, res) => {
  const { cod_correo } = req.params;
  const query='CALL mp_sel_correos (?);'

  connection.query(query, [cod_correo], (err, 
      rows, fields) => {
      if (!err) {
          res.json(rows[0]);
      } else {
          console.log(err);
      }
  });
});

//DELETE TABLA CORREO
app.delete('/correo/eliminar/:cod_correo',(req,res)=>{
  const {cod_correo}=req.params;
  const query= 'CALL mp_del_correos (?);'

  connection.query(query,[cod_correo],(err,
      rows,fields)=>{
          if(!err){
              res.json({status:'Registro eliminado'});
          }else{
              console.log(err);
          }
      });
});

//INSERT TABLA CORREO
app.post('/correo/insertar',(req,res)=>{
  const{cod_correo,correo,name,fec_registro} =req.body;
  const query= 'CALL mp_ins_correos (?,?,?,?);'

  connection.query(query,[cod_correo,correo,name,fec_registro],(err,rows,fields)=>{
if (!err){
  res.json({status: 'Registro guardado'});
}else{
  console.log(err);
}
  });
});

//UPDATE TABLA CORREO
app.put('/correo/actualizar/:cod_correo',(req,res)=>{
  const {cod_correo}=req.params;
  const{correo,name,fec_registro} =req.body;
  const query= 'CALL mp_upd_correos (?,?,?);'  

  connection.query(query,[cod_correo,correo,name,fec_registro],(err,rows,fields)=>{
if (!err){
  res.json({status: 'Registro guardado'});
}else{
  console.log(err);
}
  });
});

//TABLA TELEFONO
//SELECT DE TODOS LOS DATOS DE LA TABLA TELEFONO
app.get('/telefono', (req, res) => {
  const query= 'CALL mp_sel_todo_telefonos;'

  connection.query(query, (err, 
      rows, fields) => {
      if (!err) {
          res.json(rows[0]);
      } else {
          console.log(err);
      }
  });
});

//SELECT DE LA TABLA TELEFONO
app.get('/telefono/:cod_telefono', (req, res) => {
  const { cod_telefono } = req.params;
  const query='CALL mp_sel_telefonos (?);'

  connection.query(query, [cod_telefono], (err, 
      rows, fields) => {
      if (!err) {
          res.json(rows[0]);
      } else {
          console.log(err);
      }
  });
});

//DELETE TABLA TELEFONO
app.delete('/telefono/eliminar/:cod_telefono',(req,res)=>{
  const {cod_telefono}=req.params;
  const query= 'CALL mp_del_telefonos (?);'

  connection.query(query,[cod_telefono],(err,
      rows,fields)=>{
          if(!err){
              res.json({status:'Registro eliminado'});
          }else{
              console.log(err);
          }
      });
});

//INSERT TABLA TELEFONO
app.post('/telefono/insertar',(req,res)=>{
  const{cod_telefono,tip_telefono,telefono,name,fec_registro} =req.body;
  const query= 'CALL mp_ins_telefonos (?,?,?,?,?);'

  connection.query(query,[cod_telefono,tip_telefono,telefono,name,fec_registro],(err,rows,fields)=>{
if (!err){
  res.json({status: 'Registro guardado'});
}else{
  console.log(err);
}
  });
});

//UPDATE TABLA TELEFONO
app.put('/telefono/actualizar/:cod_telefono',(req,res)=>{
  const {cod_telefono}=req.params;
  const{tip_telefono,telefono,name,fec_registro} =req.body;
  const query= 'CALL mp_upd_telefonos (?,?,?,?);'  

  connection.query(query,[cod_telefono,tip_telefono,telefono,name,fec_registro],(err,rows,fields)=>{
if (!err){
  res.json({status: 'Registro guardado'});
}else{
  console.log(err);
}
  });
});

/*************************************************************************************************
**************************************************************************************************
**************************************************************************************************
MODULO VENTAS
**************************************************************************************************
**************************************************************************************************
**************************************************************************************************/
//TABLA VENTAS
//SELECT DE TODOS LOS DATOS DE LA TABLA VENTA
app.get('/ventas', (req, res) => {
  const query= `CALL mv_sel_todo_ventas;`

  connection.query(query, (err, 
      rows, fields) => {
      if (!err) {
          res.json(rows[0]);
      } else {
          console.log(err);
      }
  });
});

//SELECT DE LA TABLA VENTA
app.get('/ventas/:cod_venta', (req, res) => {
  const { cod_venta } = req.params;
  const query= 'CALL mv_sel_ventas (?);'

  connection.query(query, [cod_venta], (err, 
      rows, fields) => {
      if (!err) {
          res.json(rows[0]);
      } else {
          console.log(err);
      }
  });
});

//DELETE TABLA VENTAS
app.delete('/ventas/eliminar/:cod_venta',(req,res)=>{
  const {cod_venta}=req.params;
  const query= 'CALL mv_del_ventas (?);'

  connection.query(query,[cod_venta],(err,
      rows,fields)=>{
          if(!err){
              res.json({status:'Registro eliminado'});
          }else{
              console.log(err);
          }
      });
});

//INSERT TABLA VENTA
app.post('/ventas/insertar',(req,res)=>{
  const{cod_venta,name,cliente_nombre,fecha_creacion} =req.body;
  const query= 'CALL mv_ins_ventas (?,?,?,?);'

  connection.query(query,[cod_venta,name,cliente_nombre,fecha_creacion],(err,rows,fields)=>{
if (!err){
  res.json({status: 'Registro guardado'});
}else{
  console.log(err);
}
  });
});

//UPDATE TABLA VENTAS
app.put('/ventas/actualizar/:cod_venta', (req, res) => {
  const {cod_venta}=req.params;
  const{name,cliente_nombre} = req.body;
  const query ='CALL mv_upd_ventas(?,?,?);'
 
  connection.query(query,[cod_venta,name,cliente_nombre], (err, rows, fields) => {
      if (!err) {
          res.json({status: 'Registro actualizado'});
      } else {
          console.log(err);
      }
  });
});

//TABLA DETALLE VENTA
//SELECT DE TODOS LOS DATOS DE LA TABLA DETALLE VENTA
app.get('/detalle_venta', (req, res) => {
  const query= 'CALL mv_sel_todo_detalle_ventas;'

  connection.query(query, (err, 
      rows, fields) => {
      if (!err) {
          res.json(rows[0]);
      } else {
          console.log(err);
      }
  });
});

//SELECT DE LA TABLA DETALLE VENTA
app.get('/detalle_venta/:cod_detalle_venta', (req, res) => {
  const { cod_detalle_venta } = req.params;
  const query= 'CALL mv_sel_detalle_venta (?);'

  connection.query(query, [cod_detalle_venta], (err, 
      rows, fields) => {
      if (!err) {
          res.json(rows[0]);
      } else {
          console.log(err);
      }
  });
});

//DELETE TABLA DETALLE VENTA
app.delete('/detalle_venta/eliminar/:cod_detalle_venta',(req,res)=>{
  const {cod_detalle_venta}=req.params;
  const query= 'CALL mv_del_detalle_ventas (?);'

  connection.query(query,[cod_detalle_venta],(err,
      rows,fields)=>{
          if(!err){
              res.json({status:'Registro eliminado'});
          }else{
              console.log(err);
          }
      });
});

//INSERT TABLA DETALLE VENTA
app.post('/detalle_venta/insertar',(req,res)=>{
  const{cod_detalle_venta,cod_venta,nombre_producto,cantidad,precio_venta,descuento,impuesto_sobre_venta,subtotal} =req.body;
  const query= 'CALL mv_ins_detalle_ventas (?,?,?,?,?,?,?,?);'

  connection.query(query,[cod_detalle_venta,cod_venta,nombre_producto,cantidad,precio_venta,descuento,impuesto_sobre_venta,subtotal],(err,rows,fields)=>{
if (!err){
  res.json({status: 'Registro guardado'});
}else{
  console.log(err);
}
  });
});

//UPDATE TABLA DETALLE VENTAS
app.put('/detalle_venta/actualizar/:cod_detalle_venta', (req, res) => {
  const {cod_detalle_venta}=req.params;
  const{cod_venta,nombre_producto,cantidad,precio_venta,descuento,impuesto_sobre_venta,subtotal} = req.body;
  const query ='CALL mv_upd_detalle_ventas(?,?,?,?,?,?,?,?);'
 
  connection.query(query,[cod_detalle_venta,cod_venta,nombre_producto,cantidad,precio_venta,descuento,impuesto_sobre_venta,subtotal], (err, rows, fields) => {
      if (!err) {
          res.json({status: 'Registro actualizado'});
      } else {
          console.log(err);
      }
  });
});

/*************************************************************************************************
**************************************************************************************************
**************************************************************************************************
MODULO PRODUCCION
**************************************************************************************************
**************************************************************************************************
**************************************************************************************************/
//TABLA PRODUCTOS
//SELECT DE TODOS LOS DATOS DE LA TABLA PRODUCTOS
app.get('/productos', (req, res) => {
  const query= 'CALL mp_sel_todo_prodcutos;'

  connection.query(query, (err, 
      rows, fields) => {
      if (!err) {
          res.json(rows[0]);
      } else {
          console.log(err);
      }
  });
});

//SELECT DE LA TABLA PRODUCTOS
app.get('/productos/:cod_producto', (req, res) => {
  const { cod_producto } = req.params;
  const query= 'CALL mp_sel_productos (?);'

  connection.query(query, [cod_producto], (err, 
      rows, fields) => {
      if (!err) {
          res.json(rows[0]);
      } else {
          console.log(err);
      }
  });
});

//DELETE TABLA PRODUCTOS
app.delete('/productos/eliminar/:cod_producto',(req,res)=>{
  const {cod_producto}=req.params;
  const query= 'CALL mp_del_productos (?);'

  connection.query(query,[cod_producto],(err,
      rows,fields)=>{
          if(!err){
              res.json({status:'Registro eliminado'});
          }else{
              console.log(err);
          }
      });
});

//INSERT TABLA PRODUCTOS
app.post('/productos/insertar',(req,res)=>{
  const{cod_producto,nombre_producto,descrip_producto,precio_producto} =req.body;
  const query= 'CALL mp_ins_productos (?,?,?,?);'

  connection.query(query,[cod_producto,nombre_producto,descrip_producto,precio_producto],(err,rows,fields)=>{
if (!err){
  res.json({status: 'Registro guardado'});
}else{
  console.log(err);
}
  });
});

//UPDATE TABLA PRODUCTOS
app.put('/productos/actualizar/:cod_producto', (req, res) => {
  const{cod_producto}=req.params;
  const{nombre_producto,descrip_producto,precio_producto} = req.body;
  const query ="CALL mp_upd_productos(?,?,?,?);"
 
  connection.query(query,[cod_producto,nombre_producto,descrip_producto,precio_producto], (err, rows, fields) => {
      if (!err) {
          res.json({status: 'Registro actualizado'});
      } else {
          console.log(err);
      }
  });
});

//TABLA PRODUCTOS INVENTARIOS
//SELECT DE TODOS LOS DATOS DE LA TABLA PRODUCTOS
app.get('/productos_inventarios', (req, res) => {
  const query= 'CALL mp_sel_todo_inventario_prodcutos;'

  connection.query(query, (err, 
      rows, fields) => {
      if (!err) {
          res.json(rows[0]);
      } else {
          console.log(err);
      }
  });
});

//SELECT DE LA TABLA PRODUCTOS INVENTARIOS
app.get('/productos_inventarios/:cod_lote', (req, res) => {
  const { cod_lote } = req.params;
  const query= 'CALL mp_sel_inventario_productos (?);'

  connection.query(query, [cod_lote], (err, 
      rows, fields) => {
      if (!err) {
          res.json(rows[0]);
      } else {
          console.log(err);
      }
  });
});

//DELETE TABLA PRODUCTOS INVENTARIOS
app.delete('/productos_inventarios/eliminar/:cod_lote',(req,res)=>{
  const {cod_lote}=req.params;
  const query= 'CALL mp_del_inventario_productos (?);'

  connection.query(query,[cod_lote],(err,
      rows,fields)=>{
          if(!err){
              res.json({status:'Registro eliminado'});
          }else{
              console.log(err);
          }
      });
});

//INSERT TABLA PRODUCTOS INVENTARIOS
app.post('/productos_inventarios/insertar',(req,res)=>{
  const{cod_lote,nombre_producto,fech_creacion_lote,fech_caducidad_lote,cant_lote,prec_vent_lote} =req.body;
  const query= 'CALL mp_ins_inventario_productos (?,?,?,?,?,?);'

  connection.query(query,[cod_lote,nombre_producto,fech_creacion_lote,fech_caducidad_lote,cant_lote,prec_vent_lote],(err,rows,fields)=>{
if (!err){
  res.json({status: 'Registro guardado'});
}else{
  console.log(err);
}
  });
});

//UPDATE TABLA PRODUCTOS INVENTARIOS
app.put('/productos_inventarios/actualizar/:cod_lote', (req, res) => {
  const{cod_lote}=req.params;
  const{nombre_producto,fech_creacion_lote,fech_caducidad_lote,cant_lote,prec_vent_lote} = req.body;
  const query ='CALL mp_upd_inventario_productos (?,?,?,?,?,?);'
 
  connection.query(query,[cod_lote,nombre_producto,fech_creacion_lote,fech_caducidad_lote,cant_lote,prec_vent_lote], (err, rows, fields) => {
      if (!err) {
          res.json({status: 'Registro actualizado'});
      } else {
          console.log(err);
      }
  });
});

/*************************************************************************************************
**************************************************************************************************
**************************************************************************************************
MODULO INVENTARIO
**************************************************************************************************
**************************************************************************************************
**************************************************************************************************/
//TABLA MATERIA PRIMA
//SELECT DE TODOS LOS DATOS DE LA TABLA MATERIA PRIMA
app.get('/materia_prima', (req, res) => {
  const query= 'CALL mi_sel_todo_materia_prima;'

  connection.query(query, (err, 
      rows, fields) => {
      if (!err) {
          res.json(rows[0]);
      } else {
          console.log(err);
      }
  });
});

//SELECT DE LA TABLA MATERIA PRIMA
app.get('/materia_prima/:cod_materia', (req, res) => {
  const { cod_materia } = req.params;
  const query= 'CALL mi_sel_materia_prima (?);'

  connection.query(query, [cod_materia], (err, 
      rows, fields) => {
      if (!err) {
          res.json(rows[0]);
      } else {
          console.log(err);
      }
  });
});

//DELETE TABLA MATERIA PRIMA
app.delete('/materia_prima/eliminar/:cod_materia',(req,res)=>{
  const {cod_materia}=req.params;
  const query= 'CALL mi_del_materia_prima (?);'

  connection.query(query,[cod_materia],(err,
      rows,fields)=>{
          if(!err){
              res.json({status:'Registro eliminado'});
          }else{
              console.log(err);
          }
      });
});

//INSERT TABLA MATERIA PRIMA
app.post('/materia_prima/insertar',(req,res)=>{
  const{cod_materia,nom_materia,descripcion,pre_Compra_materia,tip_medida} =req.body;
  const query= 'CALL mi_ins_materia_prima (?,?,?,?,?);'

  connection.query(query,[cod_materia,nom_materia,descripcion,pre_Compra_materia,tip_medida],(err,rows,fields)=>{
if (!err){
  res.json({status: 'Registro guardado'});
}else{
  console.log(err);
}
  });
});

//UPDATE TABLA MATERIA PRIMA
app.put('/materia_prima/actualizar/:cod_materia', (req, res) => {
  const {cod_materia}=req.params;
  const{nom_materia,descripcion,pre_Compra_materia,tip_medida} = req.body;
  const query ="CALL mi_upd_materia_prima (?,?,?,?,?);"
 
  connection.query(query,[cod_materia,nom_materia,descripcion,pre_Compra_materia,tip_medida], (err, rows, fields) => {
      if (!err) {
          res.json({status: 'Registro actualizado'});
      } else {
          console.log(err);
      }
  });
});

//TABLA INVENTARIO MATERIA PRIMA
//SELECT DE TODOS LOS DATOS DE LA TABLA INVENTARIO MATERIA PRIMA
app.get('/inventario_materia_prima', (req, res) => {
  const query= 'CALL mi_sel_todo_invent_materia_prima;'

  connection.query(query, (err, 
      rows, fields) => {
      if (!err) {
          res.json(rows[0]);
      } else {
          console.log(err);
      }
  });
});

//SELECT DE LA TABLA INVENTARIO MATERIA PRIMA
app.get('/inventario_materia_prima/:cod_invent_materia_prima', (req, res) => {
  const { cod_invent_materia_prima } = req.params;
  const query= 'CALL mi_sel_invent_materia_prima (?);'

  connection.query(query, [cod_invent_materia_prima], (err, 
      rows, fields) => {
      if (!err) {
          res.json(rows[0]);
      } else {
          console.log(err);
      }
  });
});

//DELETE TABLA INVENTARIO MATERIA PRIMA
app.delete('/inventario_materia_prima/eliminar/:cod_invent_materia_prima',(req,res)=>{
  const {cod_invent_materia_prima}=req.params;
  const query= 'CALL mi_del_invent_materia_prima (?);'

  connection.query(query,[cod_invent_materia_prima],(err,
      rows,fields)=>{
          if(!err){
              res.json({status:'Registro eliminado'});
          }else{
              console.log(err);
          }
      });
});

//INSERT TABLA INVENTARIO MATERIA PRIMA
app.post('/inventario_materia_prima/insertar',(req,res)=>{
  const{cod_invent_materia_prima,nom_materia,fec_compra,can_Compra,pre_compra,fec_caducidad} =req.body;
  const query= 'CALL mi_ins_invent_materia_prima (?,?,?,?,?,?);'

  connection.query(query,[cod_invent_materia_prima,nom_materia,fec_compra,can_Compra,pre_compra,fec_caducidad],(err,rows,fields)=>{
if (!err){
  res.json({status: 'Registro guardado'});
}else{
  console.log(err);
}
  });
});

//UPDATE TABLA MATERIA PRIMA
app.put('/inventario_materia_prima/actualizar/:cod_invent_materia_prima', (req, res) => {
  const {cod_invent_materia_prima}=req.params;
  const{nom_materia,fec_compra,can_Compra,pre_compra,fec_caducidad} =req.body;
  const query ="CALL mi_upd_invent_materia_prima (?,?,?,?,?,?);"
 
  connection.query(query,[cod_invent_materia_prima,nom_materia,fec_compra,can_Compra,pre_compra,fec_caducidad],(err,rows,fields)=>{
      if (!err) {
          res.json({status: 'Registro actualizado'});
      } else {
          console.log(err);
      }
  });
});

//TABLA PRODUCTOS MATERIA PRIMA
//SELECT DE TODOS LOS DATOS DE LA TABLA PRODUCTOS MATERIA PRIMA
app.get('/productos_materia_prima', (req, res) => {
  const query= 'CALL mi_sel_todo_product_materia_prima;'

  connection.query(query, (err, 
      rows, fields) => {
      if (!err) {
          res.json(rows[0]);
      } else {
          console.log(err);
      }
  });
});

//SELECT DE LA TABLA PRODUCTOS MATERIA PRIMA
app.get('/productos_materia_prima/:cod_prod_mat_prima', (req, res) => {
  const { cod_prod_mat_prima } = req.params;
  const query= 'CALL mi_sel_product_materia_prima (?);'

  connection.query(query, [cod_prod_mat_prima], (err, 
      rows, fields) => {
      if (!err) {
          res.json(rows[0]);
      } else {
          console.log(err);
      }
  });
});

//DELETE TABLA PRODUCTOS MATERIA PRIMA
app.delete('/productos_materia_prima/eliminar/:cod_prod_mat_prima',(req,res)=>{
  const {cod_prod_mat_prima}=req.params;
  const query= 'CALL mi_del_product_materia_prima (?);'

  connection.query(query,[cod_prod_mat_prima],(err,
      rows,fields)=>{
          if(!err){
              res.json({status:'Registro eliminado'});
          }else{
              console.log(err);
          }
      });
});

//INSERT TABLA PRODUCTOS MATERIA PRIMA
app.post('/productos_materia_prima/insertar',(req,res)=>{
  const{cod_prod_mat_prima,nombre_producto,nom_materia,can_materia_requerida} =req.body;
  const query= 'CALL mi_ins_prod_materia_prima (?,?,?,?);'

  connection.query(query,[cod_prod_mat_prima,nombre_producto,nom_materia,can_materia_requerida],(err,rows,fields)=>{
if (!err){
  res.json({status: 'Registro guardado'});
}else{
  console.log(err);
}
  });
});

//UPDATE TABLA PRODUCTOS MATERIA PRIMA
app.put('/productos_materia_prima/actualizar/:cod_prod_mat_prima', (req, res) => {
  const {cod_prod_mat_prima}=req.params;
  const{nombre_producto,nom_materia,can_materia_requerida} =req.body;
  const query ="CALL mi_upd_product_materia_prima (?,?,?,?);"
 
  connection.query(query,[cod_prod_mat_prima,nombre_producto,nom_materia,can_materia_requerida],(err,rows,fields)=>{
      if (!err) {
          res.json({status: 'Registro actualizado'});
      } else {
          console.log(err);
      }
  });
});

// Check connect
connection.connect(error => {
  if (error) throw error;
  console.log('Database server running!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
