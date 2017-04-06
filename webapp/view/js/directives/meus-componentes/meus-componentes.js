angular.module('meusComponentes', [])
.directive('meuMapa', meuMapa);


function meuMapa(){
    var directive = {};

    directive.restrict = 'A';
    directive.templateUrl = 'meu-mapa.html';
    directive.replace = true;

    return directive;
}


