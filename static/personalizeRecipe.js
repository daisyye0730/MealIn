var home_url = "//127.0.0.1:5000"

$(document).ready(function () {
    $("#personalize_recipe").submit(function (event) {
        event.preventDefault()
        let switched_out_ingredient = $.trim($('#switched_out').val())
        let substitute_ingredient = $.trim($('#substitute').val())
        let meal = $.trim($('#mealName').val())
        $("#loader").append("<div class=\"loading style-2\"><div class=\"loading-wheel\"></div></div>")

        $.ajax({
            type: "POST",
            url: home_url + "/personalizeResult",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({ meal: meal, switched_ingredient: switched_out_ingredient, substitute: substitute_ingredient }),
            success: function (result) {
                window.location.href = home_url + "/personalizeResult"
            },
            error: function (request, status, error) {
                console.log("Error: " + request + status + error)
            }
        })
    })
})