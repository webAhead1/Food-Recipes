
let GIPHYAPIKEY = "DVA9iU3OwFk2f2cUpL6Z54gIubRTCB53";
let MOVIEAPIKEY = "dbf5a427e1fd8fc436e37f2664473fa8";
const form = document.querySelector("form");
const output = document.querySelector("output");
const movieNameHtml = document.getElementById("movieName");
let configData = null;
let baseImageURL = null;
let baseURL = 'https://api.themoviedb.org/3/';

form.addEventListener("submit", event => {
    event.preventDefault();
    output.replaceChildren();
    giphyFunc();
    movieFunc();
    stickerFunc();
});

function movieFunc() {
    let url = "".concat(baseURL, 'configuration?api_key=', MOVIEAPIKEY);
    let str = document.getElementById("movieName").value.trim();

    fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      baseImageURL = data.images.secure_base_url;
      configData = data.images;
      console.log('config:', data);
      console.log('config fetched');
      runSearch(str);
    })
    .catch(error => {
      const errorMsg = document.createElement("h2");
      output.appendChild(error);
    })
}

let runSearch = function (keyword) {
  let url = ''.concat(baseURL, 'search/movie?api_key=', MOVIEAPIKEY, '&query=', keyword);
  fetch(url)
  .then(result=>result.json())
  .then((data=>{
    document.getElementById('output').innerHTML = JSON.stringify(data, null, 4);
  }))
}

function giphyFunc() {
  let url = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHYAPIKEY}&limit=1&q=`;
    let str = document.getElementById("movieName").value.trim();
    url = url.concat(str);

    fetch(url)
    .then(response => {
        return response.json();
      })
      .then(content => {
        let img = document.createElement("img");
        img.src = content.data[0].images.downsized.url;
        output.appendChild(img);
        document.querySelector('#movieName').value = '';
    }
        )
      .catch(error => {
        const errorMsg = document.createElement("h2");
        output.appendChild(error);
    }
      );
}

function stickerFunc() {
  let url = `https://api.giphy.com/v1/stickers/search?api_key=${GIPHYAPIKEY}&limit=1&q=`;
    let str = document.getElementById("movieName").value.trim();
    url = url.concat(str);

    fetch(url)
    .then(response => {
        return response.json();
      })
      .then(content => {
        let img = document.createElement("img");
        img.src = content.data[0].images.downsized.url;
        output.appendChild(img);
        document.querySelector('#movieName').value = '';
    }
        )
      .catch(error => {
        const errorMsg = document.createElement("h2");
        output.appendChild(error);
    }
      );
}