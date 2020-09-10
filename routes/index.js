var express = require('express');
var router = express.Router();
var db = require('./db');
var request = require('request');
const { response } = require('express');

/* GET home page. */
router.all('/', function(req, res) {
  res.render('index');
});

router.get('/freq', function(req,res) {
  request('http://127.0.0.1:25421/freq', function(err, resource, body) {
    if (!err) {
      res.send(body);
    } else {
      res.send('获取失败');
    }
  });
});

router.get('/search/:group', function(req, res) {
  group = parseInt(req.params.group)
  if (!group) {
    res.send("<p>非法参数</p>")
    return
  }
  db.queryGroup(group, function(err, result) {
    if (err) {
      res.send("<p>查询结果出错</p>");
    } else {
        if(result.length == 0) {
          res.send(`<p>群号：${group}</p><p>未能找到结果</p>`)
        } else {
          r = result[0]
          str = `<p>群号：${group}</p>`
          if(r.kouqiu == 1) {
            res.send("<p>该群小白已关闭</p>")
          } else {
            str += `<p><strong>互动CD</strong>：${r.iactCD}秒</p>`
            if(!r.setuKey || r.setuKey == ""){
              str += "<p><strong>色图</strong>：尚未输入色图Key</p>"
            } else if(r.setu == 0) {
              str += "<p><strong>色图</strong>：该群色图功能已关闭</p>"
            } else if(r.setu == 1) {
              str += `<p><strong>个人色图CD</strong>：${r.individualCD}秒</p>`
              str += `<p><strong>群内色图CD</strong>：${r.groupCD}秒</p>`
              str += `<p><strong>色图撤回</strong>：${r.seturecall == 1 ? "撤回":"不撤回"}</p>`
              str += `<p><strong>色图反和谐</strong>：${r.anti == 1 ? "开启":"关闭"}</p>`
            }
            str += `<p><strong>复读</strong>：${r.repeat == 1 ? "开启":"关闭"}</p>`
            str += `<p><strong>防撤回</strong>：${r.antirecall == 1 ? "开启":"关闭"}</p>`
          }
          res.send(str);
        }
    }
  });
});

module.exports = router;
