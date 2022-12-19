var home_url = "//127.0.0.1:5000"
count = 0
diet_descript_li = []

$(document).ready(function () {
    $(".new_input").empty()
    $('#diet_purpose').focus().get(0).setSelectionRange(0, 0)

    $('body').on('click', '.add_diet_restriction_btn', function (e) {
        count += 1
        $("#add_diet_restriction").append("<input type=\"text\" class=\"new_input diet_descript_input\" id=\"diet_description_" + count + "\"/>\
        <button class=\"btn btn_accent add_diet_restriction_btn\" value=\"update\" type=\"button\">+</button> <br/>")
    })

    $("#generate_ten_options").submit(function (event) {
        event.preventDefault()
        let purpose = $.trim($('#diet_purpose').val())
        for (let i = 0; i < count + 1; i++) {
            let diet_constraint = $.trim($('#diet_description_' + i).val())
            diet_descript_li.push(diet_constraint)
        }
        $("#loader").append("<div class=\"loading style-2\"><div class=\"loading-wheel\"></div></div>")

        $.ajax({
            type: "POST",
            url: home_url + "/generateTenOptionsResult",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({ diet_purpose: purpose, diet_descript_li: diet_descript_li }),
            success: function (result) {
                window.location.href = home_url + "/generateTenOptionsResult"
            },
            error: function (request, status, error) {
                console.log("Error: " + request + status + error)
            }
        })
    })
})