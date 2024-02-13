const BASE_URL = "http://www.omdbapi.com/?apikey=f81df190&"
const queryField = document.querySelector('.input')
let counter = 0
let results = document.querySelector('.search-results')
let loaded = false

queryField.addEventListener('input', function(e){
    // e.preventDefault()

    let query = e.target.value

    // searchMovie(query.value)
    // getMovie(query, 500)

    debounce(query, 500)

    // document.querySelector('.search-results__poster').setAttribute('src', movieInfo[0].Poster)
    // document.querySelector('.search-results__title').setAttribute('src', movieInfo[0].Title)


})


async function searchMovie(query){
    let res = await fetch(`${BASE_URL}s=${query}`)
    let data = await res.json()
    // console.log(data.Search)
    if(data.Search){
        data.Search.forEach(item => {
        results.appendChild(renderSearchItem(item))
    });
    }
}

function debounce (val, timeout) {
    counter++

    if(counter != 1){
        clearTimeout(timeOutFunc)
    }

    if (val.length > 0) {
        timeOutFunc = setTimeout( ()=>{
        console.log(val)
        searchMovie(val)
        loaded = true
        // fillUpInfo(movieData)
        // renderSearchItem()
    }, timeout)
    }

}


function renderSearchItem(item){
    let wrap = document.createElement('article')
    wrap.classList.add('search-results__item')

    let poster = document.createElement('picture')
    poster.classList.add('search-results__poster')
    poster.innerHTML = `<img src="${item.Poster}" alt="${item.Title}"></img>`
    wrap.appendChild(poster)

    let title = document.createElement('h2')
    title.classList.add('search-results__title')
    title.innerText = item.Title
    wrap.appendChild(title)

    let about = document.createElement('p')
    about.classList.add('search-results__about')
    about.innerHTML += `<span class "search-results__year"> ${item.Year}</span>`
    about.innerHTML += `<span class "search-results__type"> ${item.Type}</span>`
    wrap.appendChild(about)

    let link = document.createElement('a')
    link.setAttribute('href', `single.html?i=${item.imdbID}`)
    link.innerText = 'About'
    link.innerHTML +=  `<span class="material-symbols-outlined">arrow_forward_ios</span>`
    wrap.appendChild(link)

    return wrap
}

document.addEventListener('scroll', ()=> {
    // let mainHeight = document.querySelector('.search-results').clientHeight
    if (document.querySelector('.search-results').getBoundingClientRect().bottom - 100 < window.innerHeight && loaded === true){

        console.log('start func')
        loaded = false

    }
})