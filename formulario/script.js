class Estudiante {
    constructor(nombre, matricula, notas) {
        this.nombre = nombre;
        this.matricula = matricula;
        this.notas = notas;
    }

    calcularPromedio() {
        if (this.notas.length === 0) return 0;
        const suma = this.notas.reduce((acc, n) => acc + n, 0);
        return (suma / this.notas.length).toFixed(1);
    }
}

class SistemaInventario {
    constructor() {
        this.alumnos = [];
    }

    agregar(alumno) {
        this.alumnos.push(alumno);
        this.render();
    }

    eliminar(index) {
        this.alumnos.splice(index, 1);
        this.render();
    }

    render() {
        const cuerpo = document.getElementById('tablaCuerpo');
        cuerpo.innerHTML = '';

        this.alumnos.forEach((al, i) => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${al.nombre}</td>
                <td>${al.matricula}</td>
                <td><strong>${al.calcularPromedio()}</strong></td>
                <td>
                    <button class="btn-delete" onclick="controlador.eliminar(${i})">Eliminar</button>
                </td>
            `;
            cuerpo.appendChild(fila);
        });
    }
}

const controlador = new SistemaInventario();

document.getElementById('btnRegistrar').addEventListener('click', () => {
    const inputNom = document.getElementById('nombre');
    const inputMat = document.getElementById('matricula');
    const inputNot = document.getElementById('notas');

    if (inputNom.value && inputMat.value && inputNot.value) {
        const listaNotas = inputNot.value.split(',').map(n => parseFloat(n.trim()));
        const nuevoAlumno = new Estudiante(inputNom.value, inputMat.value, listaNotas);
        controlador.agregar(nuevoAlumno);

        inputNom.value = '';
        inputMat.value = '';
        inputNot.value = '';
    } else {
        alert("Por favor completa todos los campos.");
    }
});