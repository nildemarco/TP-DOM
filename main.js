const mostrarUsers = () => {
    fetch('https://tp-js-2-api-wjfqxquokl.now.sh/users')
        .then(data => data.json())
        .then(users => {
            const contenedorTabla = document.getElementById("container-table")
            console.log(users)

            const datosTabla = users.reduce((acc, curr) => {
                return acc + `
        <tr>
            <td><input type="checkbox" name="users" id=""></td>
            <td>${curr.fullname}</td>
            <td>${curr.email}</td>
            <td>${curr.address}</td>
            <td>${curr.phone}</td>
            <td><button id="botonEdit"><i class="material-icons icon-edit" title="Edit">&#xE254;</i></button>
            <i class="material-icons icon-delete"
         title="Delete">&#xE872;</i></td>
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
        })
}

mostrarUsers()

// let nuevoUser = {
//     fullname: 'Nil De Marco',
//     email: 'nil@ada.com.ar',
//     address: 'calle falsa 123',
//     phone: '234569443'
// }

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

//addUsers()

// let usersEdit = {
//     fullname: 'Nils De Marco',
//     email: 'nils@ada.com.ar',
//     address: 'Tucuman',
//     phone: '222222222'
// }

// Funcion para editar el usuario

const editUsers = (id) => {
    fetch(`https://tp-js-2-api-wjfqxquokl.now.sh/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usersEdit),
    })
        .then(data => data.json())
        .then(userEditado => console.log(userEditado))

}

// editUsers(2)

//Funcion para borrar usuarios
const deleteUsers = (id) => {
    fetch(`https://tp-js-2-api-wjfqxquokl.now.sh/users/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })
    .then(data => data.json())
    .then(usersDeleted => console.log(usersDeleted))
}

//deleteUsers(2)

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

    nuevoUser = {
        fullname: nombre,
        email: correo,
        address: direccion,
        phone: telefono
    }

   addUsers(nuevoUser)
   mostrarUsers()
}

