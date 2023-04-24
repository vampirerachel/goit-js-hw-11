
import axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const formEl = document.querySelector("#search-form");
let input = document.querySelector('[name ="searchQuery"]')
const gallery = document.querySelector('.gallery')
const loadButton = document.querySelector('.load-more')
const searchButton = document.querySelector("button")
loadButton.style.display = "none";
let pageNumber = 1;

    
async function getData(e) {
    e.preventDefault()

    pageNumber = 1;
    loadButton.style.display = "block";
    gallery.innerHTML = "";
    let userSearch = input.value.trim();
    if (userSearch.length === 0 ) {
        gallery.setAttribute("class", "hidden")
        Notify.failure("No matches found.")
loadButton.style.display = "none";
    }
    if(userSearch.length > 0){
 const res = await axios.get(
    `https://pixabay.com/api/?key=35513783-cdd32f526a75b86a8cfb6c8f5&q=${userSearch}&image_type=photos&orientation=horizontal&safesearch=true&per_page=40&page=${pageNumber}`);
    
    res.data.hits.forEach(item => {
        const div = document.createElement('div');
        div.setAttribute('class', 'photo-container');
        div.innerHTML = `
    <div class="photo-card">
        <a href ="${item.webformatURL}" alt="${item.tags}">
    <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" /></a> 
    <div class="info">
    <p class="info-item">
    <b>Likes:
    ${item.likes}</b>
    </p>
    <p class="info-item">
    <b>Views:
    ${item.views}</b>
    </p>
    <p class="info-item">
    <b>Comments:
    ${item.comments}</b>
    </p>
    <p class="info-item">
    <b>Downloads:
    ${item.downloads}</b>
    </p>
    </div>
    </div>`;
        gallery.style.display = "flex";
        gallery.style.justifyContent = " space-between";
        gallery.style.flexWrap = "wrap";
        gallery.style.margin = "0 auto";
        gallery.style.width = "1200px"
        gallery.append(div);
    });
            if (res.data.total < 40) {
                gallery.style.justifyContent = "space-evenly";
                loadButton.style.display = "none";
    }

    let hits = res.data.total

    if (hits > 1) {
        Notify.info("Hooray! we found " + hits + " photos!")
        }
        if (hits === 1) {
            Notify.info("Hooray! we found " + hits + " photo")
        }
    if (hits === 0) {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.")
}
}
}


async function handleSubmit(e) {

    e.preventDefault()

      pageNumber++;
    let userSearch = input.value.trim();

    const res = await axios.get(
    `https://pixabay.com/api/?key=35513783-cdd32f526a75b86a8cfb6c8f5&q=${userSearch}&image_type=photos&orientation=horizontal&safesearch=true&per_page=40&page=${pageNumber}`);

    if (res.data.total > 40){
    res.data.hits.forEach(item => {
        const div = document.createElement('div');
        div.setAttribute('class', 'photo-container');
        div.innerHTML = `
    <div class="photo-card">
        <a href ="${item.webformatURL}" alt="${item.tags}">
    <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" /></a> 
    <div class="info">
    <p class="info-item">
    <b>Likes: ${item.likes}</b>
    </p>
    <p class="info-item">
    <b>Views: ${item.views}</b>
    </p>
    <p class="info-item">
    <b>Comments: ${item.comments}</b>
    </p>
    <p class="info-item">
    <b>Downloads: ${item.downloads}</b>
    </p>
    </div>
    </div>`;
        gallery.style.display = "flex";
        gallery.style.justifyContent = " space-between";
        gallery.style.flexWrap = "wrap";
        gallery.style.margin = "0 auto";
        gallery.style.width = "1200px"
        gallery.append(div);
    
    })
    };
    let currentPage = pageNumber - 1;
    let hits = res.data.total-=40*currentPage
        if (hits > 0) {
        Notify.info("Hooray! we found " + hits + " matches")
    }
    if (hits < 0) {
        Notify.failure("Sorry, there are no more matches.")
    }

}

loadButton.addEventListener("click", handleSubmit)
formEl.addEventListener("submit", getData);

