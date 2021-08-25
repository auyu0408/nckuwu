var card = document.getElementById('card');
var title = document.getElementById('Co_no');
var url = location.search;
var temp = url.split("=");
var requestURL = "file_simulate/" + temp[1] + "/" + "course.json";
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function(){
    var Data = request.response;
    ShowCourse(Data);
    showDetail(Data);
}
function ShowCourse(Datajson){
    var Course = document.createElement('h3');
    Course.innerHTML = ' &nbsp;&nbsp;'+ Datajson[0].Co_no;
    title.appendChild(Course);
}
function showDetail(Datajson){
    var Detail = Datajson[0].Course
    for (i=0; i<Detail.length; i++){
        var Col = document.createElement('div');
        var Card = document.createElement('div');
        var Body = document.createElement('div');
        var Title = document.createElement('h5');
        var Teacher = document.createElement('p');
        var Class = document.createElement('p');
        Col.className = "col";
        Card.className = "card";
        Body.className = "card-body";
        Title.className = "card-title";
        Title.innerHTML = "開課學年: " + Detail[i].Year_sem;
        Teacher.innerHTML = "課程名稱: " + Detail[i].Name + '<br>' + "授課教師: " + Detail[i].Teacher;
        var Class_code = Detail[i].Class_code;
        for (j=0; j<Class_code.length; j++){
            var smol_class = document.createElement('a');
            smol_class.href = "detail.html?co_no=" + Datajson[0].Co_no + "&year_sem=" + Detail[i].Year_sem + "/" + Class_code[j];
            smol_class.innerHTML = "分班: " + Class_code[j] + ' &nbsp;';
            smol_class.style = "text-decoration:none;"
            Class.appendChild(smol_class);
        }
        Body.appendChild(Title);
        Body.appendChild(Teacher);
        Body.appendChild(Class);
        Card.appendChild(Body);
        Col.appendChild(Card);   
        card.appendChild(Col)
    }
}