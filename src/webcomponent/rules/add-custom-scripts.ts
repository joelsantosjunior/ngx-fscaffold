import {Rule, SchematicContext, Tree} from "@angular-devkit/schematics";

export function addCustomScripts({ name }: any): Rule {
    return (tree: Tree, context: SchematicContext): Tree => {
        const path = `./package.json`;
        const file = tree.read(path);
        const json = JSON.parse(file!.toString());

        const build = `build:${name}`;
        const copy = `copy:${name}`;
        const bundle = `bundle:${name}`;

        json.scripts[build] = `ng build --project ${name} --single-bundle --output-hashing none`;
        json.scripts[copy] = `cp -R ./dist/${name}/ ./src/assets/${name}`;
        json.scripts[bundle] = `npm run build:${name} && npm run copy:${name}`;

        tree.overwrite(path, JSON.stringify(json, null, 2));

        context.logger.info(`Script '${build} adicionado'`);
        context.logger.info(`Script '${copy} adicionado'`);
        context.logger.info(`Script '${bundle} adicionado'`);

        return tree;
    }
}
