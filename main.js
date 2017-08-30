'use strict';

let nextCounter = 0;
let STORE = [];
let datastore = []; 
let user_input = ""; 
const api_url = 'https://www.googleapis.com/youtube/v3/search'; 
const api_key = 'AIzaSyBFSTdHGhgwD7sUXEQ0UlXSKkro4SP3EnA'; 

function handleFormSubmit(){
    $(".js-form").on("submit", function(event){
        event.preventDefault(); 
        const userinput = $(this).find(".js-input"); 
        const searchterm = userinput.val();
        user_input = searchterm;  
        userinput.val(""); 
        getDataFromApi(searchterm, displayData)
    }); 
}

function handleNextButton(){
    $(".js-next").on("click", function(event){
        nextCounter++; 
        $(".js-previous").removeClass("hidden"); 
        const request = {
            pageToken: datastore.nextPageToken, 
            part: 'snippet',
            key: api_key,
            q: user_input
        }
        $.getJSON(api_url, request, displayData); 
    }); 
}

function handlePreviousButton(){
    $(".js-previous").on("click", function(event){
        nextCounter--;
        if(nextCounter===0){
            $(".js-previous").addClass("hidden");
        }
        const request = {
            pageToken: datastore.prevPageToken, 
            part: 'snippet',
            key: api_key,
            q: user_input
        }
        $.getJSON(api_url, request, displayData);
    }); 
}

function handleRenderLightbox() {
    $(".js-search-results").on("click", ".js-image", function(event) {
        console.log('hello');
        $(".lightbox").removeClass("hidden");
        $(".js-video").removeClass("hidden");
        const videoUrl = $(event.currentTarget).parent().find('img').attr('data-index');
        console.log(event.currentTarget); 
        console.log(videoUrl);
        $(".js-iframe").attr("src",videoUrl);
    });
}

function handleRemoveLightbox() {
    $("body").on("click", ".lightbox", function(event) {
        console.log('test');
        $(".js-iframe").attr("src", "");
        render();
    });
}

function getDataFromApi(searchterm, callback){
    const request = {
        part: 'snippet',
        key: api_key,
        q: searchterm
    }
    $.getJSON(api_url, request, callback); 
}

function displayData(data){
    console.log(data); 
    STORE = [];  
    const results = data.items.map((item, index) => {
        STORE.push(renderString(item, index));
     }); 
     render(); 
     datastore = data;
}

            // <a href="https://www.youtube.com/watch?v=${item.id.videoId}">
            //     <img src="${item.snippet.thumbnails.default.url}" alt="${item.snippet.description}" class="">
            // </a>

function renderString(item){
    return `
        <div class="list-item">
            <h3>${item.snippet.title}</h3>
            <img src="${item.snippet.thumbnails.medium.url}" data-index="https://www.youtube.com/embed/${item.id.videoId}?autoplay=1" alt="${item.snippet.description}" class="js-image image">
            <a href="https://www.youtube.com/channel/${item.snippet.channelId}">
                <button>More from this Channel</button>
                </a>
        </div>
    `
}

function render(){ 
    $(".js-search-results").html(STORE);
    $(".lightbox").addClass("hidden");
    $(".js-video").addClass("hidden");
    $(".js-next").removeClass("hidden"); 
}

function main(){
    handleFormSubmit();
    handleRenderLightbox();
    handleRemoveLightbox(); 
    handleNextButton(); 
    handlePreviousButton(); 
}

$(main);