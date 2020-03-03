const usersTable = (users) => {
    const contenedorTabla = document.getElementById("container-table");
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
            <button class="botonDelete" id="btn-${curr.id}"><i class="material-icons icon-delete" title="Delete">&#xE872;</i></button></td>
        </tr>`
    }, '');

    contenedorTabla.innerHTML = `<table>
                                    <thead>
                                        <tr>
                                            <th><input type="checkbox" name="main" id=""></th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Adress</th>
                                            <th>Phone</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${datosTabla}
                                    </tbody>
                                </table>`

    const btnEdit = document.querySelectorAll(".botonEdit");
    const btnDelete = document.querySelectorAll(".botonDelete");

    btnEdit.forEach((element, ind) => {
        element.onclick = () => {
            modal.innerHTML = getModal(true, users, ind);
            showModal(true);

            const botonEditar = document.getElementById("guardar");
            botonEditar.onclick = () => {
                const form = document.forms[0];
                form.onsubmit = (e) => {
                    e.preventDefault()

                    editUsers(users[ind].id, setUser(form));
                    showModal(false);
                }
            }
        }
    });

    btnDelete.forEach((element, ind) => {
        element.onclick = () => {
            modal.innerHTML =
                `<h2>Delete Employee</h2>
                <button type="button" id="closeModal" data-dismiss="modal" aria-hidden="true">X</button>
                <div class="bodyModal">
                    Are you sure you want to delete these Records?
                    This action cannot be undone.
                </div>
                <div class="footer">
                    <button id="cancelDelete">Cancel</button>
                    <button type="submit" id="delete">Delete</button>
                </div>`;

            const closeModal = document.getElementById("closeModal");
            closeModal.onclick = () => {
                modal.classList.add("noMostrar");
            }

            const closeDeleteModal = document.getElementById("cancelDelete");
            closeDeleteModal.onclick = (e) => {
                e.preventDefault();
                modal.classList.add("noMostrar");
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
}

const mostrarUsers = () => {
    fetch('https://tp-js-2-api-wjfqxquokl.now.sh/users')
        .then(data => data.json())
        .then(users => {
            usersTable(users);
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
            mostrarUsers();
        })
}

// Funcion para editar el usuario
const editUsers = (id, userEditado) => {
    fetch(`https://tp-js-2-api-wjfqxquokl.now.sh/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userEditado),
    })
        .then(data => data.json())
        .then(userEditado => {
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
            mostrarUsers();
        })
}

const botonAddOpenModal = document.getElementById("add-user");
const modal = document.getElementById("modal");

botonAddOpenModal.onclick = () => {
    modal.innerHTML = getModal(false);
    showModal(true);

    const botonAddCloseModal = document.getElementById("addCerrar");

    botonAddCloseModal.onclick = () => {
        const form = document.forms[0];
        form.onsubmit = (e) => {
            e.preventDefault();
            addUsers(setUser(form));
            showModal(false);
        }
    }
}

const usuarioFiltrado = document.getElementById("filter");

// Funcion Filtrar
usuarioFiltrado.onkeypress = e => {
    if (e.keyCode == 13) {
        fetch(`https://tp-js-2-api-wjfqxquokl.now.sh/users?search=${usuarioFiltrado.value}`)
            .then(data => data.json())
            .then(users => {
                usersTable(users);
            })
    }
}

const setUser = (form) => {
    return {
        fullname: form.elements[0].value,
        email: form.elements[1].value,
        address: form.elements[2].value,
        phone: form.elements[3].value
    }
}

const getModal = (editabled, users, ind) => {

    let modal =
        `<h2>${editabled ? 'Edit' : 'Add'} Employee</h2>
    <button type="button" id="close" data-dismiss="modal" aria-hidden="true">X</button>
    <form class="form-modal">
        <label for="name"> Name </label>
        <input type="text" maxlength="50" name="name" id="name" value="${editabled ? users[ind].fullname : ''}"  required />

        <label for="email"> Email </label>
        <input type="email" name="email" maxlength="60" id="email" value="${editabled ? users[ind].email : ''}" required />

        <label for="address"> Address</label>
        <input type="text" name="address" pattern ="[A-Za-z0-9 _-]+" id="address"  value="${editabled ? users[ind].address : ''}" required />

        <label for="phone">Phone </label>
        <input type="tel" name="phone" pattern="[0-9  -]+" id="phone"  value="${editabled ? users[ind].phone : ''}" required />

        <div class="botones-modal">
            <button type="button" id="cancel">Cancel</button>
            <button type="submit" id="${editabled ? 'guardar' : 'addCerrar'}">${editabled ? 'Save' : 'Add'}</button>
        </div>
    </form>`;

    return modal;
}

const showModal = (show) => {
    if (show) {
        modal.classList.remove("noMostrar");
        const closeAddModal = document.getElementById("close");
        closeAddModal.onclick = () => {
            showModal(false);
        }

        const botonCancelAdd = document.getElementById("cancel");
        botonCancelAdd.onclick = (e) => {
            e.preventDefault();
            showModal(false);
        }
    } else {
        modal.classList.add("noMostrar");
    }
}