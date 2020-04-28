angular.module('carwash4u').controller('LoginController', LoginController);

/* @ngInject */
function LoginController(UserService){    
    var vm = this;
    vm.authenticate = authenticate;
    
    function authenticate(provider){
        UserService.authenticate(provider);
    }
}