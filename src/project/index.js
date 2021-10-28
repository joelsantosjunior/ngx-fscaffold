"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateProject = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const generate_application_1 = require("../webcomponent/rules/generate-application");
const add_single_spa_1 = require("./rules/add-single-spa");
function generateProject(_options) {
    return (tree, _context) => {
        const opts = Object.assign(Object.assign({}, _options), { project: _options.name, routing: true });
        return schematics_1.chain([
            generate_application_1.generateApp(opts),
            add_single_spa_1.addSingleSPAAngular(opts)
        ]);
    };
}
exports.generateProject = generateProject;
//# sourceMappingURL=index.js.map