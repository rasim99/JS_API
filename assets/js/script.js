

import { API_BASE_URL, endpoints } from "./constants.js";
import { deleteDataById, getAllData, postData } from "./helper.js";

const citiesRow = document.querySelector(".cities-row");
const loader = document.querySelector(".cities-loader");

let wishlist = [];

document.addEventListener("DOMContentLoaded", async () => {
    loader.classList.replace("d-none", "d-flex");
    const cities = await getAllData(API_BASE_URL, endpoints.cities);
    loader.classList.replace("d-flex", "d-none");
    renderCitiesHTML(cities);
});

const searchInp = document.querySelector("#search");
searchInp.addEventListener("keyup", (e) => {
    const searchedCities = cities.filter((x) => {
        return x.name.toLowerCase().includes(e.target.value.toLowerCase().trim());
    });
    renderCitiesHTML(searchedCities);
});


function renderCitiesHTML(arr) {
    citiesRow.innerHTML = "";
    arr.forEach((city) => {
        const isInWishlist = wishlist.some(item => item.id === city.id);
        citiesRow.innerHTML += `
            <div class="col-3 mt-5">
                <div class="card">
                    <div class="img-wrapper" style="width:100%; height:200px;">
                        <img style="width:100%; height:100%; object-fit: cover;" src="${city.imgUrl}"
                        class="card-img-top" alt="${city.name}" title="${city.name}">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${city.name}</h5>
                        <p class="m-0"> Country: ${city.country}</p>
                        <p class="m-0">Population: ${city.population}</p>
                        <p class="m-0 mb-3">Capital: ${city.capital}</p>
                        <button data-id="${city.id}" class="btn btn-danger delete">Delete</button>
                        <a href="detail.html?id=${city.id}" class="btn btn-success">Details</a>
                        <a href="edit.html?id=${city.id}" class="btn btn-outline-primary">Edit</a>
                        <button data-id="${city.id}" class="btn mt-3 btn-warning toggle-wishlist">
                            ${isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                        </button>
                        
                    </div>
                </div>
            </div>`;

        const toggleWishlistBtns = document.querySelectorAll(".toggle-wishlist");
        toggleWishlistBtns.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                handleToggleWishlist(e);
            });
        });
    });
}


function handleDeleteCity(e) {
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
            e.target.closest(".col-3").remove();
            const id = e.target.getAttribute("data-id");
            deleteDataById(API_BASE_URL, endpoints.cities, id).then((res) => {
                console.log("response: ", res);
            });
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
    });
}


async function handleToggleWishlist(e) {
    const id = e.target.getAttribute("data-id");
    const city = await getAllData(API_BASE_URL, endpoints.cities + '/' + id); 

    const wishlistItem = {
        id: city.id,
        name: city.name,
        country: city.country,
        population: city.population,
        capital: city.capital,
        imgUrl: city.imgUrl
    };
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const itemIndex = wishlist.findIndex(item => item.id === city.id);
    
    if (itemIndex > -1) {
        wishlist.splice(itemIndex, 1);
        e.target.textContent = 'Add to Wishlist';
        e.target.nextElementSibling.classList.replace('fa-solid', 'fa-regular'); 
        Swal.fire("Removed!", "The city has been removed from your wishlist.", "success");
    } else {
        wishlist.push(wishlistItem);
        e.target.textContent = 'Remove from Wishlist';
        e.target.nextElementSibling.classList.replace('fa-regular', 'fa-solid'); 
        Swal.fire("Added!", "The city has been added to your wishlist.", "success");
    }
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
}
