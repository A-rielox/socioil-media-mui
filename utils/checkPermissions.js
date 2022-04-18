import { UnauthenticatedError } from '../errors/index.js';

const checkPermissions = (requestUser, resourceUserId) => {
   // if (requestUser.role === 'admin') return; red red x hacer red red
   if (requestUser.userId === resourceUserId.toString()) return;

   throw new UnauthenticatedError(
      'No cuentas con autorización para acceder a este recurso'
   );
};

export default checkPermissions;

//se pasa todo el user (requestUser) xq tengo q checar si es q es admin, para q tambien sea capaz de editar el job aun cuando no lo haya creado él

//
// el id "mio" de cuando me autenticaron, y el "createdBy" del job q quiero modificar
// const checkPermissions = (requestUser, resourceUserId) => {
// se ocupa en jobsController

// console.log(typeof resourceUserId); // es un object, no string con id
