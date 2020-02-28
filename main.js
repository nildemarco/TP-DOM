
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
            <button class="botonDelete" id="${curr.id}"><i class="material-icons icon-delete"
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

            btnEdit.forEach((element, ind) => {
                element.onclick = () => {

                    modal.innerHTML =
                        `<h2>Edit Employee</h2>
                <form class="form-modal">
                  <label for="name">Name</label>
                  <input type="hidden" name= "id" value="${users[ind].id}" />

                  <input type="text" name="name" id="name" value="${users[ind].fullname}" />
          
                  <label for="email"> Email </label>
                  <input type="email" name="email" id="email" value="${users[ind].email}" />
          
                  <label for="address"> Address </label>
                  <input type="text" name="address" id="address" value="${users[ind].address}" />
          
                  <label for="phone"> Phone </label>
                  <input type="number" name="phone" id="phone" value="${users[ind].phone}" />
          
                  <div class="botones-modal">
                  
                    <button>Cancel</button>
                    <button type="submit" id="guardar">Save</button>
                  </div>
                </form>`
                    modal.classList.remove("noMostrar")
                    console.log(element.id)

                    const botonEditar = getElementById("guardar")
                    botonEditar.onclick = () = {
                        let id = form.elements[0].value;
                        let nombre = form.elements[1].value;
                        let correo = form.elements[2].value;
                        let direccion = form.elements[3].value;
                        let telefono = form.elements[4].value;

                        let usuarioEditado = {
                            id: id,
                            fullname: nombre,
                            email: correo,
                            address: direccion,
                            phone: telefono
                        };

    editUsers(usuarioEditado);
    mostrarUsers();
                    }

                }

            });



        })

}

mostrarUsers()

//Funcion para agregar usuario
const addUsers = (nuevoUser) => {
    fetch('https://tp-js-2-api-wjfqxquokl.now.sh/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoUser),
    })
        .then(data => data.json())
        .then(userAgregado => console.log(userAgregado))

}



// Funcion para editar el usuario
const editUsers = (userEditado) => {

    fetch(`https://tp-js-2-api-wjfqxquokl.now.sh/users/${userEditado.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usersEdit),
    })
        .then(data => data.json())
        .then(userEditado => console.log(userEditado))


}





//Funcion para borrar usuarios
const deleteUsers = (id) => {
    fetch(`https://tp-js-2-api-wjfqxquokl.now.sh/users/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(data => data.json())
        .then(usersDeleted => console.log(usersDeleted))
}

const botonAddOpenModal = document.getElementById("add-user")
const modal = document.getElementById("modal")
const botonAddCloseModal = document.getElementById("addCerrar")
const form = document.forms[0]
console.log(form)

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
    mostrarUsers()
}



// Filtro

const filtro = document.getElementById("filter")

// const btnEdit = document.getElementById("btnEdit");
// console.log(btnEdit)






// (pepito) => {
//     console.log(pepito)
//     modal.classList.remove("noMostrar");


// }

// const botonDelete = document.getElementById("btnDelete");




