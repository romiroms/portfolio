// Portfolio project gallery
const projectGrid = document.getElementById("project-grid");
projects.forEach((project) => {
  const card = document.createElement("article");
  card.className = "project-card";
  card.innerHTML = `
    <div class="project-image">
      <img src="${project.image}" alt="" loading="lazy">
      <span class="project-index">${project.number}</span>
    </div>
    <div class="project-meta"><span>${project.category}</span><span>${project.status}</span></div>
    <h3>${project.title}</h3>
    <p>${project.description}</p>
    <a class="project-link" href="${project.link}">${project.linkLabel || "View project"} ↗</a>
  `;
  projectGrid.appendChild(card);
});

// Interactive Leaflet map centred on Mauritius
const mauritius = [-20.25, 57.55];
const map = L.map("map", { scrollWheelZoom: true }).setView(mauritius, 9);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const addedLayers = [];
const status = document.getElementById("map-status");

function addGeoJSON(data, label) {
  const layer = L.geoJSON(data, {
    style: () => ({ color: "#526d50", weight: 2, opacity: 0.9, fillColor: "#91a88a", fillOpacity: 0.28 }),
    pointToLayer: (_feature, latlng) => L.circleMarker(latlng, {
      radius: 6, color: "#344b35", weight: 1.5, fillColor: "#91a88a", fillOpacity: 0.9
    }),
    onEachFeature: (feature, featureLayer) => {
      const props = feature.properties || {};
      const rows = Object.entries(props).slice(0, 12)
        .map(([key, value]) => `<b>${escapeHtml(key)}</b>: ${escapeHtml(String(value))}`)
        .join("<br>");
      featureLayer.bindPopup(`<strong>${escapeHtml(label)}</strong>${rows ? "<hr>" + rows : ""}`);
    }
  }).addTo(map);
  addedLayers.push(layer);
  if (layer.getBounds && layer.getBounds().isValid()) map.fitBounds(layer.getBounds(), { padding: [25, 25], maxZoom: 14 });
  status.textContent = `${label} added · ${addedLayers.length} layer(s) currently displayed`;
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[char]));
}

document.getElementById("geojson-upload").addEventListener("change", async (event) => {
  const files = Array.from(event.target.files || []);
  for (const file of files) {
    try {
      const data = JSON.parse(await file.text());
      if (!["FeatureCollection", "Feature", "GeometryCollection", "Point", "MultiPoint", "LineString", "MultiLineString", "Polygon", "MultiPolygon"].includes(data.type)) {
        throw new Error("This does not look like valid GeoJSON.");
      }
      addGeoJSON(data, file.name);
    } catch (error) {
      status.textContent = `Could not load ${file.name}: ${error.message}`;
    }
  }
  event.target.value = "";
});

document.getElementById("reset-map").addEventListener("click", () => {
  addedLayers.forEach(layer => map.removeLayer(layer));
  addedLayers.length = 0;
  map.setView(mauritius, 9);
  status.textContent = "Map reset · Add a GeoJSON file to display your own layer";
});

document.getElementById("year").textContent = new Date().getFullYear();
