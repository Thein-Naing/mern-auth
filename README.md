# mern-auth

npm init -y

npm i express dotenv jsonwebtoken

npm i --save-dev nodemon

then create server.js

then import all dependencies/create express app/ listen requests/ middleware/

then create posts and routes and test in postman.

then create app.post ('/login') and inside callback function create jwt token like this below: app.post('/login', (req, res)=> {

  //Authenticate User
  
  const username = req.body.username
  
  // for payload first argument in jwt.sign , we have to create user object/data.
  
  const user = {name: username}
  
  // second argument is ACCESS_SECRET_TOKEN. you can create by following steps.
  // type : node
// then type require('crypto').randomBytes(64).toString('hex')
// you will get 64 digit secret key & copy and paste it in .env.
// then create REFREH_TOKEN_SECRET in .env , create one more
// require('crypto').randomBytes(64).toString('hex') and you will get another secret
// key copy and paste it in  REFREH_TOKEN_SECRET.

  const accessToken = jwt.sign(user, process.env. ACCESS_SECRET_TOKEN)
  
  res.json({
  
  
    accessToken: accessToken
  })
  
}) and test it in postman.

<img width="960" alt="image" src="https://github.com/Thein-Naing/mern-auth/assets/117463446/e01ffca4-c839-4a0f-aa73-d3042267f62e">


-// after sending post login, you will get accessToken from postman and then you have to authenticate.

function authenticateToken(req, res, next) {

  const authHeader = req.headers['authorization']
  
  const token = authHeader && authHeader.split(' ')[1]
  
  if(token === null)
  
  return res.sendStatus(401)
  
  // verify token.
  
  jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (error, user) => {
  
    if(error)
    
    return res.sendStatus(403)

    req.user = user
    
    next()
    
  })

}

 // afetr Authenticate User and verify token , we will filter posts for verified user.
  
app.get("/posts", authenticateToken, (req, res) => {

  // res.json(posts);
  
     res.json(posts.filter(post => post.username === req.user.name));

});

//then requestlogin post in postman and generate a accessToken.
<img width="960" alt="image" src="https://github.com/Thein-Naing/mern-auth/assets/117463446/10329992-d80a-43ab-8366-23d213d54599">
Use this token in get request in postman and you will get the response of authenticate username/title object.
<img width="960" alt="image" src="https://github.com/Thein-Naing/mern-auth/assets/117463446/e473198f-fd1f-4ee1-b876-19f168a5bf2a">

<img width="960" alt="image" src="https://github.com/Thein-Naing/mern-auth/assets/117463446/33701f14-e781-42b4-bc03-c1858d64b7a9">

I use without actual usernames and i tested in two different functions/Bearer Token && JWT Bearer with ACCESS_SECRET_TOKEN and random post bearer token sincewe have no usernames , postman/jwt send back empty []. Anyway JWT is working fine.

