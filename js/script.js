jQuery(document).ready(function($) {

  $('#duration').hide();
  $('#dist_miles').hide();
  $('#dist_cost').hide();
  $('#map').hide();
  $('.results_section').hide();
  $('#reset').hide();
    
  $("#deliveryfrom").keyup(function() {this.value = this.value.toLocaleUpperCase();});
  $("#deliveryto").keyup(function() {this.value = this.value.toLocaleUpperCase();});
  
  $('#reset').on('click', function() {
    location.reload();
    $('#deliveryfrom').val('');
    $('#deliveryto').val('');
    $('.postcode_section').fadeIn();
    $('.results_section').hide();
    $('#duration').hide();
    $('#dist_miles').hide();
    $('#dist_cost').hide();
    $('#map').hide();
  });
  
  $('#get_prices').on('click', function() {
    var deliveryfrom = $('#deliveryfrom').val();
    var deliveryto = $('#deliveryto').val();
    var select_van = $('#van_type').val();
    
    var invalid = 'Delivery is only available from Derbyshire, Nottinghamsire and Leicestershire';
    var error = 'There was a problem with your selection, please check the postcodes are valid';
    
    if (deliveryfrom.match("^DE") || deliveryfrom.match("^de") || deliveryfrom.match("^NG") ||
      deliveryfrom.match("^ng") || deliveryfrom.match("^LE") || deliveryfrom.match("^le")) {
      var directionsService = new google.maps.DirectionsService();
      var directionsDisplay = new google.maps.DirectionsRenderer();
      
      var myOptions = {
        zoom: 7,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      
      var request = {
        origin: deliveryfrom,
        destination: deliveryto,
        travelMode: google.maps.DirectionsTravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL
      };
      directionsService.route(request, function(response, status) {
      
        var map = new google.maps.Map(document.getElementById("map"), myOptions);    
        directionsDisplay.setMap(map);
        
        if (status == google.maps.DirectionsStatus.OK) {
          
          $('.postcode_section').hide();
          $('.results_section').fadeIn();
          $('#duration').fadeIn();
          $('#dist_miles').fadeIn();
          $('#dist_cost').fadeIn();
          $('#map').fadeIn();
          $('#reset').fadeIn();
          
          directionsDisplay.setDirections(response);
          var distance_value = response.routes[0].legs[0].distance.value;
          var distance_total = distance_value / 1609.344;
          
          if (select_van == "truck") {
            var distance_cost = 'POA';
          } else if (select_van == "large") {
            var distance_calc = distance_total * 1.45;
            var distance_cost = distance_calc.toFixed(2);
          } else {
            var distance_calc = distance_total * 1.25;
            var distance_cost = distance_calc.toFixed(2);
          };
          
          document.getElementById('from').innerHTML = '<strong>From: </strong> ' + deliveryfrom;
          document.getElementById('to').innerHTML = '<strong>To: </strong>' + deliveryto + '</strong>';
          document.getElementById('duration').innerHTML = '<strong>Duration: </strong>' + response.routes[0].legs[0].duration.text;
          document.getElementById('dist_miles').innerHTML = '<strong>Distance: </strong>' + distance_total.toFixed(1) + ' miles';
          document.getElementById('dist_cost').innerHTML = '<strong>Cost: </strong>' + '£ ' + distance_cost + ' +VAT';
          
        } else {
          alert(error);
        }
      });
    } else {
      alert(invalid);
    };
  });
});
