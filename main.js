const mostrarUsers = () => {
    fetch('https://tp-js-2-api-wjfqxquokl.now.sh/users')
        .then(data => data.json())
        .then(users => {
            const contenedorTabla = document.getElementById("container-table")
            console.log(users)

            const datosTabla = users.reduce((acc, curr) => {
                return acc + `
        <tr>
            <td><input type="checkbox" name="users" id="users"></td>
            <td>${curr.fullname}</td>
            <td>${curr.email}</td>
            <td>${curr.address}</td>
            <td>${curr.phone}</td>
            <td>
            <button class="botonEdit" id="${curr.id}"><i class="material-icons icon-edit" title="Edit">&#xE254;</i></button>
            <button class="botonDelete" id="btn-${curr.id}"><i class="material-icons icon-delete"
         title="Delete">&#xE872;</i></button></td>
        </tr>`

            }, '')

            contenedorTabla.innerHTML = `<table>
        <tr>
        <th><input type="checkbox" name="main" id=""></th>
        <th>Name</th>
        <th>Email</th>
        <th>Adress</th>
        <th>Phone</th>
        <th>Actions</th>
        </tr>
        ${datosTabla}
        </table>`

            const btnEdit = document.querySelectorAll(".botonEdit");
            const btnDelete = document.querySelectorAll(".botonDelete");

            btnEdit.forEach((element, ind) => {
                element.onclick = () => {

                    modal.innerHTML =
                        `<h2>Edit Employee</h2>
                <form class="form-modal">

                  <label for="name">Name</label>
                  <input type="text" name="name" id="name" value="${users[ind].fullname}" />

                  <label for="email"> Email </label>
                  <input type="email" name="email" id="email" value="${users[ind].email}" required/>

                  <label for="address"> Address </label>
                  <input type="text" name="address" id="address" value="${users[ind].address}" />

                  <label for="phone"> Phone </label>
                  <input type="number" name="phone" id="phone" value="${users[ind].phone}" />

                  <div class="botones-modal">

                    <button>Cancel</button>
                    <button type="submit" id="guardar">Save</button>
                  </div>
                </form>`
                    modal.classList.remove("noMostrar");

                    const botonEditar = document.getElementById("guardar");

                    botonEditar.onclick = (e) => {
                        e.preventDefault();
                        const form = document.forms[0];
                        let nombre = form.elements[0].value;
                        let correo = form.elements[1].value;
                        let direccion = form.elements[2].value;
                        let telefono = form.elements[3].value;

                        let usuarioEditado = {
                            fullname: nombre,
                            email: correo,
                            address: direccion,
                            phone: telefono
                        };

                        editUsers(users[ind].id, usuarioEditado);
                        modal.classList.add("noMostrar");

                    }
                }
            });
            btnDelete.forEach((element, ind) => {
                element.onclick = () => {

                    modal.innerHTML =
                        `<h2>Delete Employee</h2>
                        <button type="button" id="closeModal" data-dismiss="modal" aria-hidden="true">×</button>
                        <div class="bodyModal">
                        Are you sure you want to delete these Records?
                        This action cannot be undone.
                        </div>
                    <div class="footer">
                    <button>Cancel</button>
                    <button type="submit" id="delete">Delete</button>
                  </div>`
                    const closeModal = document.getElementById("closeModal")
                    closeModal.onclick = () => {
                        modal.classList.add("noMostrar")
                    }
                    modal.classList.remove("noMostrar");

                    const botonDelete = document.getElementById("delete");

                    botonDelete.onclick = (e) => {
                        e.preventDefault();
                        deleteUsers(users[ind].id);
                        modal.classList.add("noMostrar");
                    }
                }
            });
        })
}

mostrarUsers();

//Funcion para agregar usuario
const addUsers = (nuevoUser) => {
    fetch('https://tp-js-2-api-wjfqxquokl.now.sh/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoUser),
    })
        .then(data => data.json())
        .then(userAgregado => {
            console.log(userAgregado)
            mostrarUsers();
        })
}

// Funcion para editar el usuario
const editUsers = (id, userEditado) => {
    console.log(userEditado);
    fetch(`https://tp-js-2-api-wjfqxquokl.now.sh/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userEditado),
    })
        .then(data => data.json())
        .then(userEditado => {
            console.log(userEditado)
            mostrarUsers();
        });
}

//Funcion para borrar usuarios
const deleteUsers = (id) => {
    fetch(`https://tp-js-2-api-wjfqxquokl.now.sh/users/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(data => data.json())
        .then(usersDeleted => {
            console.log(usersDeleted)
            mostrarUsers();
        })


}

const botonAddOpenModal = document.getElementById("add-user")
const modal = document.getElementById("modal")
const botonAddCloseModal = document.getElementById("addCerrar")

const form = document.forms[0]



botonAddOpenModal.onclick = () => {
    modal.classList.remove("noMostrar");
}

botonAddCloseModal.onclick = () => {
    modal.classList.add("noMostrar")
}



form.onsubmit = (e) => {
    e.preventDefault()
    let nombre = form.elements[0].value
    let correo = form.elements[1].value
    let direccion = form.elements[2].value
    let telefono = form.elements[3].value

    let nuevoUser = {
        fullname: nombre,
        email: correo,
        address: direccion,
        phone: telefono
    }

    addUsers(nuevoUser)

}