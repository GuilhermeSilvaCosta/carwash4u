angular.module('carwash4u').controller('ManagerController', ManagerController);

/* @ngInject */
function ManagerController(){   
    var vm = this;    
    vm.guilherme = guilherme;
    
    function guilherme(){
        console.log('teste');
    }
}