import {Rule, SchematicContext, Tree} from "@angular-devkit/schematics";

export function configureNgxBuildPlus(options: any): Rule {

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
            context.logger.error(`Erro ao configurar os scripts de build`);
        }

        context.logger.info(`ngx-build-plus configurado com sucesso`);

        return host;
    };

}
