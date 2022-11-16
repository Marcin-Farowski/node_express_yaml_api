import fs from 'fs';

let users = [];

export const getUser = (req, res) => {
    const environmentName = req.query.environment;
    const userName = req.query.name;
    
    try {
        const data = fs.readFileSync(`./automation users/${environmentName}/user_${userName}_UUID.yaml`,
            'utf8');
        res.send(data);
    } catch (error) {
        console.error(error);
    }
};
