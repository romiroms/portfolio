# Jugroop Romesh — GIS Portfolio

A one-page editorial-style GIS and environmental science portfolio built with HTML, CSS, JavaScript and Leaflet.

## Preview locally
1. Extract the ZIP file.
2. Open `index.html` in a browser. For best results, run a small local server (for example VS Code Live Server).
3. An internet connection is required for the Leaflet library, map tiles and remote photographs.

## Publish with GitHub Pages
1. Create a GitHub repository, for example `jugroop-gis-portfolio`.
2. Upload the contents of this folder (the `index.html`, `css`, `js` and `data` items should be at the repository root).
3. In GitHub, open **Settings → Pages**.
4. Under Build and deployment, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`, then Save.
6. GitHub will provide your published website address.

## Add and edit projects
Open `js/projects.js`. Edit the objects in the `projects` array. Each project has:
- `number`
- `category`
- `title`
- `description`
- `image`
- `status`
- `link`
- `linkLabel`

Duplicate an object to add another project. Use image URLs that you own or are licensed to use.

## Add GIS data to the map
### Quick preview
Use the **Add GeoJSON** button on the map and select a `.geojson` or `.json` file. This loads the file in your browser only; it is not uploaded or saved to the website.

### Publish a permanent layer
1. In QGIS, right-click the layer → Export → Save Features As.
2. Choose **GeoJSON** as the format.
3. Set the CRS to **EPSG:4326 — WGS 84**.
4. Save the file inside the website's `data/` folder.
5. In `js/main.js`, add a `fetch` block after the basemap is created:

```js
fetch("data/your-layer.geojson")
  .then(response => {
    if (!response.ok) throw new Error("Could not load GeoJSON");
    return response.json();
  })
  .then(data => addGeoJSON(data, "Your layer name"))
  .catch(error => console.error(error));
```

The map helper `addGeoJSON` is already defined in `js/main.js`.

## Notes
- This is a static website; it does not need a backend.
- Leaflet and OpenStreetMap tiles are loaded from external services, so the map requires internet access.
- Check the applicable OpenStreetMap tile usage policy before high-volume or commercial use.
- Replace placeholder text, project descriptions, images and statuses with verified information about your own work.
- Do not publish sensitive, restricted or personally identifiable location data.
