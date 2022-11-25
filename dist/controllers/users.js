"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser_v2 = exports.checkIfContains = exports.createUser = exports.getUser = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
let users = [];
const isSomeStringEmpty = function (arr) {
    return arr.some(element => element === undefined);
};
//----------------------------------------------------------------------------------
// v1.0.0
const getUser = (req, res) => {
    const environmentName = req.query.environment;
    const userName = req.query.name;
    const filePath = path_1.default.join(__dirname, `../../automation users/${environmentName}/user_${userName}_UUID.yaml`);
    try {
        if (!fs_1.default.existsSync(filePath)) {
            return res.sendStatus(404);
        }
        const file_content = fs_1.default.readFileSync(filePath, 'utf8');
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
    const filePath = path_1.default.join(__dirname, `../../automation users/${environmentName}/user_${userName}_${userSurname}_UUID.yaml`);
    if (isSomeStringEmpty([environmentName, userName, userSurname, userEmail]) || fs_1.default.existsSync(filePath)) {
        return res.status(400);
    }
    fs_1.default.writeFileSync(filePath, `email: ${userEmail}\nname: ${userName} ${userSurname}`);
    const created_file_content = fs_1.default.readFileSync(filePath, 'utf8');
    res.status(201);
    res.send(created_file_content);
};
exports.createUser = createUser;
//----------------------------------------------------------------------------------
// v1.0.1
const checkIfContains = function (filePath, object) {
    const contents = fs_1.default.readFileSync(filePath, 'utf-8');
    for (let attributeName in object) {
        if (!contents.includes(attributeName + ': ' + object[attributeName])) {
            return false;
        }
    }
    return true;
};
exports.checkIfContains = checkIfContains;
const getUser_v2 = (req, res) => {
    const environmentName = req.query.environment;
    const body = req.body;
    const filePath = path_1.default.join(__dirname, `../../automation users/${environmentName}/`);
    let matchingUsers = [];
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(404);
        return res.send('');
    }
    matchingUsers = fs_1.default.readdirSync(filePath).filter((file) => (0, exports.checkIfContains)(`${filePath}${file}`, body));
    if (matchingUsers.length === 0) {
        res.status(404);
        return res.send('');
    }
    res.status(200);
    res.send(matchingUsers);
};
exports.getUser_v2 = getUser_v2;
