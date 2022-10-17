const { json, query } = require('express');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const { resourceLimits } = require('worker_threads');
const output = require('./output.json');

let cachedData;
let cacheTime;

//Tạo file json với tên là output.json
router.post('/', (req, res) => {
    const body = req.body;
    console.log('TYPE BODY: ', typeof body);
    console.log('Cuurent DIR: ', __dirname);
    fs.writeFile(`${__dirname}/output.json`, JSON.stringify(body), (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('WRITE FILE SUCCESS');
    });
});
//Thêm 1 phần từ person mới vào file output.json
router.post('/addPerson',(req,res) => {
    const body = req.body;
    const name = body.name;
    const age = Number(body.age);
    let person = {
        name : name,
        age : age
    };
    var dataPerson = fs.readFileSync(`${__dirname}/output.json`);
    var dataFile = JSON.parse(dataPerson);
    dataFile.push(person);
    console.log('Add Person ' + person.name + '_' + person.age + ' Success');
    fs.writeFile(
        `${__dirname}/output.json`,
        JSON.stringify(dataFile),
        (err) => {
            if (err) {
                console.error(err);
                return;
            }
        },
    );
})
//Lấy tất cả phần tử person trong file output.js
router.get('/', (req, res) => {
    if (cacheTime && cacheTime > Date.now() - 30 * 1000) {
        return res.send(cachedData);
    }
    fs.readFile(`${__dirname}/output.json`, (err, data) => {
        if (err) throw err;
        cachedData = data;
        cacheTime = Date.now();
        data.cacheTime = cacheTime;
        res.send(data);
        console.log('READ FILE SUCCESS');
    });
    // res.send(output);
});
// //Lấy phần tử theo param trong file output.js
// router.get('/:name',(req,res) => {
//     const name = req.params.name;
//     const filterPerson = output.filter((e)=>{
//         if(e.name === name) {
//             return true;
//         }else{
//             return false;
//         }
//     });
//     console.log('Query ',name);
//     res.send(filterPerson);
// });
//Lọc và lấy person theo name trong file output.js
router.get('/filters', (req, res) => {
    const query = req.query;
    const name = query.name;
    const filterPerson = output.filter((e) => {
        if (e.name === name) {
            return true;
        } else {
            return false;
        }
    });
    console.log('Query: ', query);
    res.send(filterPerson);
});
//Xoá phần tử Person theo name
router.delete('/delete', (req, res) => {
    const query = req.query;
    const name = query.name;

    fs.readFile(`${__dirname}/output.json`, (err, data) => {
        dataFile = JSON.parse(data);
        const deletePerson = dataFile.filter((e) => {
            if (!e.name.includes(name)) {
                return true;
            } else {
                return false;
            }
        });
        console.log(deletePerson);
        fs.writeFile(
            `${__dirname}/output.json`,
            JSON.stringify(deletePerson),
            (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
            },
        );
    });
});
//Sửa name của Person 
router.put('/:name',(req,res) => {
    const name = req.params.name;
    const body = req.body;
    const newName = body.name;
    var dataPerson = fs.readFileSync(`${__dirname}/output.json`);
    var dataFile = JSON.parse(dataPerson);
    var dataPick = dataFile.filter((e) => {
        if(e.name === name) {
            e.name = newName;
        }
        return true;
    });
    fs.writeFile(
        `${__dirname}/output.json`,
        JSON.stringify(dataPick),
        (err) => {
            if (err) {
                console.error(err);
                return;
            }
        },
    );
});
// pageNumber and pageSize
router.get('/info', paginatedResults(output), (req, res) => {
    res.json(res.paginatedResults);
});
function paginatedResults(model) {
    return (req, res, next) => {
        const query = req.query;
        const pageNumber = Number(query.pageNumber);
        const pageSize = Number(query.pageSize);

        const firstIndex = (pageNumber - 1) * pageSize;
        const endIndex = pageNumber * pageSize;

        const results = {};

        if (endIndex < model.length) {
            results.next = {
                pageNumber: pageNumber + 1,
                pageSize,
            };
        }
        if (firstIndex > 0) {
            results.previous = {
                pageNumber: pageNumber - 1,
                pageSize,
            };
        }
        results.results = model.slice(firstIndex, endIndex);
        res.paginatedResults = results;
        next();
    };
}
module.exports = router;
