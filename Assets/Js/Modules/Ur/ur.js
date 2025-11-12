//Ur

export default function updateClock(){

    const now = new Date();
    let hours = now.getHours();
    hours = hours % 12 || 12;
    hours = hours.toString().padStart(2, 0);
    const minutes = now.getMinutes().toString().padStart(2,0);
    const timeString = `${hours}:${minutes}`; 
    document.getElementById("ur").textContent = timeString

}

updateClock();
setInterval(updateClock, 1000);