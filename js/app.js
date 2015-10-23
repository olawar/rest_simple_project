var loadAllBooks = function(){
    $.ajax({
        url: "http://api.coderslab.pl/book",
        type: "GET",
        dataType: "json",
        success: function(json){
            console.log("udalo sie");
        },
        error: function(xhr, status, errorThrown) {
            console.log("udalo sie");
        }
    });
};


$(document).ready(function(){

    loadAllBooks();






});