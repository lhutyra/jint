/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-465.js
 * @description ES5 Attributes - success to update [[Configurable]] attribute of accessor property ([[Get]] is undefined, [[Set]] is a Function, [[Enumerable]] is true, [[Configurable]] is true) to different value
 */


function testcase() {
        var obj = {};

        var verifySetFunc = "data";
        var setFunc = function (value) {
            verifySetFunc = value;
        };

        Object.defineProperty(obj, "prop", {
            get: undefined,
            set: setFunc,
            enumerable: true,
            configurable: true
        });
        var desc1 = Object.getOwnPropertyDescriptor(obj, "prop");

        Object.defineProperty(obj, "prop", {
            configurable: false
        });
        var desc2 = Object.getOwnPropertyDescriptor(obj, "prop");
        delete obj.prop;

        return desc1.configurable === true && desc2.configurable === false && obj.hasOwnProperty("prop");
    }
runTestCase(testcase);
