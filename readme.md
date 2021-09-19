# image-uploader-server

server code for image-uploader app

### techlnologies used

- cors - allow requests from create-react-app
- dotenv - allow use of environment variables like mongodb connection
- express - API server
- express-fileupload - allow access of request.files
- fs - allow use of file system / writing files to the server
- mongodb - database used
- mongoose - allow use of models and validations for mongodb objects

### how to start

1. clone the repository by using either of the 2 methods
   - git clone https://github.com/jess-repos/image-uploader-server.git
   - download and extract zip file from https://github.com/jess-repos/image-uploader-server.git
2. npm install - this will install all the packages required by from the package.json file
3. open .env file and use your own mongodb url on the DB_CONNECT variable
4. install nodemon by running "npm install nodemon" from the terminal, alternatively, you can install nodemon globally by running "npm install -g nodemon" on the terminal


