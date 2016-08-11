'use strict';

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function initCols(options) {
    var cols = [];

    options.fields.forEach(function(field){
        if(field.key) {
            cols.push({
                key: field.key,
                type: field.type ? field.type : 'text',
                name: field.name ? field.name : toTitleCase(field.id)
            });
        }
    });

    cols.push({
       name: 'Actions'
    });
    return cols;
}

function xtable() {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            xtableOptions: '='
        },
        replace: true,
        template:
        '<table ng-class="{className}">' +
            '<thead>' +
                '<tr>' +
                    '<th ng-repeat="col in cols track by $index">{{col.name}}</th>' +
                '</tr>' +
            '</thead>' +
            '<tbody>' +
                '<tr ng-repeat="(rowIndex, row) in tableData track by $index">' +
                    '<td ng-repeat="cell in row track by $index">' +
                        '<span ng-show="!row.editMode">{{cell.value()}}</span>' +
                        '<span ng-show="row.editMode"><input type="{{cell.type}}" ng-model="cell.value" ng-model-options="{getterSetter:true}"></span>' +
                    '</td>' +
                    '<td>' +
                        '<button ng-click="editRow(rowIndex)">Edit</button>' +
                    '</td>' +
                '</tr>' +
            '</tbody>' +
        '</table>',
        link : function link(scope, element, attr) {
            scope.class = attr.class;
            scope.cols = initCols(scope.xtableOptions);

            scope.tableData = [];
            scope.$watch('data', function() {
                if(scope.data.length > 0) {
                    angular.forEach(scope.data, function(d) {
                        var rowData = {};
                        scope.cols.forEach(function(col){
                            if(col.key) {
                                var _value = d[col.key] ? d[col.key] : '';
                                rowData[col.key] = {
                                    editMode: false,
                                    type: col.type,
                                    value: function (newValue) {
                                        function ifChanged() {
                                            _value = newValue;
                                            return _value;
                                        }
                                        return arguments.length ? ifChanged() : _value;
                                    }
                                };
                            }
                        });
                        scope.tableData.push(rowData);
                    });
                }
            });

            scope.editRow = function(rowIndex) {
                scope.tableData[rowIndex].editMode = true;
            }
        }
    };
}

angular.module('ng-xtable',[]);
angular.module('ng-xtable')
    .directive('xtable', [xtable]);