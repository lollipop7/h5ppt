/**
 * Created by zzy on 2017/3/6.
 */
const express = require('express'),
join = require('path').join,
app = express(),
chalk = require('chalk'),
log = console.log;
const fs = require('fs');
var bodyParser = require('body-parser');

var compression = require('compression');
app.use(compression());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '50mb',extended: false }));
app.use(bodyParser.json());

app.use('/upload',function(req,res){
    const base64 = req.body.data;
    fs.writeFile('./test.txt',base64,'utf8',function(err){
        if(err) throw new Error(err);
        console.log('写入成功');
    });
    res.send({msg:'ok'});
});

app.use(express.static(join(__dirname,'src')));
app.listen(3000,  () => {
    log(chalk.blue.bold('app listening on port 3000!'));
});