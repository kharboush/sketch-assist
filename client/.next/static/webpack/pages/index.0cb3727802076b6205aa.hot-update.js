webpackHotUpdate_N_E("pages/index",{

/***/ "./src/utils/colors.ts":
/*!*****************************!*\
  !*** ./src/utils/colors.ts ***!
  \*****************************/
/*! exports provided: getColor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getColor\", function() { return getColor; });\nvar hsla = {\n  primary: '227, 51%, 25%',\n  secondary: '12, 80%, 53%'\n};\nvar getColor = function getColor(getColorOptions) {\n  var transparencyValue = transparency / 100;\n  var toHsla = \"hsla(\".concat(hsla.primary, \", \").concat(transparencyValue, \")\");\n  return toHsla;\n};\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL3V0aWxzL2NvbG9ycy50cz9mYTA3Il0sIm5hbWVzIjpbImhzbGEiLCJwcmltYXJ5Iiwic2Vjb25kYXJ5IiwiZ2V0Q29sb3IiLCJnZXRDb2xvck9wdGlvbnMiLCJ0cmFuc3BhcmVuY3lWYWx1ZSIsInRyYW5zcGFyZW5jeSIsInRvSHNsYSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBLElBQU1BLElBQUksR0FBRztBQUNYQyxTQUFPLEVBQUUsZUFERTtBQUVYQyxXQUFTLEVBQUU7QUFGQSxDQUFiO0FBS08sSUFBTUMsUUFBUSxHQUFHLFNBQVhBLFFBQVcsQ0FBQ0MsZUFBRCxFQUdsQjtBQUNKLE1BQU1DLGlCQUFpQixHQUFHQyxZQUFZLEdBQUcsR0FBekM7QUFDQSxNQUFNQyxNQUFNLGtCQUFXUCxJQUFJLENBQUNDLE9BQWhCLGVBQTRCSSxpQkFBNUIsTUFBWjtBQUNBLFNBQU9FLE1BQVA7QUFDRCxDQVBNIiwiZmlsZSI6Ii4vc3JjL3V0aWxzL2NvbG9ycy50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGhzbGEgPSB7XG4gIHByaW1hcnk6ICcyMjcsIDUxJSwgMjUlJyxcbiAgc2Vjb25kYXJ5OiAnMTIsIDgwJSwgNTMlJyxcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRDb2xvciA9IChnZXRDb2xvck9wdGlvbnM6IHtcbiAgdHlwZTogc3RyaW5nO1xuICBvcGFjaXR5OiBudW1iZXI7XG59KSA9PiB7XG4gIGNvbnN0IHRyYW5zcGFyZW5jeVZhbHVlID0gdHJhbnNwYXJlbmN5IC8gMTAwO1xuICBjb25zdCB0b0hzbGEgPSBgaHNsYSgke2hzbGEucHJpbWFyeX0sICR7dHJhbnNwYXJlbmN5VmFsdWV9KWA7XG4gIHJldHVybiB0b0hzbGE7XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/utils/colors.ts\n");

/***/ })

})