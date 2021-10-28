"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateApp = void 0;
const schematics_1 = require("@angular-devkit/schematics");
function generateApp(options) {
    const localOpts = Object.assign({}, options);
    delete localOpts.project;
    return schematics_1.externalSchematic('@schematics/angular', 'application', Object.assign(Object.assign({}, localOpts), { style: "scss" }));
}
exports.generateApp = generateApp;
//# sourceMappingURL=generate-application.js.map