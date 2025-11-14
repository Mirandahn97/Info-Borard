import { getLocalTime } from "../../Utils/index.js"

export default async function getSkema() {

    //Henter API'et til skemaet
    const res = await fetch("https://iws.itcn.dk/techcollege/schedules?departmentcode=smed")

    //Fortolker svaret som JSON
    const data = await res.json()

    console.log(data.value)

    createSkema(data.value)
    //Finder sectionen med id "skema" i HTML
    const container = document.getElementById("skema")
}


function createSkema(data) {

    //Finder sectionen med id "skema" i HTML
    const container = document.getElementById("skema")

    const h1 = document.createElement("h1")
    h1.innerText = "SKEMA"
    container.appendChild(h1)

    const h2 = document.createElement("h2")
    h2.innerText = "HVAD SKER DER I LOKALERNE"
    container.appendChild(h2)


    //Opretter et array (liste) og gemmer den i en const med navnet arrAllowed
    const arrAllowed = [
        "Mediegrafiker",
        "Webudvikler",
        "Grafisk teknik."
    ]


    data.forEach(skema => {

        if (arrAllowed.includes(skema.Education)) {

            //Lokaler
            const room = document.createElement("article")
            room.innerText = skema.Room
            container.appendChild(room)

            //Hold
            const team = document.createElement("article")
            team.innerText = skema.Team
            container.appendChild(team)

            //Fag
            const subject = document.createElement("article")
            subject.innerText = skema.Subject
            container.appendChild(subject)

            //Tid
            const time = document.createElement("article")
            time.innerText = getLocalTime(skema.StartDate)
            container.appendChild(time)

        }
    });

}

