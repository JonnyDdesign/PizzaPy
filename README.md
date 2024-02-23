# PizzaPy
PizzaPy is a web application created with Python and Flask that was designed to allow a restaurant owner to manage available pizza toppings and create new pizzas.
I chose to build my app with Python because I believe Python is quite versatile and the syntax is easy to follow.

## Features
- Manage Toppings: Add, delete, and update pizza toppings.
- Manage Pizzas: Create, delete, and update pizzas with toppings.
- User Interface: Simple and intuitive web interface for interacting with the app.

## How to Install PizzaPy
1. Clone the repository:`git clone https://github.com/JonnyDdesign/PizzaPy`
3. Navigate to the project directory: `cd pizzapy`
4. Install dependencies: `pip install -r requirements.txt`

## Using PizzaPy Via Command Line
Once installed, you can run PizzaPy from the command line.
Navigate to the directory where your application is installed and execute the following command: 
`python3 main.py`

## Access Live Version of PizzaPy
Additionally, a live version of PizzaPy has been deployed via the Google Cloud Platform (GCP). To access the live version, open a web browser and enter: pizzapy-414805.wn.r.appspot.com in the address bar.

### Challenges
During the course of this project, I had issues arise with getting my JavaScript functions to work properly. My vision for the project was to include a landing page to choose between managing pizza toppings or managing pizzas. The two options would link to two separate pages for managing toppings and managing pizzas. Secondly, I wanted to display a list of toppings and a list of pizzas on the separate pages, create a button to delete toppings or pizzas, allow updates to toppings and pizzas, and include an input line to add additional toppings or create a new pizza. Additionally, I wanted the application to have an intuitive and easy to follow interface that was responsive to various screen sizes.

### Lessons Learned
This was my first full stack application that I designed and developed from scratch. I have utilized Python to write scripts separately to perform basic functions and understand the syntax. However, this was my first experience using a micro framework (Flask) and using route handlers to create a dynamic and interactive web application. Figuring out the process of installing Flask and the concept of the app.yaml and requirements.txt files was interesting. I began by trying to add way too much information within those files, when in actuality those files only need to contain basic information as Flask will handle all the other intricacies. Once I crossed that hurdle, it was on to route handlers and figuring out how to tie those into interacting with the Python classes and methods. I also had to learn and understand how to structure my project with certain files and folders in order to link my HTML, CSS, and JavaScript files. I am still working to resolve errors that I am getting when trying to delete toppings and pizzas. I have consistently tried refactoring and testing my code to try and understand where the errors are occurring and have been unsuccessful. I am continuing to learn about testing within Python and will update this as I figure out ways to solve the problems.

### Key Takeaways
I would like to add that going into this project, I thought I had the necessary skills to create this application. This experience has definitely been a humbling one and an eye opening one to show me how complex a language can been and how much more learning I have ahead of me. I am excited to continue my journey of learning and growing within web development and continuing to expand my knowledge within the field and become a better developer.
