
var oldMarker;
var locationName;
function postUnicorn() {
    return function() {
        console.log(oldMarker)
        console.log('hej')
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
            console.log(result)
            document.location = 'pattern.html'
            $("#imageResult").attr('src', result['image']);
            $("#unicornNameSearch").html(result['name']);
            $("#searchDesc").html(result['description']);
        })
        
    }
}



function postToDB() {
    return function() {
        
        let data = {};
        //TODO implementera html-sida för att hämta datan

        $.ajax({
            method: "POST",
            url: 'http://localhost:5008/v1/unicorns/',
            data: JSON.stringify(data)
        })
        .done(function(result) {
            //Får vi ens result här?
        }) 
    }
}

function getAll() {
    return function() {
        $.ajax({
            url: 'http://localhost:5008/v1/unicorns/'
        })
        .done(function(result) {
            for (let i = 0; i < result.length; i++) {
                //TODO UPPDATERA RELEVANT HTML
            }
        });
    }
}

function getID() {
    return function() {
        let id = //TODO HÄMTA ID FRÅN HTML?
        $.ajax({
            url: 'http://localhost:5008/v1/unicorns/{' + id + '}'
        })
        .done(function(result) {
            //TODO UPPDATERA RELEVANT HTML
        })
    }
}

function getPictures() {
    return function() {
        let id = //TODO HÄMTA ID FRÅN HTML?
        $.ajax({
            url: 'http://localhost:5008/v1/pictures/{' + id + '}'
        })
        .done(function(result) {
            let image1 = result['image1']
            let image2 = result['image2']
            let image3 = result['image3']
            //TODO UPPDATERA RELEVANT HTML
        })
    }
}
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

$("document").ready(function() {
    $('#submit').click(postUnicorn());
    console.log("Hello")
 });
