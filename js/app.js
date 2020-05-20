function pegarId(id,valor){
  return document.getElementById(id).textContent = valor;
}

function listaEmBranco(){

  let lista = document.getElementById('listaUsers');
  lista.textContent = '';

  const countUser = document.createElement('h5');
  countUser.innerText = ('Nenhum usuário filtrado');
  lista.appendChild(countUser);

  pegarId("totalMasculino",`Sexo Masculino: 0`);
  pegarId("totalFeminino", `Sexo Feminino: 0`);
  pegarId("totalIdade",`Soma das idades: 0`);
  pegarId("mediaIdade",`Média das idades: 0`);

}

function createListaUsers(users) {
  
  let lista = document.getElementById('listaUsers');
  lista.textContent = '';

  const totalUsers = users.length;
  const totalMasculino = users.filter(e => e.gender == 'male').length;
  const totalFeminino = users.filter(e => e.gender == 'female').length;
  const totalIdade = users.map(e => e.dob.age).reduce((total, num) => total + num);
  const mediaIdade = (totalIdade / totalUsers).toFixed(2);

  pegarId("totalMasculino",`Sexo Masculino: ${totalMasculino}`);
  pegarId("totalFeminino", `Sexo Feminino: ${totalFeminino}`);
  pegarId("totalIdade",`Soma das idades: ${totalIdade}`);
  pegarId("mediaIdade",`Média das idades: ${mediaIdade}`);

  const countUser = document.createElement('h5');

  countUser.innerText = ((totalUsers >= 2)
    ? totalUsers + ' usuários filtrados'
    : totalUsers + ' usuário filtrado'
  )

  lista.appendChild(countUser)

  users.map((e, i, arr) => {

    const { picture, dob = dob, gender, name } = e;

    const ul = document.createElement('ul');
    ul.className = "collection mb-0";

    const li = document.createElement('li');
    li.className = "collection-item avatar";
    li.style.minHeight = '20px';

    const img = document.createElement('img');
    img.src = picture.thumbnail;
    img.className = "circle";

    const pNome = document.createElement('p');
    pNome.className = "font-weight-600";
    pNome.innerText = `${name.first} ${name.last}`;

    const pIdade = document.createElement('p');
    pIdade.className = "medium-small";
    pIdade.innerText = `Idade: ${dob.age} - ${(gender == 'male') ? 'Masculino' : 'Feminino'}`;

    li.appendChild(img);
    li.appendChild(pNome);
    li.appendChild(pIdade);
    ul.appendChild(li);

    lista.appendChild(ul);
  })

}

function filtroBusca() {
  fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo').then(
    res => res.json().then(
      data => {
        let users = data.results;
        let inputBusca = document.getElementById('busca');
        let { value } = inputBusca;

        let filtro = users.filter(e =>{
          let nomeCompleto = `${e.name.first} ${e.name.last}`;         
          
          return nomeCompleto.toLowerCase().includes(value.toLowerCase())
        })
        
        if(filtro.length >= 1) { 
          createListaUsers(filtro);
        }else{
          listaEmBranco()
        }

      }
    )
  ).catch(error => console.log('Error'))

}

window.addEventListener("input", () => filtroBusca());
