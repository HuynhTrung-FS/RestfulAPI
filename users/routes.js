const { Router } = require('express');
const express = require('express');
const router = express.Router();
const client = require('../data/pg');

router.post('', async (req,res)=>{
    const body = req.body;
    const result = await client.query(`
        INSERT INTO person(name, age, address) 
        VALUES ('${body.name}',${body.age},'${body.address}')
    `);
    res.send(result);
});
router.get('', async (req,res)=>{
    const result = await client.query(`
        SELECT * FROM person
    `);
    res.send(result.rows);
});
router.delete('', async (req,res)=>{
    const query = req.query;
    const name = query.name.toString();
    const result = await client.query('DELETE FROM "person" WHERE "name" =  $1',[name]);
    res.send(result);
});
router.put('', async (req,res)=>{
    const body = req.body;
    const query = req.query;
    const namecheck = query.name.toString();
    const result = await client.query('Update person SET name = $1, age = $2, address = $3 WHERE name = $4', [body.name,body.age,body.address,namecheck]);
    res.send(result);
})
module.exports = router;
















// const express = require('express');
// const router = express.Router();
// const users = require('./users-data.json');
// router.get('/', (req, res) => {
//     res.send(users);
// });

// router.get('/:id',(req,res) => {
//     const id = req.params.id;
//     const name = req.params.name;
//     console.log("ID: ", id);
//     console.log("Name: ", name);
//     // Parse
//     // const id = Number(idParams);
//     // Cach 1 : dung filter
//     // const resUser = users.filter(e => {
//     //     if(e.id === id){
//     //         return true;
//     //     }else{
//     //         return false;
//     //     }
//     // })
//     //Cach 2 ; cach 2 dung vong lap for
//     let resUser = [];
//     for (let i =0; i<users.length;i++){
//         if(users[i].id === id){
//             resUser.push(users[i]);
//             break;
//         }
//     }
//     res.send(resUser);
//     // console.log("User id:" ,id)
//     // res.send({userId: idParams});
// })
// router.get('/:id/:name',(req,res) => {
//     const id = req.params.id;
//     const name = req.params.name;
//     console.log("ID: ", id);
//     console.log("Name: ", name);
//     // Parse
//     // const id = Number(idParams);
//     // Cach 1 : dung filter
//     // const resUser = users.filter(e => {
//     //     if(e.id === id){
//     //         return true;
//     //     }else{
//     //         return false;
//     //     }
//     // })
//     //Cach 2 ; cach 2 dung vong lap for
//     let resUser = [];
//     for (let i =0; i<users.length;i++){
//         if(users[i].id === id){
//             resUser.push(users[i]);
//             break;
//         }
//     }
//     res.send(resUser);
//     // console.log("User id:" ,id)
//     // res.send({userId: idParams});
// })
// //lọc giá trị trong file json theo name và age sau đó get ra từ client
// router.get('/filters', (req, res) => {
//     const query = req.query;
//     const name = query.name;
//     const age = Number(query.age);
//     console.log(typeof age);
//     const resUser = users.filter((e) => {
//         if (e.name === name && e.age === age) {
//             return true;
//         } else {
//             return false;
//         }
//     });
//     res.send(resUser);
//     // console.log("Query: ",query);
// });

// router.get('/about', (req, res) => {
//     res.send('Users about');
// });

// // router.post('/', (req,res) => {
// //     const body = req.body;
// //     console.log("Body" + body);
// //     res.status(500).send(body);
// // })

// delete require.cache[require.resolve(`./users-data.json`)];
// module.exports = router;
