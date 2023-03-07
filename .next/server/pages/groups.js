"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/groups";
exports.ids = ["pages/groups"];
exports.modules = {

/***/ "./pages/groups/index.tsx":
/*!********************************!*\
  !*** ./pages/groups/index.tsx ***!
  \********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Groups)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! swr */ \"swr\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([swr__WEBPACK_IMPORTED_MODULE_1__]);\nswr__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\nfunction Groups() {\n    const { data , error , isLoading  } = (0,swr__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(`/api/groups`);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"\",\n        children: data && data.map((el)=>{\n            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                children: el.eng\n            }, void 0, false, {\n                fileName: \"/Users/tatanaarhipova/MikeIT/next-english/pages/groups/index.tsx\",\n                lineNumber: 9,\n                columnNumber: 24\n            }, this);\n        })\n    }, void 0, false, {\n        fileName: \"/Users/tatanaarhipova/MikeIT/next-english/pages/groups/index.tsx\",\n        lineNumber: 7,\n        columnNumber: 9\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9ncm91cHMvaW5kZXgudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ3dCO0FBRVQsU0FBU0MsU0FBUTtJQUM1QixNQUFNLEVBQUNDLEtBQUksRUFBRUMsTUFBSyxFQUFFQyxVQUFTLEVBQUMsR0FBR0osK0NBQU1BLENBQVUsQ0FBQyxXQUFXLENBQUM7SUFDOUQscUJBQ0ksOERBQUNLO1FBQUlDLFdBQVU7a0JBQ1ZKLFFBQVFBLEtBQUtLLEdBQUcsQ0FBQ0MsQ0FBQUEsS0FBSztZQUNuQixxQkFBTyw4REFBQ0M7MEJBQUdELEdBQUdFLEdBQUc7Ozs7OztRQUNyQjs7Ozs7O0FBR1osQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2VuZ2xpc2gvLi9wYWdlcy9ncm91cHMvaW5kZXgudHN4PzNlNzkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR3JvdXAgfSBmcm9tICdAcHJpc21hL2NsaWVudCdcbmltcG9ydCB1c2VTV1IgZnJvbSAnc3dyJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBHcm91cHMoKXtcbiAgICBjb25zdCB7ZGF0YSwgZXJyb3IsIGlzTG9hZGluZ30gPSB1c2VTV1I8R3JvdXBbXT4oYC9hcGkvZ3JvdXBzYClcbiAgICByZXR1cm4oXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiXCI+XG4gICAgICAgICAgICB7ZGF0YSAmJiBkYXRhLm1hcChlbCA9PntcbiAgICAgICAgICAgICAgICByZXR1cm4gPHA+e2VsLmVuZ308L3A+XG4gICAgICAgICAgICB9KX1cbiAgICAgICAgPC9kaXY+XG4gICAgKVxufSJdLCJuYW1lcyI6WyJ1c2VTV1IiLCJHcm91cHMiLCJkYXRhIiwiZXJyb3IiLCJpc0xvYWRpbmciLCJkaXYiLCJjbGFzc05hbWUiLCJtYXAiLCJlbCIsInAiLCJlbmciXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/groups/index.tsx\n");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "swr":
/*!**********************!*\
  !*** external "swr" ***!
  \**********************/
/***/ ((module) => {

module.exports = import("swr");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/groups/index.tsx"));
module.exports = __webpack_exports__;

})();