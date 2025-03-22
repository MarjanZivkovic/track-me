const map = L.map("map");

map.setView([0, 0], 15);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

let marker = L.marker([0, 0]);

if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    (position) => {
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;

      marker.setLatLng([userLat, userLng]).addTo(map).bindTooltip("I'm here");

      if (!map.hasLayer(marker)) {
        marker.addTo(map);
      }

      map.setView([userLat, userLng], 15);

      // L.marker([userLat, userLng]).addTo(map).bindTooltip("I'm here");
    },
    (error) => {
      console.error(`Geolocation Error: ${error.message}`);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 5000,
    }
  );
} else {
  console.error("Geolocation is not supported by this browser.");
}
