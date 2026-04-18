let countries = []
const baseURL = "https://de1.api.radio-browser.info/json/"; // This will be the site to json files
let stations = []

// LOAD ALL COUNTRIES
async function loadCountries() {
    const res = await fetch(`${baseURL}countries`); // Collect countries from this API stored in json
    countries = await res.json(); // Store json into the countries array

    const select = document.getElementById("countrySelect"); // Find the Select tag using the id name
    select.innerHTML = "" // Initiation

    countries.forEach(c => {
        let opt = document.createElement("option"); // Create for each countries options
        opt.value = c.name;
        opt.textContent = c.name;
        select.appendChild(opt); // Append the list of countries inside the select
    }); // Use foreach to load countries that can be selected
}

// LOAD ALL STATIONS
async function loadStations(country) {
    const res = await fetch(`${baseURL}stations/bycountry/${country}?limit=100`); // Collect countries from this API stored in json
    stations = await res.json(); // Store json into the stations array
    console.log(stations);
    const select = document.getElementById("stationSelect");
    select.innerHTML = "" // Initiation

    stations.forEach((s, i) => {
        if(s.url_resolved) {
            let opt = document.createElement("option"); // Create for each countries options
            opt.value = i;
            opt.textContent = s.name;
            select.appendChild(opt);
        }
    });
    updateUI();
}

function updateUI() {
    const station = stations[stationSelect.value];
    if(!station) return 

    document.getElementById("stationName").textContent = station.name
    document.getElementById("stationInfo").textContent = 
        `${station.tags || "No Genre"} 💠 ${station.bitrate || "?"} kbps`;

    document.getElementById("stationLogo").src = 
    (station.favicon && station.favicon.startsWith("http")) ? station.favicon 
    : "data:image/png;base64,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"
}

countrySelect.addEventListener("change", e => {
    loadStations(e.target.value);
}); 

stationSelect.addEventListener("change", updateUI);



/* ---------------- AUDIO ---------------- */
const audio = document.getElementById("audio");
let audioCtx, analyser, source, dataArray;

function playRadio() {
    const station = stations[stationSelect.value];
    if (!station) return;

    audio.src = station.url_resolved;
    audio.play();

    updateUI();
    document.getElementById("stationLogo").classList.add("playing");

    if (!audioCtx) {
        audioCtx = new AudioContext();
        analyser = audioCtx.createAnalyser();
        source = audioCtx.createMediaElementSource(audio);

        source.connect(analyser);
        analyser.connect(audioCtx.destination);

        analyser.fftSize = 64;
        dataArray = new Uint8Array(analyser.frequencyBinCount);

        animate();
    }

    if (audioCtx.state === "suspended") {
        audioCtx.resume();
    }
}

function stopRadio() {
    audio.pause();
    document.getElementById("stationLogo").classList.remove("playing");
}

/* ---------------- ANIMATION ---------------- */
function animate() {
    requestAnimationFrame(animate);

    analyser.getByteFrequencyData(dataArray);

    const bars = document.querySelectorAll(".bar");

    bars.forEach((bar, i) => {
        let val = dataArray[i];
        bar.style.height = (val / 2 + 5) + "px";

        let hue = (i * 10 + Date.now() / 30) % 360;
        bar.style.background = `hsl(${hue}, 70%, 60%)`;
    });
}

/* ---------------- CREATE BARS ---------------- */
const eq = document.getElementById("equalizer");

for (let i = 0; i < 60; i++) {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    eq.appendChild(bar);
}

// INITIATION
loadCountries();
