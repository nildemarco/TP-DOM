const mostrarUsers = () =>{
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
            <td><i class="material-icons icon-edit" title="Edit">&#xE254;</i></i><i class="material-icons icon-delete"
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

let nuevoUser = {
    fullname: 'Nil De Marco',
    email: 'nil@ada.com.ar',
    address: 'calle falsa 123',
    phone: '234569443'
}

const agregarUsers = () => {
    fetch('https://tp-js-2-api-wjfqxquokl.now.sh/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(nuevoUser),
        })
    .then(data => data.json())
    .then(userAgregado => console.log(userAgregado))

}

//agregarUsers()