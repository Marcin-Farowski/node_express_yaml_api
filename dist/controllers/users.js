"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser_v2 = exports.createUser = exports.getUser = void 0;
const fs_1 = __importDefault(require("fs"));
let users = [];
const isSomeStringEmpty = function (arr) {
    return arr.some(element => element === undefined);
};
//----------------------------------------------------------------------------------
// v1.0.0
const getUser = (req, res) => {
    const environmentName = req.query.environment;
    const userName = req.query.name;
    const path = `./automation users/${environmentName}/user_${userName}_UUID.yaml`;
    try {
        if (!fs_1.default.existsSync(path)) {
            return res.sendStatus(404);
        }
        const file_content = fs_1.default.readFileSync(path, 'utf8');
        res.send(file_content);
    }
    catch (error) {
        console.error(error);
    }
};
exports.getUser = getUser;
const createUser = (req, res) => {
    const environmentName = req.query.environment;
    const userName = req.query.name;
    const userSurname = req.query.surname;
    const userEmail = req.query.email;
    const path = `./automation users/${environmentName}/user_${userName}_${userSurname}_UUID.yaml`;
    if (isSomeStringEmpty([environmentName, userName, userSurname, userEmail]) || fs_1.default.existsSync(path)) {
        return res.sendStatus(400);
    }
    fs_1.default.writeFile(path, `email: ${userEmail}\nname: ${userName} ${userSurname}`, function (error) {
        if (error) {
            return res.sendStatus(500);
        }
        const created_file_content = fs_1.default.readFileSync(path, 'utf8');
        res.status(201).send(created_file_content);
    });
};
exports.createUser = createUser;
//----------------------------------------------------------------------------------
// v1.0.1
const checkIfContains = function (path, object) {
    const contents = fs_1.default.readFileSync(path, 'utf-8');
    for (let attributeName in object) {
        if (!contents.includes(attributeName + ': ' + object[attributeName])) {
            return false;
        }
    }
    return true;
};
const getUser_v2 = (req, res) => {
    const environmentName = req.query.environment;
    const body = req.body;
    const path = `./automation users/${environmentName}/`;
    let matchingUsers = [];
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        return res.status(404).send('');
    }
    matchingUsers = fs_1.default.readdirSync(path).filter((file) => checkIfContains(`${path}${file}`, body));
    res.send(matchingUsers);
};
exports.getUser_v2 = getUser_v2;
