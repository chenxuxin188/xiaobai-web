var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var request = require('request');
var db = require('./db');
var jwt = require('jsonwebtoken');
var config = require('../config.json');
var fs = require('fs');
const SECRET = config.SECRET;

var rand = new Map();
function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

checkus = function(str){
  var zg = /^[0-9a-zA-Z]*$/;
  if (!zg.test(str)) {
      return false;
  } else {
      return true;
  }
}
checkps = function(str){
  var zg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]*$/;
  if (!zg.test(str)) {
      return false;
  } else {
      return true;
  }
}

check = function(str){
  var zg = /^[0-9A-Za-z]*$/;
  if (!zg.test(str)) {
      return false;
  } else {
      return true;
  }
}



/* GET users listing. */
router.post('/login', function(req, res, next) {
  c = req.cookies.auth
  if(c) {
    jwt.verify(c, SECRET, function(err, result) {
      if(err){
      } else {
        if (result.qq != null)
        {var url = `http://${config.xiaobai.ip}:${config.xiaobai.port}/glist/${result.qq}`
        request(url, function(err, resource, body) {
          if (err || resource.statusCode != 200) {
          } else {
            var js = JSON.parse(body);
            var list = [];
            for (var g of js) {
              list[list.length] = g.group_id;
            }
            var str = JSON.stringify(list);
            db.updateUserByID([str, r.id], function(err,result) {
              if (err) {
                console.log(err);
              }
            });
          }
        });}
        res.send('已登录')
        return
      }
    })
  }
  u = req.body.username;
  p = req.body.password;
  if (checkus(u) && checkps(p)) {
    db.findUserByAcc([u], function(err,result) {
      if (err) {
        console.log(err);
        res.status(400).send("错误");
      } else {
        if (result.length == 0) {
          res.status(422).send("用户名错误");
        } else {
          r = result[0];
          var pwv = bcrypt.compareSync(p, r.password);
          if (!pwv) {
            res.status(422).send("密码错误");
          } else {
            jwt.sign({id: r.id, qq:r.qq}, SECRET, {expiresIn: '1d'}, function(err, token) {
              if(err) {
                console.log(err);
                res.status(500).send("服务器出错")
              } else {
                var url = `http://${config.xiaobai.ip}:${config.xiaobai.port}/glist/${r.qq}`
                request(url, function(err, resource, body) {
                  if (err) {

                  } else if(resource.statusCode != 200) {

                  }
                  else {
                    var js = JSON.parse(body);
                    var list = [];
                    for (var g of js) {
                      list[list.length] = g.group_id;
                    }
                    var str = JSON.stringify(list);
                    db.updateUserByID([str, r.id], function(err,result) {
                      if (err) {
                        console.log(err);
                      }
                    });
                  }
                });
                res.cookie('auth', token, {maxAge: 86400000}).send("success");
              }
            });
          }
        }
      }
    });
  } else {
    res.status(400).send("非法账号或密码");
  }

});


router.post('/admin', function(req, res, next) {
  if (req.cookies.auth) {
    jwt.verify(req.cookies.auth, SECRET, function(err, result) {
      if(err) {
        res.status(422).send('xx');
        return;
      }
      res.send(result.id.toString());
    });
  } else {
    res.status(422).send('xx');
  }
});

router.all('/admin/', function(req, res, next) {
  res.render('check')
});

router.post('/admin/:id/update', function(req, res, next) {
  var group = req.body.group
  var iactCD = req.body.iactCD
  var setu = req.body.setu
  var setuKey = req.body.setuKey
  var individualCD = req.body.individualCD
  var groupCD = req.body.groupCD
  var seturecall = req.body.seturecall
  var anti = req.body.anti
  var antirecall = req.body.antirecall
  var repeat = req.body.repeat
  var kouqiu = req.body.kouqiu
  var ban = req.body.ban
  if(parseInt(group) > 10000000000 || parseInt(group) < 1000) {
    res.status(422).send('非法群组参数');
    return;
  }

  else if(parseInt(iactCD) > 120 || parseInt(iactCD) < 10) {
    res.status(422).send('非法互动CD参数');
    return;
  } else if(setu != 0 && setu != 1) {

    res.status(422).send('非法色图开关参数');
    return;
  } else if(!check(setuKey)) {

    res.status(422).send('非法色图key参数');
    return;
  } else if(groupCD > 3600 || groupCD < 60) {

    res.status(422).send('非法群组CD参数');
    return;
  } else if(individualCD > 7200 || individualCD < 120) {
    res.status(422).send('非法个人CD参数');
    return;
  } else if(anti != 0 && anti != 1) {
    res.status(422).send('非法色图反和谐开关参数');
    return;
  } else if(antirecall != 0 && antirecall != 1) {
    res.status(422).send('非法防撤回开关参数');
    return;
  } else if(repeat != 0 && repeat != 1) {
    res.status(422).send('非法复读开关参数');
    return;
  } else if(seturecall != 0 && seturecall != 1) {
    res.status(422).send('非法色图撤回参数');
    return;
  } else if(kouqiu != 0 && kouqiu != 1) {
    res.status(422).send('非法小白口球开关参数');
    return;
  } else if(ban.length != 0 && !JSON.parse(ban)) {
    res.status(422).send('非法参数');
    return;
  }

  if (req.cookies.auth) {
    jwt.verify(req.cookies.auth, SECRET, function(err, result) {
      if(err) {
        res.status(422).send('过期认证，请重新登录');
        return;
      }
      if(req.params.id != result.id){
        res.status(422).send('非法ID')
      }
      db.findUserByID(result.id, function(err, result) {
        if(err) {
          console.log(err);
          res.status(500).send('获取用户出错，请刷新或者重新登录。')
        } else {
          if (result.length == 0) {
            res.status(500).send('获取用户出错，请刷新或者重新登录。')
          } else {
            r = result[0];
            l = JSON.parse(r.groups);
            t = false;
            for (var ll of l) {
              if(ll == group) {
                t = true;
                break;
              }
            }
            if (r.superadmin ==1){
              t = true;
            }
            if(!t) {
              res.status(404).send('没有修改该组的权限')
            } else {
              db.queryGroup(group, function(err, result) {
                if(err) {
                  res.status(500).send('找不到该组。')
                } else {
                  db.updateGroup([iactCD,setuKey,setu,seturecall,anti,individualCD,groupCD,repeat,antirecall,kouqiu,ban,group], function(err, reqult) {
                    if(err){
                      res.status(500).send('更新失败，请刷新或者重新登录。')
                    } else {
                      res.send(`成功`);
                    }
                  })
                }
              })
            }
          }
        }
      });
    });
  } else {
    res.status(422).send('尚未登录，请登录');
  }
});

router.post('/superadmin/generate', function(req, res, next) {
  if (req.cookies.auth) {
    jwt.verify(req.cookies.auth, SECRET, function(err, result) {
      if(err) {
        res.status(422).send('过期认证，请重新登录');
        return;
      }
      db.findUserByID(result.id, function(err, result) {
        if(err) {
          console.log(err);
          res.status(500).send('获取用户出错，请刷新或者重新登录。')
        } else {
          if (result.length == 0) {
            res.status(500).send('获取用户出错，请刷新或者重新登录。')
          } else {
            r = result[0];
            if (r.superadmin == 1) {
              var p = makeid(8)
              rand.set(p, Date.now());
              res.send(`${config.https? 'https':'http'}://${config.domain}/users/${p}/register`);
            } else {
              res.status(404).send('???');
            }
          }
        }
      });
    });
  } else {
    res.status(422).send('尚未登录，请登录');
  }
});

router.post('/admin/:id/info', function(req, res, next) {
  if (req.cookies.auth) {
    jwt.verify(req.cookies.auth, SECRET, function(err, result) {
      if(err) {
        res.status(422).send('过期认证，请重新登录');
        return;
      }

      if(req.params.id != result.id){
        res.status(422).send('非法ID')
      }
      db.findUserByID(result.id, function(err, result) {
        if(err) {
          console.log(err);
          res.status(500).send('获取用户出错，请刷新或者重新登录。')
        } else {
          if (result.length == 0) {
            res.status(500).send('获取用户出错，请刷新或者重新登录。')
          } else {
            r = result[0];
            if (r.superadmin == 1) {
              db.groupList(function(err, result) {
                if (err) {
                  res.status(500).send('获取群组出错，请刷新或者重新登录。');
                  return;
                }
                res.send(JSON.stringify(result));
              })
            } else {
              if(!r.groups) {
                res.cookie('auth', 'x', {maxAge: 0}).status(500).send('未添加管理群组，请联系添加。');
                return;
              }
              s=r.groups.slice(1,-1);
              db.getGroups(JSON.parse(r.groups), function(err, result) {
                if (err) {
                  res.status(500).send('获取群组出错，请刷新或者重新登录。');
                  return;
                }
                res.send(JSON.stringify(result));
              })
            }
          }
        }
      });
    });
  } else {
    res.status(422).send('尚未登录，请登录');
  }
});

router.all('/admin/:id', function(req, res, next) {
  if(req.params.id == 1){
    res.render('sadmin');
    return;
  }
  
  res.render('admin')
});

router.all('/login', function(req, res, next) {
  res.render('login');
});

router.all('/logout', function(req, res, next) {
  res.cookie('auth', 'x', {maxAge: 0}).redirect('/users/admin');
});


router.all('/:id/register', function(req, res, next) {
  var t = rand.get(req.params.id)
  if(!t){
    res.status(404).send("找不到地址");
    return
  }
  if(req.method == "GET") {
    res.render('register');
  } else if (req.method == "POST") {
    u = req.body.username;
    p = req.body.password;
    if (checkus(u) && checkps(p)) {
      db.findUserByAcc([u], function(err, result){
        if(err){
          res.status(400).send("注册失败，请重试");
        } else {
          if (result.length != 0){
            res.status(400).send("已有该账号。");
          }else{
            var pswd = bcrypt.hashSync(p, 10);
            var q = req.body.qq;
            var url = `http://${config.xiaobai.ip}:${config.xiaobai.port}/glist/${q}`
            request(url, function(err, resource, body) {
              if (err || resource.statusCode != 200) {
                db.register([u, pswd], function(err,result) {
                  if (err) {
                    console.log(err);
                    res.status(400).send("注册失败，请重试");
                  } else {
                    rand.delete(req.params.id)
                    res.send("注册成功。自动获取管理组信息失败，请联系添加管理组。")
                  }
                });
              } else {
                var js = JSON.parse(body);;
                var list = [];
                for (var g of js) {
                  list[list.length] = g.group_id;
                }
                var str = JSON.stringify(list);
                db.gregister([u, pswd, str, q], function(err,result) {
                  if (err) {
                    console.log(err);
                    res.status(400).send("注册失败，请重试");
                  } else {
                    rand.delete(req.params.id)
                    res.send("注册成功。")
                  }
                });
                
              }
            });
          }
        }
      })
    } else {
      res.status(400).send("非法账号或密码");
    }
  }
  
});

setInterval(() => {
  for (var [key, value] of rand) {
    if(Date.now() - value > 3600000) {
      rand.delete(key);
    }
  }
}, 500);


module.exports = router;
