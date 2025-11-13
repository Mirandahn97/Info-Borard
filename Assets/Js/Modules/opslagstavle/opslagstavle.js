//NYHEDER TIL OPSLAGSTAVLEN.(vi har brugt nyheder da vi ikke måtte bruge skolens)
   
export default async function hentData() {
      
        try {
        // Hent data fra et API
        const response = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.dr.dk%2Fnyheder%2Fservice%2Ffeeds%2Fallenyheder%23");
        const data = await response.json(); // vent på at data bliver klar
            console.log(data.items)
            displayNews(data.items)
       
 
      } 
      catch (error) {
        document.getElementById("opslagstavle").innerHTML = "Der skete en fejl 😢";
        console.error(error);
      }
    }
    function displayNews(data){ 
        let container = document.getElementById("opslagstavle")
        data.forEach(newNews => {
        container.innerHTML+= `<h2>${newNews.title}</h2>`
        });
    }


 