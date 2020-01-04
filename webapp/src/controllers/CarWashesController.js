angular.module('carwash4u').controller('CarWashesController', CarWashesController);

/* @ngInject */
function CarWashesController(NgMap, ngGPlacesAPI){   
    var vm = this;
    vm.washes = [];
    vm.showData = showData; 
    vm.place = null;   
    vm.lastMark = null;
    getLocation();

    var icon = {
                    url: '../../content/images/washes.png',
                    scaledSize: [23, 23]
                 };            
    
    function showData(event, place){        
        vm.place = place;
        if (vm.lastMark != null){
            vm.lastMark.setAnimation(null);
        }
        vm.lastMark = this;        
        if (vm.lastMark.getAnimation() != null) {
            vm.lastMark.setAnimation(null);
        } else {
            vm.lastMark.setAnimation(google.maps.Animation.BOUNCE);
        }                
        vm.map.showInfoWindow('foo-iw', vm.lastMark);                
    }
    
    function getLocation(){
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        }else{
            vm.location = "O seu navegador não suporta Geolocalização.";
        }        
    }    

    function iterarCarWashes(results){                         
        for (var i = 0; i < results.length; i++) {
            var place = {
                nome: results[i].name,
                endereco: results[i].vicinity,
                pos: [results[i].geometry.location.lat(), results[i].geometry.location.lng()],
                place_id: results[i].place_id,
                conveniado: false,
                icon: icon
            };                    
            vm.washes.push(place);
        }
    }

    function showPosition(position){
        vm.minhaLocalizacao = position.coords.latitude + ", " + position.coords.longitude;     
        NgMap.getMap().then(function(map){             
            vm.map = map;               
            var request = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                types: ['car_wash'],
                radius:5000                
            };
            ngGPlacesAPI.nearbySearch(request).then(iterarCarWashes);

            Materialize.toast("O ponto vermelho indica sua localização", 9000);
            Materialize.toast("Toque nos pontos para mais informções", 9000);            
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