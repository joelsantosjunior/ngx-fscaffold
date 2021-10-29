import {
    chain,
    Rule,
    SchematicContext,
    Tree,
} from '@angular-devkit/schematics';
import {generateApp} from "../webcomponent/rules/generate-application";
import {addSingleSPAAngular} from "./rules/add-single-spa";
import {addFiles} from "./rules/add-files";

export function generateProject(_options: any): Rule {
    return (tree: Tree, _context: SchematicContext) => {

        const opts = { ..._options, project: _options.name, routing: true };

        return chain([
            generateApp(opts),
            addFiles(opts),
            addSingleSPAAngular(opts)
        ]);
    };
}
