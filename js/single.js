const BASE_URL = "https://www.omdbapi.com/?apikey=f81df190&"
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
            document.querySelector(".single__genre").innerText = `Genre: ${data.Genre}`
            document.querySelector(".single__country").innerText = `Country: ${data.Country}`
            document.querySelector(".single__lang").innerText = `Language: ${data.Language}`
            document.querySelector(".single__runtime").innerText = `Runtime: ${data.Runtime}`
            console.log(data)
    })

} else {
    redirectHome('movie not found')
}

async function getMovie (query){
    let loader = document.createElement('div')
    loader.classList.add('loader')
    document.body.appendChild(loader)

    let res = await fetch(`${BASE_URL}i=${query}&plot=full`)
    let data = await res.json()

    loader.classList.add('loader-hidden')
    setTimeout(()=>{
        document.body.removeChild(loader)
    }, 1000)
    return data

}

function redirectHome (msg){
    alert(msg)
    window.location.replace('index.html')
}