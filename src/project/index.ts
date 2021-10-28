import {
    chain,
    Rule,
    SchematicContext,
    Tree,
} from '@angular-devkit/schematics';
import {generateApp} from "../webcomponent/rules/generate-application";
import {addSingleSPAAngular} from "./rules/add-single-spa";

export function generateProject(_options: any): Rule {
    return (tree: Tree, _context: SchematicContext) => {

        const opts = { ..._options, project: _options.name, routing: true };

        return chain([
            generateApp(opts),
            addSingleSPAAngular(opts)
        ]);
    };
}
