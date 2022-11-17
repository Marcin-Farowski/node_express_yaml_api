import fs from 'fs';

let users = [];

const isSomeVariableUndefined = function(arr) {
    return arr.some(element => element === undefined);
};

//----------------------------------------------------------------------------------
// v1.0.0

export const getUser = (req, res) => {
    const environmentName = req.query.environment;
    const userName = req.query.name;
    const path = `./automation users/${environmentName}/user_${userName}_UUID.yaml`;
    
    try {
        if (!fs.existsSync(path)) {
            return res.sendStatus(404);
        }
        const file_content = fs.readFileSync(path, 'utf8');
        res.send(file_content);
    } catch (error) {
        console.error(error);
    }
};

export const createUser = (req, res) => {
    const environmentName = req.query.environment;
    const userName = req.query.name;
    const userSurname = req.query.surname;
    const userEmail = req.query.email;
    const path = `./automation users/${environmentName}/user_${userName}_${userSurname}_UUID.yaml`;
    
    if (isSomeVariableUndefined([environmentName, userName, userSurname, userEmail]) || fs.existsSync(path)) {
        return res.sendStatus(400);
    }
    
    fs.writeFile(path, `email: ${userEmail}\nname: ${userName} ${userSurname}`, function(error) {
        if (error) {
            return res.sendStatus(500);
        }
        const created_file_content = fs.readFileSync(path, 'utf8');
        res.status(201).send(created_file_content);
    });
};

//----------------------------------------------------------------------------------
// v1.0.1

const checkIfContains = function(path, object) {
    const contents = fs.readFileSync(path, 'utf-8');
    
    for (let attributeName in object) {
        if (!contents.includes(attributeName + ': ' + object[attributeName])) {
            return false;
        }
    }
    
    return true;
};

export const getUser_v2 = (req, res) => {
    const environmentName = req.query.environment;
    const body = req.body;
    const path = `./automation users/${environmentName}/`;
    let matchingUsers = [];
    
    matchingUsers = fs.readdirSync(path).filter((file) => checkIfContains(`${path}${file}`, body));
    
    res.send(matchingUsers);
};
