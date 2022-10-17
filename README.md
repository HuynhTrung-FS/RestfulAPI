### Tài liệu DEMO API dựa vào file JSON :

Folder people
File index.js

### Tài liệu DEMO API dựa vào DB (PostgreSQL):

Folder users
Folder data
File index.js

### Cài đặt pg

npm install pg

### Run file docker bằng lệnh:

docker-compose up -d

### Tạo Table person trong database postgreSQL bằng câu lệnh sau:

CREATE TABLE person (
name varchar(255),
age int,
address varchar(255)
);
