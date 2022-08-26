let registros = [];

const txtID = document.getElementById("txtID");
const txtNombre = document.getElementById("txtNombre");
const txtApellido = document.getElementById("txtApellido");
const cuerpoTabla = document.getElementById("cuerpoTabla");

const crearRegistros = () => {
  const usuario = {
    id: uuidv4(),
    nombre: txtNombre.value,
    apellido: txtApellido.value,
  };

  registros = JSON.parse(localStorage.getItem("usuarios")) || [];
  registros.push(usuario);
  localStorage.setItem("usuarios", JSON.stringify(registros));

  mostrarRegistros();
};

const mostrarRegistros = () => {
  const registrosLS = JSON.parse(localStorage.getItem("usuarios")) || [];

  cuerpoTabla.innerHTML = "";

  registrosLS.forEach((usuario) => {
    const fila = `
        <tr>
            <th scope="row">${usuario.id}</th>
            <td>${usuario.nombre}</td>
            <td>${usuario.apellido}</td>
            <td>
            <button type="button" class="btn btn-warning" onclick="iniciarEditarRegistro('${usuario.id}')">Editar</button>
            </td>
            <td>
            <button type="button" class="btn btn-danger" onclick="eliminarRegistro('${usuario.id}')">Eliminar</button>
            </td>
        </tr>
        `;

    cuerpoTabla.innerHTML += fila;
  });
};

const iniciarEditarRegistro = (idRegistro) => {
  const registrosLS = JSON.parse(localStorage.getItem("usuarios")) || [];

  const usuario = registrosLS.find((registro) => {
    return registro.id === idRegistro;
  });

  txtID.value = idRegistro;
  txtNombre.value = usuario.nombre;
  txtApellido.value = usuario.apellido;
};

const editarRegistro = () => {
  const registrosLS = JSON.parse(localStorage.getItem("usuarios")) || [];

  const usuario = registrosLS.find((registro) => {
    return registro.id === txtID.value;
  });

  usuario.nombre = txtNombre.value;
  usuario.apellido = txtApellido.value;

  localStorage.setItem("usuarios", JSON.stringify(registrosLS));
  mostrarRegistros();
};

const eliminarRegistro = (idRegistro) => {
  const registrosLS = JSON.parse(localStorage.getItem("usuarios")) || [];

  const registrosFiltrados = registrosLS.filter((usuario) => {
    return usuario.id !== idRegistro;
  });

  localStorage.setItem("usuarios", JSON.stringify(registrosFiltrados));
  mostrarRegistros();
};

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

window.onload = () => {
  mostrarRegistros();
};
