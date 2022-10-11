// const http = require('http');

// // const { hostname } = require('os');

// const server = http.createServer(function (req,res){
//     // res.writeHead(200,{'Content-Type: 'text/html'});
//     res.write('Xin chao ca lop!');
//     res.end();

// }).listen(8089);

//express framework
const express = require('express');
const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const userRouter = require('./people/routes');
const userClasses = require('./users/routes');
// app.get('/',(req,res)=>{
//     res.send(`hello world`);
// })
// app.listen(port,()=>{n
//     console.log(`app listening on port ${port}`);
// })

// //mobile app
// app.get('/v1/users',(req,res)=>{
//     res.send([{name: 'Lan', age: 18, mark : 10.0},{name:'Nam',age: 20,mark: 9.0}])
// })
// //web browser

// app.post('/v1/users',(req,res) =>{
//     res.send('Something?')
// });

// app.get('/v1/classes',(req,res) => {
//     res.send('hello world')
// })

app.use('/v1/people', userRouter);
app.use('/v1/users', userClasses);
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
