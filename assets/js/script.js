import { API_BASE_URL, endpoints } from "./constants.js";
import { deleteDataById, getAllData } from "./helper.js";
const citiesRow = document.querySelector(".cities-row");
const loader = document.querySelector(".cities-loader");

//dom load
document.addEventListener("DOMContentLoaded", async () => {
  loader.classList.replace("d-none", "d-flex");
  const cities = await getAllData(API_BASE_URL, endpoints.cities);
  loader.classList.replace("d-flex", "d-none");
  renderCitiesHTML(cities);

  searchInp.addEventListener("keyup", (e) => {
    const searchedCities = cities.filter((x) => {
      return x.name.toLowerCase().includes(e.target.value.toLowerCase().trim());
    });
    renderCitiesHTML(searchedCities);
  });
});

const searchInp = document.querySelector("#search");

function renderCitiesHTML(arr) {
  citiesRow.innerHTML = "";
  arr.forEach((city) => {
    citiesRow.innerHTML += `
          <div class="col-3 mt-5">
                <div class="card">
                    <div class="img-wrapper" style="width:100%; height:200px;">
                        <img style="width:100%; height:100%; object-fit: cover;" src=${city.imgUrl}
                        class="card-img-top" alt="${city.name}" title="${city.name}">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${city.name}</h5>
                        <p class="m-0"> Country: ${city.country}</p>
                        <p class="m-0">population: ${city.population}</p>
                        <p class="m-0 mb-3">capital: ${city.capital}</p>
                        <button data-id="${city.id}" class="btn btn-danger delete">delete</button>
                        <a href="detail.html?id=${city.id}" class="btn btn-primary">Details</a>
                    </div>
                </div>
            </div> `;

    const deleteBtns = document.querySelectorAll(".delete");
    deleteBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            //delete from UI - html
            e.target.closest(".col-3").remove();
            //delete from API
            const id = e.target.getAttribute("data-id");
            console.log("deleted id: ", id);
            deleteDataById(API_BASE_URL, endpoints.cities, id).then((res) => {
              console.log("response: ", res);
            });
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      });
    });
  });
}