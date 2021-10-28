"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAppComponent = void 0;
function deleteAppComponent({ name }) {
    return (host) => {
        const filesToRemove = [
            `projects/${name}/src/app/app.component.ts`,
            `projects/${name}/src/app/app.component.spec.ts`,
            `projects/${name}/src/app/app.module.ts`,
            `projects/${name}/src/app/app.component.html`,
            `projects/${name}/src/app/app.component.scss`
        ];
        filesToRemove.forEach(filePath => {
            if (host.exists(filePath))
                host.delete(filePath);
        });
        return host;
    };
}
exports.deleteAppComponent = deleteAppComponent;
//# sourceMappingURL=remove-app-component.js.map