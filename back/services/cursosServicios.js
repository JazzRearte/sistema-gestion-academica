import { Curso } from '../models/index.js';

export async function obtenerTodos() {
  return Curso.findAll();
}

export async function obtenerPorId(id) {
  return Curso.findByPk(id);
}

export async function crear({ nombre, cupos }) {
  return Curso.create({ nombre, cupos });
}
