/**
 * Created by ducnt114 on 12/18/16.
 */

$('#ogffDatepicker').datepicker();

function createOutgoingFindFriend() {
  var lastChatTime = $('#ogffDatepicker').val();
  var nameOfDest = $('#ogffNameId').val();
  var destLocation = $('#ogffPlaceId').val();
  var content = $('#ogffContentId').val();

  var data = {
    "type": "find_friend",
    "data": {
      "token": sessionStorage.token,
      "last_chat": new Date(lastChatTime).getMilliseconds(),
      "name_of_dest": nameOfDest,
      "dest_location": destLocation,
      "content": content
    }
  };
  var payload = JSON.stringify(data);
  sock.send(payload);
}