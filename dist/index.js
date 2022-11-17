"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const users_1 = __importDefault(require("./routes/users"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
// @ts-ignore
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'User API',
            description: 'User API description',
            version: '1.0',
            contact: {
                name: 'Developer'
            },
            servers: ['http://localhost:5000/api']
        }
    },
    apis: ['src/routes/*']
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
app.get('/', (req, res) => res.redirect('/api-docs'));
app.use(body_parser_1.default.json());
app.use('/api', users_1.default);
app.get('/', (req, res) => res.send('Welcome! <a>http://localhost:5000/api-docs</a>'));
app.all('*', (req, res) => res.send('That route doesn\'t exist.'));
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
