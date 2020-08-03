var ws = require("nodejs-websocket");
console.log("开始建立连接...")

var server = ws.createServer(function(conn){
  conn.on("text", function (str) {
    let mes = JSON.parse(str)
    if (!("method" in mes)) {
      conn.sendText(JSON.stringify({
        ret: "error",
        code: 100,
        detail: "请指定模式"
      }))
    }
    else {
      let mthd = mes.method
      if (mthd == "login") {
        if (mes.username == "yemaster")
          conn.sendText(JSON.stringify({
            ret: "success",
            detail: "登录成功"
          }))
        else
          conn.sendText(JSON.stringify({
            ret: "error",
            code: 101,
            detail: "用户名或密码错误"
          }))
      }
    }
  })
  conn.on("close", function (code, reason) {
    console.log("关闭连接")
  });
  conn.on("error", function (code, reason) {
    console.log("异常关闭")
  });
}).listen(8088)
console.log("后端启动成功 ws://localhost:8088")