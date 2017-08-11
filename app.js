/**
 * Created by boom on 2017/8/11.
 */
const http = require('http');
const spawn = require("child_process").spawn;

http.createServer(function (req, res) {
    rumCMD("sh", ["./shell.sh"], (data) => {
        console.log(data);
    });
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end('{"ok":true}');
}).listen(7777);

function rumCMD(cmd, args, cb) {
    const child = spawn(cmd, args);
    let result = "";
    child.stdout.on("data", buffer => result += buffer.toString());
    child.stdout.on("end", () => cb(result));
    child.stderr.on("data", err => console.error(err));
}