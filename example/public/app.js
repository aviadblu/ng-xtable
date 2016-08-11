'use strict';

function mainCtrl() {
    var ctrl = this;
    ctrl.users = [
        {
            id: 1,
            fname: "Shelton",
            lname: "Lejeune",
            pass: "1234",
            email: "email1@example.com"
        },
        {
            id: 2,
            fname: "Roberto",
            lname: "Conlee",
            pass: "1234",
            email: "email2@example.com"
        },
        {
            id: 3,
            fname: "Javier",
            lname: "Vore",
            pass: "1234",
            email: "email3@example.com"
        },
        {
            id: 4,
            fname: "Teresa",
            lname: "Ridgeway",
            pass: "1234",
            email: "email4@example.com"
        },
        {
            id: 5,
            fname: "Eura",
            lname: "Banister",
            pass: "1234",
            email: "email5@example.com"
        }
    ];
}

var app = angular.module('ngXTableExampleApp', ['ng-xtable']);

app.controller('mainCtrl', [mainCtrl]);