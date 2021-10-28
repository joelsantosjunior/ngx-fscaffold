import {SchematicContext, Tree} from "@angular-devkit/schematics";
import {addPackageJsonDependency, NodeDependency, NodeDependencyType} from "@schematics/angular/utility/dependencies";

export function addRequiredPackages() {
    return (host: Tree, context: SchematicContext) => {
        const dependencies: NodeDependency[] = [
            {type: NodeDependencyType.Default, version: '~12.1.0-', name: '@angular/elements'},
            {type: NodeDependencyType.Default, version: '^1.5.0', name: '@webcomponents/custom-elements'},
            {type: NodeDependencyType.Default, version: '^1.7.2', name: 'document-register-element'},
            {type: NodeDependencyType.Dev, version: '^12.2.0', name: 'ngx-build-plus'},
        ];

        dependencies.forEach(dependency => {
            addPackageJsonDependency(host, dependency);
            context.logger.log('info', `✅️  Dependência "${dependency.name}" adicionada ao projeto`);
        });

        return host;
    };
}
