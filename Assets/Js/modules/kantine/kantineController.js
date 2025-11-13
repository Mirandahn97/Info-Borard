// her laver vi js controller

//Dette er en controllercode
export default async function startKantine(){
    console.log('Nu er kantinen startet');
    let myData = await hentData()
    tegnMenu(myData);
}

// modulcode
// Her skal jeg bruge fetch function
function hentData(){
return fetch('https://infoskaerm.techcollege.dk/umbraco/api/content/getcanteenmenu/?type=json')
  .then(response => response.json())
  .catch(error => console.error('Error:', error));
}

//viewcode
// Her viser vi "uge: tal"
function tegnMenu(data){
    let menuElement = document.getElementById('kantinen')
    menuElement.classList.add('box--kantina')
    let imageElement = document.createElement('img')
    imageElement.src='Assets/img/c5be8b5f-b962-4d4a-aea8-70cd2ab04b88.jpg'
    menuElement.appendChild(imageElement)
    let textElement = document.createElement('div')
    textElement.innerText = 'I DAG TILBYDER KANTINEN'
    menuElement.append(textElement)
    let headLine = document.createElement('h2')
    headLine.innerText = `uge: ${data.Week}`
    menuElement.appendChild(headLine)
    const date = new Date()
    const curDay = data.Days[date.getDay()-1];
     let myDay = `<article><h3> ${curDay.DayName}:</h3> ${curDay.Dish}</article>`
     menuElement.innerHTML += myDay 
}
