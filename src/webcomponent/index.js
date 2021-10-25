"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAppComponent = exports.generateWebComponent = void 0;
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const dependencies_1 = require("@schematics/angular/utility/dependencies");
function generateWebComponent(_options) {
    return (tree, _context) => {
        _context.logger.info('Iniciando criação do Web Component');
        const templateSource = schematics_1.apply(schematics_1.url('./files'), [
            schematics_1.applyTemplates(Object.assign(Object.assign({}, _options), core_1.strings)),
            schematics_1.move(core_1.normalize(`/projects/${_options.name}/src`))
        ]);
        const rule = schematics_1.chain([
            generateApp(_options),
            deleteAppComponent(_options.name),
            addRequiredPackages(),
            schematics_1.mergeWith(templateSource, schematics_1.MergeStrategy.Overwrite),
            configureNgxBuildPlus(Object.assign(Object.assign({}, _options), { project: _options.name })),
            addCustomScripts(_options.name)
        ]);
        return rule(tree, _context);
    };
}
exports.generateWebComponent = generateWebComponent;
function generateApp(options) {
    return schematics_1.externalSchematic('@schematics/angular', 'application', Object.assign(Object.assign({}, options), { routing: false, style: "scss", viewEncapsulation: "ShadowDom", prefix: "wc" }));
}
function configureNgxBuildPlus(options) {
    return (host, context) => {
        try {
            const angularJsonFile = host.read('angular.json');
            if (angularJsonFile) {
                const angularJsonFileObject = JSON.parse(angularJsonFile.toString('utf-8'));
                const project = options.project ? options.project : Object.keys(angularJsonFileObject['projects'])[0];
                const projectObject = angularJsonFileObject.projects[project];
                projectObject.architect.build.builder = "ngx-build-plus:browser";
                projectObject.architect.serve.builder = "ngx-build-plus:dev-server";
                projectObject.architect.test.builder = "ngx-build-plus:karma";
                projectObject.architect['extract-i18n'].builder = "ngx-build-plus:extract-i18n";
                host.overwrite('angular.json', JSON.stringify(angularJsonFileObject, null, 2));
            }
        }
        catch (e) {
            context.logger.error(`🚫  Erro ao configurar os scripts de build`);
        }
        context.logger.info(`✅️  ngx-build-plus configurado com sucesso`);
        return host;
    };
}
function addCustomScripts(name) {
    return (tree, _) => {
        const path = `./package.json`;
        const file = tree.read(path);
        const json = JSON.parse(file.toString());
        const build = `build:${name}`;
        const copy = `copy:${name}`;
        const bundle = `bundle:${name}`;
        json.scripts = Object.assign({}, json.scripts);
        json.scripts[build] = `ng build --project ${name} --single-bundle --output-hashing none`;
        json.scripts[copy] = `cp -R ./dist/${name}/ ./src/assets/${name}`;
        json.scripts[bundle] = `npm run build:${name} && npm run copy:${name}`;
        tree.overwrite(path, JSON.stringify(json, null, 2));
        return tree;
    };
}
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
// Utilidades
function deleteAppComponent(name) {
    return (host) => {
        const unwishedFiles = [
            `projects/${name}/src/app/app.component.ts`,
            `projects/${name}/src/app/app.component.spec.ts`,
            `projects/${name}/src/app/app.module.ts`,
            `projects/${name}/src/app/app.component.html`,
            `projects/${name}/src/app/app.component.scss`
        ];
        unwishedFiles.forEach(filePath => {
            if (host.exists(filePath))
                host.delete(filePath);
        });
        return host;
    };
}
exports.deleteAppComponent = deleteAppComponent;
//# sourceMappingURL=index.js.map