import express from 'express';
import bodyParser from 'body-parser';
import usersRoutes from './routes/users.js';

import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();

const PORT = process.env.PORT || 5000;

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title      : 'User API',
            description: 'User API description',
            contact    : {
                name: 'Developer'
            },
            servers    : ['http://localhost:5000']
        }
    },
    apis             : ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(bodyParser.json());

app.use('/api', usersRoutes);
app.get('/', (req, res) => res.send('Welcome!'));
app.all('*', (req, res) => res.send('That route doesn\'t exist.'));

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
