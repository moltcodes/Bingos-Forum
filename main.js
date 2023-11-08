let pageNumber = 1;
let totalPage = 20;
let id =  null;
let firstName;
let lastName;
let user;
var $x, $y, $z;
let userId;
let messageToDelete;
let postId;
let uid;
let reply;
let post_id;
let user_id;
let repPostId;

$(document).ready(function () {

    $x = $("#login");
    $y = $("#register");
    $z = $("#btn");

    $("#forum").hide();
    $("#hero").show();
    $("#update").hide();
    $("#deleteCard").hide();
    $("#deleteCardReply").hide();
    

    $("#loadMore").on("click", function () {
        totalPage += 10;
        loadNextPage();
    });

    $("#logoutButton").on("click", function () {
        $("#forum").hide();
        $("#hero").show();
    });;


    $("#sendReplyButton").on("click", function(){
        $("#update").show();
        $("#replyCard").css("filter", "blur(4px)");
        $(".replySection").html("");
        $.ajax({
            url: "http://hyeumine.com/forumReplyPost.php",
            method: "POST",
            data: {user_id: userId, 
                    post_id: postId, 
                    reply: $("#replyTextArea").val()},
            success: function(data) {
                console.log(data);
                $.ajax({
                    url: `http://hyeumine.com/forumGetPosts.php`,
                    method: "GET",
                    data: {
                        id: postId,
                    },
                    success: function (data) {
                        $("#update").hide();
                        $("#replyCard").css("filter", "none");
                        var obj = JSON.parse(data);
                        obj.forEach(element => {
                            console.log(element);
                            if(element.id === postId){
                                if(element.reply){
                                    element.reply.forEach(reply => {
                                        $('<div class="replySection"><div class="user-containerRep"><h3>' + reply.user + '</h3><button class="bttn deleteRep"><i class="fa fa-trash-o" style="font-size: 12px; font-weight: 100"></i></button></div><p style="display: none">' + reply.id + '</p><p style="font-size: xx-small">' + reply.date +'</p><br><p>' + reply.reply + '</p></div>').appendTo("#replyWrapper");
        
                                    });
                                }
                            }
                        });
                    }
                });

            }
        });
        $("#forum").css("filter", "none");
        $("#replyTextArea").val("");
    });

    $(document).on("click", ".bttn.deleteRep", function () {
        $("#update").show();
        $("#replyCard").css("filter", "blur(4px)");
        $("#deleteCardReply").show();
        $("#deleteCardReply").css("filter", "blur(4px)");

        const $reply = $(this).closest('.replySection');
        const $replyContent = $reply.clone();
        repPostId = $reply.find('p').first().text();
        console.log(postId);
        $replyContent.find('.bttn.deleteRep').remove();

        replyToDelete = $replyContent.html();

        $("#deleteCardReply .replyContent").html(replyToDelete);
        $("#replyCardDelete").show();
        $("#forum").css("filter", "blur(0.5px)");
        $("#deleteCardReply").css("filter", "none");
        $("#update").hide();
    });

    $(document).on("click", ".bttn.reply", function () {
        $("#update").show();
        $("#replyCard").css("filter", "blur(4px)");
        const $message = $(this).closest('.forumpost');
        const $messageContent = $message.clone();
        postId = $message.find('p').first().text();
        console.log(postId);
        $messageContent.find('.bttn.reply').remove();
        $messageContent.find('.bttn.delete').remove();

        messageToReply = $messageContent.html();

        $("#replyCard .message-content").html(messageToReply);
        $("#replyCard").show();
        $("#forum").css("filter", "blur(0.5px)");

        $.ajax({
            url: `http://hyeumine.com/forumGetPosts.php`,
            method: "GET",
            data: {
                id: postId,
            },
            success: function (data) {
                $("#update").hide();
                $("#replyCard").css("filter", "none");
                var obj = JSON.parse(data);
                obj.forEach(element => {
                    console.log(element);
                    if(element.id === postId){
                        if(element.reply){
                            element.reply.forEach(reply => {
                                $('<div class="replySection"><div class="user-containerRep"><h3>' + reply.user + '</h3><button class="bttn deleteRep"><i class="fa fa-trash-o" style="font-size: 12px; font-weight: 100"></i></button></div><p style="display: none">' + reply.id + '</p><p style="font-size: xx-small">'+ reply.date +'</p><br><p>' + reply.reply + '</p></div>').appendTo("#replyWrapper");

                            });
                        }
                    }
                });
            }
        });
        
    });

    $(document).on("click", ".bttn.delete", function () {
        const $message = $(this).closest('.forumpost');
        const $messageContent = $message.clone();
        postId = $message.find('p').first().text();
        console.log(postId);
        $messageContent.find('.bttn.reply').remove();
        $messageContent.find('.bttn.delete').remove();

        messageToDelete = $messageContent.html();

        $("#deleteCard .message-content").html(messageToDelete);
        $("#deleteCard").show();
        $("#forum").css("filter", "blur(0.5px)");
    });


    $("#closeReplyCard").on("click", function () {
        $("#replyCard").hide();
        $(".message-content").empty(); 
        $("#replyWrapper").empty(); 
        $("#forum").css("filter", "none");
    });


    $("#cancelButtonReply").on("click", function () {
        $("#deleteCardReply").hide();
        $("#replyCard").css("filter", "none");
      });

      $("#cancelButton").on("click", function () {
        $("#deleteCard").hide();
        $("#forum").css("filter", "none");
      });

      $("#deleteButtonReply").on("click", function () {
        $(".replySection").html("");
        $("#update").show();
        $("#deleteCardReply").css("filter", "blur(4px)");
        $.ajax({
            url: `http://hyeumine.com/forumDeleteReply.php`,
            method: "GET",
            data: {
                id: repPostId,
            },
            success: function(data){
                $.ajax({
                    url: `http://hyeumine.com/forumGetPosts.php`,
                    method: "GET",
                    data: {
                        id: postId,
                    },
                    success: function (data) {
                        $("#update").hide();
                        $("#deleteCardReply").hide();
                        $("#deleteCardReply").css("filter", "none");
                        $("#replyCard").css("filter", "none");
                        var obj = JSON.parse(data);
                        obj.forEach(element => {
                            console.log(element);
                            if(element.id === postId){
                                if(element.reply){
                                    element.reply.forEach(reply => {
                                        $('<div class="replySection"><div class="user-containerRep"><h3>' + reply.user + '</h3><button class="bttn deleteRep"><i class="fa fa-trash-o" style="font-size: 12px; font-weight: 100"></i></button></div><p style="display: none">' + reply.id + '</p><p style="font-size: xx-small">'+ reply.date +'</p><br><p>' + reply.reply + '</p></div>').appendTo("#replyWrapper");
        
                                    });
                                }
                            }
                        });
                    }
                });
            }
        })
      });
    
      $("#deleteButton").on("click", function () {
        pageNumber = 1;
        $("#postWrapper").html("");
        $("#hero").hide();
        $("#update").show();
        $.ajax({
            url: `http://hyeumine.com/forumDeletePost.php`,
            method: "GET",
            data: {
                id: postId
            },
            success: function (data) {
                $.ajax({
                    url:"http://hyeumine.com/forumGetPosts.php?page=1",
                    method:"POST",
                    success: (data)=>{
                        try{
                            if (pageNumber <= totalPage) {
                                $.ajax({
                                    url: `http://hyeumine.com/forumGetPosts.php?page=${pageNumber}`,
                                    method: "GET",
                                    data: {
                                        page: pageNumber,
                                    },
                                    success: function (data) {
                                        console.log(pageNumber);
                                        var obj = JSON.parse(data);
                                        obj.forEach(element => {
                                            var ctr = 0;
                                            console.log(element);
                                            if (element.user != '' && element.user != null && element.post != '' && element.post != null) {
                                                if (element.reply) {
                                                    ctr = element.reply.length;
                                                }
                                                $('<div class="forumpost"><div class="user-container"><h3>' + element.user + '</h3><button class="bttn delete"><i class="fa fa-trash-o" style="font-size:  12px;font-weight: 100"></i></button></div><p style = "display: none">' + element.id + '</p><p style="font-size: xx-small">' + element.date + '<br> Page ' + pageNumber + '</p><br><p>' + element.post + '<br><button class="bttn reply"><i class="fa fa-comment-o" style="font-size: 11px;font-weight: 100"></i>' + "   " + ctr + '</button></div>').appendTo("#postWrapper");
                                            }
                                        });
                                        pageNumber++;
                                        loadNextPage();
                                    }
                                });
                            }
                        $("#update").hide();
                        $("#hero").hide();
                        $("#forum").show();
                        }catch(e){
                        alert("Error occured when deleting");
                    }
                        
                    }
                })
            }
        });
        $("#deleteCard").hide();
        $("#forum").css("filter", "none");
      });

    $("#registerButton").on("click", function () {
        if($("#firstNameReg").val() != "" && $("#lastNameReg").val() != ""){
            event.preventDefault();
        }
        $.ajax({
            url: `http://hyeumine.com/forumCreateUser.php`,
            method: "POST",
            data: {
                username: $("#firstNameReg").val()+ $("#lastNameReg").val(),
            },
            success: function(data){
                var response = JSON.parse(data);
                if(response.username != ""){
                id = (JSON.parse(data)).id;
                username = (JSON.parse(data)).username;
                console.log(data);
                login();
                }else{
                    console.log("Unsuccessful");
                }
            }
        })
    });

    $("#logInButton").on("click", function (event) {
        if($("#firstNameLog").val() != "" && $("#lastNameLog").val() != ""){
            event.preventDefault();
        }
        $("#update").show();
        setTimeout(function () {
            $("#update").hide();
        }, 5000);
        $("#nameSection").text("Hello "+ $("#firstNameLog").val()+"!");
        $.ajax({
            url: `http://hyeumine.com/forumLogin.php`,
            method: "POST",
            data: {
                username: $("#firstNameLog").val() + $("#lastNameLog").val(),
            },
            success: function (data) {
                var response = JSON.parse(data);
                if (response.success && response.user.username != "" && response.user.id) {
                    userId = response.user.id; 
                    username = (JSON.parse(data)).username;
                    $("#forum").show();
                    $("#hero").hide();
                    $("#update").hide();
                } else {
                    $("#errorCard").show();
                    setTimeout(function () {
                        $("#errorCard").hide();
                    }, 5000);
                }
            }
        });
    });

    function loadNextPage() {
        if (pageNumber <= totalPage) {
            $.ajax({
                url: `http://hyeumine.com/forumGetPosts.php?page=${pageNumber}`,
                method: "GET",
                data: {
                    page: pageNumber,
                },
                success: function (data) {
                    console.log(pageNumber);
                    var obj = JSON.parse(data);
                    obj.forEach(element => {
                        var ctr = 0;

                        console.log(element);
                        if (element.user != '' && element.user != null && element.post != '' && element.post != null) {
                            if (element.reply) {
                                ctr = element.reply.length;
                            }
                            
                            $('<div class="forumpost"><div class="user-container"><h3>' + element.user + '</h3><button class="bttn delete"><i class="fa fa-trash-o" style="font-size:  12px;font-weight: 100"></i></button></div><p style = "display: none">' + element.id + '</p><p style="font-size: xx-small">' + element.date + '<br> Page ' + pageNumber + '</p><br><p>' + element.post + '<br><button class="bttn reply"><i class="fa fa-comment-o" style="font-size: 11px;font-weight: 100"></i>' + "   " + ctr + '</button></div>').appendTo("#postWrapper");
                        }
                    });

                    
                    pageNumber++;
                    loadNextPage();
                }
            });
        }
    }
    
    loadNextPage();


    $("#postIt").click(()=>{ 
    
        if($("#postMessage").val() != ""){
        pageNumber = 1;
        $("#postWrapper").html("");
        $("#postMessage").html("");
        $("#hero").hide();
        $("#update").show();
        obj = {id:userId, post:$("#postMessage").val()} 
                $.ajax({
                url:"http://hyeumine.com/forumNewPost.php",
                method:"POST",
                data: obj,
                success: (data)=>{
                    try{
                        if (pageNumber <= totalPage) {
                            $.ajax({
                                url: `http://hyeumine.com/forumGetPosts.php?page=${pageNumber}`,
                                method: "GET",
                                data: {
                                    page: pageNumber,
                                },
                                success: function (data) {
                                    console.log(pageNumber);
                                    var obj = JSON.parse(data);
                                    obj.forEach(element => {
                                        var ctr = 0;
                                        console.log(element);
                                        if (element.user != '' && element.user != null && element.post != '' && element.post != null) {
                                            if (element.reply) {
                                                ctr = element.reply.length;
                                                element.reply.forEach(reply => {
                                                    console.log(reply.user); 
                                                });
                                            }
                                            $('<div class="forumpost"><div class="user-container"><h3>' + element.user + '</h3><button class="bttn delete"><i class="fa fa-trash-o" style="font-size:  12px;font-weight: 100"></i></button></div><p style = "display: none">' + element.id + '</p><p style="font-size: xx-small">' + element.date + '<br> Page ' + pageNumber + '</p><br><p>' + element.post + '<br><button class="bttn reply"><i class="fa fa-comment-o" style="font-size: 11px;font-weight: 100"></i>' + "   " + ctr + '</button></div>').appendTo("#postWrapper");
                                        }
                                    });
                                    pageNumber++;
                                    loadNextPage();
                                }
                            });
                        }
                    $("#hero").hide();
                    $("#forum").show();
                    $("#update").hide();
                    }catch(e){
                    alert("Error occured when posting");
                }
                }
        });
        }else{
            console.log("HI");
            $("#errorCard2").show();
                setTimeout(function () {
                    $("#errorCard2").hide();
                }, 5000);
    }
    })
});

function register() {
    $x.css("left", "-400px");
    $y.css("left", "50px");
    $z.css("left", "110px");
}

function login() {
    $x.css("left", "50px");
    $y.css("left", "450px");
    $z.css("left", "0");
}
