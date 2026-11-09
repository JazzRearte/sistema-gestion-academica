import { DataTypes, Model } from 'sequelize';
import sequelize from '../data/db.js';

// Tabla intermedia de la relación N:M entre Alumno y Curso (ver models/index.js).
// Un alumno puede inscribirse en muchos cursos, y un curso puede tener
// muchos alumnos inscriptos — Inscripcion registra cada combinación.
class Inscripcion extends Model { }

Inscripcion.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    fecha: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  },
  { sequelize, modelName: 'Inscripcion', tableName: 'inscripciones', timestamps: false }
);

export default Inscripcion;
