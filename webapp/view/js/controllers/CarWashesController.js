angular.module('carwash4u').controller('CarWashesController', CarWashesController);

function CarWashesController(NgMap){
    var vm = this;

    vm.washes = [
            new google.maps.LatLng(-22.22076076, -49.95813847),
            new google.maps.LatLng(-22.2233232, -49.96009111),
            new google.maps.LatLng(-22.2196285, -49.95783806)
        ];

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
            map.setZoom(15);
            vm.map = map;
            new google.maps.Marker({
                position: latlng,
                map: map
            });
            vm.washes.forEach(function(wash){
                new google.maps.Marker({
                    position: wash,
                    map: map,
                    draggable: false,
                    icon: {
                        url: '../../public/images/washes.png',
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(parseFloat(0),parseFloat(0)),
                        scaledSize: new google.maps.Size(parseFloat(23),parseFloat(23))                               
                    },
                    animation: google.maps.Animation.DROP
                });
            });
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