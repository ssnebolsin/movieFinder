const BASE_URL = "http://www.omdbapi.com/?apikey=f81df190&"
let searchParams = new URLSearchParams(window.location.search)
console.log(window.location.search)
console.log(searchParams.get('i'))

if(searchParams.has('i')){

    let movieInfo = getMovie(searchParams.get('i'))
    movieInfo.then(data =>{
            document.querySelector('.single__poster-img').setAttribute('src', data.Poster)
            document.querySelector('.single__poster-img').setAttribute('alt', data.Title)
            document.querySelector('.single__title').innerText = data.Title
            document.querySelector(".single__plot").innerText = data.Plot
            document.querySelector(".single__imdb-score-value").innerText = data.imdbRating
            console.log(data)
    })



} else {
    redirectHome('movie not found')
}

async function getMovie (query){
    let res = await fetch(`${BASE_URL}i=${query}&plot=full`)
    let data = await res.json()
    return data
}

function redirectHome (msg){
    alert(msg)
    window.location.replace('index.html')
}