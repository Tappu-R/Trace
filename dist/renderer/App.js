"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const excalidraw_1 = require("@excalidraw/excalidraw");
function App() {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h1", { children: "here is the draw" }), (0, jsx_runtime_1.jsx)("div", { style: { height: "500px" }, children: (0, jsx_runtime_1.jsx)(excalidraw_1.Excalidraw, {}) })] }));
}
exports.default = App;
