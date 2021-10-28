import {Rule, Tree} from "@angular-devkit/schematics";

export function  deleteAppComponent({ name }: any): Rule {
    return (host: Tree) => {

        const filesToRemove = [
            `projects/${name}/src/app/app.component.ts`,
            `projects/${name}/src/app/app.component.spec.ts`,
            `projects/${name}/src/app/app.module.ts`,
            `projects/${name}/src/app/app.component.html`,
            `projects/${name}/src/app/app.component.scss`
        ];

        filesToRemove.forEach(filePath => {
            if (host.exists(filePath)) host.delete(filePath);
        });

        return host;
    }
}
