$("#iact").click(function() {
    $("#description").empty();
    $("#description").append("<p>每天必须签到之后才能开始互动。</p>"+
    "<p>签到有两种方式： <strong>@小白 摸摸</strong>或者<strong>摸摸小白</strong>（当然这个用艾特也行）。</p>"+
    "<p><strong style=\"color: red;\">建议直接喊小白而不是艾特。有时候会因为一些未知的BUG无法通过艾特互动。</strong></p>"+
    "<p>小白的互动是有CD的，不同的群组会有不同的设置，在10秒至2分钟之间。</p>"+
    "<p>然后，是关于小白的互动方式。</p>"+
    "<p>目前有三种互动方式：</p>"+
    "<p>第一种，是直接艾特（@）</p>"+
    "<p>艾特小白，然后跟着以下列表的互动。</p>"+
    "<p>比如：<strong>@小白 摸摸头</strong></p>"+
    "<p>第二种，是在句子中含有小白。</p>"+
    "<p>比如：小白摸摸头，会触发摸头的互动。</p>"+
    "<p>第三种：先叫一下小白，然后再发送互动的关键词。</p>"+
    "<p>比如：小白   接着，小白会问你叫她有什么事，接着在10秒之内摸摸头，就能触发互动</p>"+
    "<p>现有好感系统和心情系统。所有的互动当中，摸头和抱这两个互动是必定不会降低好感和心情的。</p>"+
    "<p>其他的互动，会根据心情和好感度的不同，对应地增加或者减少心情或者好感，或者保持不变。</p>"+
    "<p>现在已经应用的互动：抱抱、戳戳、揉耳朵、摸头、揉肚子、举高高、壁咚、摸胸、脱胖次、膝枕、挠下巴、挠痒痒、亲亲、摸尾巴。</p>"+
    "<p>还有其他一部分不影响心情和好感的互动，比如：早上好、晚安</p>"+
    "<p>新增请求禁言功能。</p>"+
    "<p>在小白是群管理的情况下，群员发送：小白给我1分钟的禁言套餐，小白会禁言你。其中1可以替换成其他正整数，分钟可以替换成小时，小白可以替换成@小白，或者第三种互动方式。</p>"+
    "<p>当然，如果你比较抖M的话，发送  小白给我戴24小时的口球   也是可以的</p>")
});

$("#setu").click(function() {
    $("#description").empty();
    $("#description").append("<p>想要让小白发送色图，需要管理员开启色图功能。</p>"+
    "<p>开启之后，可以通过关键词+冲冲冲，或者关键词+gkd来让小白发送色图。</p>"+
    "<p>比如：萝莉冲冲冲。当然，不带关键词直接冲冲冲也是可以的。</p>"+
    "<p>还有一种三连冲，可以让小白一次性发送三张色图。</p>"+
    "<p>色图功能有CD，不同的群组设置不同。</p>"+
    "<p>如果群组没开反和谐的话，很有可能会被TX给屏蔽掉。所以不要问图呢。就算被屏蔽掉了，小白也会吧PIXIV相对应的作者和pid发出来，可以自行查询。</p>"
    )
});

$("#repeat").click(function() {
    $("#description").empty();
    $("#description").append("<p>小白是个复读姬。</p>"+
    "<p>管理员可以选择关闭这个功能。</p>"+
    "<p>群聊的时候，有低概率小白会复读。</p>"+
    "<p>当其他群员化身复读机时，小白会概率打断复读，或者跟随复读，或者禁言第三个复读的人。</p>"
    )
});

$("#antirecall").click(function() {
    $("#description").empty();
    $("#description").append("<p>小白会防撤回。</p>"+
    "<p>管理员可以选择关闭这个功能。</p>"+
    "<p>小白会复读发送者自己撤回的消息，并且在一段时间之后撤回。</p>"
    )
});

$("#improve").click(function() {
    $("#description").empty();
    $("#description").append("<p>有什么改善建议的话，可以发到我的邮箱：495488027@qq.com</p>"+
    "<p>我不会回复，不过如果是我觉得可以，并且是我能力能够办到的建议的话，我会添加的。</p>"+
    "<p>如果是关于新的互动指令的建议的话，请包含以下内容：</p>" +
    "<p>指令的类型，如：摸头，揉耳朵</p>"+
    "<p>指令的具体互动内容，分为低中高三种心情，每种心情的低好感有一种回复，中好感有两种回复，高好感有三种回复。也就是一个互动总共有18种回复。</p>"+
    "<p>太过涩情的互动我是不会加的。</p>"

    )
});

$("#group").click(function() {
    $("#description").empty();
    $("#description").append("<p>小白的群：<strong>296043951</strong></p>"+
    "<button type=\"button\" class=\"btn btn-success btn-lg\" onclick=\"window.open(\'https://jq.qq.com/?_wv=1027&k=BvT6bjDt\')\">点击加群</button>"
    )
    $.ajax({
        url: `/search/296043951`,
        type:"GET",
        success: function(result) {
            $("#result").empty();
            $("#result").append(result);
        }
    })
});

const selectElement = document.querySelector('#search');

selectElement.addEventListener('change', (event) => {
    var group = document.getElementById("search").value
    if(group){
        $.ajax({
            url: `/search/${group}`,
            type:"GET",
            success: function(result) {
                $("#result").empty();
                $("#result").append(result);
            }
        })
    }
});

$.ajax({
    url: `/freq`,
    type:"GET",
    success: function(result) {
        $("#freq").text('小白每分钟互动' + parseFloat(result).toFixed(4) + '次');
    }
})
setInterval(() => {
    $.ajax({
        url: `/freq`,
        type:"GET",
        success: function(result) {
            $("#freq").text('小白每分钟互动' + parseFloat(result).toFixed(4) + '次');
        }
    })
}, 10000);