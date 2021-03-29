
----------------------------Initial Settings

1. $npm install in both folder: root and client.
2. setup .env files:
   * env file for server =>
        - to create in the server root folder .env file
        - copy in it settings from env.example (from root)
   * env for client =>
       - to create in the client folder .env file
       - copy in it settings from env.example (from client)
3. to launch the project, you need to write the command $npm run all from root or client folder
4. be familiar with:
    - Stylelint => https://dan-it.gitlab.io/fe-book/final-project/stylelint.html
    - EsLint => https://dan-it.gitlab.io/fe-book/final-project/eslint.html
    - Prettier => for web storm users how to setup => https://www.youtube.com/watch?v=7abJFET914k  
    - Husky => https://medium.com/netscape/git-hooks-with-husky-8b98f2556363 => Note! Json settings will be added after eslint fix
    !!!!!!!NOTE: due to husky settings you will not able to commit in git your updates. Follow warnings in the terminal and fix all mistakes or warnings before commit.

----------------------------Project Account and dataBase:

    project account: fe19BarberShop@gmail.com
    MongoDB Atlas database name => barberShop

----------------------------Work with Git 

1. be familiar with:
   - advanced git work => https://dan-it.gitlab.io/fe-book/git/main.html
   - advanced git work in webstorm => https://dan-it.gitlab.io/fe-book/git/git_ide.html
   - work with pull requests => https://dan-it.gitlab.io/fe-book/final-project/pull_request.html  
   - Travis CI => https://dan-it.gitlab.io/fe-book/final-project/travis_ci.html 
    
2. Note! master and develop branches are secured. You can't push updates directly in the master. 
   We use development branch as a "middlaware" before merge with master.
   All pull requests reqire 2 Code reviews from your team members. See details in links above.  
   
   
       