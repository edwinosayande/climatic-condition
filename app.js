const cityForm = document.querySelector('form');
const outerCard = document.querySelector('.card'); 
const tempDetails = document.querySelector('.details');
const imgTimeDisplay = document.querySelector('img.time');
const imgIcon = document.querySelector('.icon img');



const updateUI = (dataInfo) => {
    const locationCity = dataInfo.cityDetails;
    const climateCondition = dataInfo.weatherDetails;


// update details template
    tempDetails.innerHTML = `
    <h5 class="my-3">${locationCity.EnglishName}</h5>
        <div class="my-3">${climateCondition.WeatherText}</div>
        <div class="disply-4 my-4">
            <span>${climateCondition.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
            </div>
    `
    const iconSource = `icons/${climateCondition.WeatherIcon}.png`;
    imgIcon.setAttribute('src', iconSource);

    // update day and night icon
    let timeSource = 'null'
    if(climateCondition.IsDayTime){
        timeSource = 'image/day.jpg';
    }else{
        timeSource = 'image/night.jpg';
    }

    imgTimeDisplay.setAttribute('src', timeSource);
    // remove d-none class if present
if(outerCard.classList.contains('d-none')) {
    outerCard.classList.remove('d-none');
};

}
// collect the returned data from our forecast.js
const updateCity =async(city)=> {

    const cityDetails = await getCity(city);
    const weatherDetails = await getWeather(cityDetails.Key);

    // return as object because they are two
    // return {
    //     cityDetails: cityDetails,
    //     weatherDetails: weatherDetails
    // };
// since the properties and the vaulues are the SyncManager, it can also be represented this way
    return {
        cityDetails,
        weatherDetails
    }
};

cityForm.addEventListener('submit', e => {
    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update the ui with new city
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
});