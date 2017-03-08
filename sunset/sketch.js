function setup() {
    createCanvas(windowWidth, windowHeight);
    loadWeather();
}

function loadWeather() {
    loadJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22NY%2C%20NY%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
        function(data) {
            gotWeather(data, "EST");
        });
}

function gotWeather(data, timeZone) {
    
    // Get the timezone from build date
    // console.log(data.query.results.channel.lastBuildDate);
    var buildDate = Date.parse(data.query.results.channel.lastBuildDate);
    
    // We get the hour of sunset, 5.40pm - with no timezone or anything..
    var sunrise = data.query.results.channel.astronomy.sunrise;
    var sunset = data.query.results.channel.astronomy.sunset;
    
    // Parse that into a Date...
    var sunriseTime = Date.parseExact(sunrise, "h:mm tt");
    var sunsetTime = Date.parseExact(sunset, "h:mm tt");
    
    // Apply the timezone we got earlier to it
    // Need to change the timezone for each callback
    sunriseTime.setTimezone(timeZone);
    sunsetTime.setTimezone(timeZone);
    
    var sunrise = sunriseTime.getHours();
    var sunset = sunsetTime.getHours();
    
    // console.log(Date.now());
    var now = new Date().getHours();
    var rotation = map(now, sunset, sunrise, 0, PI);
    
    // Point on the cicumference of a circle
    var x = cos(rotation) * width / 3;
    var y = sin(rotation) * width / 3;
    
    // console.log(x, y);
    
    fill(255,0,0);
    ellipse(width / 2 + x, height - y, 10, 10);
    
    
    
}

function drawSun(sunriseTime, sunsetTime, timeZone) {
    
    
}

function draw() {



}