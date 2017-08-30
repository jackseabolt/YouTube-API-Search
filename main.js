const STORE = [];
const api_url = 'https://www.googleapis.com/youtube/v3/search'; 
const api_key = 'AIzaSyBFSTdHGhgwD7sUXEQ0UlXSKkro4SP3EnA'; 

function handleFormSubmit(){
    $(".js-form").on("submit", function(event){
        event.preventDefault(); 
        const userinput = $(this).find(".js-input"); 
        const searchterm = userinput.val(); 
        userinput.val(""); 
        getDataFromApi(searchterm, displayData)
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
    const results = data.items.map((item, index) => {
        STORE.push(renderString(item));
     }); 
     render(); 
}

function renderString(item){
    return `
        <div>
            <h3>${item.snippet.title}</h3>
            <a href="https://www.youtube.com/watch?v=${item.id.videoId}">
                <img src="${item.snippet.thumbnails.default.url}" alt="${item.snippet.description}" class="">
            </a>
        </div>
    `
}

function render(){ 
    $(".js-search-results").html(STORE); 
}

function main(){
    handleFormSubmit(); 
}

$(main);