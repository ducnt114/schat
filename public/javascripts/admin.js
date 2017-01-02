/**
 * Created by ducnt114 on 1/1/17.
 */

var wsuri = "ws://104.199.239.43:9000/admin";
var sock = new WebSocket(wsuri);

sock.onopen = function () {
  console.log("connected to " + wsuri);
  // load subject list page by default
  loadSubjectListPage();
};

sock.onclose = function (e) {
  console.log("connection closed (" + e.code + ")");
};

sock.onmessage = function (msg) {
  console.log("message received: " + msg.data);
  var message = JSON.parse(msg.data);

  if (message['response']['code'] === 0) {
    // success code
    switch (message['type']) {
      case 'get_subject_list':
        // get list subject for manage
        updateSubjectListTable(message['data']);
        break;
      case 'get_user_list':
        updateUserListTable(message['data']);
        break;
    }
  }
};


function loadSubjectListPage() {
  $.get('/subject-manage', updateMainContent);
}

function loadUserListPage() {
  $.get('/user-manage', updateMainContent);
}

function loadUserReportPage() {
  $.get('/user-report', updateMainContent);
}

function updateSubjectListTable(data) {
  var tBody = document.getElementById('subjectManageId');
  for (var index in data) {
    var tr = document.createElement('tr');
    tr.setAttribute('role', 'row');
    if (index % 2 == 0) {
      tr.setAttribute('class', 'even');
    } else {
      tr.setAttribute('class', 'odd');
    }
    var colName = document.createElement('td');
    colName.appendChild(document.createTextNode(data[index]['name']));

    var colCreatedData = document.createElement('td');
    colCreatedData.appendChild(document.createTextNode(data[index]['created_date']));

    var colJoinedCount = document.createElement('td');
    colJoinedCount.appendChild(document.createTextNode(data[index]['joined_count']));

    var colMessageCount = document.createElement('td');
    colMessageCount.appendChild(document.createTextNode(data[index]['msg_count']));

    var colCurrentOnline = document.createElement('td');
    colCurrentOnline.appendChild(document.createTextNode(data[index]['current_online']));

    var colStatus = document.createElement('td');
    colStatus.appendChild(document.createTextNode(data[index]['status']));

    var colMenu = document.createElement('td');
    var edit = document.createElement('a');
    edit.setAttribute('href', '#');
    edit.setAttribute('onclick', '');
    edit.appendChild(document.createTextNode('Edit'));
    colMenu.appendChild(edit);

    tr.appendChild(colName);
    tr.appendChild(colCreatedData);
    tr.appendChild(colJoinedCount);
    tr.appendChild(colMessageCount);
    tr.appendChild(colCurrentOnline);
    tr.appendChild(colStatus);
    tr.appendChild(colMenu);

    tBody.appendChild(tr);
  }
}

function updateUserListTable(data) {
  var tBody = document.getElementById('userManageId');

  for (var index in data) {
    var tr = document.createElement('tr');
    tr.setAttribute('role', 'row');
    if (index % 2 == 0) {
      tr.setAttribute('class', 'even');
    } else {
      tr.setAttribute('class', 'odd');
    }
    var colEmail = document.createElement('td');
    colEmail.appendChild(document.createTextNode(data[index]['email']));

    var colDob = document.createElement('td');
    colDob.appendChild(document.createTextNode(data[index]['dob']));

    var colFbGG = document.createElement('td');
    colFbGG.appendChild(document.createTextNode(data[index]['fb'] + '/' + data[index]['gp']));

    var colLocation = document.createElement('td');
    colLocation.appendChild(document.createTextNode(data[index]['location']));

    var colGender = document.createElement('td');
    colGender.appendChild(document.createTextNode(data[index]['gender']));

    var colStatus = document.createElement('td');
    colStatus.appendChild(document.createTextNode(data[index]['status']));

    var colMenu = document.createElement('td');
    var edit = document.createElement('a');
    edit.setAttribute('href', '#');
    edit.setAttribute('onclick', '');
    edit.appendChild(document.createTextNode('Edit'));
    colMenu.appendChild(edit);

    tr.appendChild(colEmail);
    tr.appendChild(colDob);
    tr.appendChild(colFbGG);
    tr.appendChild(colLocation);
    tr.appendChild(colGender);
    tr.appendChild(colStatus);
    tr.appendChild(colMenu);

    tBody.appendChild(tr);
  }

}

function updateMainContent(data, status) {
  $('#mainContainer').empty();
  $('#mainContainer').html(data);
  $(window).trigger('resize');
}

function logout() {
  window.location = '/';
}