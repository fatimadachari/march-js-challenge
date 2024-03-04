document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#city-name').value;

    if (!cityName) {
        document.querySelector("#weather").classList.remove('show');
        showAlert('Você precisa digitar uma cidade...');
        return;
    }

    const apiKey = '04039b65e1dd6b57c53532c51b65f9c4';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`

    const results = await fetch(apiUrl);
    const json = await results.json();

    if (json.cod === 200) {
        showInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity,
        });
        atualizarDataHora();
    } else {
        document.querySelector("#weather").classList.remove('show');
        showAlert(`
            Não foi possível localizar...

            <img src="./images/404.svg"/>
        `)
    }
});

function showInfo(json){
    showAlert('');

    document.querySelector("#weather").classList.add('show');

    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`;

    document.querySelector('#temp-value').innerHTML = `${json.temp.toFixed(0)} <sup>C°</sup>`;
    document.querySelector('#temp-description').innerHTML = `${json.description}`;
    document.querySelector('#temp-img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    document.querySelector('#temp-max').innerHTML = `${json.tempMax.toFixed(0)} <sup>C°</sup>`;
    document.querySelector('#temp-min').innerHTML = `${json.tempMin.toFixed(0)} <sup>C°</sup>`;
    document.querySelector('#humidity').innerHTML = `${json.humidity}%`;
    document.querySelector('#wind').innerHTML = `${json.windSpeed.toFixed(1)}km/h`;
    
    atualizarDataHora();
}

function showAlert(msg) {
    document.querySelector('#alert').innerHTML = msg;
}

function atualizarDataHora() {
    let agora = new Date();

    let dataBrasil = new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'full'
    }).format(agora);

    document.querySelector('#subtitle').textContent = dataBrasil;
}