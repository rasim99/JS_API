import { API_BASE_URL, endpoints } from './constants.js';
import { getDataById, updateDataById } from './helper.js';

document.addEventListener('DOMContentLoaded', async () => {
    const editFormContainer = document.getElementById('edit-form-container');
    const resultMessage = document.getElementById('result-message');
    let cityData = {};
    const urlParams = new URLSearchParams(window.location.search);
    const cityId = urlParams.get('id');

    if (cityId) {
        try {
            const city = await getDataById(API_BASE_URL, endpoints.cities, cityId);
            console.log("Fetched city data:", city); 
            if (city) {
                cityData = city; 
                createEditForm(cityData); 
            } else {
                resultMessage.textContent = 'City not found.';
            }
        } catch (error) {
            resultMessage.textContent = 'Error fetching city data.';
            console.error("Fetch error:", error); 
        }
    }

    function createEditForm(city) {
        
        const form = document.createElement('form');
        form.id = 'edit-form';

        // City Name Input
        const nameLabel = document.createElement('label');
        nameLabel.setAttribute('for', 'city-name');
        nameLabel.textContent = 'City Name:';
        form.appendChild(nameLabel);

        const cityNameInput = document.createElement('input');
        cityNameInput.type = 'text';
        cityNameInput.id = 'city-name';
        cityNameInput.name = 'city-name';
        cityNameInput.required = true;
        cityNameInput.value = city[0].name; 
        form.appendChild(cityNameInput);

        form.appendChild(document.createElement('br'));

        // Population Input
        const populationLabel = document.createElement('label');
        populationLabel.setAttribute('for', 'population');
        populationLabel.textContent = 'Population:';
        form.appendChild(populationLabel);

        const populationInput = document.createElement('input');
        populationInput.type = 'number';
        populationInput.id = 'population';
        populationInput.name = 'population';
        populationInput.required = true;
        populationInput.value = city[0].population; 
        form.appendChild(populationInput);

        form.appendChild(document.createElement('br'));

        // Country Input
        const countryLabel = document.createElement('label');
        countryLabel.setAttribute('for', 'country');
        countryLabel.textContent = 'Country:';
        form.appendChild(countryLabel);

        const countryInput = document.createElement('input');
        countryInput.type = 'text';
        countryInput.id = 'country';
        countryInput.name = 'country';
        countryInput.required = true;
        countryInput.value = city[0].country; 
        form.appendChild(countryInput);

        form.appendChild(document.createElement('br'));

        // Image URL Input
        const imgUrlLabel = document.createElement('label');
        imgUrlLabel.setAttribute('for', 'imgUrl');
        imgUrlLabel.textContent = 'Image URL:';
        form.appendChild(imgUrlLabel);

        const imgUrlInput = document.createElement('input');
        imgUrlInput.type = 'text';
        imgUrlInput.id = 'imgUrl';
        imgUrlInput.name = 'imgUrl';
        imgUrlInput.value = city[0].imgUrl; 
        form.appendChild(imgUrlInput);

        const capitalLabel = document.createElement('label');
        capitalLabel.setAttribute('for', 'capital');
        capitalLabel.textContent = 'Is this city a capital?';
        form.appendChild(capitalLabel);
    
        const capitalInput = document.createElement('input');
        capitalInput.type = 'checkbox';
        capitalInput.id = 'capital';
        capitalInput.name = 'capital';
        capitalInput.checked = city[0].capital; 
        form.appendChild(capitalInput);
      

        form.appendChild(document.createElement('br'));

        // Submit Button
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Update City';
        form.appendChild(submitButton);
        editFormContainer.appendChild(form);

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const updatedCity = {
                name: cityNameInput.value || city.name,
                population: populationInput.value || city.population,
                country: countryInput.value || city.country,
                imgUrl: imgUrlInput.value || city.imgUrl,
                capital: capitalInput.checked 
            };

            if (cityId) {
                try {
                    const response = await updateDataById(API_BASE_URL, endpoints.cities, cityId, updatedCity);
                    
                    if (response) {
                        Swal.fire({
                            title: "Updating Succecfuly",
                            text: "City updated",
                            icon: "success"
                          });
                        console.log("Update response:", response);
                    }
                } catch (error) {
                    resultMessage.textContent = 'Error updating city.';
                    console.error(error);
                }
            } else {
                resultMessage.textContent = 'Please enter all required fields.';
            }
        });
    }
});
