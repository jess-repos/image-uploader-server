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
- uuidv4 - generate a unique name of the image to avoid duplicates

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

- serve static files from /upload folder to "localhost:7000/images/:filename"\
  app.use("/images", express.static(path.join(\_\_dirname, "uploads")));

- using cors to allow access from create-react-app\
  app.use(cors());

- enable file upload / allow access to request.files\
  app.use(\
  fileUpload({ \
   createParentPath: true,\
  })\
  );

- upload router  
   app.use("/api/uploader", require("./routes/uploader"));

### models
the image object simply constists of the original image information and the url of the static image uploaded to the server.

```
  const mongoose = require("mongoose");
  const imageSchema = new mongoose.Schema({
     name: String,
     fileName: String,
     url: String,
     size: Number,
     encoding: String,
     tempFilePath: String,
     truncated: Boolean,
     mimetype: String,
     md5: String,
  });
  module.exports = new mongoose.model("Image", imageSchema);
```

### routes

- upload route [POST] http://localhost:7000/api/uploader/upload - upload a single file
- wipe route [DELETE] http://localhost:7000/api/uploader/wipe - wipe all the image objects on the database

### uploading a file, how it works

1. deconstruct the file object from request.files
2. generate a new file name for the file to avoid duplicates on the server
3. get the buffer data from the file object and write it to a new file on the server to the /uploads folder with the new generated file name
4. create a new object from the image model inheriting all the previous information of the file and add the url for the image file uploaded
5. upload the new image object to the database

### response

- using try/catch, if there is something wrong when writing the file or uploading to the database, it will respond with a simple object\
  res.status(500).send({ error: true });
- otherwise i will send the url of the image uploaded to the server\
   res.send(url);

## RELATED

- client app for the image-uploader https://github.com/jess-repos/image-uploader
