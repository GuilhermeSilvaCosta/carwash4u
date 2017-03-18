angular.module('carwash4u').controller('CarWashesController', CarWashesController);

function CarWashesController($scope){
    var vm = this;

    vm.initialize = initialize;
    function initialize(lat, lng){
        GoogleMapsLoader.KEY = 'AIzaSyD4O3j30Ktxg0LrfptRTd73nQdV4BL1qR4';
        GoogleMapsLoader.load(function(google) {
            var latlng = new google.maps.LatLng(lat, lng);

            var options = {
                zoom: 15,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };        

            vm.map = new google.maps.Map(document.getElementById("mapa"), options);
            var marker = new google.maps.Marker({
                position: latlng,
                title: "Meu ponto personalizado! :-D",
                map: vm.map
            });
            $("#progress").hide();
            $("#mapa").height(300);
        });        
    }

    vm.showError = showError;
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
        $scope.$apply();
    }

    vm.showPosition = showPosition;
    function showPosition(position){
        // vm.location = "Latitude: " + position.coords.latitude + "Longitude: " + position.coords.longitude;
        // var latlon = position.coords.latitude+","+position.coords.longitude;
        // vm.map = "http://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=14&size=400x300&sensor=false";
        // $scope.$apply();   
        initialize(position.coords.latitude, position.coords.longitude);      
    }

    vm.getLocation = getLocation;
    function getLocation(){
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        }else{
            vm.location = "O seu navegador não suporta Geolocalização.";
        }        
    }
    getLocation();
}