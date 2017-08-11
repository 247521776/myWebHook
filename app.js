/**
 * Created by boom on 2017/8/11.
 */
const http = require('http');
const createHandler = require('github-webhook-handler');
const handler = createHandler({ path: '/webhook', secret: 'myhashsecret' });
const spawn = require("child_process").spawn;

http.createServer(function (req, res) {
    handler(req, res, function (err) {
        if (err) {
            res.statusCode = 404;
            res.end('no such location');
        }
        else {
            res.statusCode = 200;
            res.end('success');
        }
    });
}).listen(7777);

handler.on('error', function (err) {
    console.error('Error:', err.message)
});

handler.on('push', function (event) {
    console.log("====");
    if (event.payload.ref.substr(-6) == "master") {
        rumCMD(sh, ["./shell.sh"], (data) => {
            console.log(data);
        });
    }
});

function rumCMD(cmd, args, cb) {
    const child = spawn(cmd, args);
    let result = "";
    child.stdout.on("data", buffer => result += buffer.toString());
    child.stdout.on("end", () => cb(result));
    child.stderr.on("data", err => console.error(err));
}