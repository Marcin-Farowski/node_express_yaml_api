"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../../controllers/users");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
describe('createUser', () => {
    it('should send a status code of 201 and content of created file that represents user data', function () {
        const filePath = path_1.default.join(__dirname, '../../../automation users/engUsers/user_John_Doe_UUID.yaml');
        if (fs_1.default.existsSync(filePath)) {
            fs_1.default.unlinkSync(filePath);
        }
        const req = {
            query: {
                environment: 'engUsers',
                name: 'John',
                surname: 'Doe',
                email: 'john.doe@example.com'
            }
        };
        const res = {
            status: jest.fn((x) => x),
            send: jest.fn((x) => x)
        };
        const expectedResponse = 'email: john.doe@example.com\nname: John Doe';
        (0, users_1.createUser)(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send).toHaveReturnedWith(expectedResponse);
    });
});
describe('getUser_v2', () => {
    it('should send a status code of 200 and an array that contains file name, when user with specified properties exists', function () {
        const req = {
            query: {
                environment: 'engUsers'
            },
            body: {
                email: 'john.doe@example.com',
                name: 'John Doe'
            }
        };
        const res = {
            status: jest.fn((x) => x),
            send: jest.fn((x) => x)
        };
        const expectedResponse = 'user_John_Doe_UUID.yaml';
        (0, users_1.getUser_v2)(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send).toHaveReturnedWith([expectedResponse]);
    });
});
