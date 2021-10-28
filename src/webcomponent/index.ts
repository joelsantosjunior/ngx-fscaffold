import {
    chain,
    Rule,
    SchematicContext,
    Tree,
} from '@angular-devkit/schematics';
import {deleteAppComponent} from "./rules/remove-app-component";
import {generateApp} from "./rules/generate-application";
import {overrideFiles} from "./rules/override-files";
import {configureNgxBuildPlus} from "./rules/ngx-build-plus";
import {addRequiredPackages} from "./rules/update-packages";
import {addCustomScripts} from "./rules/add-custom-scripts";

export function generateWebComponent(_options: any): Rule {
    return (tree: Tree, _context: SchematicContext) => {

        const opts = { ..._options, project: _options.name, routing: false };

        return chain([
            generateApp(opts),
            overrideFiles(opts),
            deleteAppComponent(opts),
            configureNgxBuildPlus(opts),
            addCustomScripts(opts),
            addRequiredPackages(),
        ]);
    };

}
