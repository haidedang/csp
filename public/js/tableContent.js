var entry = [];
var tableContent;

document.addEventListener("DOMContentLoaded", function(){
    getDatafromServer();
});

function getDatafromServer(){
    $.ajax({
        type: "GET",
        url: "/csp",
        cache: false,
    }).done(function(data){

        entry = data;
        assignDataToRow(entry);

    })
};

function assignDataToRow(data){


    data.forEach(function(item){

        tableContent = document.getElementById('tableContent');
        var tr = document.createElement('tr');


        Object.entries(item).forEach(([key, value]) => {
            if (key =="_id") return true;
            var td = document.createElement('td');
            td.innerHTML = value;
            tr.append(td);
        });

        tableContent.append(tr);
    })
}

var button = document.getElementById("load");
button.addEventListener('click', function(e){
    e.preventDefault();
    tableContent.innerHTML= " ";
    getDatafromServer();
});
