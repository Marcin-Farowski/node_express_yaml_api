# Rest API for handling CRUD operations on users stored in .yaml files

---

### Technologies:

- Node.js
- Express

![Screenshot of the application](Screenshot%20of%20the%20application.PNG "Screenshot of the application")

---

## How to run:

Inside **node_express_yaml_api** folder run command `npm install`.

Then run command `npm start`.

By default, application is running on [localhost:5000](http://localhost:5000)

---

*If you want to make some changes in .ts files, please remember to run `npm run build` to compile TypeScript files into
JavaScript files before every `npm start`.*

*You can use `npm run dev` - this command supports hot reloads, and it runs application from TypeScript files.*

*Tests can be run via command:* `npm test`

---

**Docker** commands:

`docker build -t image_name .`

`docker run -p 8081:5000 image_name`
