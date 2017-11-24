//main.js
function startMap() {
  // Create and Initialize Map
  const sol = {
    lat: 41.388347,
    lng: 2.170271
  };

<<<<<<< HEAD
    const map = new google.maps.Map(document.getElementById('map'), {
        center: sol,
        zoom: 13
    });

    // Add clubs markers to map
    let markers = [];
    console.log(club);
    club.forEach(function (club) {
        var contentString =
            `<h2> ${club.clubname}</h2>
        <a href="${club.website}">${club.website}</a>
        <p> ${club.address}</p>
        <p> ${club.phonenumber}</p>`

        let title = club.clubname;
        console.log(club.location);
        let position = {
            lat: club.location.coordinates[1],
            lng: club.location.coordinates[0]
        };
        var pin = new google.maps.Marker({
            position,
            map,
            title
        });
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
=======
  const map = new google.maps.Map(document.getElementById("map"), {
    center: sol,
    zoom: 14
  });

  // Add clubs markers to map
  let markers = [];
  club.forEach(function(club) {
    var contentString = `<h2"> ${club.clubname}</h2>
        <h3> ${club.address}</h3>
        <h3> ${club.phonenumber}</h3>`;
>>>>>>> 661a3fead10628f17a80a79919911413d1165d19

    let title = club.clubname;
    console.log(club.location);
    let position = {
      lat: club.location.coordinates[1],
      lng: club.location.coordinates[0]
    };
    var pin = new google.maps.Marker({
      position,
      map,
      title
    });
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    pin.addListener("click", function() {
      infowindow.open(map, pin);
    });
    markers.push(pin);
  });
}

window.addEventListener("load", function() {
  startMap();
});
