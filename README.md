# [Prueba-Deplace](https://calope03.github.io/Prueba-Deplace/index.html?page=1)

[https://calope03.github.io/Prueba-Deplace/index.html?page=1](https://calope03.github.io/Prueba-Deplace/index.html?page=1)

## Introduccion

La prueba consistía en conectarse a la [API](https://rickandmortyapi.com) de Rick & Morty y listar todos los personajes con su información, pudiendo ver la ficha de cada personaje.

## Paso a paso

### Conectarse a la API

Para hacer las llamadas a la API utilizo el metodo `fetch` de JavaScript.

Al iniciar la aplicacion se leen los parametros de la URL y en funcion de los valores de los parametros se realiza una llamada a la API distinta. Existen tres opciones distintas:

- Que en la URL exista algun parametro de busqueda
- Cargar todos los personajes de rick y morty
- Que en la URL exista el identificador de un personaje concreto


### Busqueda

Si en la URL existe algun parametro de busqueda, antes de renderizar los resultados, comprobamos si la API ha devuelto algun resultado que coincida con esos parametros de busqueda, si no se muestra el error.

```js
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
```

### Cargar los personajes

Accedo al DOM para renderizar los personajes mediante una funcion map sobre los datos que devuelve la API.

### Identificador de caracter

Si en la URL existe el identificador de un caracter, renderizo en el DOM la ficha de un personaje con la informacion extendida.
