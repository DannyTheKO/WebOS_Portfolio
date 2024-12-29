export function initializeTopbar() {
    return fetch("../../app/topbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("Topbar_Container").innerHTML = data;
            initializeDateTime();
        })
        .catch(error => console.error('Error loading topbar:', error));
}
function initializeDateTime() {
    function dateTime() {
        var date = new Date();
        var formattedDateTime = date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        }).replace(',', ' |');

        formattedDateTime = `[ ${formattedDateTime} ]`;

        var textTime = document.querySelector("#dateTime");
        textTime.innerHTML = formattedDateTime.toUpperCase();
    }
    // Set update time
    setInterval(dateTime, 1000);
}