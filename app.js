
$(document).ready(function() {

var foodPanel = $(".food");
var gridStart = $(".start")

var selectionArray = []

function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();


gridStart.on("click", function() {
    var selection = $(this).attr("data")
    var img = $(this).attr("src")

    var foodArea = $("<div class='col-md-4 wrap second'><img data='"+selection+"' src='"+img+"' style='heigh: 50px; width: 50px'><div class='middle'><div class='text'>X</div></div></div>");

        // foodArea.addClass("second");

        // foodArea.text($(this).attr("data"));

        foodPanel.append(foodArea);


    // console.log(selection)


    selectionArray.push(selection)

    console.log(selectionArray)



})

function removeItem() {
    
    var selection = $(this).attr("data")
    
   

        var index = selectionArray.indexOf(selection)
        console.log(index)

        selectionArray.splice(index, 1)
        console.log(selectionArray)
       $(this).remove()
}

console.log(selectionArray)

$(document).on("click", ".second", removeItem)

})