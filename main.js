//getElementsByClassName liefert Array mit allen Klassen zurück
var elements = document.getElementsByClassName('saml-account'), i, len;
for(i = 0, len = elements.length; i < len; i++){
	//console.log(elements[i])
	elements[i].style.color = '#2C81B7';
	elements[i].id = "saml";


	
// Packe um jeden einzelnen Account ein li
	var wrapper = document.createElement('li');
	elements[i].parentNode.insertBefore(wrapper, elements[i]);
	wrapper.appendChild(elements[i]);
	

  if(elements[i].innerHTML.indexOf("cbc-") !== -1){
    elements[i].className = "saml-account filter all cbc"
    }

  else if (elements[i].innerHTML.indexOf("mgr-") !== -1) {
  	elements[i].className = "saml-account filter all mgr"
  }
   else if (elements[i].innerHTML.indexOf("rin-") !== -1) {
   	  if (elements[i].innerHTML.indexOf("tvnow-") !== -1){
   	  	 elements[i].className = "saml-account filter all tvnow"
   	  }
   	  else {
   	  	elements[i].className = "saml-account filter all rtli"
   	  }
  	
  }
   else if (elements[i].innerHTML.indexOf("ip-") !== -1) {
  	elements[i].className = "saml-account filter all ip"
  }
   else if (elements[i].innerHTML.indexOf("ntv-") !== -1) {
  	elements[i].className = "saml-account filter all ntv"
  }
}






//Verpacke alles in eine UL
var newChildNodes = document.getElementById("content").childNodes; 
var newElement = document.createElement('ul');

newElement.className = 'saml-ul';
newElement.id = 'saml-ul';        

for (var i = 0; i < newChildNodes.length;i++) {
    newElement.appendChild(newChildNodes.item(i));
    newChildNodes.item(0).parentNode.insertBefore(newElement, newChildNodes.item(i));
}







// Buttons anzeige
document.getElementById('content')
    .insertAdjacentHTML('beforebegin', '<button class="filter-button" data-filter="all">Alle </button> 								<button class="filter-button" data-filter="cbc">CBC </button>										<button class="filter-button" data-filter="tvnow">TVNow </button> 									<button class="filter-button" data-filter="rtli">RTLInterartive </button> 					    <button class="filter-button" data-filter="ip">IP </button> <button class="filter-button" data-filter="ntv">NTV </button> <button class="filter-button" data-filter="mgr">MGR </button>');
    
 document.getElementById('content')
    .insertAdjacentHTML('beforebegin', '<input  type="text" id="searchEntry" placeholder="Search"> <input type="submit" id="searchBtn" class="searchButton"/> <input type="text" id="myInput" onkeyup="searchFunction()" placeholder="Suche nach einer Rolle.." title="Type in a name">');





//Filter

        $(document).ready(function () {
            //declare a global variable
            var filterVal;
            //check if sessionStorage exists and if so, if there is a var called fillTerm
            //if not, set it to a default value (all)
            if (sessionStorage && sessionStorage.getItem("filTerm")) {
                filterVal = sessionStorage.getItem("filTerm");
            } else {
                filterVal = "all";
                sessionStorage.setItem("filTerm", filterVal);
            }

            //now let's attach some interaction to our buttons
            $(".filter-button").on("click", function () {
                //get the value for our filter
                filterVal = $(this).attr("data-filter");
                //store it in the session storage
                sessionStorage.setItem("filTerm", filterVal);
                console.log(sessionStorage);
                console.log(filterVal);
                //call our view update function
                updateView();
            });
            
            $("#searchBtn").on("click",function(){
                filterVal = $('#searchEntry').val();
                sessionStorage.setItem("filTerm", filterVal);
                updateView();
            });
            
            $("#searchEntry").on("keypress",function(e){
		            if (e.keyCode == 13) {
                  filterVal = $('#searchEntry').val();
                  sessionStorage.setItem("filTerm", filterVal);
                  updateView();
                }
            });

            //this is the function that manipulates the UI
            function updateView() {
                //default situation: all is visible
                if (!filterVal || filterVal === "all") {
                    $('.filter').show();
                }
                    //hide all and show filtered values
                else {
                    $(".filter").hide();
                    $('.filter').filter('.' + filterVal).show();
              
                    console.log("searchTerm");
                    console.log("filterVal");
                }
            };
            //update the view when the page loads
            updateView();

        });


//Ende filter

//Search function
function searchFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("saml-ul");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("div")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
