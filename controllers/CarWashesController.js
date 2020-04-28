angular.module('carwash4u').controller('CarWashesController', CarWashesController);

/* @ngInject */
function CarWashesController($http, $scope){   
    const vm = this;
    vm.washes = [];
    //vm.showData = showData; 
    vm.markers={}
    vm.place = null;   
    vm.lastMark = null;
    vm.center=null
    vm.test
    getLocation();

    function test() {
        console.log('test')
    }

    const iconWashes = {
        iconUrl: '../content/images/washes.png',
        iconSize: [23, 23]
    };

    const iconMarker = {
        iconUrl: '../content/images/marker.png',
        iconSize: [23, 23]
    };
    
    /*function showData(event, place){        
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
    }*/
    
    function getLocation(){
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        }else{
            vm.location = "O seu navegador não suporta Geolocalização.";
        }        
    }    

    /*function iterarCarWashes(results){                         
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
    }*/

    function showPosition(position){
        //vm.minhaLocalizacao = position.coords.latitude + ", " + position.coords.longitude;   
        vm.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            zoom: 16
        }

        vm.markers = {
            center: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                icon: iconMarker
            }
        }

        $http.get(`https://discover.search.hereapi.com/v1/discover?at=${position.coords.latitude},${position.coords.longitude}&apiKey=_1LoGVFtWuc3gse4CPBXiW_BzMooDs8Ktj1iyENPVV0&q=lava%20rapido&limit=20`)
        .then(res => {
            vm.markers = {
                ...vm.markers,
                ...res.data.items.map(item => {
                    return {
                        ...item.position,
                        icon: iconWashes,
                        getMessageScope: function () { return $scope; },
                        message: '<info-window>'+
                                    '<div ng-non-bindable="">'+
                                        '<b>'+item.title+'</b>'+
                                        '<br>'+
                                        '<address>'+item.address.street+', '+item.address.houseNumber+'</address>'+
                                        '<br>'+
                                        '<div class="row center">'+                   
                                            '<a class="btn blue" modal>Agendamento</a>'+
                                        '</div>'+
                                    '</div>'+
                                '</info-window>',
                        compileMessage: true
                    }
                })
            }
            
        },
        err => showError(err))
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