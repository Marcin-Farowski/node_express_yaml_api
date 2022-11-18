import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';

let users = [];

const isSomeStringEmpty = function(arr: Array<string>) {
    return arr.some(element => element === undefined);
};

//----------------------------------------------------------------------------------
// v1.0.0

export const getUser = (req: Request, res: Response) => {
    const environmentName = req.query.environment;
    const userName = req.query.name;
    const filePath: string = path.join(__dirname,
        `../../automation users/${environmentName}/user_${userName}_UUID.yaml`);
    
    try {
        if (!fs.existsSync(filePath)) {
            return res.sendStatus(404);
        }
        const file_content = fs.readFileSync(filePath, 'utf8');
        res.send(file_content);
    } catch (error) {
        console.error(error);
    }
};

export const createUser = (req: Request, res: Response) => {
    const environmentName: any = req.query.environment;
    const userName: any = req.query.name;
    const userSurname: any = req.query.surname;
    const userEmail: any = req.query.email;
    const filePath: string = path.join(__dirname,
        `../../automation users/${environmentName}/user_${userName}_${userSurname}_UUID.yaml`);
    
    if (isSomeStringEmpty([environmentName, userName, userSurname, userEmail]) || fs.existsSync(filePath)) {
        return res.status(400);
    }
    
    fs.writeFileSync(filePath, `email: ${userEmail}\nname: ${userName} ${userSurname}`);
    
    const created_file_content = fs.readFileSync(filePath, 'utf8');
    res.status(201);
    res.send(created_file_content);
};

//----------------------------------------------------------------------------------
// v1.0.1

export const checkIfContains = function(filePath: string, object: { [index: string]: string }) {
    const contents = fs.readFileSync(filePath, 'utf-8');
    
    for (let attributeName in object) {
        if (!contents.includes(attributeName + ': ' + object[attributeName])) {
            return false;
        }
    }
    
    return true;
};

export const getUser_v2 = (req: Request, res: Response) => {
    const environmentName = req.query.environment;
    const body = req.body;
    const filePath: string = path.join(__dirname, `../../automation users/${environmentName}/`);
    let matchingUsers = [];
    
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(404);
        return res.send('');
    }
    
    matchingUsers = fs.readdirSync(filePath).filter((file) => checkIfContains(`${filePath}${file}`, body));
    
    if (matchingUsers.length === 0) {
        res.status(404);
        return res.send('');
    }
    
    res.status(200);
    res.send(matchingUsers);
};
