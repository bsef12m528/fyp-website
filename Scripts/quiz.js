
function reserRadioChecks() {
    document.getElementById("radio1").checked = false;
    document.getElementById("radio2").checked = false;
    document.getElementById("radio3").checked = false;
}


//defining class for quiz questions
function Question(Id, Statement) {
    this.QuestionId = Id;
    this.Statement = Statement;
    this.AttemptedAnswer = null;
}




function previous_click() {

}

function next_click() {
    var answer = $('input[name=option]:checked').val();
    if ($("input[name='option']").is(':checked')) {
        arr[current].AttemptedAnswer = answer;
        current++;

        $("#errorDiv").hide();
        $("#quiz-container").hide();
        reserRadioChecks();
        update_question();
        update_progressBar();
        $("#quiz-container").fadeIn(1000);
    }
    else {
        $("#errorDiv").fadeIn(500);
        return;
    }
}

function update_progressBar() {
    var x = document.getElementById("completeness");
    x.innerHTML = (current) + "/" + (arr.length) + " <label  style='font-size:16px; color:green'>Attempted</label> ";


    var y = (current) / arr.length * 100;

    $('#progress-bar').css('width', y + '%').attr('aria-valuenow', y);
    if (current == arr.length - 1) {
        $("#finish-button").show();
        $("#next-button").hide();
    }

}

function update_question() {
    $("#question").html((current + 1) + ". " + arr[current].Statement);
}



// ---- Implementation after finishing result  ----//
function radio_change_event() {
    $('input:radio[name="option"]').change(function () {
        //$("#errorDiv").fadeIn(500);

        if ($("#errorDiv").is(':visible')) {
            $("#errorDiv").fadeOut(200);
        }

    });
}



$("#finish-button").button().click(function () {
    var answer = $('input[name=option]:checked').val();
    if ($("input[name='option']").is(':checked')) {
        arr[current].AttemptedAnswer = answer;
        generate_results();
    }
    else {
        $("#errorDiv").fadeIn(500);
        return;
    }
});



function generate_results() {
    $.ajax({
        type: 'POST',
        url: '/Questionnaire/GetAttemptedQuiz/',
        //contentType: "application/json; charset=utf-8",
        data: { questions: JSON.stringify(arr) },
        //dataType: "json",
        success: function (data, status) {
            if (data == "success") {
                window.location = "/Report/PersonalitySummary";
            }
            else {
                alert(data);
            }
        },
        error: function (xhr, status, error) {
            alert(xhr.responseText);
        }
    });
}





//var c = [{\"Id\":1,\"Statement\":\"I like to work with animals, tools, or machines.\"},{\"Id\":2,\"Statement\":\"Compared to others my age, I have good skills working with tools, mechanical drawings, machines, or animals.\"},{\"Id\":3,\"Statement\":\"I am athletic, play a sport, and like to be physically active.\"},{\"Id\":4,\"Statement\":\"I value practical things you can see or touch like plants and animals you can grow, or things you can build or make better.\"},{\"Id\":5,\"Statement\":\"I love nature and like to work outdoors; my hobbies include landscaping and growing plants/flowers\"},{\"Id\":6,\"Statement\":\"I am practical, mechanical, and realistic.\"},{\"Id\":7,\"Statement\":\"I like to study and solve math or science problems.\"},{\"Id\":8,\"Statement\":\"I am good at understanding and solving science and math problems, compared to others my age.\"},{\"Id\":9,\"Statement\":\"I enjoy crossword puzzles and board games.\"},{\"Id\":10,\"Statement\":\"I value science and understand scientific theories.\"},{\"Id\":11,\"Statement\":\"I am interested in preserving endangered species.\"},{\"Id\":12,\"Statement\":\"I am precise, scientific, and intellectual.\"},{\"Id\":13,\"Statement\":\"I like to do creative activities like art, drama, crafts, dance, music, or creative writing\"},{\"Id\":14,\"Statement\":\"Compared to others my age, I have good artistic abilities – in creative writing, drama, crafts, music, or art.\"},{\"Id\":15,\"Statement\":\"I value the creative arts – like drama, music, art, or the works of creative writers.\"},{\"Id\":16,\"Statement\":\"I am artistic, imaginative, original, impulsive, and independent.\"},{\"Id\":17,\"Statement\":\"I like to work on crafts and take photographs.\"},{\"Id\":18,\"Statement\":\"I can play a musical instrument and enjoy performing in front of people.\"},{\"Id\":19,\"Statement\":\"I like to do things where I can help people: like teaching, first aid, or giving information.\"},{\"Id\":20,\"Statement\":\"Compared to persons my age, I am good at teaching, counseling, nursing, or giving information.\"},{\"Id\":21,\"Statement\":\"I express myself clearly and can lead a group discussion.\"},{\"Id\":22,\"Statement\":\"I like to do volunteer work and religious activities.\"},{\"Id\":23,\"Statement\":\"I value helping people and solving social problems.\"},{\"Id\":24,\"Statement\":\"I am helpful, friendly, and trustworthy.\"},{\"Id\":25,\"Statement\":\"I like to lead and persuade people, and to sell things or ideas.\"},{\"Id\":26,\"Statement\":\"Compared to persons my age, I am good at leading people and selling things or ideas.\"},{\"Id\":27,\"Statement\":\"I would like to start my own business and meet important people.\"},{\"Id\":28,\"Statement\":\"I value success in politics, leadership, or business.\"},{\"Id\":29,\"Statement\":\"I enjoy watching the stock market and reading business journals.\"},{\"Id\":30,\"Statement\":\"I am energetic, self-confident, ambitious, and sociable.\"},{\"Id\":31,\"Statement\":\"I keep accurate records and like to be responsible for details.\"},{\"Id\":32,\"Statement\":\"I like to work with numbers, records, or machines in a set, orderly way.\"},{\"Id\":33,\"Statement\":\"Compared to persons my age, I am good at working with written records and numbers in a systematic, orderly way.\"},{\"Id\":34,\"Statement\":\"My hobbies include writing family history and genealogy.\"},{\"Id\":35,\"Statement\":\"I value success in business and can write effective business letters.\"},{\"Id\":36,\"Statement\":\"I am orderly and work well within a system.\"}];
