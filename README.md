# Fyle Frontend Challenge

This Angular application allows users to input a GitHub username and fetch their public repositories. 
It features server-side pagination, with 10 repositories fetched by default.
Users can select a maximum of 100 repositories fetched per page.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Running Tests](#running-tests)


## requirements
* Requires 14+ angular version.
* Install angular cli [Ref](https://angular.io/cli)
* Install tailwind CSS [Ref](https://tailwindcss.com/docs/guides/angular)

## Installation
1. Fork this repository to your GitHub account.
2. Clone the forked repository and proceed with the steps mentioned below.
3. Clone the repository:

   ```bash
   `git clone https://github.com/tariqrasheed172001/fyle-internship-challenge-23.git`
   
4. Navigate to the project directory
   ```bash
   `cd fyle-internship-challenge-23`
6. Install dependencies:
   ```bash
   `npm install`

## Usage
1. Start the development server:
   ```bash
   `ng serve` 
2. The app will be available at http://localhost:4200/.
3. Enter a GitHub username in the input field to fetch their public repositories.

## Running Tests
* To run unit tests for components and services, use the following command:
   ```bash
   `ng test`.
* Executing this command will initiate the unit tests, and Karma will run them in the configured browsers. Jasmine will be the test framework used to define and run the tests.

* After running the tests, Karma will generate a coverage folder in the root directory of your project. Inside this coverage folder, you'll find an HTML file named index.html. This file contains detailed information about the code coverage of each component, service, and file in your project.

* To check the code coverage of your Angular project, you can open this index.html file in a web browser. It will display a detailed report showing which parts of your code are covered by the tests and which parts are not. This helps in identifying areas of your codebase that may need more testing or improvement.

* In summary, running ng test not only executes the unit tests but also generates a coverage report that can be viewed to analyze the code coverage of your Angular application.
