"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRequiredPackages = void 0;
const dependencies_1 = require("@schematics/angular/utility/dependencies");
function addRequiredPackages() {
    return (host, context) => {
        const dependencies = [
            { type: dependencies_1.NodeDependencyType.Default, version: '~12.1.0-', name: '@angular/elements' },
            { type: dependencies_1.NodeDependencyType.Default, version: '^1.5.0', name: '@webcomponents/custom-elements' },
            { type: dependencies_1.NodeDependencyType.Default, version: '^1.7.2', name: 'document-register-element' },
            { type: dependencies_1.NodeDependencyType.Dev, version: '^12.2.0', name: 'ngx-build-plus' },
        ];
        dependencies.forEach(dependency => {
            dependencies_1.addPackageJsonDependency(host, dependency);
            context.logger.log('info', `✅️  Dependência "${dependency.name}" adicionada ao projeto`);
        });
        return host;
    };
}
exports.addRequiredPackages = addRequiredPackages;
//# sourceMappingURL=update-packages.js.map