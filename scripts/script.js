function modalOpen() {
    document.querySelector('h2').innerText = "Novo usuário"
    document.getElementById('saveValues').innerText = 'Salvar';

    document.getElementById('modal').classList.add('active');

}

function modalClose() {
    document.getElementById('modal').classList.remove('active');
}

document.getElementById('userRegistration').addEventListener('click', modalOpen);
document.getElementById('modalClose').addEventListener('click', modalClose);


function cadastrar () {
    let listUser = []

    const nome = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const cel = document.getElementById('cel').value;
    const city = document.getElementById('city').value;
    const id = Math.floor(Math.random() * 100);
    
    const objUser = {
        nome : nome, 
        email : email, 
        cel : cel, 
        city : city,
        id : id
    };

    if (localStorage.getItem('CadastroUsuarios')) {
        listUser = JSON.parse(localStorage.getItem('CadastroUsuarios'));
    }
    listUser.push(objUser);

    localStorage.setItem('CadastroUsuarios', JSON.stringify(listUser));

    modalClose();

    window.location.reload();
}

document.getElementById('saveValues').addEventListener('click', cadastrar);

//função para carregar os dados de usuário
function carregarUsuario() {
    let listUser = []

    if (localStorage.getItem('CadastroUsuarios')) {
    listUser = JSON.parse(localStorage.getItem('CadastroUsuarios'));

    }
    if (listUser.length == 0) {
        let tabela = document.getElementById('corpoTabela');

        tabela.innerHTML = `
            <tr>
                <td colspan= '5'> Nenhum usuário cadastrado </td>
            </tr>
        `
    } else{
        createTableUser(listUser);
    }
}

document.addEventListener('DOMContentLoaded', carregarUsuario);

function createTableUser(dadosUsuario) {
    let tabela = document.getElementById('corpoTabela');

    let template = '';

    dadosUsuario.forEach(user => {
        template += `
            <tr>
                <td> ${user.nome}  </td>
                <td> ${user.email} </td>
                <td> ${user.cel}   </td>
                <td> ${user.city}  </td>
                <td>
                        <button type="button" class="button green" onclick="updateUser(${user.id})">Editar</button>
                        <button type="button" class="button red" onclick="deleteUser(${user.id})">Excluir</button>
                </td>
            </tr>

        `
    });
    
    tabela.innerHTML = template;
}

function updateUser(id) {
    modalOpen();

    document.getElementById('saveValues').removeEventListener('click', cadastrar);

    const textTitleUpdateUser = document.querySelector('h2');
    textTitleUpdateUser.innerText = "Atualizar Usuário"

    document.getElementById('saveValues').innerText = 'Atualizar';

    const getUserData = JSON.parse(localStorage.getItem("CadastroUsuarios"));

    const userData = getUserData.find(identificarUsuario => identificarUsuario.id === id);

    document.getElementById('name').value = userData.nome;
    document.getElementById('email').value = userData.email;
    document.getElementById('cel').value = userData.cel;
    document.getElementById('city').value = userData.city;

    document.getElementById('saveValues').addEventListener('click', () => updateUserInfo(id));

}

function updateUserInfo(id) {
    const newName = document.getElementById('name').value;
    const newEmail = document.getElementById('email').value;
    const newCel = document.getElementById('cel').value;
    const newCity = document.getElementById('city').value;

    const userList = JSON.parse(localStorage.getItem("CadastroUsuarios")) || []

    const userIndexFind = userList.findIndex((user) => user.id == id)

    if (userIndexFind !== -1) {
        userList[userIndexFind].nome = newName;
        userList[userIndexFind].email = newEmail;
        userList[userIndexFind].cel = newCel;
        userList[userIndexFind].city = newCity;

        console.log(userList);

        localStorage.setItem("CadastroUsuarios", JSON.stringify(userList));
    }

    modalClose();
    window.location.reload();
}

function deleteUser(id) {
    const getUserData = JSON.parse(localStorage.getItem("CadastroUsuarios"));

    const findUser = getUserData.findIndex((user) => user.id == id);

    if (findUser !== -1) {
        getUserData.splice(findUser, 1);

        localStorage.setItem("CadastroUsuarios", JSON.stringify(getUserData));

        window.location.reload();
    }
}