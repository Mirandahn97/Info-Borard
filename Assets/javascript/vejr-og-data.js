

const JSON_PATH = 'assets/javascript/modals/vejr-og-dataAPI.json';
async function loadWeather() {

	try {
		const res = await fetch(JSON_PATH, { cache: 'no-store' });
		if (!res.ok) throw new Error(`Failed to load ${JSON_PATH}: ${res.status}`);
		const data = await res.json();
		renderWeather(data);

	} catch (err) {
		console.error(err);
		const c = document.getElementById('vjer');
		if (c) c.textContent = 'Kunne ikke indlæse vejret.';

	}

}



function renderWeather(data) {
	const c = document.getElementById('vjer');

	if (!c) return;

	const name = data.name || 'Ukendt sted';
	const weather = (data.weather && data.weather[0]) || {};
	const desc = weather.description || '';
	const icon = weather.icon || '';


	const temp = data.main?.temp ?? '';
	const feels = data.main?.feels_like ?? '';
	const humidity = data.main?.humidity ?? '';
	const wind = data.wind?.speed ?? '';


	const iconImg = icon
		? `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}" style="vertical-align:middle">`
		: '';


	c.innerHTML = `
		<div class="weather-card">
			<h3>Vejr i ${escapeHtml(name)}</h3>

			<div class="weather-main">${iconImg} <strong>${escapeHtml(desc)}</strong></div>
			<ul>

				<li>Temperatur: <strong>${temp} °C</strong></li>
				<li>Føles som: ${feels} °C</li>
				<li>Luftfugtighed: ${humidity} %</li>
				<li>Vind: ${wind} m/s</li>
			</ul>

		</div>
	`;

}
function escapeHtml(str) {
	return String(str)

		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')

		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;');

}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', loadWeather);
} else {
	loadWeather();


}


