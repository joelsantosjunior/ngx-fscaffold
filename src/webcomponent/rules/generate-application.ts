import {externalSchematic, Rule} from "@angular-devkit/schematics";

export function generateApp(options: any): Rule {

    const localOpts = Object.assign({}, options);

    delete localOpts.project;

    return externalSchematic('@schematics/angular', 'application', {
        ...localOpts,
        style: "scss"
    });
}
