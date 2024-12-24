fetch("app/topbar.html")
    .then(response => response.text())
    .then(data => {
        // Only after content is loaded, then initialize the window functionality
        document.getElementById("Topbar_Container").innerHTML = data;

        // Realtime Date And Time
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
        setInterval(dateTime(), 200)
    })
    .catch(error => console.error('Error loading introduction:', error));

