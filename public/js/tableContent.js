let entry = [];
let tableContent = document.getElementById('tableContent');
let index= 0;
let buttonRight= document.getElementById("right");
let buttonLeft= document.getElementById("left");
let chunkSize = 5;

document.addEventListener("DOMContentLoaded", () => {
    getDataFromServer();
});

function getDataFromServer(){
    $.ajax({
        type: "GET",
        url: "/csp",
        cache: false,
    }).done( (data) => {

        entry = data;
        assignDataToRow(entry);
    })
};

function assignDataToRow(data){

    data.forEach( (item) => {

        let tr = document.createElement('tr');

        Object.entries(item).forEach(([key, value]) => {
            if (key =="_id") return true;
            if(key=="__v") return true;

                let td = document.createElement('td');
                td.innerHTML = value;
                tr.append(td);
        });

        tableContent.append(tr);
        show(index, chunkSize);
    })

}

function chunk (arr, len) {

    let chunks = [],
        i = 0,
        n = arr.length;

    while (i < n) {
        chunks.push(arr.slice(i, i += len));
    }

    return chunks;
}


//Select option doesnt work properly yet!!

let limit = document.getElementById('limit');
limit.addEventListener('change', function(){
    chunkSize = this.value;
    show(index, this.value);
});


function show(index, chSize) {

    console.log(chSize);

    let rows = Array.from(tableContent.childNodes).splice(1);  // push all rows into an array

    let arr = chunk (rows, chSize); // split array into array groups size of chunk size

    arr.forEach((ch)=> {
        // ch[0].style.display='none';
        ch.forEach((e) => {
            e.style.display = 'table-row';
        });
    });
    let shownArr = arr.splice(index, 1);

    arr.forEach((ch)=> {
        ch.forEach((e) => {
            e.style.display = 'none';
        });
    });
}


buttonRight.addEventListener("click", (e)=> {
    e.preventDefault();
    index = index +1 ;
    show(index, chunkSize);
});

buttonLeft.addEventListener("click", (e)=> {
    e.preventDefault();
    index = index - 1 ;
    show(index, chunkSize) ;
});


let button = document.getElementById("load");
button.addEventListener('click', (e) => {
    e.preventDefault();
    tableContent.innerHTML= " ";
    getDataFromServer();
});


$("#searchField").submit( (event) => {


    let url = "/test";

    $.ajax({
        type:"POST",
        url: url,
        data: $("#searchField").serialize(),
            success: (data) => {
            console.log(data);
            tableContent.innerHTML= " ";
            entry = data;
            assignDataToRow(data);
        }
    });

    event.preventDefault();
});

//@TODO frontend aufpeppen, READme.MD, Code refactoring, SELECT FIELD, AdminLTE
