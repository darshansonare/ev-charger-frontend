import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  props: ['chargers'],
  data() {
    return {
      map: null,
      markerGroup: null,
      icons: {
        active: null,
        inactive: null
      }
    };
  },
  mounted() {
    this.map = L.map('map').setView([18.5204, 73.8567], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.markerGroup = L.layerGroup().addTo(this.map);

    // ✅ Define both icons
    this.icons.active = L.icon({
      iconUrl: '/images/ev-icon.png', // green icon
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]
    });

    this.icons.inactive = L.icon({
      iconUrl: '/images/ev-iconred.png', // red icon
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]
    });

    this.renderMarkers();
  },
  watch: {
    chargers: {
      handler() {
        this.renderMarkers();
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    renderMarkers() {
      if (!this.map || !this.markerGroup) return;

      this.markerGroup.clearLayers();

      this.chargers.forEach(charger => {
        if (charger.latitude && charger.longitude) {
          const isActive = charger.status?.toLowerCase() === 'active';

          const markerIcon = isActive
            ? this.icons.active
            : this.icons.inactive;

          L.marker([charger.latitude, charger.longitude], { icon: markerIcon })
            .bindPopup(`<b>${charger.name}</b><br>Status: ${charger.status}<br>${charger.location}`)
            .addTo(this.markerGroup);
        }
      });
    }
  }
};