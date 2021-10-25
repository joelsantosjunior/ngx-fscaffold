import { normalize, strings } from '@angular-devkit/core';
import { apply, applyTemplates, chain, externalSchematic, MergeStrategy, mergeWith, move, Rule, SchematicContext, template, Tree, url} from '@angular-devkit/schematics';
import { addPackageJsonDependency, NodeDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

export function generateWebComponent(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    _context.logger.info(
      'Iniciando criação do Web Component'
    );

    const templateSource = apply(url('./files'), [
      applyTemplates({
        ..._options,
        ...strings
      }),
      move(normalize(`/projects/${_options.name}/src`))
    ]);
  
    const rule = chain([
      generateApp(_options),
      deleteAppComponent(_options.name),
      addRequiredPackages(),
      mergeWith(templateSource, MergeStrategy.Overwrite),
      configureNgxBuildPlus({
        ..._options,
        project: _options.name
      }),
      addCustomScripts(_options.name)
    ]);

    return rule(tree, _context) as Rule;
  };

}

function generateApp (options: any): Rule {
  return externalSchematic('@schematics/angular', 'application', {
    ...options,
    routing: false,
    style: "scss",
    viewEncapsulation: "ShadowDom",
    prefix: "wc"
  });
}

function configureNgxBuildPlus (options: any): Rule {
  
  return (host: Tree, context: SchematicContext) => {

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
    } catch (e) {
      context.logger.error(`🚫  Erro ao configurar os scripts de build`);
    }

    context.logger.info(`✅️  ngx-build-plus configurado com sucesso`);

    return host;
  };

}

function addCustomScripts(name: string): Rule {
  return (tree: Tree, _: SchematicContext): Tree => {
    const path = `./package.json`;
    const file = tree.read(path);
    const json = JSON.parse(file!.toString());

    const build = `build:${name}`;
    const copy = `copy:${name}`;
    const bundle = `bundle:${name}`;
   
    json.scripts = {
      ...json.scripts
    };

    json.scripts[build]  = `ng build --project ${name} --single-bundle --output-hashing none`;
    json.scripts[copy]   = `cp -R ./dist/${name}/ ./src/assets/${name}`;
    json.scripts[bundle] = `npm run build:${name} && npm run copy:${name}`;
   
    tree.overwrite(path, JSON.stringify(json, null, 2));
    return tree;
  }
 }

function addRequiredPackages () {
  return (host: Tree, context: SchematicContext) => {
    const dependencies: NodeDependency[] = [
      { type: NodeDependencyType.Default, version: '~12.1.0-', name: '@angular/elements' },
      { type: NodeDependencyType.Default, version: '^1.5.0', name: '@webcomponents/custom-elements' },
      { type: NodeDependencyType.Default, version: '^1.7.2', name: 'document-register-element' },
      { type: NodeDependencyType.Dev, version: '^12.2.0', name: 'ngx-build-plus' },
    ];

    dependencies.forEach(dependency => {
      addPackageJsonDependency(host, dependency);
      context.logger.log('info', `✅️  Dependência "${dependency.name}" adicionada ao projeto`);
    });

    return host;
  };
}

// Utilidades

export function  deleteAppComponent(name: string): Rule {
  return (host: Tree) => {

    const unwishedFiles = [
      `projects/${name}/src/app/app.component.ts`,
      `projects/${name}/src/app/app.component.spec.ts`,
      `projects/${name}/src/app/app.module.ts`,
      `projects/${name}/src/app/app.component.html`,
      `projects/${name}/src/app/app.component.scss`
    ];

    unwishedFiles.forEach(filePath => {
      if (host.exists(filePath)) host.delete(filePath);
    })

    return host;
  }
}