angular.module('carwash4u').controller('CarWashesController', CarWashesController);

function CarWashesController(NgMap){
    var vm = this;

    const icon = {
                    url: '../../content/images/washes.png',
                    scaledSize: [23, 23]
                 }

    vm.washes = [
            {
                pos: [-22.22076076, -49.95813847],
                icon: icon
            },
            {
                pos: [-22.2233232, -49.96009111],
                icon: icon
            },
            {
                pos: [-22.2196285, -49.95783806],
                icon: icon
            }
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
        vm.minhaLocalizacao = position.coords.latitude+", "+position.coords.longitude;
        NgMap.getMap().then(function(map){
            vm.map = map;
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