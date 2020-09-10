$.ajax({
    url: '/users/admin',
    type: 'POST',
    success: function (result) {
        window.location.replace(`/users/admin/${result}`);
    },
    error: function(result) {
        window.location.replace(`/users/login`);
    }
})
