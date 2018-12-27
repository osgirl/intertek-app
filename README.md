### Version History

    * 27.12.2018 - Initial commit with introduction and directory layout sections

### Introduction

This file contains most basic project documentation and structure.
It also lists some of the features, and instructions on how to run it
locally.

### Directory Layout and technologies used

The project uses javascript on both client and server. Sever-side is made with node.js, and client
is a single-page react application.

```bash
.
├── /app/                       # The source code of the application
│   ├── /common/                # Utilities that are accessed troughout application
│   ├── /components/            # Reusable react components that have no connection to the state and get all their data via props
│   ├── /containers/            # Mostly full pages that are connected to the global store
│   ├── /sass/                  # Application styles
│   ├── /validation/            # Scripts that are used to create validation rules and validate properties
│   ├── /app.js                 # Root of the application
│   ├── /index.html             # Static html file that is returned from the server on every route
│   ├── /reducers.js            # All application reducers
│   ├── /sagas.js               # All application sagas
│   └── /store.js               # Main application store
├── /build/                     # The folder for compiled output. This folder is not source controled
├── /webpack/                   # Webpack configuration files
├── /node_modules/              # 3rd-party libraries and utilities
├── /public/                    # Static files which are copied into the /build/ folder
├── /server/                    # Everything related to our simple express.js server
├── .gitignore                  # Gitignore file
├── package.lock.json           # Fixed versions of all the dependencies
├── package.json                # The list of 3rd party libraries and utilities. Npm scripts are also here
└── README.md                   # A readme file
```

### How to run in dev mode

First clone the repository, then in the terminal run:

```bash
> npm ci
```

This will install all the dependencies. Then after that run:

```bash
> npm start
```

This will start the server in development mode. You will be able to access
the application on localhost:8080. The application was testet in latest
desktop and android chrome web browsers.

### Features

![Image](https://raw.githubusercontent.com/vstrider/intertek-app/master/docs/login.png)
![Image](https://raw.githubusercontent.com/vstrider/intertek-app/master/docs/home.png)

* Responsive login page with client-side validation and jwt authentication
* Responsive job order overview page
* Can filter job orders on description, received date, due date, job test result and job test status
* Buttons that allow quick filtering orders with commonly used dates
* Can sort the results on all properties both in ascending and descending order
* See job tests results for each order at a glance
* Each filter, page and ordering change is stored in the url so that the user can share or bookmark a link to each state. This also allowes the user to navigate between the states using back and forward buttons
