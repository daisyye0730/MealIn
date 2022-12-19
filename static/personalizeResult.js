var home_url = "//127.0.0.1:5000"

$(document).ready(function () {
    $("#loader").empty()
    $('body').on('click', '.next_to_grocery_list', function (e) {
        $("#loader").append("<div class=\"loading style-2\"><div class=\"loading-wheel\"></div></div>")
        let meal = $(this).attr("id")
        $.ajax({
            type: "POST",
            url: home_url + "/generateGroceryList",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({ meal: meal }),
            success: function (result) {
                window.location.href = home_url + "/generateGroceryList"
            },
            error: function (request, status, error) {
                console.log("Error: " + request + status + error)
            }
        })
    })
})