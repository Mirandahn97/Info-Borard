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
    console.log(data);
    let menuElement = document.getElementById('kantinen')
    menuElement.classList.add('box--kantina')
    let headLine = document.createElement('h2')
    headLine.innerText = `uge: ${data.Week}`
    menuElement.appendChild(headLine)


    data.Days.forEach(Dag => {
        let myDay = `<article><h3> ${Dag.DayName}:</h3> ${Dag.Dish}</article>`
        menuElement.innerHTML += myDay 
    });
}
