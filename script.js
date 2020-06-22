
document.getElementById("search-box").addEventListener("keyup", function(){

    var input, filter, found, table, tr, td, i, j;
    input = document.getElementById("search-box");
    filter = input.value.toUpperCase();
    table = document.getElementById("table-data");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        for (j = 0; j < td.length; j++) {
            if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                found = true;
            }
        }
        if (found) {
            tr[i].style.display = "";
            found = false;
        } else {
            tr[i].style.display = "none";
        }
    }
});

$(document).ready(function() {
    var url = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';

    $.get(url, function(response) {
        var data = response
        var table = $("tbody")
        var active = ""
        var previousActive
        
        for(var i=0; i<data.length; i++) {
            var tableRow = $('<tr>')
            tableRow.addClass('data-row')

            var id = $('<td>')
            id.text(data[i].id)
            id.addClass('column1')

            var firstName = $('<td>')
            firstName.text(data[i].firstName)
            firstName.addClass('column2')

            var lastName = $('<td>')
            lastName.text(data[i].lastName)
            lastName.addClass('column3')

            var email = $('<td>')
            email.text(data[i].email)
            email.addClass('column4')

            var phone = $('<td>')
            phone.text(data[i].phone)
            phone.addClass('column5')

            tableRow.append(id, firstName, lastName, email, phone)
            tableRow.click(function(e) {
                if(previousActive === undefined) {
                    previousActive = $(this)
                } else {
                    previousActive.removeClass('active')
                }
                active = $(this)
                previousActive = active
                active.addClass('active')

                function extractNum(str) {
                    return parseInt(str.replace(/[^0-9]/gi, ''))
                }
                
                var userId = extractNum(active.text().substr(0,5))

                var dataobj

                for(var k=0; k<data.length; k++) {
                    if(data[k].id === userId) {
                        dataobj = data[k]
                    }
                }

                var detailsContainer = $('#info-content')
                detailsContainer.css('display', 'block')
                detailsContainer.html('')

                var selectedUser = $('<div>')
                var boldDesc = $('<b>')
                boldDesc.text("User selectd:")
                selectedUser.append(boldDesc, dataobj.firstName + " " + dataobj.lastName)

                var descContainer = $('<div>')

                var descHeading = $('<b>')
                descHeading.text("Description: ")

                var description = $('<textarea>')
                description.attr("cols", 50)
                description.attr("rows", 5)
                description.attr("readonly")
                description.text(dataobj.description)
                descContainer.append(descHeading, description)
                
                var address = $('<div>')
                var line1Heading = $('<b>')
                line1Heading.text("Address: ")
                address.append(line1Heading, dataobj.address.streetAddress)

                var city = $('<div>')
                var line2Heading = $('<b>')
                line2Heading.text("City: ")
                city.append(line2Heading, dataobj.address.city)

                var state = $('<div>')
                var line3Heading = $('<b>')
                line3Heading.text("State: ")
                state.append(line3Heading, dataobj.address.state)

                var zip = $('<div>')
                var line4Heading = $('<b>')
                line4Heading.text("Zip: ")
                zip.append(line4Heading, dataobj.address.zip)

                detailsContainer.append(selectedUser, descContainer, address, city, state, zip)
                
            })

            table.append(tableRow)

        }


    })
})

