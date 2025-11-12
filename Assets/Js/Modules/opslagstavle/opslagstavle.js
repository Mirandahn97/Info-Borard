
export default async function hentNyheder(){
    const url = "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.dr.dk%2Fnyheder%2Fservice%2Ffeeds%2Fallenyheder%23"
    res = await fetch(url);
    const data = await res.json();
    const parser = new DOMParser();
    const doc = parser.parseFromString(data.contents, "text/html" )

    //finder artikler(tilpas hvis deres struktur ændre sig)

    const artikler =doc.querySelectorAll("article")
    let html ="";
    artikler.forEach(a => {
        const titel = a.querySelector("h2, h3")
        const link = a.querySelector("a")?.href;
        if (titel && link) {
        html += `<p><a href= "${link}" target= "_blank">${titel}</a></p>`; 
        }
    })
    document.getElementById("opslagstavle").innerHTML = html || "Ingen nyheder fundet."; 
} 
hentNyheder();  