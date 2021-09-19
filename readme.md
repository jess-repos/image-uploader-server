# image-uploader-server

server code for image-uploader app

## technologies used

- cors - allow requests from create-react-app
- dotenv - allow use of environment variables like mongodb connection
- express - API server
- express-fileupload - allow access of request.files
- fs - allow use of file system / writing files to the server
- mongodb - database used
- mongoose - allow use of models and validations for mongodb objects

## how to start

1. clone the repository by using either of the 2 methods
   - git clone https://github.com/jess-repos/image-uploader-server.git
   - download and extract zip file from https://github.com/jess-repos/image-uploader-server.git
2. npm install - this will install all the packages required by from the package.json file
3. open .env file and use your own mongodb url on the DB_CONNECT variable
4. install nodemon by running "npm install nodemon" from the terminal, alternatively, you can install nodemon globally by running "npm install -g nodemon" on the terminal
5. run "npm start" on the termina
6. app is can be accessed on http://localhost:7000/

## how the express app works

the app mostly uses try/catch and async/await rather than .then/.catch to have a cleaner and more readable code.

### middlewares

- serve static files from /upload folder to "localhost:7000/images/:filename"
  app.use("/images", express.static(path.join(\_\_dirname, "uploads")));

- using cors to allow access from create-react-app
  app.use(cors()); // cross site

- enable file upload / allow access to request.files
  app.use(
  fileUpload({  
   createParentPath: true,
  })
  );

- upload router  
   app.use("/api/uploader", require("./routes/uploader"));

### models

- the image object simply constists of the original image information and the url of the static image uploader to the server.\
  const mongoose = require("mongoose");\
  const imageSchema = new mongoose.Schema({\
  name: String,\
  fileName: String,
  url: String,\
  size: Number,\
  encoding: String,\
  tempFilePath: String,\
  truncated: Boolean,\
  mimetype: String,\
  md5: String,\
  });\
  module.exports = new mongoose.model("Image", imageSchema);
