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
exports.id = "pages/api/auth/[...nextauth]";
exports.ids = ["pages/api/auth/[...nextauth]"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "next-auth":
/*!****************************!*\
  !*** external "next-auth" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("next-auth");

/***/ }),

/***/ "next-auth/providers/credentials":
/*!**************************************************!*\
  !*** external "next-auth/providers/credentials" ***!
  \**************************************************/
/***/ ((module) => {

module.exports = require("next-auth/providers/credentials");

/***/ }),

/***/ "(api)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nlet prisma;\nif (false) {} else {\n    if (!global.prisma) {\n        global.prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\n    }\n    prisma = global.prisma;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9saWIvcHJpc21hLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE4QztBQUU5QyxJQUFJQztBQUVKLElBQUlDLEtBQXlCLEVBQWMsRUFFMUMsTUFBTTtJQUNMLElBQUksQ0FBQ0MsT0FBT0YsTUFBTSxFQUFFO1FBQ2xCRSxPQUFPRixNQUFNLEdBQUcsSUFBSUQsd0RBQVlBO0lBQ2xDLENBQUM7SUFDREMsU0FBU0UsT0FBT0YsTUFBTTtBQUN4QixDQUFDO0FBRUQsaUVBQWVBLE1BQU1BLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lbmdsaXNoLy4vbGliL3ByaXNtYS50cz85ODIyIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gJ0BwcmlzbWEvY2xpZW50JztcblxubGV0IHByaXNtYTogUHJpc21hQ2xpZW50O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJykge1xuICBwcmlzbWEgPSBuZXcgUHJpc21hQ2xpZW50KCk7XG59IGVsc2Uge1xuICBpZiAoIWdsb2JhbC5wcmlzbWEpIHtcbiAgICBnbG9iYWwucHJpc21hID0gbmV3IFByaXNtYUNsaWVudCgpO1xuICB9XG4gIHByaXNtYSA9IGdsb2JhbC5wcmlzbWE7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHByaXNtYTsiXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwicHJpc21hIiwicHJvY2VzcyIsImdsb2JhbCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./lib/prisma.ts\n");

/***/ }),

/***/ "(api)/./pages/api/auth/[...nextauth].ts":
/*!*****************************************!*\
  !*** ./pages/api/auth/[...nextauth].ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"authOptions\": () => (/* binding */ authOptions),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"next-auth\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"next-auth/providers/credentials\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../lib/prisma */ \"(api)/./lib/prisma.ts\");\n\n\n\nconst authOptions = {\n    secret: process.env.AUTH_SECRET,\n    providers: [\n        next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1___default()({\n            name: \"Login & Password\",\n            credentials: {\n                username: {\n                    label: \"Email\",\n                    type: \"text\",\n                    placeholder: \"email@crcc.ru\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"Password\"\n                }\n            },\n            authorize: async (credentials, req)=>{\n                const { username: email , password  } = credentials;\n                if (!email || !password) {\n                    return null;\n                }\n                const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__[\"default\"].user.findUnique({\n                    where: {\n                        email: String(email)\n                    }\n                });\n                if (user && user.password === password) {\n                    return {\n                        ...user,\n                        id: String(user.id)\n                    };\n                }\n                return null;\n            }\n        })\n    ],\n    callbacks: {\n        async jwt ({ token , user  }) {\n            if (user) {\n                token.role = user.role;\n                token.id = user.id;\n            }\n            return token;\n        },\n        session ({ session , token  }) {\n            if (token && session.user) {\n                session.user.role = token.role;\n                session.user.id = token.id;\n            }\n            return session;\n        }\n    }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (next_auth__WEBPACK_IMPORTED_MODULE_0___default()(authOptions));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBZ0M7QUFDeUI7QUFDaEI7QUFHbEMsTUFBTUcsY0FBK0I7SUFDeENDLFFBQVFDLFFBQVFDLEdBQUcsQ0FBQ0MsV0FBVztJQUMvQkMsV0FBVztRQUNQUCxzRUFBV0EsQ0FBQztZQUNSUSxNQUFNO1lBQ05DLGFBQWE7Z0JBQ1RDLFVBQVU7b0JBQ05DLE9BQU87b0JBQ1BDLE1BQU07b0JBQ05DLGFBQWE7Z0JBQ2pCO2dCQUNBQyxVQUFVO29CQUNOSCxPQUFPO29CQUNQQyxNQUFNO2dCQUNWO1lBQ0o7WUFDQUcsV0FBVyxPQUFNTixhQUFhTyxNQUFPO2dCQUNqQyxNQUFNLEVBQUVOLFVBQVVPLE1BQUssRUFBRUgsU0FBUSxFQUFFLEdBQUdMO2dCQUN0QyxJQUFHLENBQUNRLFNBQVMsQ0FBQ0gsVUFBUztvQkFDbkIsT0FBTyxJQUFJO2dCQUNmLENBQUM7Z0JBQ0QsTUFBTUksT0FBTyxNQUFNakIsbUVBQXNCLENBQUM7b0JBQ3RDbUIsT0FBTzt3QkFDSEgsT0FBT0ksT0FBT0o7b0JBQ2xCO2dCQUNKO2dCQUNBLElBQUlDLFFBQVFBLEtBQUtKLFFBQVEsS0FBS0EsVUFBVTtvQkFDcEMsT0FBTzt3QkFBQyxHQUFHSSxJQUFJO3dCQUFFSSxJQUFJRCxPQUFPSCxLQUFLSSxFQUFFO29CQUFDO2dCQUN4QyxDQUFDO2dCQUNELE9BQU8sSUFBSTtZQUNmO1FBQ0o7S0FDSDtJQUNEQyxXQUFXO1FBQ1AsTUFBTUMsS0FBSSxFQUFFQyxNQUFLLEVBQUVQLEtBQUksRUFBRSxFQUFFO1lBQ3pCLElBQUlBLE1BQU07Z0JBQ1JPLE1BQU1DLElBQUksR0FBR1IsS0FBS1EsSUFBSTtnQkFDdEJELE1BQU1ILEVBQUUsR0FBR0osS0FBS0ksRUFBRTtZQUNwQixDQUFDO1lBQ0QsT0FBT0c7UUFDVDtRQUNBRSxTQUFRLEVBQUVBLFFBQU8sRUFBRUYsTUFBSyxFQUFFLEVBQUU7WUFDMUIsSUFBSUEsU0FBU0UsUUFBUVQsSUFBSSxFQUFFO2dCQUN6QlMsUUFBUVQsSUFBSSxDQUFDUSxJQUFJLEdBQUdELE1BQU1DLElBQUk7Z0JBQzlCQyxRQUFRVCxJQUFJLENBQUNJLEVBQUUsR0FBR0csTUFBTUgsRUFBRTtZQUM1QixDQUFDO1lBQ0QsT0FBT0s7UUFDVDtJQUNGO0FBQ04sRUFBQztBQUNELGlFQUFlNUIsZ0RBQVFBLENBQUNHLFlBQVlBLEVBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lbmdsaXNoLy4vcGFnZXMvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS50cz8yZThiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOZXh0QXV0aCBmcm9tIFwibmV4dC1hdXRoXCJcbmltcG9ydCBDcmVkZW50aWFscyBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9jcmVkZW50aWFsc1wiXG5pbXBvcnQgcHJpc21hIGZyb20gJy4uLy4uLy4uL2xpYi9wcmlzbWEnO1xuaW1wb3J0IHR5cGUgeyBOZXh0QXV0aE9wdGlvbnMgfSBmcm9tICduZXh0LWF1dGgnXG5cbmV4cG9ydCBjb25zdCBhdXRoT3B0aW9uczogTmV4dEF1dGhPcHRpb25zID0ge1xuICAgIHNlY3JldDogcHJvY2Vzcy5lbnYuQVVUSF9TRUNSRVQsXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIENyZWRlbnRpYWxzKHtcbiAgICAgICAgICAgIG5hbWU6ICdMb2dpbiAmIFBhc3N3b3JkJyxcbiAgICAgICAgICAgIGNyZWRlbnRpYWxzOiB7XG4gICAgICAgICAgICAgICAgdXNlcm5hbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdFbWFpbCcsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdlbWFpbEBjcmNjLnJ1J1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdQYXNzd29yZCcsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdQYXNzd29yZCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGF1dGhvcml6ZTogYXN5bmMoY3JlZGVudGlhbHMsIHJlcSkgPT57XG4gICAgICAgICAgICAgICAgY29uc3QgeyB1c2VybmFtZTogZW1haWwsIHBhc3N3b3JkIH0gPSBjcmVkZW50aWFsc1xuICAgICAgICAgICAgICAgIGlmKCFlbWFpbCB8fCAhcGFzc3dvcmQpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbWFpbDogU3RyaW5nKGVtYWlsKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBpZiAodXNlciAmJiB1c2VyLnBhc3N3b3JkID09PSBwYXNzd29yZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gey4uLnVzZXIsIGlkOiBTdHJpbmcodXNlci5pZCl9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgIF0sXG4gICAgY2FsbGJhY2tzOiB7XG4gICAgICAgIGFzeW5jIGp3dCh7IHRva2VuLCB1c2VyIH0pIHtcbiAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgdG9rZW4ucm9sZSA9IHVzZXIucm9sZTtcbiAgICAgICAgICAgIHRva2VuLmlkID0gdXNlci5pZFxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgICAgIH0sXG4gICAgICAgIHNlc3Npb24oeyBzZXNzaW9uLCB0b2tlbiB9KSB7XG4gICAgICAgICAgaWYgKHRva2VuICYmIHNlc3Npb24udXNlcikge1xuICAgICAgICAgICAgc2Vzc2lvbi51c2VyLnJvbGUgPSB0b2tlbi5yb2xlO1xuICAgICAgICAgICAgc2Vzc2lvbi51c2VyLmlkID0gdG9rZW4uaWRcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHNlc3Npb247XG4gICAgICAgIH0sXG4gICAgICB9LFxufVxuZXhwb3J0IGRlZmF1bHQgTmV4dEF1dGgoYXV0aE9wdGlvbnMpXG4iXSwibmFtZXMiOlsiTmV4dEF1dGgiLCJDcmVkZW50aWFscyIsInByaXNtYSIsImF1dGhPcHRpb25zIiwic2VjcmV0IiwicHJvY2VzcyIsImVudiIsIkFVVEhfU0VDUkVUIiwicHJvdmlkZXJzIiwibmFtZSIsImNyZWRlbnRpYWxzIiwidXNlcm5hbWUiLCJsYWJlbCIsInR5cGUiLCJwbGFjZWhvbGRlciIsInBhc3N3b3JkIiwiYXV0aG9yaXplIiwicmVxIiwiZW1haWwiLCJ1c2VyIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwiU3RyaW5nIiwiaWQiLCJjYWxsYmFja3MiLCJqd3QiLCJ0b2tlbiIsInJvbGUiLCJzZXNzaW9uIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/auth/[...nextauth].ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/auth/[...nextauth].ts"));
module.exports = __webpack_exports__;

})();