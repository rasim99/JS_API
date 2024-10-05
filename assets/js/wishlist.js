
import { API_BASE_URL, endpoints } from "./constants.js";
import { deleteDataById, getAllData } from "./helper.js";

const wishlistRow = document.querySelector(".wishlist-row");
const loader = document.querySelector(".wishlist-loader");

// DOM load
document.addEventListener("DOMContentLoaded", async () => {
    loader.classList.replace("d-none", "d-flex");
    
    const wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];
    loader.classList.replace("d-flex", "d-none");
    renderWishlistHTML(wishlistItems);
});

function renderWishlistHTML(arr) {
    wishlistRow.innerHTML = "";
    if (arr.length === 0) {
        wishlistRow.innerHTML = `<p class="text-center">Your wishlist is empty.</p>`;
        return;
    }

    arr.forEach((item) => {
        wishlistRow.innerHTML += `
            <div class="col-3 mt-5">
                <div class="card">
                    <div class="img-wrapper" style="width:100%; height:200px;">
                        <img style="width:100%; height:100%; object-fit: cover;" src="${item.imgUrl}" 
                        class="card-img-top" alt="${item.name}" title="${item.name}">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="m-0">Country: ${item.country}</p>
                        <p class="m-0">Population: ${item.population}</p>
                        <button data-id="${item.id}" class="btn btn-danger remove">Remove from Wishlist</button>
                    </div>
                </div>
            </div>`;
    });

    const removeBtns = document.querySelectorAll(".remove");
    removeBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const id = e.target.getAttribute("data-id");
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, remove it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    // Remove from UI
                    e.target.closest(".col-3").remove();
                    
                    // Remove from local storage
                    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
                    wishlist = wishlist.filter(item => item.id !== id);
                    localStorage.setItem("wishlist", JSON.stringify(wishlist));
                    
                    Swal.fire("Removed!", "Your item has been removed from the wishlist.", "success");
                }
            });
        });
    });
}
