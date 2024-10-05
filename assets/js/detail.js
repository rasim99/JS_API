import { getDataById } from "./helper.js";
import { API_BASE_URL, endpoints } from "./constants.js";

const detailRow = document.querySelector(".city-row");

document.addEventListener("DOMContentLoaded", async () => {
  const id = new URLSearchParams(location.search).get("id");
  const cities = await getDataById(API_BASE_URL, endpoints.cities, id);
  const city = cities[0];
  detailRow.innerHTML = `  <div class="col-9">
                        <div class="card">
                            <div class="img-wrapper">
                                <img src=${city.imgUrl} height="450" style="object-fit:cover;object-position:top center;" class="card-img-top" alt="${city.name}"
                                    title="${city.name}">
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">${city.name}</h5>
                                <p class="m-0">countryname: ${city.country}</p>
                                <p class="m-0">population: ${city.population}</p>
                                <p class="m-0 mb-3">capitalcity: ${city.capital}</p>
                                <a href="index.html" class="btn btn-primary">Go Back</a>
                            </div>
                        </div>
                    </div>`;
});