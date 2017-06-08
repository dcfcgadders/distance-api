<html>
  <head>
    <title>Distance Calculator</title>
    <!-- Import Google Maps API inc KEY -->
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDUXWSeuFXSLQPeV6SoIrCiPyc-KQh5v1k"></script>
    <script type="text/javascript" src="/js/script.js"></script>
    <link href="/css/style.css" rel="stylesheet" type="text/css"/>
  </head>
  <body>
    <div class="postcode_section">
      <p><input id="deliveryfrom" type="text" size="8" placeholder="START POSTCODE"></p>
      <p><input id="deliveryto" type="text" size="8" placeholder="END POSTCODE"></p>
      <br/>
      <br/>
      <select id="van_type">
        <option id="select_small" value="small">Small Van</option>
        <option id="select_large" value="large">Large Van</option>
        <option id="select_truck" value="truck">7.5t Truck</option>
      </select>
      <br/>
      <br/>
      <button id="get_prices">Get Prices</button>
    </div>
    <div class="results_section">
      <div id="from"></div>
      <div id="to"></div>
      <div id="duration"></div>
      <div id="dist_miles"></div>
      <div id="dist_cost"></div>
      <p>&nbsp;</p>
      <div id="map"></div>
      <p>&nbsp;</p>
      <button id="reset">reset</button>
    </div>
  </body>
</html>
