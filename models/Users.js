import mongoose from 'mongoose';
import validator from 'validator'; // 🥊
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, 'Favor de proveer un nombre'],
      minlength: 3,
      maxlength: 20,
      trim: true,
   },
   email: {
      type: String,
      required: [true, 'Favor de proveer un email'],
      validate: {
         validator: validator.isEmail,
         message: 'Favor de proveer un email valido',
      },
      unique: true,
   },
   password: {
      type: String,
      required: [true, 'Favor de proveer un password'],
      minlength: 6,
      select: false, // para q no me lo devuelva al buscar user
   },
   lastName: {
      type: String,
      trim: true,
      maxlength: 20,
      default: 'Mi Apellido',
   },
   location: {
      type: String,
      trim: true,
      maxlength: 20,
      default: 'Mi Ciudad',
   },
   // agregados
   role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
   },
   // isAdmin: {
   //    type: Boolean,
   //    default: false,
   // },
   level: {
      type: String,
      required: [true, 'Favor de proveer un rango'],
      enum: [
         'distribuidor',
         'estrella',
         'estrella mayor',
         'ejecutivo',
         'plata',
         'oro',
         'platino',
         'diamante',
         'diamante corona',
         'diamante corona real',
      ],

      default: 'distribuidor',
   },
   profilePicture: {
      type: String,
      default: '',
   },
   coverPicture: {
      type: String,
      default: '',
   },
});

// 📑 PRE-HOOK
UserSchema.pre('save', async function () {
   // console.log(this.password) me devuelve lo q pongo como password dahhhhh!!!
   if (!this.isModified('password')) return;

   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
});

// INSTANCE METHOD
UserSchema.methods.createJWT = function () {
   // console.log(this); apunta al documento
   return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
   });
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
   const isMatch = await bcrypt.compare(candidatePassword, this.password);
   return isMatch;
};

export default mongoose.model('User', UserSchema);

//
// 🔥
// en los métodos "this" hace referencia al documento

//
// 📑
// se puede omitir el "next" en funcion(next), si se devuelve una promesa
// "this" points to instance created by UserSchema
// el "User.create( )" del register hace trigger de "save", de acuerdo a documentacion de mongoose

//
// 🥊 paquete para pasarle a la fcn y q me valide el mail, lo de la fcn lo sequé de la documentación. ".isEmail" es la fcn q viene en el package de "validator" para validar el email.
//npm install validator
//
// Custom Validators
// If the built-in validators aren't enough, you can define custom validators to suit your needs.
//
// Custom validation is declared by passing a validation function. You can find detailed instructions on how to do this in the SchemaType#validate() API docs.
//
// const userSchema = new Schema({
//   phone: {
//     type: String,
//     validate: {
//       validator: function(v) {
//         return /\d{3}-\d{3}-\d{4}/.test(v);
//       },
//       message: props => `${props.value} is not a valid phone number!`
//     },
//     required: [true, 'User phone number required']
//   }
// });
