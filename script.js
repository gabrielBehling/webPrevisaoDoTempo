const apiKey = 'd572bc1cbc801dc1b19e926c9ce6c726'
var searchBar = document.querySelector('#search-bar')

function handleKeyDown(){
    if(event.key === 'Enter') {
        getData();        
    }
}

async function getData() {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchBar.value}&appid=${apiKey}&units=metric&lang=pt_br`

    try {
        var res = await fetch(url)
        var data = await res.json()
        if (data.cod != 200) { throw new Error(data.message) }
        showNewData(data)

    } catch (error) {
        if (data.cod == 404){ alert("Cidade não encontrada")}
        else { console.log(error); }
        searchBar.value = ''
        return
    } 
}

function showNewData(data){
    var city = data.name
    var temp = data.main.temp
    var tempSensation = data.main.feels_like
    var slug = data.weather[0].description
    var slugImg = data.weather[0].icon
    var humidity = data.main.humidity

    searchBar.value = ''
    document.querySelector('#city').innerHTML = 'Tempo em ' + city
    document.querySelector('#temp').innerHTML = (Math.round(temp)) + '°C'
    document.querySelector('#temp-sensation').innerHTML = 'Sensação termica: '+ (Math.round(tempSensation)) + '°C'
    document.querySelector('#slug-text').innerHTML = slug
    document.querySelector('#slug-img').src = `https://openweathermap.org/img/wn/${slugImg}.png`
    document.querySelector('#humidity').innerHTML = 'Humidade Relativa do Ar: ' + humidity + '%'
}
