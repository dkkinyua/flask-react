# Flask React Recipes

This application is built on ReactJS for the front end and Flask for the back end. It has many features which include:


## 1. Features:
- **User-friendly interface**: This app has a user-friendly interface where a user can interact with the application seamlessly.
- **Create, update, and delete recipes**: A user can create, update, and delete recipes in the application easily as React fetches data from the Flask API endpoints.
- **Login functionalities**: A user can log into the application with ease, and the use of ```react-token-auth``` ensures their security.
- **Ease of installation**: This application is easy to install on your machine by downloading the contents of the requirements.txt file and other React and Flask dependencies.

## 2. Installation Guide:
- **Clone this  repository**: Head over to your terminal and run the following command to clone this repository to your computer:
  ```bash
    git clone https://github.com/dkkinyua/flask-react.git
  ```
  
- **Install your preferred virtual environment**: After cloning the repository, you can install your preferred virtual environment, (mine's virtualenv), to install virtualenv into your project, run:
  ```bash
    virtualenv yourenv
  ```
  To activate the virtual environment, on Windows, run:
  ```bash
    yourenv/Scripts/activate
  ```
  on macOS and Linux run:
  ```bash
     source yourenv/bin/activate
  ```
  
- **Download the necessary Flask dependencies**: Navigate to the project in your computer to the "flask-backend" folder and run the following commands:
  ```bash
    cd flask-backend
    pip install -r requirements.txt
  ```
  This will download the required Flask dependencies into your computer.
  
- **Run the development server**: After installing all Flask dependencies, you can now run the backend server while being on the same 'flask-backend' folder:
  ```python
    python run.py
  ```
  This command will run the backend server with DEBUG mode on localhost:5000 as this is the development server to log any errors in our code to our web browser.
  
- **Install the React dependencies**: Navigate to the 'client' folder to install all React packages in the 'package.json' file by running the following commands:
  If you are using npm (Node Package Manager) to install packages:
  ```bash
    npm install
  ```
  if you are using yarn as your preferred package installer:
  ```bash
    yarn install
  ```
   
- **Run the npm server**: After running the backend server, we can now run our frontend server by navigating to the 'client' folder and run the following commands:
  ```bash
    cd client
    npm start
  ```
  These commands will run the frontend server on localhost:3000 and will display the React application in your browser, if you are using Chrome, the application will automatically run.

## 3. Contributions:
Feel free to contribute to this project to add, update, or raise any issues in the code and I'll be happy to collaborate with you.
  

