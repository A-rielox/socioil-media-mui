import mongoose from 'mongoose';
import { oilsList } from '../utils/index.js';

const RecipeSchema = new mongoose.Schema(
   {
      title: {
         type: String,
         required: [true, 'Favor proveer un titulo.'],
         minlength: 5,
         maxlength: 150,
      },
      problemsList: {
         type: [String],
         default: ['general'],
         trim: true,
         required: [true, 'Favor proveer al menos un problema'],
      },
      oilsList: {
         type: [String],
         enum: oilsList,
         trim: true,
         default: 'digize pal Adri',
         required: [true, 'Favor proveer al menos un aceite'],
      },
      oil1: {
         type: String,
         trim: true,
      },
      oil2: {
         type: String,
         trim: true,
      },
      oil3: {
         type: String,
         trim: true,
      },
      oil4: {
         type: String,
         trim: true,
      },
      oil5: {
         type: String,
         trim: true,
      },
      problem1: {
         type: String,
         trim: true,
      },
      problem2: {
         type: String,
         trim: true,
      },
      problem3: {
         type: String,
         trim: true,
      },
      desc: {
         type: String,
         required: [true, 'Favor proveer una descripción'],
         minlength: 5,
         maxlength: 1500,
      },
      createdBy: {
         type: mongoose.Types.ObjectId,
         ref: 'User',
         required: [true, 'Please provide user'],
      },
      // nuevas
      userNane: {
         type: String,
         // required: [true, 'Favor de proveer un nombre'],
         // minlength: 3,
         // maxlength: 20,
         // trim: true,
      },
      userLevel: {
         type: String,
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
         // required: [true, 'Favor de proveer un nombre'],
         // minlength: 3,
         // maxlength: 20,
         // trim: true,
      },
   },
   { timestamps: true }
);

export default mongoose.model('Recipe', RecipeSchema);

// los required q tienen default es para q al crear o modificar nome pacen vacios
