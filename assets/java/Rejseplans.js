

// Rejseplans.js
const sampleData = {
  "Departure": [

    {
      "JourneyDetailRef": { "ref": "2|#VN#1#ST#1762849771#PI#0#ZI#33522#TA#0#DA#131125#1S#851012702#1T#1155#LS#851072401#LT#1236#PU#86#RT#1#CA#028#ZE#17#ZB#Bybus 17#PC#5#FR#851012702#FT#1155#TO#851072401#TT#1236#" },
      "JourneyStatus": "P",
      "ProductAtStop": { "name": "Bybus 18", "displayNumber": "18", "operatorInfo": { "name": "NT" }, "matchId": "10228" },
      "Product": [{ "name": "Bybus 18", "displayNumber": "18", "matchId": "10228" }],
      "Notes": { "Note": [{ "value": "1", "key": "TW", "type": "I", "txtN": "1" }] },

      "name": "Bybus 18",
      "type": "ST",
      "stop": "Øster Uttrp vej",
      "stopid": "A=1@O=Øster Uttrp vej@X=9960704@Y=57044610@U=86@L=851972401@",
      "stopExtId": "851972401",

      "lon": 9.960704,
      "lat": 57.04461,
      "prognosisType": "PROGNOSED",
      "time": "12:24:00",
      "date": "2025-11-13",
      "rtTime": "12:58:00",
      "rtDate": "2025-11-13",
      "reachable": true,
      "direction": "Saltumvej",
      "directionFlag": "1"
    },


    {
      "JourneyDetailRef": { "ref": "2|#VN#1#ST#1762849771#PI#0#ZI#50231#TA#0#DA#131125#1S#851981602#1T#1217#LS#827000101#LT#1456#PU#86#RT#1#CA#028#ZE#18#ZB#Bybus 18#PC#5#FR#851981602#FT#1217#TO#827000101#TT#1456#" },
      "JourneyStatus": "P",
      "ProductAtStop": { "name": "Bybus 17", "displayNumber": "17", "operatorInfo": { "name": "NT" }, "matchId": "23305" },
      "Product": [{ "name": "Bybus 17", "displayNumber": "17", "matchId": "23305" }],
      "Notes": { "Note": [{ "value": "1", "key": "TW", "type": "I", "txtN": "1" }] },

      "name": "Bybus 17",
      "type": "ST",
      "stop": "Skovgårdsvej",
      "stopid": "A=1@O=Skovgårdsvej@X=9966457@Y=57047595@U=86@L=851400602@",
      "stopExtId": "851400602",

      "lon": 9.966457,
      "lat": 57.047595,
      "time": "12:56:00",
      "date": "2025-11-13",
      "reachable": true,
      "direction": "Aalborg St.",
      "directionFlag": "1"

    }
  ],
  "TechnicalMessages": {
    "TechnicalMessage": [
      { "value": "2025-11-13 12:56:46", "key": "requestTime" },
      { "value": "ttp=16752#16830 plancode0=ft9vh planid=1762849771 planid0=1762849771 planid_adr=1755802249 plancode_adr=bm7yz planid_poi=1758523087 plancode_poi=c9jdt srvv=5.45.Rejseplanen.18.0.22 (customer/hcudk/release/2025.5.0.0) [2025-09-29] tlibv=TRFVER: rel/dk/12.00.2 2025-07-24 11:05:55 +0200 Rejsekort v12.0.2 jno=1", "key": "backendInfo" }
    ]

  },
  "serverVersion": "2.50.4",
  "dialectVersion": "2.50-Rejseplanen",
  "planRtTs": "2025-11-13T12:56:37.000+01:00",
  "requestId": "muk6iswe6ijy8w8g"

};



export function parseDepartures(data) {
  if (!data || !Array.isArray(data.Departure)) return [];
  return data.Departure.map((d) => {
    const productAtStop = d.ProductAtStop || {};
    const product = (d.Product && d.Product[0]) || {};
    const notes = (d.Notes && d.Notes.Note) || [];

    return {

      scheduledTime: d.time || null,
      scheduledDate: d.date || null,
      realtimeTime: d.rtTime || null,
      realtimeDate: d.rtDate || null,
      reachable: !!d.reachable,

      prognosisType: d.prognosisType || null,
      stopName: d.stop || null,
      stopExtId: d.stopExtId || d.stopid || null,
      lon: d.lon || null,
      lat: d.lat || null,
      direction: d.direction || null,

      lineName: productAtStop.name || product.name || null,
  lineNumber: productAtStop.displayNumber || product.displayNumber || product.line || null,
  lineId: productAtStop.lineId || product.lineId || null,

      operator: (productAtStop.operatorInfo && productAtStop.operatorInfo.name) || (product.operatorInfo && product.operatorInfo.name) || null,
      matchId: (product.matchId) || (productAtStop.matchId) || null,
      journeyRef: (d.JourneyDetailRef && d.JourneyDetailRef.ref) || null,
      raw: d,
      notes: notes,
    };


  });

}   


    export function renderDepartures(containerId, departures) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn(`renderDepartures: container with id '${containerId}' not found`);
    return;

  }

  container.innerHTML = '';
  const header = document.createElement('div');
  header.style.marginBottom = '8px';
  header.style.display = 'flex';

  header.style.justifyContent = 'space-between';
  header.style.alignItems = 'baseline';



  const title = document.createElement('div');
  title.innerHTML = `<h3 style="margin:0;font-size:1.05rem">Departures</h3>`;

  const updated = document.createElement('div');
  updated.style.fontSize = '0.8rem';
  updated.style.color = '#666';



  const planTs = (window.RejseplanAPI && window.RejseplanAPI.sampleData && window.RejseplanAPI.sampleData.planRtTs) || sampleData.planRtTs || null;
  if (planTs) {
    try {

      const d = new Date(planTs);
      updated.textContent = `Updated: ${d.toLocaleString()}`;
    } catch (e) {

      updated.textContent = `Updated: ${planTs}`; }
  } else {
    updated.textContent = `Updated: ${new Date().toLocaleTimeString()}`;
  }


  header.appendChild(title);
  header.appendChild(updated);
  container.appendChild(header);

  const list = document.createElement('div');
  list.style.display = 'flex';
  list.style.flexDirection = 'column';
  list.style.gap = '6px';


  function parseDateTime(dateStr, timeStr) {
    if (!dateStr || !timeStr) return null;

    try {
      return new Date(`${dateStr}T${timeStr}`);
    } catch (e) {
      return null;

    }
  }

  function minutesUntil(d) {
    if (!d) return null;
    const diff = d.getTime() - Date.now();
    return Math.round(diff / 60000);
  }


  departures.forEach((dep) => {
    const card = document.createElement('article');
    card.setAttribute('role', 'article');
    card.style.padding = '10px';
    card.style.border = '1px solid #e6e6e6';

    card.style.borderRadius = '8px';
    card.style.boxShadow = '0 1px 0 rgba(0,0,0,0.02)';
    card.style.display = 'flex';
    card.style.alignItems = 'center';
    card.style.gap = '12px';



    const timeCol = document.createElement('div');
    timeCol.style.width = '84px';
    timeCol.style.textAlign = 'left';

    const dt = parseDateTime(dep.scheduledDate, dep.scheduledTime);

    const rtDt = parseDateTime(dep.realtimeDate || dep.scheduledDate, dep.realtimeTime || dep.scheduledTime);
    const displayTime = dep.realtimeTime || dep.scheduledTime || '--:--';


    const timeMain = document.createElement('div');
    timeMain.style.fontFamily = 'monospace';
    timeMain.style.fontSize = '1.05rem';
    timeMain.style.fontWeight = '600';
    timeMain.textContent = displayTime;


    const until = document.createElement('div');
    until.style.fontSize = '0.85rem';
    until.style.color = '#666';
    const mins = minutesUntil(rtDt || dt);

    if (mins === null) {
      until.textContent = '';
    } else if (mins === 0) {
      until.textContent = 'now';
    } else if (mins > 0) {
      until.textContent = `in ${mins} min`;
    } else {
      until.textContent = '';
    }


    timeCol.appendChild(timeMain);
    timeCol.appendChild(until);
    const infoCol = document.createElement('div');
    infoCol.style.flex = '1';

    const titleRow = document.createElement('div');
    titleRow.style.display = 'flex';

    titleRow.style.justifyContent = 'space-between';
    titleRow.style.alignItems = 'center';



    const left = document.createElement('div');
    const lineName = document.createElement('div');
    lineName.style.fontWeight = '700';

    lineName.style.fontSize = '0.98rem';
    lineName.textContent = `${dep.lineNumber || ''} ${dep.lineName || ''}`.trim();

    const stopName = document.createElement('div');
    stopName.style.color = '#333';
    stopName.style.fontSize = '0.96rem';
    stopName.textContent = dep.stopName || '';



    left.appendChild(lineName);
    left.appendChild(stopName);

    const right = document.createElement('div');
    right.style.textAlign = 'right';

    titleRow.appendChild(left);
    titleRow.appendChild(right);


    const metaRow = document.createElement('div');
  metaRow.style.marginTop = '6px';
  metaRow.style.color = '#666';
  metaRow.style.fontSize = '0.85rem';

  
  const parts = [];
  if (dep.operator) parts.push(`Operator: ${dep.operator}`);
  if (dep.lineId) parts.push(`Line ID: ${dep.lineId}`);

  else if (dep.matchId) parts.push(`ID: ${dep.matchId}`);
  metaRow.textContent = parts.join(' • ');

    infoCol.appendChild(titleRow);
    infoCol.appendChild(metaRow);

    card.appendChild(timeCol);
    card.appendChild(infoCol);
    list.appendChild(card);
  });



  container.appendChild(list);
  const footer = document.createElement('div');
  footer.style.marginTop = '10px';
  footer.style.fontSize = '0.78rem';

  footer.style.color = '#666';
  footer.style.display = 'flex';
  footer.style.justifyContent = 'space-between';
  footer.style.alignItems = 'center';

  const advice = document.createElement('div');
  advice.textContent = 'Jonathan Udholm Hansen - TECHCOLLEGE 2025';



  const sourceNote = document.createElement('div');
  sourceNote.style.fontStyle = 'italic';
  sourceNote.style.color = '#444';
  sourceNote.textContent = 'Data provided by RejseplanAPI.';

  footer.appendChild(advice);
  footer.appendChild(sourceNote);
  container.appendChild(footer);

}

export function initFromData(data, containerId = 'busplan') {

  try {
    const deps = parseDepartures(data);
    renderDepartures(containerId, deps);
    return deps;
  } catch (err) {
    console.error('initFromData error', err);
    return [];
  }

}


export function init(containerId = 'busplan') {
  return initFromData(sampleData, containerId);
} if (typeof window !== 'undefined') {
  window.RejseplanAPI = window.RejseplanAPI || {};
  Object.assign(window.RejseplanAPI, { parseDepartures, renderDepartures, initFromData, init, sampleData });

}


export default {
  parseDepartures,
  renderDepartures,
  initFromData,
  init,
  sampleData,

};




