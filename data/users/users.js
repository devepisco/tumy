mongoose = require('mongoose');

module.exports = [
  {
    firstname:"Usuario",
    lastname:"de Prueba",
    IDType:"DNI",
    IDNumber:"72230303",
    phone:"920903021",
    email:"test@user.com",
    password:"Admin1234*",
    role: "user",
    isBlocked: false,
  },
  {
    firstname:"Admin",
    lastname:"admin",
    IDType:"DNI",
    IDNumber:"70200302",
    phone:"967128349",
    email:"admin@gmail.com",
    password:"Admin1234*",
    role: "admin",
    isBlocked: false,
  },
  {
    firstname:"Usuario",
    lastname:"Editado",
    IDType:"DNI",
    IDNumber:"00011122",
    business:{
      name: "SilverThink Solutions",
      ruc: "10393939291",
      socialReason: "Soluciones empresariales s.a.c"
    },
    phone:"900111222",
    email:"usuario@editado.com",
    password:"Editado1234*",
    role: "user",
    isBlocked: false,
  }
];
