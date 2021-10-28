"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateWebComponent = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const remove_app_component_1 = require("./rules/remove-app-component");
const generate_application_1 = require("./rules/generate-application");
const override_files_1 = require("./rules/override-files");
const ngx_build_plus_1 = require("./rules/ngx-build-plus");
const update_packages_1 = require("./rules/update-packages");
const add_custom_scripts_1 = require("./rules/add-custom-scripts");
function generateWebComponent(_options) {
    return (tree, _context) => {
        const opts = Object.assign(Object.assign({}, _options), { project: _options.name, routing: false });
        return schematics_1.chain([
            generate_application_1.generateApp(opts),
            override_files_1.overrideFiles(opts),
            remove_app_component_1.deleteAppComponent(opts),
            ngx_build_plus_1.configureNgxBuildPlus(opts),
            add_custom_scripts_1.addCustomScripts(opts),
            update_packages_1.addRequiredPackages(),
        ]);
    };
}
exports.generateWebComponent = generateWebComponent;
//# sourceMappingURL=index.js.map