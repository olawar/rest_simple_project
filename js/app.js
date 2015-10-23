var loadAllBooks = function(){
    $.ajax({
        url: "http://api.coderslab.pl/book",
        type: "GET",
        dataType: "json",
        success: function(json){
            $("#allBooks").empty();
            console.log("udalo sie");
            json.forEach(function(element, index, array){
                addBookOnPage(element);
            });
        },
        error: function(xhr, status, errorThrown) {
            console.log("nie udalo sie");
        }
    });
};

var addBookOnPage = function(bookData){
    console.log(bookData);
    var book = $("<div class='book' data-id='" + bookData.id + "'>" +
    "<h2>" + bookData.name + "</h2>" +
    "<p>" + bookData.autor + "</p>" +
    "<p>" + bookData.description + "</p>" + "<button id='one'>Remove</button>" + "<button id='two'>Reviews</button>" + "</div>");
    book.children().not("h2").hide();

    book.children("h2").click(function(event){
        $(this).siblings().not("h2").toggle();
    });
//getting reviews
    book.children("button#two").click(function(event){
        console.log("Im getting reviews");
        $.ajax({
            url: "http://api.coderslab.pl/book/" + $(this).parent().data().id + "/review",
            type: "GET",
            dataType: "json",
            success: function(json){
                console.log("udalo sie 2222");
                console.log(json);
                json.forEach(function(element, index, array){
                    console.log(element);
                    var revInfo = $("<div class='rev' data-id='" + element.id + "'>" + "<p>" + element.review + "</p>" + "<p>" + element.rating + "</p>" + "</div>");
                    revInfo.appendTo(book);
                        });
            },
            error: function(xhr, status, errorThrown) {
                console.log("nie udalo sie 2222");
            }
        });
    });

    book.children("button#one").click(function(event){
        console.log("Remove book of id " + $(this).parent().data().id);
        $.ajax({
            url: "http://api.coderslab.pl/book/" + $(this).parent().data().id,
            type: "DELETE",
            dataType: "json",
            success: function(json){
                console.log("udalo sie");
                loadAllBooks();
            },
            error: function(xhr, status, errorThrown){
                console.log("nie udalo sie");
            }
        });
    });

    $("#allBooks").append(book);
};

//var requestReviews = function(bookData){
//url: "http://api.coderslab.pl/book/ + $(this).parent().data().id + "/review/"
//
//
//}


$(document).ready(function(){

    loadAllBooks();


    $("#newBookForm").on("submit", function(){
        data = {};
        data.name = $("#nameInput").val();
        data.autor = $("#autorInput").val();
        data.description = $("#descriptionInput").val();
        console.log(JSON.stringify(data));

            $.ajax({
                url: "http://api.coderslab.pl/book",
                type: "POST",
                dataType: "json",
                data: JSON.stringify(data),
                success: function(json){
                    console.log("Udalo sie");
                    loadAllBooks();
                },
                error: function(xhr, status, errorThrown){
                    console.log("Nie udalo sie");
                },
                complete: function(xhr, status){
                }
            });
            return false;
    });






});