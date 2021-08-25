var card = document.getElementById('card');
var url = location.search;
var file_temp = Separate(url);
var requestURL = "file_simulate/" + file_temp.co_no + "/" + file_temp.year + "/data.json";
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function(){
    var Data = request.response;
    showDetail(Data);
}
function showDetail(Datajson){
    var Body = document.createElement('div');
    var Co_no = document.createElement('h4');
    var Year_sem = document.createElement('h5');
    var Name = document.createElement('p');
    var File = document.createElement('div');
    Body.className = "card-body";
    Co_no.innerHTML = Datajson[0].Co_no;
    Year_sem.innerHTML = "開課學年: " + Datajson[0].Year_sem;
    Name.innerHTML = "課程名稱: " + Datajson[0].Name + '<br>' + "授課教師: " + Datajson[0].Teacher + '<br>'+ "開課系所: " + Datajson[0].Department;
    File.className = "d-md-block";
    var All_file = Datajson[0].file[file_temp.class_num];
    
    for (j=0; j<All_file.length; j++){
        var smol_file = document.createElement('a');
        smol_file.href = "https://github.com/auyu0408/schoolWorks/tree/main/" + Datajson[0].Co_no + "/" + Datajson[0].Year_sem + "/";
        smol_file.innerHTML = All_file[j];
        smol_file.style = "text-decoration:none;"
        smol_file.className = "col-3 m-2 btn btn-light";
        File.appendChild(smol_file);
    }
    Body.appendChild(Co_no);
    Body.appendChild(Year_sem);
    Body.appendChild(Name);
    Body.appendChild(File);
    card.appendChild(Body)
}
function Separate(url){
    var temp1 = url.split("=");
    var temp2 = temp1[1].split("&");
    var temp3 = temp1[2].split("/");
    var file_name = {'co_no': temp2[0], 'year': temp3[0], 'class_num': temp3[1]};
    return file_name;
}