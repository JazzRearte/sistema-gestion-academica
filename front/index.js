const API_URL = 'http://localhost:3001/api';

function mostrarAlerta(mensaje, tipo = 'danger') {
  const alerta = document.getElementById('alerta');
  alerta.textContent = mensaje;
  alerta.className = `alerta alert alert-${tipo}`;
  setTimeout(() => alerta.classList.add('d-none'), 2500);
}

// A diferencia del ejercicio base, acá el HTML se arma con createElement +
// textContent (no con innerHTML + template strings) para no insertar datos
// del servidor como HTML crudo — así no hay riesgo de XSS aunque nombre/email
// vengan con caracteres como < o > .
async function cargarAlumnos() {
  const tbody = document.getElementById('cuerpo-alumnos');
  tbody.innerHTML = '';

  try {
    const res = await fetch(`${API_URL}/alumnos`);
    if (!res.ok) throw new Error(`Error ${res.status}`);
    const alumnos = await res.json();

    if (alumnos.length === 0) {
      tbody.innerHTML = '<tr><td colspan="4" class="text-center text-muted py-4">No hay alumnos.</td></tr>';
      return;
    }

    for (const alumno of alumnos) {
      const fila = document.createElement('tr');

      const tdId = document.createElement('td');
      tdId.textContent = alumno.id;

      const tdNombre = document.createElement('td');
      tdNombre.textContent = alumno.nombre;

      const tdEmail = document.createElement('td');
      tdEmail.textContent = alumno.email;

      const tdCursos = document.createElement('td');
      // Hasta que se resuelva el Desafío 1 (GET anidado), GET /api/alumnos
      // no trae "cursos", así que acá no habrá nada para mostrar todavía.
      if (Array.isArray(alumno.cursos) && alumno.cursos.length > 0) {
        for (const curso of alumno.cursos) {
          const badge = document.createElement('span');
          badge.className = 'badge text-bg-secondary badge-curso';
          badge.textContent = curso.nombre;
          tdCursos.appendChild(badge);
        }
      } else {
        tdCursos.textContent = '—';
      }

      fila.append(tdId, tdNombre, tdEmail, tdCursos);
      tbody.appendChild(fila);
    }
  } catch (err) {
    mostrarAlerta('❌ No se pudo conectar con la API. ¿Está corriendo el servidor?');
    tbody.innerHTML = '';
  }
}

async function cargarCursosEnSelect() {
  const select = document.getElementById('select-curso');
  select.innerHTML = '';

  const res = await fetch(`${API_URL}/cursos`);
  const cursos = await res.json();

  for (const curso of cursos) {
    const option = document.createElement('option');
    option.value = curso.id;
    option.textContent = `${curso.nombre} (${curso.cupos} cupos)`;
    select.appendChild(option);
  }
}

async function cargarAlumnosEnSelect() {
  const select = document.getElementById('select-alumno');
  select.innerHTML = '';

  const res = await fetch(`${API_URL}/alumnos`);
  const alumnos = await res.json();

  for (const alumno of alumnos) {
    const option = document.createElement('option');
    option.value = alumno.id;
    option.textContent = alumno.nombre;
    select.appendChild(option);
  }
}

async function crearAlumno(event) {
  event.preventDefault();
  const form = document.getElementById('form-alumno');
  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();

  try {
    const res = await fetch(`${API_URL}/alumnos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email }),
    });
    if (!res.ok) throw new Error(`Error ${res.status}`);

    mostrarAlerta('✅ Alumno creado', 'success');
    form.reset();
    await cargarAlumnos();
    await cargarAlumnosEnSelect();
  } catch (err) {
    mostrarAlerta('❌ Error al crear el alumno.');
  }
}

// Envía la inscripción — depende del Desafío 2 (transacción) para funcionar
// de verdad; hasta entonces el backend devuelve 400.
async function inscribir(event) {
  event.preventDefault();
  const alumnoId = document.getElementById('select-alumno').value;
  const cursoId = document.getElementById('select-curso').value;

  try {
    const res = await fetch(`${API_URL}/inscripciones`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ alumnoId, cursoId }),
    });
    if (!res.ok) {
      const { error } = await res.json();
      throw new Error(error || `Error ${res.status}`);
    }

    mostrarAlerta('✅ Inscripción registrada', 'success');
    await cargarAlumnos();
    await cargarCursosEnSelect();
  } catch (err) {
    mostrarAlerta(`❌ ${err.message}`);
  }
}

document.getElementById('form-alumno').addEventListener('submit', crearAlumno);
document.getElementById('form-inscripcion').addEventListener('submit', inscribir);

document.addEventListener('DOMContentLoaded', () => {
  cargarAlumnos();
  cargarAlumnosEnSelect();
  cargarCursosEnSelect();
});
