(function(){
    "use strict";
    
    angular.module('carwash4u').factory('UserService', UserService);
    
    function UserService($rootScope, $auth){
        var vm = this;
        var userData = $auth.getPayload();    

        return {
            isAuthenticated: function(){
                return $auth.isAuthenticated();
            },
            authenticate: function(provider) {                
                $auth
                .authenticate(provider)
                .then(vm.successAuth)
                .catch(vm.failedAuth);
            },
            logOut: function() {
                $auth.logout();
                userData = undefined;
    
                $rootScope.$emit('userLoggedOut');
            },
            getUser: function(){
                return userData;
            },
            successAuth: function() {
                userData = $auth.getPayload();  
                $rootScope.$emit('userLoggedIn', {data: userData});
            },
            failedAuth: function() {
                userData = undefined;
                $rootScope.$emit('userFailedLogin');
            }
        }    
    }
})();