"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.overrideFiles = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
function overrideFiles(options) {
    return (host, context) => {
        const { name } = options;
        const templateSource = schematics_1.apply(schematics_1.url('./files'), [
            schematics_1.applyTemplates(Object.assign(Object.assign({}, options), core_1.strings)),
            schematics_1.move(core_1.normalize(`/projects/${name}/src`))
        ]);
        const rule = schematics_1.mergeWith(templateSource, schematics_1.MergeStrategy.Overwrite);
        context.logger.info(`✅️ Arquivo '${name}.component.ts' gerado`);
        context.logger.info(`✅️ Arquivo '${name}.component.spec.ts' gerado`);
        context.logger.info(`✅️ Arquivo '${name}.component.scss' gerado`);
        context.logger.info(`✅️ Arquivo '${name}.component.html' gerado`);
        context.logger.info(`✅️ Arquivo '${name}.module.ts' gerado`);
        context.logger.info(`✅️ Arquivo 'main.ts' modificado`);
        context.logger.info(`✅️ Arquivo 'polyfills.ts' modificado`);
        return rule(host, context);
    };
}
exports.overrideFiles = overrideFiles;
//# sourceMappingURL=override-files.js.map