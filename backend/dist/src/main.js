"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cluster_1 = require("cluster");
const os_1 = require("os");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: 'http://localhost:5173',
        credentials: true,
    });
    await app.listen(3000);
}
if (process.env.CLUSTER === 'true' && cluster_1.default.isPrimary) {
    const cpuCount = os_1.default.cpus().length;
    for (let i = 0; i < cpuCount; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on('exit', () => {
        cluster_1.default.fork();
    });
}
else {
    bootstrap();
}
//# sourceMappingURL=main.js.map