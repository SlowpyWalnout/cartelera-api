let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
    if (pagina < 1000) {
        pagina++;
        cargarPeliculas1();    
    }else{
        return;
    }
});
btnAnterior.addEventListener('click', () => {
    if(pagina === 1) return;
    pagina--;
    cargarPeliculas1();
})

// funcion del video
const api_key = '1e7647037eda3e07bdbd9d7627d85820';
//fetch necesita trabajar con funciones asincronas, es por eso que uso async.
const cargarPeliculas1 = async () =>{
    //la peticion se reaaliza con un try catch para poder capturar los errores si es que existen
    try{
        //se realiza la peticion y se debe de almacenar la respuesta en una variable
        //se utiliza await para esperar la respuesta de la peticion
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=es-MX&page=${pagina}`)
        //se muestra la respuesta recibida en consola
        console.log(respuesta)
        //se comprueba si la respuesta es correcta
        if (respuesta.status === 200){
            //respuesta.json convierte la respuesta en un objeto json y se alamcena en una variable
            const datos = await respuesta.json();
            console.log(datos)
            //podemos acceder a los datos de la respuesta llamando los atributos del objeto
            if(datos.title === undefined){
                // //se recorre el arreglo de objetos para mostrar los titulos de las peliculas
                // for (let i = 0; i < datos.results.length; i++){
                //     console.log(datos.results[i].title)
                // }
                // console.log(datos.results[0].title)
                
                //podemos usar el forEach para recorrer el arreglo de objetos en lugar de un for tradicional
                let peliculas = '';

                datos.results.forEach(pelicula => {
                    peliculas += `
                        <div class="pelicula">
                            <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                            <h3 class="titulo">${pelicula.title}</h3>
                            <p>Fecha de estreno: ${pelicula.release_date}</p>
                            <p>Calificacion: ${pelicula.vote_average}</p>
                            <p>Popularidad: ${pelicula.popularity}</p> 
                        </div>
                    `;
                });
                document.getElementById('contenedor').innerHTML = peliculas;
            }else{
                console.log(datos.title)
            }
            
        }else if(respuesta.status === 404){
            //se muestra el mensaje indicando los errores que puede brindar la api
            console.log('No se encontraron resultados')
        }else{
            //se muestra un mensaje en caso de que ocurra un error desconocido
            console.log('Ocurrio un error desconocido')
        }
        
    } catch (error){ //catch captura el error en caso de no poder realizar la peticion
        //lo que realizamos con el error va dentro de las llaves
        console.log(`error: ${error}`)
    }
    
}
cargarPeliculas1();