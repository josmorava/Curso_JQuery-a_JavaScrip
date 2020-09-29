console.log('hola mundo!');
const noCambia = "Jose";

let cambia = "@JoseMorales"

function cambiarNombre(nuevoNombre) {
  cambia = nuevoNombre
}

//Creando promesa, la promesa necesita dos parametros donde uno se jecuta si todo sale bien y uno por si todo sale mal
const getUserAll = new Promise(function(todoBien, todoMal) {
  //Llama a un api
  setTimeout(function(){
    todoBien('se acabo el tiempo')
  }, 5000)
}) 


const getUser = new Promise(function(todoBien, todoMal) {
  //Llama a un api
  setTimeout(function(){
    todoBien('se acabo el tiempo 2')
  }, 2000)
}) 

/*
getUser
  //Si todo a ido bien se utiliza en then
  .then(function(){ //Promesa instantánea
    console.log('todo esta bien en la vida')
  })

  //Cuando la promesa se rechaza o falla se utiliza catch
  .catch(function(message){
    console.log(message)
  })
*/

  //forma de mandar multiples promesas .all
  //Forma de llamar la promesa que termine primero .race
Promise.race([
  getUser,
  getUserAll
])
  .then(function(message){
    console.log(message)
  })
  .catch(function(message){
    console.log(message)
  });


//Forma de traer datos de un servidor externo con jQery, ta,bioen conocido como un XMLHttpRequest
  $.ajax('https://randomuser.me/api', {
    method: 'GET',
    success : function(data){
      console.log(data)
    },
    error : function(error){
      console.log(error)
    }
  });



//Forma de traer datos de un servidor externo utilizando el método vanilla por defecto, esto devuelve una promesa
/*fetch('https://randomuser.me/api')
  .then(function(response){
    // console.log(response)
    return response.json()
  })
  .then(function(user){
    console.log('user', user.results[0].name.first)
  })
  .catch(function(){
    console.log('algo fallo')
  });*/

//Funciones asincronas
(async function load () {
  // await 
  //asction
  //terror
  //animation
  async function getData(url){  
    const response = await fetch(url);
    const data = await response.json();
    if (data.data.movie_count > 0){
      return data;
    }
    throw new Error ('No se encontro ningun resultado');
    return data
  }

  const $form = document.getElementById('form');
 const $home = document.getElementById('home')
 const $featuringContainer = document.getElementById('featuring')
 


//Reto modificar la lista de amigos agregandoles datos externos de la APi de ramdonUsers y jugando con ellos.
/*
1) traer los datos de la api
2) indicar donde se agregaran los datos traidos(debe ser dentro del html)
3) introducir esos datos dentro de html, aquí debe crearse una plantilla e indicar donde se agregaran los datos traidos desde la API.
4) crear una plantilla donde pase el paso @3
5) crear una funcion que agregue la platilla en el dom, o lo que se conoce como renderizado.
6)llamar la funcion
*/


/*const {results:userList} = await getData(`https://randomuser.me/api/?results=8`) //Llamado a la api
const $users = document.querySelector('.playlistFriends')//declarando donde se guardaran los datos, que será en la clase del CCS con ese nombre 

function userListTemplate (users){
  return (
    `
    <li class="playlistFriends-item">
              <a href="#">
                <img src="${users.picture.thumbnail}" alt="Imagen del usuario" />
                <span>
                  ${users.name.first} ${users.name.last}
                </span>
              </a>
            </li>
    `
  )//Tomando los valores de la API que necesitamos, que son nombre e imagen, los cuales vamos a agregar al DOM
}

function renderUsers (list, $container){
  list.forEach((user) => {
    const plantillaDeUsuario = userListTemplate(user)
    const userElement = createTemplate(plantillaDeUsuario)
    $container.append(userElement)//Agregando al final de container el elemento userElement
  })
}
renderUsers(userList,$users )
*/




 //Agregando atributos css 
function setAttributes($element, attributes){
  for(const attribute in attributes){
    $element.setAttribute(attribute, attributes[attribute]);
  }
}
//Al colocar una constante en mayusculas se entiende que es una constante que no va a cambiar en toda la ejecucion del codigo
const BASE_API = 'https://yts.mx/api/v2/'

function featuringTemplate(peli){
  return (
    `
    <div class="featuring">
        <div class="featuring-image">
          <img src="${peli.medium_cover_image}" width="70" height="100" alt="">
        </div>
        <div class="featuring-content">
          <p class="featuring-title">Pelicula encontrada</p>
          <p class="featuring-album">${peli.title}</p>
        </div>
      </div>
    `
  )
}

//Evento de busqueda en la barra de website
$form.addEventListener('submit', async (event) =>{
  event.preventDefault();//quita la recarga al submit
  $home.classList.add('search-active')
  const $loader = document.createElement('img');
  setAttributes($loader, {
    src : 'src/images/loader.gif',
    height: 50,
    width: 50,
  })
  $featuringContainer.append($loader);

  //FormData permite extraer datos de un formulario para agregar nuevos
  const data = new FormData($form)
  try{
    const {data: {movies: pelis}} = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`) //Constante de las busqueda de las peliculas en el form
    const HTMLString = featuringTemplate(pelis[0])
    $featuringContainer.innerHTML = HTMLString;

  } catch (error){
    alert(error.message);
    $loader.remove();
    $home.classList.remove('search-active');
  }
 }) 


function videoItemTemplate(movie, category){
  return (
`<div class="primaryPlaylistItem" data-id="${movie.id}" data-category="${category}">
  <div class="primaryPlaylistItem-image">
    
    <img src="${movie.medium_cover_image}">
  </div>
  <h4 class="primaryPlaylistItem-title">
    ${movie.title}
  </h4>
</div>`
  )
}

//funcion que crea una platilla HTML
function createTemplate(HTMLString){

  //Aquí se indica que se va a implementar un elemento html en el DOM
  const html = document.implementation.createHTMLDocument()

  //Aquí se le indica específicamente en que lugar se va a agregar ese elemento creado, que va a ser en el body 
  html.body.innerHTML = HTMLString;

  return html.body.children[0];
}

function addEventClick($element){
  $element.addEventListener('click', () =>{
    showModal($element) //funcion para mostrar el modal
  })

}

function renderMovieList(list, $container, category){
  // actionList.data.movies
  $container.children[0].remove();//Eliminar reload
  list.forEach((movie) => {
    const HTMLString = videoItemTemplate(movie, category) 
    const movieElement = createTemplate(HTMLString)
    $container.append(movieElement)
    const image = movieElement.querySelector('img')
    image.addEventListener('load' , (event) =>{
      event.srcElement.classList.add('fadeIn')
    })
    addEventClick(movieElement) 
  })
}

const { data : {movies : actionList}} = await getData(`${BASE_API}list_movies.json?genre=action`)
window.localStorage.setItem('actionList',JSON.stringify(actionList))//Guardando datos con la propiedad local storage
const $actionContainer = document.querySelector('#action')
renderMovieList(actionList,$actionContainer, 'action')

const {data:{movies: dramaList}}= await getData(`${BASE_API}list_movies.json?genre=drama`)
window.localStorage.setItem('dramaList',JSON.stringify( dramaList))
const $dramaContainer = document.getElementById('drama')
renderMovieList(dramaList,$dramaContainer, 'drama')

const {data :{movies : animationList}}= await getData(`${BASE_API}list_movies.json?genre=animation`)
window.localStorage.setItem('animationList',JSON.stringify( animationList))
const $animationContainer = document.getElementById('animation')
renderMovieList(animationList,$animationContainer, 'animation')





  //Forma de traer un selector de html/css
//  const $home =  $('.home');
 const $modal = document.getElementById('modal')
 const $overlay = document.getElementById('overlay')
 const $hideModal = document.getElementById('hide-modal')
 
  const $modalImg = $modal.querySelector('img');
  const $modalTitle = $modal.querySelector('h1');
  const $modalDescription = $modal.querySelector('p');

 function findById (list, id){
  return list.find( movie=> movie.id === parseInt(id, 10))
 }

function findMovie(id, category){
  //Forma de entrar en lsitas dentro de js, Array.find() y modificar ciertos valores
  actionList.find( movie=> movie.id === parseInt(id, 10))
  switch (category){
    case 'action' : {
      return findById(actionList, id)      
    }
    case 'drama' : {
      return findById(dramaList, id)      
    }
    default : {
      return findById(animationList, id)
    }
  }
}

function showModal ($element){
  $overlay.classList.add('active')
  $modal.style.animation = 'modalIn .8s forwards'
  const id = $element.dataset.id;
  const category = $element.dataset.category;
  const data = findMovie(id, category)

  $modalImg.setAttribute('src', data.medium_cover_image);
  $modalTitle.textContent = data.title;
  $modalDescription.textContent = data.description_full;
}

 $hideModal.addEventListener('click', hideModal)
 function hideModal (){
  $overlay.classList.remove('active')
  $modal.style.animation = 'modalOut .8s forwards'
 }

// function videoItemTemplate(src,title){
//   return (
// `<div class="primaryPlaylistItem">
//   <div class="primaryPlaylistItem-image">
//     <img src="${src}">
//   </div>
//   <h4 class="primaryPlaylistItem-title">
//     ${title}
//   </h4>
// </div>`
//   )
// }
// console.log(videoItemTemplate('src/'))


}) ()
