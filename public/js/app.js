function renderCharacter(character) {
    document.querySelector(".row").innerHTML += `<div class="col-md-3"><div class="card">
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
            <a href="#" class="btn btn-primary">Ver más</a>
        </div>
        </div></div>`;
    console.log("Character:", character);
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

function initApp(){
    const urlParams = getUrlVars();
    if(urlParams.hasOwnProperty("q")){//Si tenemos algo que buscar

    }else if(urlParams.hasOwnProperty("artist")){//Si tenemos parametro artista

    }else{//Si no mostramos el top segun el pais
        ajaxHandler("https://rickandmortyapi.com/api/character", function (data) {
            data.results.map(val => renderCharacter(val));
        });
    }
}

initApp();