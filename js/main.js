const BASE_URL = "https://www.omdbapi.com/?apikey=f81df190&"
const queryField = document.querySelector('.input')
let counter = 0
let results = document.querySelector('.search-results')
let loaded = false
let historyItemsList



window.onload = () => {
    localStorageGetHistoryItems ();
  };

queryField.addEventListener('input', function(e){

    let query = e.target.value
    debounce(query, 1000)

})

async function searchMovie(query){
    let res = await fetch(`${BASE_URL}s=${query}`)
    let data = await res.json()
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
            chatSocket.send(val)
            history.innerHTML += showItem(val)
            localStorageSetHistoryItem(val)

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

    let info = document.createElement('div')
    info.classList.add('search-results__data')
    wrap.appendChild(info)

    let title = document.createElement('h2')
    title.classList.add('search-results__title')
    title.innerText = item.Title
    info.appendChild(title)

    info.innerHTML += `<p class = "search-results__type"> Type: ${item.Type}</p>`
    info.innerHTML += `<p class = "search-results__year"> Year: ${item.Year}</p>`

    let link = document.createElement('a')
    link.classList.add('search-results-link')
    link.setAttribute('href', `single.html?i=${item.imdbID}`)
    link.innerText = 'About'
    info.appendChild(link)

    return wrap
}

document.addEventListener('scroll', ()=> {
    if (document.querySelector('.search-results').getBoundingClientRect().bottom - 100 < window.innerHeight && loaded === true){

        console.log('start func')
        loaded = false

    }
})

// ######### Sockets ###########
const history = document.querySelector('.requests-history')

const wsUri = 'wss://socketsbay.com/wss/v2/1/d0173ca5185ec7768d52d25fc4c277b7/'

let chatSocket = new WebSocket(wsUri)

chatSocket.onopen = function (){
    console.log('socket is open')
}

chatSocket.onmessage = function (event){
    history.innerHTML += showItem(event.data)
}

function showItem(item){
    console.log(item)
    return `<div class="requests-history-item">${item}</div>`
}

function localStorageSetHistoryItem(item){
    historyItemsList = localStorage.getItem('historyItems')
    if(historyItemsList){
        historyItemsList = historyItemsList.split(',')
    } else {
        historyItemsList = []
    }
    
    historyItemsList.push(item)
    localStorage.setItem('historyItems', historyItemsList)
}

function localStorageGetHistoryItems (){
    let histItems = localStorage.getItem('historyItems')
    if(histItems){
        histItems.split(',').forEach(item => {
        history.innerHTML += showItem(item)
        })
    }

}

let historyAll = document.querySelectorAll('.requests-history')

historyAll.forEach((item)=> {
    item.addEventListener('click', function(e){
        console.log(e.target.innerText)
        searchMovie(e.target.innerText)
    })
})
