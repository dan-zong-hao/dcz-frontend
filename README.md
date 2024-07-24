# dcz-frontend

This is a simple project for

<span style="color: red;">BUPT College Students' Innovation and Entrepreneurship Exhibition</span>

Displaying all the projects
.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Build](#build)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Installation

Clone the repository:

```sh
git clone https://github.com/dan-zong-hao/dcz-frontend.git
cd dcz-frontend
npm install
```

## Usage

1. Ensure you have installed the dependencies as described in the Installation section.

2. Start the development server:
   ```sh
   npm run start
   ```
3. Open your browser and navigate to `http://localhost:3000`.

## Build

To create a production build of the project, run the following command:

```sh
npm run build
```

This will create a `build `folder with all the optimized files. You can then deploy the contents of this folder to your production server.

## Features(main point)

1.  The frontend interface is developed using the React framework, please refer to `package.json` for the specific version

2.  In the folder `./src/pages`, we can see 5 folders. When we want to modify the frontend page, we can adjust the code here

`./Blacklist` is to display users who have engaged in illegal activities

`./Home` is the main page which shows all the projects

`./Layout` controls the side bar in the Home page

`./NotFound` is used to prevent users from accessing interfaces without a certain route

`./Rank` shows the top ten projects with the hightest number of votes, and the vote count is pushed from the backend using WebSocket. The frontend uses [echarts](https://echarts.apache.org/zh/index.html).

3. `./src/assets` contains some sample data of projects such as `id` 、`project name` 、`member` and so on.

4. `./src/store` is used to store some data of the user visiting this website, such as the id of the user 、the user's vote count、which projects they voted for.

5. `./src/utils` contains some tools we can use in the page.

6. `./App.js` registers the pages.

## Contributing

1. Fork the repository.
2. Create your feature branch

```sh
git checkout -b feature/YourFeature
```

3. Commit your changes

```sh
git commit -m 'Add some feature'
```

4. Push to the branch

```sh
git push origin feature/YourFeature
```

5. Open a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
