// Inicializar Mapa
ObtenerInfo();

let button = document.getElementById("postear");
let refresh = document.getElementById("refrescar");
const titulo = document.getElementById("title");
const input = document.getElementById("direccion");

var form = document.forms["form"];
form.onsubmit = function (e) {
  // button.addEventListener("click", function(e) {
  e.preventDefault();
  let direccion = document.getElementById("direccion").value;
  let title = document.getElementById("title").value;
  let nuevaDireccion = {
    title: title,
    direccion: direccion,
  };
  console.log(title + direccion);
  fetch("http://localhost:3000/api/ubicacion", {
    method: "POST",
    body: JSON.stringify(nuevaDireccion),
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
  })
    .then(function (response) {
      if (response.ok) {
        return response.text();
        window.alert("Nueva direccion guardada. Muchas gracias!")
      } else {
        throw "Error en la llamada";
      }
    })
    .catch(function (err) {
      console.log(err);
    });
  titulo.value = "";
  input.value = "";
};

function ObtenerInfo() {
  fetch(`http://localhost:3000/api/ubicacion`)
    .then((data) => data.json())
    .then((response) => RenderizarMapa(response))
    .catch((err) => console.error(err));
}

const RenderizarMapa = data => {
  let geocoder = new google.maps.Geocoder();
  const infoWindow = new google.maps.InfoWindow();

  const buenosaires = { lat: -34.920345, lng: -57.969559 };

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: buenosaires,
  });
  data.forEach((dat, index) => {
    const { direccion, title } = dat
    
    const interval = setInterval(() => {
      geocoder.geocode({ address: direccion }, function (results, status) {
          if (!results) return null
          console.log(index);
          map.setCenter(results[0].geometry.location);
          var marker = new google.maps.Marker(
            {
              map: map,
              position: results[0].geometry.location,
              title: `${index + 1}. ${title} `,
              icon: "https://i.ibb.co/Xpq5rHH/Rat-PNG-Background.png",
              optimized: false
            });
          //Add a click listener for each marker, and set up the info window.
          marker.addListener("click", () => {
            infoWindow.close();
            infoWindow.setContent(marker.getTitle());
            infoWindow.open(marker.getMap(), marker);
          });
        
        if (status == google.maps.GeocoderStatus.OK) {
          clearInterval(interval);
        }
      });
    }, 1000)

  })

}

refresh.addEventListener("click", function (e) {
  e.preventDefault();
  map.setZoom(map.getZoom());
});
