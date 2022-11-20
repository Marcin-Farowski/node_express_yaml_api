import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import usersRoutes from './routes/users';

import swaggerJsDoc from 'swagger-jsdoc';
// @ts-ignore
import swaggerUi from 'swagger-ui-express';

const app = express();

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
    apis: ['dist/routes/*']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.get('/', (req: Request, res: Response) => res.redirect('/api-docs'));

app.use(bodyParser.json());

app.use('/api', usersRoutes);
app.get('/', (req: Request, res: Response) => res.send('Welcome! <a>http://localhost:5000/api-docs</a>'));
app.all('*', (req: Request, res: Response) => res.send('That route doesn\'t exist.'));

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
