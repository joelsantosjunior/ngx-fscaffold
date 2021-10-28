import {
    apply,
    applyTemplates,
    MergeStrategy,
    mergeWith,
    move,
    Rule,
    SchematicContext,
    Tree,
    url
} from "@angular-devkit/schematics";
import {normalize, strings} from "@angular-devkit/core";

export function  overrideFiles(options: any): Rule {
    return (host: Tree, context: SchematicContext) => {

        const { name } = options;

        const templateSource = apply(url('./files'), [
            applyTemplates({
                ...options,
                ...strings
            }),
            move(normalize(`/projects/${name}/src`))
        ]);

        const rule = mergeWith(templateSource, MergeStrategy.Overwrite);

        context.logger.info(`✅️ Arquivo '${name}.component.ts' gerado`);
        context.logger.info(`✅️ Arquivo '${name}.component.spec.ts' gerado`);
        context.logger.info(`✅️ Arquivo '${name}.component.scss' gerado`);
        context.logger.info(`✅️ Arquivo '${name}.component.html' gerado`);
        context.logger.info(`✅️ Arquivo '${name}.module.ts' gerado`);
        context.logger.info(`✅️ Arquivo 'main.ts' modificado`);
        context.logger.info(`✅️ Arquivo 'polyfills.ts' modificado`);

        return rule(host, context);
    }
}
