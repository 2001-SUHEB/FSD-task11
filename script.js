document.addEventListener('DOMContentLoaded', () => {
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(countries => {
            const countryCardsContainer = document.getElementById('country-cards');
            countries.forEach(country => {
                const card = document.createElement('div');
                card.classList.add('col-sm-6', 'col-md-4', 'col-lg-4', 'col-xl-4', 'mb-4');

                const nativeName = country.name.nativeName
                    ? Object.values(country.name.nativeName)[0].common
                    : country.name.common;

                const cardContent = `
                    <div class="card h-100">
                        <div class="card-header">${country.name.common}</div>
                        <div class="card-body">
                            <p><strong>Region:</strong> ${country.region}</p>
                            <p><strong>Native Name:</strong> ${nativeName}</p>
                            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                            <p><strong>Country Code:</strong> ${country.cca3}</p>
                            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
                            <p><strong>Latlng:</strong> ${country.latlng ? country.latlng.join(', ') : 'N/A'}</p>
                            <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" class="img-fluid mb-2" />
                            <button class="btn btn-primary" onclick="fetchWeather(${country.latlng[0]}, ${country.latlng[1]})">Click for Weather</button>
                        </div>
                    </div>
                `;
                card.innerHTML = cardContent;
                countryCardsContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching countries:', error));
});

function fetchWeather(lat, lng) {
    const apiKey = 'https://restcountries.com/v3.1/all';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(weather => {
            const weatherInfoElement = document.getElementById('weather-info');
            weatherInfoElement.innerHTML = `
                <div class="card">
                    <div class="card-header">Weather Information</div>
                    <div class="card-body">
                        <p><strong>Location:</strong> ${weather.name}</p>
                        <p><strong>Weather:</strong> ${weather.weather[0].description}</p>
                        <p><strong>Temperature:</strong> ${weather.main.temp}°C</p>
                    </div>
                </div>
            `;
        })
        .catch(error => console.error('Error fetching weather:', error));
}