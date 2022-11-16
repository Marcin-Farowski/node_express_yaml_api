import fs from 'fs';

let users = [];

export const getUser = (req, res) => {
    const environmentName = req.query.environment;
    const userName = req.query.name;
    const path = `./automation users/${environmentName}/user_${userName}_UUID.yaml`;
    
    try {
        if (!fs.existsSync(path)) {
            res.sendStatus(404);
        }
        const data = fs.readFileSync(path, 'utf8');
        console.log(data);
        res.send(data);
    } catch (error) {
        console.error(error);
    }
};
