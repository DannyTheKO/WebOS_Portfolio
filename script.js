// Realtime Date And Time
function dateTime() {
    var date = new Date();
    var formattedDateTime = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }).replace(',', ' |');
    
    var textTime = document.querySelector("#dateTime");
    textTime.innerHTML = formattedDateTime.toUpperCase();
}

setInterval(dateTime, 1000);