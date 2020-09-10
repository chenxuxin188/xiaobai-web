$("form").submit(function (event) {
    event.preventDefault();
    var u = $("#username").val();
    var p = $("#password").val();
    $.ajax({
        url: `/users/login`,
        type:"POST",
        data: {
            username: u,
            password: p
        },
        success: function(result) {
            console.log(result)
            $(".modal-body").html(`<p>${result}</p>`)
            $("#warn").modal()
            setTimeout(() => {
                window.location.replace('/users/admin');
            }, 1000);
        },
        error: function(result) {
            console.log(result)
            $(".modal-body").html(`<p>${result.responseText}</p>`)
            $("#warn").modal()
        }
    })
})