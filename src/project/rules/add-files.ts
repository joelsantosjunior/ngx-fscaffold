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

export function  addFiles(options: any): Rule {
    return (host: Tree, context: SchematicContext) => {

        const { name } = options;

        const templateSource = apply(url('./files'), [
            applyTemplates({
                ...options,
                ...strings
            }),
            move(normalize(`/projects/${name}/src/@core`))
        ]);

        const rule = mergeWith(templateSource, MergeStrategy.Overwrite);

        context.logger.info(`✅️ Arquivo 'load-external.service.ts' gerado`);
        context.logger.info(`✅️ Arquivo 'load-external.service.spec.ts' gerado`);

        return rule(host, context);
    }
}
