# Deploying to a Remote Database/Server on Render


## Introduction

Deploying your database and web server remotely makes your app accessible from anywhere, not just your computer. It ensures better reliability, security, and performance, plus it's easier to scale and collaborate with others. Remote deployment is also the standard for professional, always-online services.

Technically we could host our websites ourselves on our own computers, but that takes a lot of work. Using a cloud hosting platform means that we, as developers, don’t have to worry about things like maintaining physical servers, configuring them, making sure they don’t overheat, etc. so we can focus on the fun stuff — coding! 

We will deploy our web server remotely to [Render](https://render.com/) and our database to [Neon](https://neon.tech). There are many other options out there (like Heroku, DigitalOcean, and AWS) but we are using these two because they are free to use, don't require a credit card to get started, and relatively easy to set up!

---

## Remote Architecture

| **Element**    | **Deployment**  | **Description** |
| -------- | --------- | --- |
| UI | Netlify | Deploy frontend through Github. Creates an accessible URL in the browser. 
| Web server | Render | Deploy backend web server through Github. Can respond to HTTP requests from our deployed frontend.
| Database | Neon | Deploy PostgreSQL database to Neon. Connects to Render web server to respond to SQL queries.

---

## What are the steps we are going to take?

| **Step** | **Why?** |
| --- | --- |
| 1: Create a Render Account | We will be deploying code and our database on Render’s servers so that our website can be accessible over the internet. Render will handle keeping our code running as well as the directing of HTTP requests to our code. |
| 2: Creating a Web Server | We will spin up a server that will host our backend (server) code. We will connect this server to our Github repo storing our Node repo so that when we push code updates, it will automatically update our server! |
| 3: Adding a Database Server | We will create a database server that will host our database remotely. We will use our SQL commands to create our tables, and we will get the new database/host information to update our config data. |
| 4: Connecting to the Remote Database on pgAdmin | We will use pgAdmin to connect to our remote Database server. This is exactly like the process for connecting to our local database, but instead of localhost as our host, we will use the URL created by Render |
| 5: Updating our Web Server | We will need to add our database config to environment variables so that stay secure (and aren’t added to our Github repo) |
| 6: Updating our Frontend code | We will need to update our API calls to make requests to our Render URL instead of localhost, then we can deploy our FE to Netlify! |

---

## Step 1: Create a Render account

We will use Render to deploy our web server remotely to the web. 

- Go to [https://dashboard.render.com/billing#plan](https://dashboard.render.com/billing#plan) to sign up using your Github credentials. 
- Enter information about your profile, and then select Hobbyist as the plan.

---

## Step 2: Create a Web Server on Render

We will create a remote web server on Render that will run our Node.js code.

- Click on the Web Server option in main dashboard
- Link your Github repo with the countries_api project
- Click on Create a Project, give it a name (“Countries Project”)
- Root Directory should have the file path to your `src` directory that contains your server’s `index.js` file
- Build Command should be `npm install`
- Start Command should be `node index.js`, which is the same command we use to run our server locally

[](https://lh7-rt.googleusercontent.com/docsz/AD_4nXd9pECAhWqmVjv13TQqJIGzDcwywm9nj9SQBmWGnbmaW_G3TCx1ngu-X0VDPmIV5Iiefcl0vPjjCD104ui5Bn3EgecT60rE7qeSJOP1phq7rexAcw9Heh_NsNhMgOsqoizGFB-fcA?key=9je8baAxEYwQkPyIstTxIMhU)

- Select the Free option and start the deployment

---

## Step 3: Create a Neon account

We will use Neon to deploy our database remotely to the web. 

- Go to [neon.tech]([neon.tech](https://neon.tech)) to create your new account using your Github credentials.

## Step 4: Create a Database on Neon

- First, we need to create a project on Neon that will hold our database. In the [Neon console](console.neon.tech), select "Create Project" to create a new project.
- For the Project name, write `countries-api-project`.
- For the Postgres version, choose the latest version 17.
- For the Database name, write `countries-api-db`.
- For the Cloud Service Provider, choose AWS.
- For the Region, choose the region that is closest to your current location.
  
- <img width="999" alt="image" src="https://github.com/user-attachments/assets/b03ff07b-cbe0-49d9-b4cb-8a193c1702d5" />

Now that you have your database, you can create your SQL tables! 

- In the left sidebar on Neon, select the SQL Editor.
- <img width="200" alt="SQL Editor on Neon" src="https://github.com/user-attachments/assets/74924f5c-715e-491d-b42c-2181286e9550" />
- In the SQL Editor, run your `CREATE TABLE` and `INSERT INTO` SQL commands from your `database-schema.sql` file to create your users, saved_countries, and country_counts tables. Make sure to insert at least 3 rows of data for each table. 
- To confirm your SQL tables were created, run `SELECT` commands to see if your new tables exist. For example, `SELECT * FROM users` should give you all 3 users as 3 rows of data in your users table. 


---
 
## Step 5: Configure your Web Server's Environment Variables in Render

To connect your Render web server to your Neon database, you will need to update the Render web server's environment variables to match the Neon database's connection values. 

  - First, pull up your Neon database's connection values by opening up your Neon project's dashboard. You should see a 'Connect to your database' section where you can click on the Connect button.
    
    <img width="300" alt="image" src="https://github.com/user-attachments/assets/8c637f2a-d672-4e05-8604-b0cbd393066e" />
    
  - Where it says `Connection string`, click on it and change it to Parameters only

<img width="202" alt="Change Connection String option to Parameters Only" src="https://github.com/user-attachments/assets/54dcb699-99b4-440a-860c-2e813ebe5590" />


  - You should see your Neon database credentials like below. You will use these values as the environment variables for your Render web server. You will need to choose "Show password" to reveal your password. 

<img width="764" alt="Neon database credentials in the Neon dashboard" src="https://github.com/user-attachments/assets/5a80b6bc-ddd0-425d-9fcd-93198a096904" />


  - In your Render Console for your remote server, go to the Environment section.  
  - Add the values for 5 environment variables:
      - `DATABASE` which should match the `PGDATABASE` value in your Neon database credentials. 
      - `DATABASE_PORT`, which should be `5432`. 
      - `HOST` which should match the `PGHOST` value in your Neon database credentials. 
      - `PASSWORD` which should match the `PGPASSWORD` value in your Neon database credentials. 
      - `USER` which should match the `PGUSER` value in your Neon database credentials. 
  - It should look something like this:
    ![image](https://github.com/user-attachments/assets/5071b35e-c2ae-4189-b593-ff45f4377ace)

- Click Save, Rebuild, and Deploy
- Commit your code so that it pushes to Github (and redeploys to the server instance).
- Now that your web server is running, if you have any console.log() calls in your index.js file, those will show up in the Logs section because this is deployed remotely. It’s not going to show up in the terminal anymore, because we’re no longer running our server on our local machine.
- Now your web server on Render can talk to your database on Neon! Hooray! 
---

## Step 6: Configuring our Web Server Code in VS Code 

- **Copy the contents of your server-local folder into your server-deployed folder**
    - This server-deployed folder will hold the code for the server that you run remotely with your version-5.
- **Configure our remote server:**
    - We will update the server configuration so that it works with our remote server that we are deploying to Render.
    - In the `index.js` file, which is located in the server/src directory, add the following JS object after the import statements:
        
        ```jsx
        let config = {
        	user: process.env.USER,
        	host: process.env.HOST,
        	database: process.env.DATABASE,
        	password: process.env.PASSWORD,
        	port: process.env.DATABASE_PORT,
        	ssl: true
        };
        ```
        
- Now your index.js file in your server folder should look something like this:

![image.png](Deploying%20to%20a%20Remote%20Database%20Server%20on%20Render%201d5bb7044bb18058b787fc258f37e764/image%204.png)

- **Delete the `config.js` file**, which is located in the server/src directory.
    - Originally you created the `config.js` file to connect to your *local* database in Version 4.
    - However, in Version 5, you no longer need `config.js` because your code is no longer connecting to the *local* database. Instead, you will connect to your *remote* database deployed on Render using the `config` object you just created in the `index.js` file.
- **Add, Commit, and Push to your updated code to Github**
    - Pushing to Github should trigger a re-deployment of our updated server code, which is super neat!

---

## Step 7: Updating our Frontend Code

- **Copy the contents of your version-4 folder into your version-5 folder**
- **Find your API’s URL in Render**
In your Countries API web service in Render, you should see a URL that looks like this: [https://countries-api-vn58.onrender.com](https://countries-api-vn58.onrender.com/)
    - You can find yours on the main tab under Settings or Events
    - This is the URL of our remote server. It’s what we’re going to use to point all of our API endpoints.
    - This URL should replace localhost:3000 in your frontend fetch queries to send your GET or POST requests.
    - For example, if our frontend is trying to make a request, such as getting all saved countries, the URL would look something like `https://countries-api-vn58.onrender.com/get-all-saved-countries`
- **Update `vite.config.js` file**
We also need to make sure our CORs is set up properly. In your `vite.config.js` file, be sure that you have added the URL for the Render server
    - **Be sure that the target key reflects your correct URL from Render**
    
    ```jsx
    // vite.config.js
    import { defineConfig } from "vite";
    import react from "@vitejs/plugin-react";
    
    // https://vite.dev/config/
    export default defineConfig({
      server: {
        proxy: {
          "/api": {
            target: "[https://countries-api-vn58.onrender.com](https://countries-api-vn58.onrender.com/)/",
            changeOrigin: true,
            secure: false,
            rewrite: (path) => path.replace(/^\/api/, ""),
          },
        },
      },
      plugins: [react()],
    });
    
    ```
    
- **Add a `_redirects` file in the `public` folder** of your frontend `version-5` folder. It will have the following content:
    - **Make sure the URL reflects your correct URL of your API deployed on Render**
        
        ```
        /api/* https://countries-api-vn58.onrender.com/:splat 200
        /\* /index.html 404
        /* /index.html 200
        ```
        
    - Here is an example of what that file will look like on VS Code. It might throw errors on VS Code but that is okay. Just make sure you’ve changed the URL.
        
        ![image.png](Deploying%20to%20a%20Remote%20Database%20Server%20on%20Render%201d5bb7044bb18058b787fc258f37e764/image%206.png)
        


Now your `version-5` folder, which contains all of the frontend code, should be able to connect to your remote web server that you deployed on Render! 

---

## Step 8: Deploy Frontend to Netlify

- In your Netlify account, deploy your `version-5` folder. [Refer to this guide if you need help with this.](https://docs.google.com/document/d/18jxCUA0bebCyYaIHy8aaKMgOQH4w5-b-iCGDWpV4K4M/edit?tab=t.jnwta4jrhylr#heading=h.scmsi7a6s9yz)
- Open the Netlify deployment link in the browser.
- Test your application by going to its Netlify deployment link. If it’s all working, then as you interact with your `version-5` site, you should see data show up in your tables on pgAdmin.

YAY! You’ve deployed your frontend! 

---

## Step 9: Test your full-stack application

- So at this point you’ve…
    - deployed your frontend `version-5` folder to Netlify
    - deployed your backend PostgreSQL database to Render, connected to it on pgAdmin, and created your tables on pgAdmin
    - deployed your backend API to Render
- So now it’s time to test! Go to your Netlify deployment link in the browser. Test your site by doing the following:
    - Submit to the form.
        - Does that form data show up in the users table on pgAdmin? Does the “Welcome, {user}!” on the Saved Countries page welcome our new user?
    - Save a country.
        - Does that country show up on the Saved Countries page?
        - Does that newly saved country show up in the tables on pgAdmin?
    - Check a country’s view count.
        - Each time you open a country’s CountryDetail page, do you see its view count go up by 1?
    - If you answered yes to all the above questions, you’re done!

YOU’RE DONE WITH VERSION 5! You’ve now built a full-stack application from start to finish, and deployed it remotely! Pat yourself on the back for all your hard work! 🎉

---

## Troubleshooting

- You can use Postman to troubleshoot your Render API endpoints if you are getting errors.
- The Logs section of Render will show you the console.logs or any error messages in your backend
- If you are having an issue with the Node server receiving the ‘body’ of your API call, try adding NODE_VERSION 21.1.0 in the Environmental Variable in the Render dashboard. This will also require you to add “type”: “modules” in your package.json and update all of your modules to ES modules. Then redeploy to Github.
- If you deploy your version-5 to Netlify, and get an error message when you open the deployment link that says *Failed to load module script: Expected a JavaScript module script but the server responded with a MIME type of “application/octet-stream”. Strict MIME type checking is enforced for module scripts per HTML spec*, this probably has something to do with your deploy settings in Netlify.
    - In the project's deploy settings on Netlify, change the Publish Directory to `version-5/dist` and the Build Command to `npm run build`. Then re-deploy and test your site again.
- Are you getting a 502 Bad Gateway error?
    - Make sure you have a `_redirects` file.
    - Make sure your web server has the correct Environment Variables. Compare the web server’s Environment Variables to your database server’s configuration keys (Which you can find under it’s Info tab under the Connections section.)
