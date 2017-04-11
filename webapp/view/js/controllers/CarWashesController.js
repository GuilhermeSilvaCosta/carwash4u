angular.module('carwash4u').controller('CarWashesController', CarWashesController);

function CarWashesController(NgMap){
    var vm = this;

    getLocation();
    function getLocation(){
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        }else{
            vm.location = "O seu navegador não suporta Geolocalização.";
        }        
    }    

    function showPosition(position){
        NgMap.getMap().then(function(map) {
            var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(latlng);
            map.setZoom(16);
            vm.map = map;            
            new google.maps.Marker({
                position: latlng,
                map: map,
                draggable: false,
                animation: google.maps.Animation.DROP
            });
            for (var key in map.markers) {
                map.markers[key].setMap(null);
            };            
        });              
    }    

    function showError(error){
        switch(error.code){
            case error.PERMISSION_DENIED:
                vm.erroLocation = "Usuário rejeitou a solicitação de Geolocalização";
                break;
            case error.POSITION_UNAVAILABLE:
                vm.erroLocation = "Localização indisponível";
                break;
            case error.TIMEOUT:
                vm.erroLocation = "A requisição expirou.";
                break;
            case error.UNKNOWN_ERROR:
                vm.erroLocation = "Algum erro desconhecido aconteceu.";
                break;
        }
    }
}