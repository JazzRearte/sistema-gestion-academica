import { DataTypes, Model } from 'sequelize';
import sequelize from '../data/db.js';

class Alumno extends Model { }

Alumno.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
    email: { type: DataTypes.STRING, allowNull: false, validate: { isEmail: true } },
  },
  { sequelize, modelName: 'Alumno', tableName: 'alumnos', timestamps: false }
);

export default Alumno;
