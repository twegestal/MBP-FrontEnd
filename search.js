var oldMarker
var locationName
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: { lat: 55.6059, lng: 13.0007},
      });
      
      const geocoder = new google.maps.Geocoder();
      const infowindow = new google.maps.InfoWindow();

    google.maps.event.addListener(map, 'click', function(event) {
        placeMarker(event.latLng);
        geocodeLatLng(geocoder, map, infowindow);
     });

     function geocodeLatLng(geocoder, map, infowindow) {
        const latlng = {
            lat: oldMarker.getPosition().lat(),
            lng: oldMarker.getPosition().lng(),
          };
          

          geocoder
          .geocode({ location: latlng })
          .then((response) => {
            if (response.results[0]) {
                infowindow.setContent(response.results[0].formatted_address);
                infowindow.open(map, marker);

                for (let i = 0; i < response.results.length; i++) {
                    let types = response.results[i].types[0]
                    if (types === 'locality' || types === 'administrative_area_level_1' || types === 'country') {
                        locationName = response.results[i].formatted_address
                        break                 
                    }
                }
            } else {
                window.alert("No results found");
            }
        })
        .catch((e) => window.alert("Geocoder failed due to: " + e));
    }
     
     function placeMarker(location) {
        marker = new google.maps.Marker({
            position: location,
            map: map,
        });

        if (oldMarker != undefined) {
            oldMarker.setMap(null);
        }
        oldMarker = marker;
     }
}

function postUnicorn() {
    return function() {
        var spinner = '<div class="spinner-border" role="status"><span class="visually-hidden"></span></div>'
        $('#submit').html(spinner);
        console.log(oldMarker)
        let data = {};
        let spottedWhere = {};
        data.color = $('#searchUnicorn-form input[name=color]').val()
        data.horn = $('#searchUnicorn-form input[name=horn]').val()
        data.behaviour = $('#searchUnicorn-form input[name=behaviour]').val()
        data.reportedBy = 'Luke' //en till inputruta i html;
        data.spottedWhen = '2022-01-01 00:00:00' //kalender funktion;
        spottedWhere.name = locationName
        spottedWhere.lat = oldMarker.getPosition().lat()
        spottedWhere.lon = oldMarker.getPosition().lng()
        data.spottedWhere = spottedWhere 

        $.ajax({
            method: "POST",
            url: 'http://localhost:5008/v1/unicorns/search/',
            data: JSON.stringify(data)
        })
        .done(function(result){
            console.log('result')
            localStorage.setItem('result', result)
            localStorage.setItem('image', result['image'])
            localStorage.setItem('name', result['name'])
            localStorage.setItem('desc', result['description'])
            localStorage.setItem('whereName', result['spottedWhere']['name'])
            localStorage.setItem('lon', result['spottedWhere']['lon'])
            localStorage.setItem('lat', result['spottedWhere']['lat'])
            localStorage.setItem('reportedBy', result['reportedBy'])
            localStorage.setItem('spottedWhen', result['spottedWhen'])
            $('#submit').text('Hitta')
            document.location = 'pattern.html'
        })
        
    }
}
$("document").ready(function() {
    $('#submit').click(postUnicorn());
 });