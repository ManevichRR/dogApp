const select = document.getElementById('breeds');
const card = document.querySelector('.card'); 
const form = document.querySelector('form');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
function fetchData(url){
    return fetch(url)
        .then(checkStatus)
        .then(res => res.json())
        .catch(error => console.log('Ooops! There is a fetching error', error));
}

fetchData('https://dog.ceo/api/breeds/list')
    .then(data => generateOptions(data.message))

fetchData('https://dog.ceo/api/breeds/image/random')
    .then(data => generateImage(data.message))

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------
function checkStatus(response){
    if(response.ok){
        return Promise.resolve(response);
    }else{
        return Promise.reject(new Error(response.statusText));
    }
}

function generateOptions(data){
    const options = data.map(item => `
        <option value='${item}'>${item}</option>
    `).join('');
    select.innerHTML = options;
}

function generateImage(data){
 const html = `
 <img src='${data}' alt>
 <p>click to view imges of ${select.value.charAt(0).toUpperCase() + select.value.slice(1)}s</p>
 `;
 card.innerHTML = html;
}

function fetchBreadImg(){
    const breed = select.value;
    const img = card.querySelector('img');
    const p = card.querySelector('p');

    fetchData(`https://dog.ceo/api/breed/${breed}/images/random`)
        .then(data => {
            img.src = data.message;
            img.alt = breed;
            p.textContent= `Click to view more ${breed.charAt(0).toUpperCase() + breed.slice(1)}s`;
        })
}
// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
select.addEventListener('change', fetchBreadImg);
card.addEventListener('click', fetchBreadImg);



// ------------------------------------------
//  POST DATA
// ------------------------------------------

