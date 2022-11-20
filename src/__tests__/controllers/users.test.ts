import { Request, Response } from 'express';
import { createUser, getUser_v2 } from '../../controllers/users';
import fs from 'fs';
import path from 'path';

describe('createUser', () => {
    it('should send a status code of 201 and content of created file that represents user data', function() {
        const filePath: string = path.join(__dirname, '../../../automation users/engUsers/user_John_Doe_UUID.yaml');
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        
        const req: Partial<Request> = {
            query: {
                environment: 'engUsers',
                name: 'John',
                surname: 'Doe',
                email: 'john.doe@example.com'
            }
        };
        const res: any = {
            status: jest.fn((x) => x),
            send: jest.fn((x) => x)
        };
        
        const expectedResponse = 'email: john.doe@example.com\nname: John Doe';
        
        createUser(req as Request, res as Response);
        
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send).toHaveReturnedWith(expectedResponse);
    });
});

describe('getUser_v2', () => {
    it('should send a status code of 200 and an array that contains file name, when user with specified properties exists',
        function() {
            const req: Partial<Request> = {
                query: {
                    environment: 'engUsers'
                },
                body: {
                    email: 'john.doe@example.com',
                    name: 'John Doe'
                }
            };
            const res: any = {
                status: jest.fn((x) => x),
                send: jest.fn((x) => x)
            };
            
            const expectedResponse = 'user_John_Doe_UUID.yaml';
            
            getUser_v2(req as Request, res as Response);
            
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledTimes(1);
            expect(res.send).toHaveReturnedWith([expectedResponse]);
        });
});

