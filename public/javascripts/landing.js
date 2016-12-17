/**
 * Created by ducnt114 on 12/18/16.
 */


function newSubjectChat(subjectName){
  var url = '/new-subject-chat/' + subjectName;
  $.get(url, function callBack(data, status){
    $('#mainContainer').empty();
    $('#mainContainer').html(data);

    setTimeout(function(){

    }, 5000);

  });
}