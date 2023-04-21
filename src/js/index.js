import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const formEl = document.querySelector("#search-form");
const input = document.querySelector('[name ="searchQuery"]')
const gallery = document.querySelector('.gallery')
const loadButton = document.querySelector('.load-more')
loadButton.style.display = "none";
let pageNumber = 1;



async function getData(e) {
    e.preventDefault()
    loadButton.style.display = "block"
    const userSearch = input.value
    const res = await axios.get(
    `https://pixabay.com/api/?key=35513783-cdd32f526a75b86a8cfb6c8f5&q=${userSearch}&image_type=photos&orientation=horizontal&safesearch=true&per_page=40&page=${pageNumber}`);
    
    res.data.hits.forEach(item => {
    const div = document.createElement('div');
    div.setAttribute('class', 'photo-card');
    div.innerHTML =`
    <div class="photo-card">
    <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
    <div class="info">
    <p class="info-item">
    <b>Likes : ${item.likes}</b>
    </p>
    <p class="info-item">
    <b>Views: ${item.views}</b>
    </p>
    <p class="info-item">
    <b>Comments ${item.comments}</b>
    </p>
    <p class="info-item">
    <b>Downloads${item.downloads}</b>
    </p>
    </div>
    </div>`;
        gallery.style.display = "flex";
        gallery.style.justifyContent = "center";

gallery.append(div);
    })
    Notify.info("Hooray we found ${res.data.hits} matches")
    if (res.data.hits.length === 0) {
        Notify.info("Sorry, there are no images matching your search query. Please try again.")
}
}


function handleSubmit(e) {
    /* when click on load more then increase page number and call get data*/
    pageNumber++;
    getData(e)

}

loadButton.addEventListener("click", handleSubmit)
formEl.addEventListener("submit", getData);

/*TODO Styles, and alerts(if (res.data.totalHits)), simplelightbox */