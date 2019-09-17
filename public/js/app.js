function renderCharacter(character) {
    document.getElementById("renderHere").innerHTML += `<div class="col-md-3"><div class="card text-white bg-secondary">
        <img class="card-img-top" src="${character.image}" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${character.name}</h5>
            <div class="row list-info">
                <p class="col-auto text-left">Estado: </p><span class="col text-right">${character.status}</p>
            </div>
            <div class="row list-info">
                <p class="col-auto text-left">Especie: </p><span class="col text-right">${character.species}</p>
            </div>
            <div class="row list-info">
                <p class="col-auto text-left">Genero: </p><span class="col text-right">${character.gender}</p>
            </div>
            <div class="row list-info">
                <p class="col-auto text-left">Origen: </p><span class="col text-right">${character.origin.name}</p>
            </div>
        </div>
        <div class="card-body text-right">
            <a href="index.html?character=${character.id}" class="btn btn-blue">Ver más</a>
        </div>
        </div></div>`;
}

function checkResults(data){
    if(data.results){
        data.results.map(val => renderCharacter(val));
    }else{
        console.log("mostrar mensaje de error")
    }
}

function ajaxHandler(url, cb) {
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            cb(data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function renderUniqueCharacter(data){
    console.log(data);
    document.getElementById("renderHere").innerHTML = `
    <div class="col-md-12 text-center">
        <h2>${data.name}</h2>
    </div>
    <div class="col-md-4">
        <img class="img-fluid" src="${data.image}" alt="Card image cap">
    </div>
    <div class="col-md-8 row">
        <div class="col-md-6 details">Estado: </div><div class="col-md-6 details">${data.status}</div>
        <div class="col-md-6 details">Especie: </div><div class="col-md-6 details">${data.species}</div>
        <div class="col-md-6 details">Tipo (subespecie): </div><div class="col-md-6 details">${data.type}</div>
        <div class="col-md-6 details">Genero: </div><div class="col-md-6 details">${data.gender}</div>
        <div class="col-md-6 details">Planeta de origen: </div><div class="col-md-6 details">${data.origin.name}</div>
        <div class="col-md-6 details">Localizacion actual: </div><div class="col-md-6 details">${data.location.name}</div>
        <div class="col-md-6 details">Episodios: </div><div id="listEpisodes" class="col-md-6 details">------------</div>
    </div>`;
}

function initApp(){
    const urlParams = getUrlVars();
    if(urlParams.hasOwnProperty("name")){//Si tenemos algo que buscar
        ajaxHandler(`https://rickandmortyapi.com/api/character/?name=${urlParams["name"]}&status=${urlParams["status"]}`, checkResults);
    }else if(urlParams.hasOwnProperty("character")){//Si tenemos parametro de personaje
        ajaxHandler(`https://rickandmortyapi.com/api/character/${urlParams["character"]}`, renderUniqueCharacter);
    }else{//Si no mostramos todos los personajes
        ajaxHandler("https://rickandmortyapi.com/api/character", function (data) {
            data.results.map(val => renderCharacter(val));
            console.log(data)
        });
    }
}

initApp();