# OnlineFileManangetmentSystem React App

## Backend Link
https://github.com/hzhai96/AWSOnlineFileStorageSystem

# Frontend Part Here
## Core Project Structure
```
.
├── src              # main source files 
│   ├── backend             # backend api implementation
│   ├── components          # seperate re-useable components 
│   ├── redux               # redux for states managements
│   ├── App.js              # main entrance
│   ├── index.js            # some basic configurations for App
│   └── ...                 # etc.
├── public                  # public resources(image or somethings)      
└── README.md
└── ...
```

## Available Scripts

In the project directory, you can run:

### `yarn install'
Install dependencies packages

### `npm start` or `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build` or `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Run in docker:
Build new image tagged as dockerized-react:
```bash
$ docker build . -t dockerized-react    
```
Run image at port 3000:
```bash
$ docker run -p 3000:3000 -d dockerized-react
```
