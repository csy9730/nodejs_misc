# window

## window
## document

## navigator
### geolocation
``` js
navigator.geolocation.getCurrentPosition(function(pos){
    var latitude = pos.coords.latitude;
    var longitude = pos.coords.longitude;
    alert ("position" + latitude + "," + longitude)
})
```

``` js
navigator.geolocation.getCurrentPosition(function(position) {
  var latlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
  var myOptions = {
    zoom: 8,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.TERRAIN,
    disableDefaultUI: true
  }
  var map = new google.maps.Map(document.querySelector("#map_canvas"), myOptions);
});

```
## Ajax


##  sessionStorage 和 localStorage

[https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage)