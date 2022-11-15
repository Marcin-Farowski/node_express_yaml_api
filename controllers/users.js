import fs from 'fs';

let users = [];

export const getUser = (req, res) => {
    const folderName = req.query.folder;
    const userName = req.query.name;
    
    try {
        const data = fs.readFileSync(`./automation users/${folderName}/user_${userName}_UUID.yaml`,
            'utf8');
        res.send(data);
    } catch (error) {
        console.error(error);
    }
};
