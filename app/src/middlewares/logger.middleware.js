// Middleware global (todas las rutas)

// - console.log: New request | method: ----- | url: ----- | date: -------

import "dotenv/config";

export default function logger(req, res, next) {
  var fecha = new Date();
  console.log(" New request | method: "+req.method+"| url: "+req.url+" | date:"+fecha)
  return next();
}