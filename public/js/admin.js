var url = window.location.href

banReg = /^c?g(?<grp>[0-9]+)u(?<usr>[0-9]+)/
idReg = /^(?<type>[a-z]+)(?<group>[0-9]+)/
blbReg = /^c?bg(?<grp>[0-9]+)u(?<usr>[0-9]+)/

var list = [];
var blblist = [];


$.ajax({
    url: url + '/info',
    type: 'POST',
    success: function (result) {
        print
        r = JSON.parse(result);
        var str = `<div class="accordion bg-dark" id="groups">`
        for (var i = 0; i < r.length; i++) {
            str += `<div class="card">`+
            `<div class="card-header bg-secondary" id="head${r.group}">`+
              `<h2 class="mb-0">`+
                `<button class="btn btn-block text-left" type="button" data-toggle="collapse" data-target="#t${r[i].group}" aria-expanded="false" aria-controls="t${r[i].group}">`+
                  `管理群${r[i].group}`+
                `</button>`+
              `</h2>`+
            `</div>`+
            `<div id="t${r[i].group}" class="collapse" aria-labelledby="head${r[i].group}" data-parent="#groups">`+
              `<div class="card-body bg-dark">`+
            `<form id="${r[i].group}">` +
              `<div class="form-group row"><label for="iactCD${r[i].group}" class="col-sm-2 col-form-label">互动CD</label><div class="col-sm-10"><input type="number" class="form-control" id="iactCD${r[i].group}" min="10" max="120" value="${r[i].iactCD}"></div></div>`+
              `<div class="form-group row"><label for="repeat${r[i].group}" class="col-sm-2 col-form-label">复读</label><div class="col-sm-10"><input type="checkbox" class="form-control" id="repeat${r[i].group}"${r[i].repeat == 1? 'checked':''}></div></div>`+
              `<div class="form-group row"><label for="antirecall${r[i].group}" class="col-sm-2 col-form-label">防撤回</label><div class="col-sm-10"><input type="checkbox" class="form-control" id="antirecall${r[i].group}"${r[i].antirecall == 1? 'checked':''}></div></div>`+
              `<div class="form-group row"><label for="kouqiu${r[i].group}" class="col-sm-2 col-form-label"><strong style="color: red;">关闭小白</strong></label><div class="col-sm-10"><input type="checkbox" class="form-control" id="kouqiu${r[i].group}"${r[i].kouqiu == 1? 'checked':''}></div></div>`+
              `<div class="m-2">`+

              `<div class="accordion bg-dark" id="mgrp${r[i].group}">`+

              `<div class="card">`+
                `<div class="card-header bg-secondary" id="banhead${r.group}">`+
                  `<h2 class="mb-0">`+
                    `<button class="btn btn-block text-left" type="button" data-toggle="collapse" data-target="#bangrp${r[i].group}" aria-expanded="false" aria-controls="bangrp${r[i].group}">`+
                      `ban list`+
                    `</button>`+
                  `</h2>`+
                `</div>`+

                `<div id="bangrp${r[i].group}" class="collapse" aria-labelledby="banhead${r[i].group}" data-parent="#mgrp${r[i].group}">`+
              `<div class="card-body bg-dark">`+

              `<div class="form-group row"><label for="ban${r[i].group}" class="col-sm-2 col-form-label">添加ban</label><div class="form-inline col-sm-10"><input type="number" class="form-control col-md-10" id="ban${r[i].group}" max="10000000000"><button type="button" class="btn btn-success" id="add${r[i].group}">添加</button></div></div>`+
              `<div class="form-group row"><label for="banlist${r[i].group}" class="col-sm-2 col-form-label">现有banlist</label><div class="form-inline col-sm-10"><ul class="list-group col-md-10" id="banlist${r[i].group}">`;
              
              list[r[i].group] = [];
              var parse;
              try {
                  parse = JSON.parse(r[i].ban);
              } catch (e) {
                  parse = false;
              }
              if(parse) {
                  if(parse.length > 0)
                  {
                      for(var j = 0; j < parse.length; j++) {
                        list[r[i].group][list[r[i].group].length] = parse[j]
                        str += `<li class="list-group-item list-group-item-action list-group-item-dark" id="g${r[i].group}u${parse[j]}">${parse[j]}<button type="button" class="close" aria-label="Close" id="cg${r[i].group}u${parse[j]}"><span>&times;</span></button></li>`
                      }
                    }
              }
              
              str += `</ul></div></div>`+

              `</div></div></div>`+
              
              `<div class="card">`+
                `<div class="card-header bg-secondary" id="setuhead${r.group}">`+
                  `<h2 class="mb-0">`+
                    `<button class="btn btn-block text-left" type="button" data-toggle="collapse" data-target="#setugrp${r[i].group}" aria-expanded="false" aria-controls="setugrp${r[i].group}">`+
                      `色图`+
                    `</button>`+
                  `</h2>`+
                `</div>`+

                `<div id="setugrp${r[i].group}" class="collapse" aria-labelledby="setuhead${r[i].group}" data-parent="#mgrp${r[i].group}">`+
              `<div class="card-body bg-dark">`+


              `<div class="form-group row"><label for="setuKey${r[i].group}" class="col-sm-2 col-form-label">色图Key</label><div class="col-sm-10"><input type="text" class="form-control" id="setuKey${r[i].group}" value="${r[i].setuKey? r[i].setuKey:''}"></div></div>`+
              `<div class="form-group row"><label for="setu${r[i].group}" class="col-sm-2 col-form-label">色图开关</label><div class="col-sm-10"><input type="checkbox" class="form-control" id="setu${r[i].group}"${r[i].setu == 1? 'checked':''}></div></div>`+
              `<div class="form-group row"><label for="individualCD${r[i].group}" class="col-sm-2 col-form-label">个人CD</label><div class="col-sm-10"><input type="number" class="form-control" id="individualCD${r[i].group}" min="60" max="3600" value="${r[i].individualCD}"></div></div>`+
              `<div class="form-group row"><label for="group${r[i].group}" class="col-sm-2 col-form-label">群组CD</label><div class="col-sm-10"><input type="number" class="form-control" id="groupCD${r[i].group}" min="120" max="7200" value="${r[i].groupCD}"></div></div>`+
              `<div class="form-group row"><label for="anti${r[i].group}" class="col-sm-2 col-form-label">色图反和谐</label><div class="col-sm-10"><input type="checkbox" class="form-control" id="anti${r[i].group}"${r[i].anti == 1? 'checked':''}></div></div>`+
              `<div class="form-group row"><label for="seturecall${r[i].group}" class="col-sm-2 col-form-label">色图撤回</label><div class="col-sm-10"><input type="checkbox" class="form-control" id="seturecall${r[i].group}"${r[i].seturecall == 1? 'checked':''}></div></div>`+
              
              `</div></div></div>`+

              `<div class="card">`+
              `<div class="card-header bg-secondary" id="blbhead${r.group}">`+
                `<h2 class="mb-0">`+
                  `<button class="btn btn-block text-left" type="button" data-toggle="collapse" data-target="#blbgrp${r[i].group}" aria-expanded="false" aria-controls="blbgrp${r[i].group}">`+
                    `菠萝包更新提醒`+
                  `</button>`+
                `</h2>`+
              `</div>`+

              `<div id="blbgrp${r[i].group}" class="collapse" aria-labelledby="blbhead${r[i].group}" data-parent="#mgrp${r[i].group}">`+
            `<div class="card-body bg-dark">`+

              `<p><strong style="color: red;">注意：新加的书最长需要10分钟才能开始检测更新。</strong><p>`+
            `<div class="form-group row"><label for="blb${r[i].group}" class="col-sm-2 col-form-label">添加ban</label><div class="form-inline col-sm-10"><input type="number" class="form-control col-md-10" id="blb${r[i].group}" max="10000000000"><button type="button" class="btn btn-success" id="addblb${r[i].group}">添加</button></div></div>`+
              `<div class="form-group row"><label for="blblist${r[i].group}" class="col-sm-2 col-form-label">现有banlist</label><div class="form-inline col-sm-10"><ul class="list-group col-md-10" id="blblist${r[i].group}">`;
              
              blblist[r[i].group] = [];
              var parse;
              try {
                  parse = JSON.parse(r[i].blb);
              } catch (e) {
                  parse = false;
              }
              if(parse) {
                  if(parse.length > 0)
                  {
                      for(var j = 0; j < parse.length; j++) {
                        blblist[r[i].group][blblist[r[i].group].length] = parse[j]
                        str += `<li class="list-group-item list-group-item-action list-group-item-dark" id="bg${r[i].group}u${parse[j]}">${parse[j]}<button type="button" class="close" aria-label="Close" id="cbg${r[i].group}u${parse[j]}"><span>&times;</span></button></li>`
                      }
                    }
              }
              
              str += `</ul></div></div>`+


            `</div></div></div>`+
              
              `</div></div><button type="submit" class="btn btn-primary">提交  QQ群：${r[i].group}</button></form></div></div></div>`;
        }

        str += "</div>"
        $("#control").html(str);

        var b = $("button");
        for(var i of b) {
            var reg = idReg.exec(i.id)
            var breg = banReg.exec(i.id)
            var blbreg = blbReg.exec(i.id)
            if(reg) {
                var rg = reg.groups
                if(rg.type == "add"){
                    i.addEventListener('click', function(event){
                        var gg = idReg.exec(this.id);
                        g = gg.groups;
                        var item = $(`#banlist${g.group}`);
                        var box = $(`#ban${g.group}`);
                        var dupl = false;
                        for (var c of item.children()) {
                            var br = banReg.exec(c.id);
                            var bg = br.groups;
                            if (bg.usr == box.val()) {
                                dupl = true;
                                $(".modal-body").html(`<p>已经添加过这个QQ</p>`)
                                $("#warn").modal()
                                break;
                            }
                        }

                        var empty = false;
                        if (box.val().length == 0) {
                            empty = true;
                            $(".modal-body").html(`<p>请填入QQ号</p>`)
                            $("#warn").modal()
                        }
                        if(!dupl && !empty) {
                            var thisid = `g${g.group}u${box.val()}`
                            list[g.group][list[g.group].length] = parseInt(box.val());
                            item.append(`<li class="list-group-item list-group-item-action list-group-item-dark" id="${thisid}">${box.val()}<button type="button" class="close" aria-label="Close" id="c${thisid}"><span>&times;</span></button></li>`);
                            $(`#c${thisid}`).click(function() {
                                this.parentNode.parentNode.removeChild(this.parentNode);
                                var ggg = banReg.exec(this.id).groups
                                for(i in list[ggg.grp]) {
                                    if(list[ggg.grp][i] == parseInt(ggg.usr)) {
                                        list[ggg.grp].splice(i, 1);
                                        break;
                                    }
                                }
                            });
                        }
                        
                    });
                } else if (breg) {
                    i.addEventListener('click', function(event){
                        this.parentNode.parentNode.removeChild(this.parentNode);
                        var ggg = banReg.exec(this.id).groups
                        for(i in list[ggg.grp]) {
                            if(list[ggg.grp][i] == parseInt(ggg.usr)) {
                                list[ggg.grp].splice(i, 1);
                                break;
                            }
                        }
                    })
                } else if(rg.type == "addblb"){
                    i.addEventListener('click', function(event){
                        var gg = idReg.exec(this.id);
                        g = gg.groups;
                        var item = $(`#blblist${g.group}`);
                        var box = $(`#blb${g.group}`);
                        var dupl = false;
                        for (var c of item.children()) {
                            var br = blbReg.exec(c.id);
                            var bg = br.groups;
                            if (bg.usr == box.val()) {
                                dupl = true;
                                $(".modal-body").html(`<p>已经添加过这本书</p>`)
                                $("#warn").modal()
                                break;
                            }
                        }

                        var empty = false;
                        if (box.val().length == 0) {
                            empty = true;
                            $(".modal-body").html(`<p>请填入书号</p>`)
                            $("#warn").modal()
                        }
                        if(!dupl && !empty) {
                            var thisid = `bg${g.group}u${box.val()}`
                            blblist[g.group][blblist[g.group].length] = parseInt(box.val());
                            item.append(`<li class="list-group-item list-group-item-action list-group-item-dark" id="${thisid}">${box.val()}<button type="button" class="close" aria-label="Close" id="c${thisid}"><span>&times;</span></button></li>`);
                            $(`#c${thisid}`).click(function() {
                                this.parentNode.parentNode.removeChild(this.parentNode);
                                var ggg = blbReg.exec(this.id).groups
                                for(i in blblist[ggg.grp]) {
                                    if(blblist[ggg.grp][i] == parseInt(ggg.usr)) {
                                        blblist[ggg.grp].splice(i, 1);
                                        break;
                                    }
                                }
                            });
                        }
                        
                    });
                } else if (blbreg) {
                    i.addEventListener('click', function(event){
                        this.parentNode.parentNode.removeChild(this.parentNode);
                        var ggg = blbReg.exec(this.id).groups
                        for(i in blblist[ggg.grp]) {
                            if(blblist[ggg.grp][i] == parseInt(ggg.usr)) {
                                blblist[ggg.grp].splice(i, 1);
                                break;
                            }
                        }
                    })
                }
            }
        }


        var f = $("form")
        for(var i = 0; i < f.length; i++) {
            f[i].addEventListener('submit', function(event){
                event.preventDefault();
                var group = this.id;
                var iactCD = $(`#iactCD${this.id}`).val();
                var setuKey = $(`#setuKey${this.id}`).val();
                var setu = $(`#setu${this.id}`).prop("checked")? 1:0;
                var individualCD = $(`#individualCD${this.id}`).val();
                var groupCD = $(`#groupCD${this.id}`).val();
                var anti = $(`#anti${this.id}`).prop("checked")? 1:0;
                var seturecall = $(`#seturecall${this.id}`).prop("checked")? 1:0;
                var kouqiu = $(`#kouqiu${this.id}`).prop("checked")? 1:0;
                var repeat = $(`#repeat${this.id}`).prop("checked")? 1:0;
                var antirecall = $(`#antirecall${this.id}`).prop("checked")? 1:0;
                var ban = JSON.stringify(list[this.id]);
                var blb = JSON.stringify(blblist[this.id]);
                $.ajax({
                    url: url + '/update',
                    type: 'POST',
                    data: {
                        group: group,
                        iactCD: iactCD,
                        setuKey: setuKey,
                        setu: setu,
                        individualCD: individualCD,
                        groupCD, groupCD,
                        anti: anti,
                        seturecall: seturecall,
                        kouqiu: kouqiu,
                        repeat: repeat,
                        antirecall: antirecall,
                        ban: ban,
                        blb: blb
                    },
                    success: function (result) {
                        $(".modal-body").html(`<p>${result}</p>`)
                        $("#warn").modal()

                    },
                    error: function (result) {
                        $(".modal-body").html(`<p>${result.responseText}</p>`)
                        $("#warn").modal()
                    }
                });
            })
        }

    },
    error: function (result) {
        $(".modal-body").html(`<p>${result.responseText}</p>`)
        $("#warn").modal()
        setTimeout(() => {
            window.location.replace(`/users/login`);
        }, 1000);
    }
});


$("#logout").click( function() {
    window.location.replace(`/users/logout`);
})