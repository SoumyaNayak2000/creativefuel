# Creative Fuel Assignment

- This is a Simple Project where we are tracking every test details and save the data to our data base .
- As I mentioned that i used database but that is JSON server , We have to start the Json Server to our local host to Enjoy all the features.
 ## db.json
 ```bash
 { 
  "test_type": [ ], 
  "test_mast": [ ] 
} 
```
- Copy the content inside db.json and start the json server by below command and enjoy the services.
- ### npx json-server --watch db.json --port 3001

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Getting Started

Created tables with Below Details <br/>
Table 1 Name : Tester Details <br/>
Fields : test_id (auto increment ) , Test_name , Test_type , tester_email id , Tester_mobile_no, Alternative_no,
creation_date , last_updation_date <br/>
Table 2 Name : Test_type <br/>
Fields : type_id (auto increment ) , Test_type <br/>

### Prerequisites

List any software, libraries, or other dependencies required to run the project.

```bash
# Example for installing prerequisites
npm install
```


### Installation
Step-by-step instructions on how to install and set up the project.

```bash
# Clone my code to your local system
 git clone https://github.com/SoumyaNayak2000/cfreative-fuel-assignment.git
cd <foldername>

# install the dependencies
npm install

# start the developement server
npm run dev

# start json server for the database

npx json-server --watch db.json --port 3001

## You are all set ##
```

### Usage

# What are the usages of the code  : <br/>
- This application is developed for the small use case of testers to track the tester details and on which tech stack tester tested the project
- This is an optimized application that will track all the records 

### Features
- Adding Test Types Dynamically
- Distinguish of the Test Types
- Form Validation
- Responsive

### Contributing
- Contribute To this Project to Optimize it more by giving me pull request.

### License
- All authority of the code has exclusively right of me ( Soumya Ranjan Nayak )

### Acknowledgments
- Author : Soumya Ranjan Nayak
- Tech Stack Used : React js , CSS , JS , JSON , GIT & GITHUB




