"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSingleSPAAngular = void 0;
const tasks_1 = require("@angular-devkit/schematics/tasks");
function addSingleSPAAngular(options) {
    return (host, context) => {
        context.addTask(new tasks_1.RunSchematicTask('single-spa-angular', 'ng-add', options));
    };
}
exports.addSingleSPAAngular = addSingleSPAAngular;
//# sourceMappingURL=add-single-spa.js.map