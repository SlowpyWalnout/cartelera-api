let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
    if(pagina < 1000){
        pagina++;
        obtenerPeliculas();
    }else{
        return;
    }
});
btnAnterior.addEventListener('click', () => {
    if(pagina === 1) return;
    pagina--;
    obtenerPeliculas();
});



const obtenerPeliculas = async() => {
    try{
    const respuesta = await axios.get(`https://api.themoviedb.org/3/movie/popular`,{
        headers:{
            'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTc2NDcwMzdlZGEzZTA3YmRiZDlkNzYyN2Q4NTgyMCIsInN1YiI6IjY2MzI3MThjODNlZTY3MDEyNDQwMGNlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rniFoZ7KEwQW4XtvOEmH3zuha6WSh5QL5wBV9rGLFhY'
        },
        params:{
            language: 'es-MX',
            page: pagina
        }
    })
    const datos = respuesta.data;
    movies = '';
    datos.results.forEach(pelicula => {
        movies += `
            <div class="pelicula">
                <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                <h3 class="titulo">${pelicula.title}</h3>
                <p>Fecha de estreno: ${pelicula.release_date}</p>
                <p>Calificacion: ${pelicula.vote_average}</p>
                <p>Popularidad: ${pelicula.popularity}</p>
            </div>
        `;
    });
    document.getElementById('contenedor').innerHTML = movies;
    } catch(error){
        console.log(error)
    }
}
obtenerPeliculas();