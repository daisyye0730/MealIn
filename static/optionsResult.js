var home_url = "//127.0.0.1:5000"

$(document).ready(function () {
    $("#loader").empty()
    $('body').on('click', '.description', function (e) {
        let description = $(this).attr("value")
        $("#loader").append("<div class=\"loading style-2\"><div class=\"loading-wheel\"></div></div>")
        $.ajax({
            type: "POST",
            url: home_url + "/showDescription",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({ meal: description }),
            success: function (result) {
                window.location.href = home_url + "/showDescription"
            },
            error: function (request, status, error) {
                console.log("Error: " + request + status + error)
            }
        })
    })

    $('body').on('click', '.nutrition', function (e) {
        let nutrition = $(this).attr("value")
        $("#loader").append("<div class=\"loading style-2\"><div class=\"loading-wheel\"></div></div>")
        $.ajax({
            type: "POST",
            url: home_url + "/showNutrition",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({ meal: nutrition }),
            success: function (result) {
                window.location.href = home_url + "/showNutrition"
            },
            error: function (request, status, error) {
                console.log("Error: " + request + status + error)
            }
        })
    })

    $('body').on('click', '.liked', function (e) {
        let meal = $(this).attr("value")
        console.log(meal)
        $("#loader").append("<div class=\"loading style-2\"><div class=\"loading-wheel\"></div></div>")
        $.ajax({
            type: "POST",
            url: home_url + "/personalizeRecipe",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({ meal: meal }),
            success: function (result) {
                window.location.href = home_url + "/personalizeRecipe"
            },
            error: function (request, status, error) {
                console.log("Error: " + request + status + error)
            }
        })
    })
})