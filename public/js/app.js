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

function pagination(data){
    const urlParams = getUrlVars();
    const page = urlParams["page"];
    const prev = parseInt(page)-1;
    const next = parseInt(page)+1;
    document.getElementById("renderHere").innerHTML += `<div class="col-md-12">
        <ul class="pagination justify-content-center">
            <li class="page-item"><a id="prev" class="page-link btn btn-blue" href="index.html?name=${urlParams["name"]||""}&status=${urlParams["status"]||""}&page=${prev||""}">Previous</a></li>
            <li class="page-item"><a class="page-link btn btn-blue-dark">${page}</a></li>
            <li class="page-item"><a id="next" class="page-link btn btn-blue" href="index.html?name=${urlParams["name"]||""}&status=${urlParams["status"]||""}&page=${next||""}">Next</a></li>
        </ul></div>`;
}

function checkResults(data){
    const urlParams = getUrlVars();
    if(data.results){
        data.results.map(val => renderCharacter(val));
        pagination(data);
    }else{
        console.log("mostrar mensaje de error")
        document.getElementById("tubusqueda").innerText = ` ${urlParams["name"]} `;
        error.style.display = 'block';
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

function insertEpisodes(episodes){
    document.getElementById("listEpisodes").innerHTML += episodes.map(function(episode){
        let arrEpisode = episode.split('/');
        return `<a href=""> ${arrEpisode.pop()}</a>`
    });
}

function renderUniqueCharacter(data){
    document.getElementById("renderHere").innerHTML = `
    <button type="button" id="backButton" class="btn btn-blue mt-3">Atrás</button>
    <div id="fichaActor" class="col-md-12 row" >
    <div class="col-md-12 text-center">
        <h2 id="nameCharacter">${data.name}</h2>
    </div>
    <div class="col-md-4">
        <img class="rounded img-fluid" src="${data.image}" alt="Card image cap">
    </div>
    <div class="col-md-8 row">
        <div class="col-md-4 details"><p>Estado:</p></div><div class="col-md-8 details">${data.status}</div>
        <div class="col-md-4 details"><p>Especie:</p></div><div class="col-md-8 details">${data.species}</div>
        <div class="col-md-4 details"><p>Tipo (subespecie):</p></div><div class="col-md-8 details">${data.type}</div>
        <div class="col-md-4 details"><p>Genero:</p> </div><div class="col-md-8 details">${data.gender}</div>
        <div class="col-md-4 details"><p>Planeta de origen:</p></div><div class="col-md-8 details">${data.origin.name}</div>
        <div class="col-md-4 details"><p>Localizacion actual:</p></div><div class="col-md-8 details">${data.location.name}</div>
        <div class="col-md-4 details"><p>Episodios:</p></div><div id="listEpisodes" class="col-md-8 details"></div>
    </div></div>`;
    insertEpisodes(data.episode);
    document.getElementById("backButton").addEventListener('click',function(){window.history.back()},false);
}

function initApp(){
    const urlParams = getUrlVars();
    var error = document.getElementById('error');
    error.style.display = 'none';

    if(urlParams.hasOwnProperty("character")){//Si tenemos parametro de personaje
        ajaxHandler(`https://rickandmortyapi.com/api/character/${urlParams["character"]}`, renderUniqueCharacter);
    }else{
        ajaxHandler(`https://rickandmortyapi.com/api/character/?name=${urlParams["name"]||""}&status=${urlParams["status"]||""}&page=${urlParams["page"]||""}`, checkResults);
    }
}

initApp();