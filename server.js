const express = require('express');
const app = express();
app.engine('html', require("express-art-template"));
//创建mysql链接对象
const mysql = require('mysql');
const os = require("os");
const multer = require("multer");
const upload = multer({ dest: "/GESTURE/upload" })

//const bodyparse = require("body-parse");
const fs = require("fs");
const path = require("path");
const { Callbacks } = require('jquery');
const exp = require('constants');

//解决跨域问题
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');//*表示可以跨域任何域名都行（包括直接存在本地的html文件）出于安全考虑最好只设置 你信任的来源也可以填域名表示只接受某个域名
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');//可以支持的消息首部列表
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');//可以支持的提交方式
    res.header('Content-Type', 'application/json;charset=utf-8');//响应头中定义的类型
    next();
});
app.use(express.static('public'))
// 使用包. 则在后续的post请求中
// 会自动加入req.body属性，这个属性中就包含了post请求所传入的参数

//创建连接，链接数据库
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'gesture'
});
conn.connect();

app.get("/", (req, res) => {
    res.render("blank.html")
})

app.post('/picture', upload.single("imges"), (req, res) => {
    var imges = req.file;
    //console.log("file_______"+req.file)
    fs.readFile(imges.path, (err, data) => {
        if (err) {
            console.log(err, "图片读取失败")
            return
        }
        var imgesori = imges.originalname;
        var radname = Date.now();
        var oriname = imgesori.lastIndexOf(".");
        var hzm = imgesori.substring(oriname, imgesori.length);
        var pic = radname + hzm;
        fs.writeFile(path.join(__dirname, './public/' + pic), data, (err) => {
            if (err) {
                console.log(err, "图片写入失败");
                res.send({
                    code: -1,
                    msg: "图片上传失败！"
                })
                return
            }

            // var picPath = "http://127.0.0.1:3000/public/" + pic;
            // var insertPic = "insert into test(id,url) values(1," + picPath + ")";
            var picPath = "./public/" + pic;
            var insertPic = `insert into test(url) values('${picPath}')`;
            conn.query(insertPic, (err, result) => {
                if (err) {
                    console.log("保存到数据库失败！")
                }
                res.send({
                    code: 200,
                    msg: "图片上传成功",
                    urls: picPath
                })
            })
        })
    })
})


var data;
setInterval(function () {
    conn.query('select url from test', function (err, result) {
        data = result;
    })
}, 100)


app.post('/url', (req, res) => {
    res.json(data);

})

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.post('/tags', (req, res) => {
    // console.log(req.body);
    // console.log(req.body.length);
    let leng = req.body.length;
    for (i = 0; i < leng; i++) {
        // console.log(req.body[i]);
        let { id, form, nature, binding, flow, symmetry, locale } = req.body[i];
        if (req.body[i].form != undefined) {
            conn.query(`update test set form = '${form}' where id = '${id}'`, function (err, result) {
                if (err) {
                    console.log("没有传入数据库")
                }
            })
        };
        if (req.body[i].nature != undefined) {
            conn.query(`update test set nature = '${nature}' where id = '${id}'`, function (err, result) {
                if (err) {
                    console.log("没有传入数据库")
                }
            })
        };
        if (req.body[i].binding != undefined) {
            conn.query(`update test set binding = '${binding}' where id = '${id}'`, function (err, result) {
                if (err) {
                    console.log("没有传入数据库")
                }
            })
        };
        if (req.body[i].flow != undefined) {
            conn.query(`update test set flow = '${flow}' where id = '${id}'`, function (err, result) {
                if (err) {
                    console.log("没有传入数据库")
                }
            })
        };
        if (req.body[i].symmetry != undefined) {
            conn.query(`update test set symmetry = '${symmetry}' where id = '${id}'`, function (err, result) {
                if (err) {
                    console.log("没有传入数据库")
                }
            })
        };
        if (req.body[i].locale != undefined) {
            conn.query(`update test set locale = '${locale}' where id = '${id}'`, function (err, result) {
                if (err) {
                    console.log("没有传入数据库")
                }
            })
        };
    }
})

var data2;
setInterval(function () {
    conn.query('select form,nature,binding,flow,symmetry,locale from test', function (err, result) {
        data2 = result;
    })
}, 50)

app.post('/get', (req, res) => {
    res.json(data2);
    // console.log(data2)
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.post('/delect', (req, res) => {
    console.log(req.body);
    let leng = req.body.length;
    for (i = 0; i < leng; i++) {
        console.log(req.body[i]);
        let { id, form, nature, binding, flow, symmetry, locale } = req.body[i];
        if ("form" in req.body[i] == true) {
            conn.query(`update test set form = NULL where id = '${id}'`, function (err, result) {
                if (err) {
                    console.log("没有传入数据库")
                }
            })
        };
        if ("nature" in req.body[i] == true) {
            conn.query(`update test set nature = NULL where id = '${id}'`, function (err, result) {
                if (err) {
                    console.log("没有传入数据库")
                }
            })
        };
        if ("binding" in req.body[i] == true) {
            conn.query(`update test set binding = NULL where id = '${id}'`, function (err, result) {
                if (err) {
                    console.log("没有传入数据库")
                }
            })
        };
        if ("flow" in req.body[i] == true) {
            conn.query(`update test set flow = NULL where id = '${id}'`, function (err, result) {
                if (err) {
                    console.log("没有传入数据库")
                }
            })
        };
        if ("symmetry" in req.body[i] == true) {
            conn.query(`update test set symmetry = NULL where id = '${id}'`, function (err, result) {
                if (err) {
                    console.log("没有传入数据库")
                }
            })
        };
        if ("locale" in req.body[i] == true) {
            conn.query(`update test set locale = NULL where id = '${id}'`, function (err, result) {
                if (err) {
                    console.log("没有传入数据库")
                }
            })
        };
    }
})

app.listen(3000, () => {
    console.log('api server runing at http:127.0.0.1:3000');
})

