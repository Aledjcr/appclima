//con el que se puede consumir la siguiente URL 
const urlBase = 'http://api.openweathermap.org/data/2.5/forecast'

// Objeto con las coordenadas (Latitud y Longitud) de los lugares:
let coordenadasLugaresDeEscalada = {
    cuevaBrujas: [-32.1570956, -64.42866637407612],
    altaGracia: [-31.665880005712438, -64.45411360952754],
    laOla: [-31.665217510019676, -64.89784150583195],
    copina: [-31.566199394948917, -64.7099729116561]
}

//guardo los ID en un array
const nuevoArray = Object.values(coordenadasLugaresDeEscalada)
// console.table(nuevoArray) <-(Punto en el que corroboro si quedaron bien estructurados los datos)
// console.log(nuevoArray)   <-(Punto en el que corroboro si quedaron bien estructurados los datos)

//Esta funcion me ayuda a armar cada URL con la cual luego se realizará la peticion a la API mediante el método fetch. Esta funcion devuelve un objeto "peticiones" con 4 URL´s.
function crearPeticioens(object) {
    let peticiones = []
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            const element = object[key]
            const latitud = element[0];
            const longitud = element[1];
            const peticion = `${urlBase}?lat=${latitud}&lon=${longitud}&appid=${process.env.API_KEY}&units=metric`;
            peticiones.push(peticion);            
        }
    }
    // console.log(peticiones); <-(Punto en el que corroboro si quedaron bien estructurado el objeto)
    return (peticiones)
}

//acá estoy usando la funcion y le estoy pasando el array que ya creé con las coordenadas.
crearPeticioens(nuevoArray); //esto me devuelve un objeto con las URL´s ya listas para hacer las consultas.


//Ya que en la funcion anterior creé un objeto con los las URL de las consultas ahora  tengo que pasarlas al método Fetch(): para poder esperar los datos en formato Json con la informacion.

function fetchWeatherData(urls) {
    urls.forEach(url => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                let mainDiv = document.querySelector(".mainDiv")
                mainDiv.innerHTML +=
                    `<div class="clima-container">
                        <div class="nameLocation">
                            <span>${data.city.name}</span>
                        </div>
                        <div class="weather-icon"> 
                        <span class="feels_like">Sensacion termica ${Math.round(data.list[0].main.feels_like)}° </span>
                        
                        </div>
                        <div class="mainTemperature">
                            ${
                                Math.round(data.list[0].main.temp)}°
                        </div>
                        <div class="description">
                            <h2>${data.list[0].weather[0].description}</h2>
                        </div>
                        <div class="forecast">
                            <ul>
                                <li>
                                    <div class="day">Today</div>
                                    <div class="temperature">${data.list[0].main.temp_min} - ${data.list[0].main.temp_max}</div>
                                </li>
                                <li>
                                    <div class="day">Wednesday</div>
                                    <div class="temperature">${data.list[5].main.temp_min} - ${data.list[5].main.temp_max}</div>
                                </li>
                                <li>
                                    <div class="day">Thursday</div>
                                    <div class="temperature">${data.list[10].main.temp_min} - ${data.list[10].main.temp_max}</div>
                                </li>
                            </ul>
                        </div> <br>
                        <a href="#" class="more">more ></a>
                    </div> `
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
}

// Al instanciar la funcion con los parametros damos inicio del programa:
fetchWeatherData(crearPeticioens(nuevoArray));