import {Rule, SchematicContext, Tree} from "@angular-devkit/schematics";
import {RunSchematicTask} from "@angular-devkit/schematics/tasks";

export function addSingleSPAAngular(options: any): Rule {
    return (host: Tree, context: SchematicContext) => {
        context.addTask(new RunSchematicTask('single-spa-angular', 'ng-add', options));
    }
}
