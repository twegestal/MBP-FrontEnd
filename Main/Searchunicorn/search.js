var oldMarker //marker for google maps
var locationName //the most accurate name for the point on the map
const loaderCode = '<div class="center"><div class="ring"></div><span>Letar...</span></div>' //loader template
/**
 * Initializes the google map and handles the event when a location on the map is pressed
 * updates the oldMarker and locationName variables
 */
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

/**
 * Adds all the information from the form and map to localStorage and redirects to Pattern.html
 * Incase of an error redirects to the error page
 */
function postUnicorn() {
    return function() {
        if (validInput()) {
            let data = {};
            let spottedWhere = {};
            data.color = $('#selector').find(':selected').val()
            data.horn = $('#horn').val()
            data.behaviour = $('#behaviour').val()
            data.reportedBy = $('#reportedBy').val() 
            data.spottedWhen = $('.date').val() + ' 00:00:00' 
            spottedWhere.name = locationName
            spottedWhere.lat = oldMarker.getPosition().lat()
            spottedWhere.lon = oldMarker.getPosition().lng()
            data.spottedWhere = spottedWhere 
            $('#wrapper').append(loaderCode)
            $.ajax({
                method: "POST",
                url: 'http://localhost:5008/v1/unicorns/search/',
                data: JSON.stringify(data)
            }).done(function(result){
                localStorage.setItem('result', result)
                localStorage.setItem('image', result['image'])
                localStorage.setItem('name', result['name'])
                localStorage.setItem('desc', result['description'])
                localStorage.setItem('whereName', result['spottedWhere']['name'])
                localStorage.setItem('lon', result['spottedWhere']['lon'])
                localStorage.setItem('lat', result['spottedWhere']['lat'])
                localStorage.setItem('reportedBy', result['reportedBy'])
                localStorage.setItem('spottedWhen', result['spottedWhen'])
                document.location = '/Main/Searchunicorn/Pattern/pattern.html'
            }).fail(function(jqXHR, textStatus, error){
                localStorage.setItem('errorMessage', error)
                document.location = '/Main/Error/error.html'
            
            })
        } 
    }
}
/**
 * Validates that allt he inputfields are filled in, and changes the color of empty html elements to red.
 * @returns true if all fields are filled, false if one or more fields is missing.
 */
function validInput() {
    let ok = true;
    if (!$('#horn').val()) {
        $('#horn').css('borderColor', '#D0342C')
        ok = false
    }
    if (!($('#behaviour').val())) {
        $('#behaviour').css('borderColor', '#D0342C')
        ok = false
    }
    if (!($('#behaviour').val())) {
        $('#behaviour').css('borderColor', '#D0342C')
        ok = false
    }
    if (!($('#reportedBy').val())) {
        $('#reportedBy').css('borderColor', '#D0342C')
        ok = false
    }
    if (!($('.date').val())) {
        $('.date').css('borderColor', '#D0342C')
        ok = false
    }
    if (oldMarker == undefined) {
        $('#map').css('border', '3px #D0342C solid')
        
    }
    return ok
}
/**
 * Adds listener to the submit button
 */
$("document").ready(function() {
    $('#submit').click(postUnicorn());
    $('#logo').click(function() {
        document.location = '/Main/index.html'
    })
 });