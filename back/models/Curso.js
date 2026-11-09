import { DataTypes, Model } from 'sequelize';
import sequelize from '../data/db.js';

class Curso extends Model { }

Curso.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
    // Cupos disponibles. Se descuenta de a 1 al inscribir a un alumno
    // (ver services/alumnosServicios.js → inscribir), por eso el desafío
    // de la transacción tiene sentido: no puede quedar en 0 con menos
    // inscripciones registradas, ni al revés.
    cupos: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 0 } },
  },
  { sequelize, modelName: 'Curso', tableName: 'cursos', timestamps: false }
);

export default Curso;
