// add new classNames for search and filter
// wrap every element in an <ul> element
//check for read-only accounts and give them special class

var elements = document.getElementsByClassName('saml-account'), len;
var i = 0;
while (i < elements.length){
//console.log(i);
//console.log(  $(elements[i]).children().hasClass("saml-role")  );



	elements[i].style.color = '#2C81B7';

  if(elements[i].innerHTML.indexOf("cbc-") !== -1){

    elements[i].className = "saml-account filter all cbc"

          if(elements[i].innerHTML.indexOf("readonly") !== -1){
      $(elements[i].children[2].children[1]).wrap('<div class="saml-account filter all cbc readonly">  </div>')

      }
    }

  else if (elements[i].innerHTML.indexOf("mgr-") !== -1) {
  	elements[i].className = "saml-account filter all mgr"

  	      if(elements[i].innerHTML.indexOf("readonly") !== -1){
      $(elements[i].children[2].children[1]).wrap('<div class="saml-account filter all mgr readonly">  </div>')
      }
    }

  else if (elements[i].innerHTML.indexOf("rtli-") !== -1) {
   	  	elements[i].className = "saml-account filter all rtli"

   	  	  if(elements[i].innerHTML.indexOf("readonly") !== -1){
      $(elements[i].children[2].children[1]).wrap('<div class="saml-account filter all rtli readonly">  </div>')
      }
   	}

   else if (elements[i].innerHTML.indexOf("rin-") !== -1) {
   	  if (elements[i].innerHTML.indexOf("tvnow-") !== -1){

   	  	 elements[i].className = "saml-account filter all tvnow"

   	  	if(elements[i].innerHTML.indexOf("readonly") !== -1){
      $(elements[i].children[2].children[1]).wrap('<div class="saml-account filter all tvnow readonly">  </div>')
      }
   	  }
   	   else {
   	  	elements[i].className = "saml-account filter all rtli"

   	  	if(elements[i].innerHTML.indexOf("readonly") !== -1){
      $(elements[i].children[2].children[1]).wrap('<div class="saml-account filter all rtli readonly">  </div>')
      }

   	  }

  }
   else if (elements[i].innerHTML.indexOf("ip-") !== -1) {
  	elements[i].className = "saml-account filter all ip"

        if(elements[i].innerHTML.indexOf("readonly") !== -1){
      $(elements[i].children[2].children[1]).wrap('<div class="saml-account filter all ip readonly">  </div>')
      }

  }
   else if (elements[i].innerHTML.indexOf("ntv-") !== -1) {

  	elements[i].className = "saml-account filter all ntv"

  	  if(elements[i].innerHTML.indexOf("readonly") !== -1){
      $(elements[i].children[2].children[1]).wrap('<div class="saml-account filter all ntv readonly">  </div>')
      }

  }

//  wrap all elements in a list
  if(elements[i].classList.contains("filter")){

  	var wrapper = document.createElement('li');
	elements[i].parentNode.insertBefore(wrapper, elements[i]);
	wrapper.appendChild(elements[i]);

  }
i++;
}

// Wrap all li in one ul
$("li").wrapAll("<ul id='saml-ul'></ul>");

//Remove fieldset
var element = document.getElementsByTagName("fieldset")[0];
var fragment = document.createDocumentFragment();
while(element.firstChild) {
    fragment.appendChild(element.firstChild);
}
element.parentNode.replaceChild(fragment, element);



// Replace Name
var elements2 = document.getElementsByClassName('saml-account-name'), len;
var elements3 = document.getElementsByClassName('saml-role-description'), len;
var j = 0, k= 0;
while (j < elements3.length){

    if (elements3[j].innerHTML.indexOf("admin") !== -1 ) {
        console.log(elements3[j].innerHTML)
        //console.log(elements3[j+1].innerHTML)

        if (elements3[j+1] !== undefined && elements3[j+1].innerHTML.indexOf("readonly") !== -1) {
            var account_name_a = elements2[k].textContent;
            account_name_a = account_name_a.split(' ').slice(1).join(' ');
            account_name_a = toCamelCase(account_name_a);
            elements3[j].textContent = account_name_a;
            elements3[j+1].textContent = account_name_a + " ReadOnly";
            j++;
            j++;
            k++;
            continue;
        }
        else {
            var account_name_ro = elements2[k].textContent;
            account_name_ro = account_name_ro.split(' ').slice(1).join(' ');
            account_name_ro = toCamelCase(account_name_ro);
            elements3[j].textContent = account_name_ro;
            j++;
            k++;
            continue;
            }
        }

        else if (elements3[j].innerHTML.indexOf("readonly") !== -1) {
            var account_name = elements2[k].textContent;
            account_name = account_name.split(' ').slice(1).join(' ');
            account_name = toCamelCase(account_name);
            elements3[j].textContent = account_name +"ReadOnly";
            j++;
            k++;
            continue;
        }



    }

//add to readonly parent class an extra class for better changes with css
$('.readonly').parent().addClass("readonly_li");

//add <hr> to all Read Only ones
$('.readonly').prepend("<hr>");

// Remove Onclick div Element
$('[onclick^="expandCollapse"]').remove();
$('.background').remove();


//Create Header with Buttons, Searchbar, and Logo
$('#container').before('<header id="header"> <div class="mgr-title"> Herzlich Willkommen beim Mediengruppen RTL Login für AWS Accounts  </div> <div class ="search-container"> <button class="filter-button" data-filter="all">Alle </button> 								<button class="filter-button" data-filter="cbc">CBC </button>										<button class="filter-button" data-filter="tvnow">TVNow </button> 									<button class="filter-button" data-filter="rtli">RTLInterartive </button> 					    <button class="filter-button" data-filter="ip">IP </button> <button class="filter-button" data-filter="ntv">NTV </button> <button class="filter-button" data-filter="mgr">MGR </button> <input type="text" id="saml-input" placeholder="Suche nach einer Rolle.." title="Type in a name"> <img class="mgr-image" src="chrome.runtime.getURL("images/rtl_logo.svg")" </image>  </header>');




// Functions

// Function to make Text to Camel Case
function toCamelCase(str){
    str = str.split("-");

    for (let i = 0, x = str.length; i < x; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    return str.join(" ");
}



//Search function
function searchFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("saml-input");
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


            //this is the function that manipulates the UI
            function updateView() {
                //default situation: all is visible
                if (!filterVal || filterVal === "all") {
                    $('.filter').show().parent().show();
                }
                    //hide all and show filtered values
                else {
                    $(".filter").hide().parent().hide();
                   // $("li").hide();
                    $('.filter').filter('.' + filterVal).show().parent().show();
                   // $("li").filter('.' + filterVal).show();
                   //$('li').children(':not(.hidden)').show();


                    console.log("searchTerm");
                    console.log("filterVal");
                }
            };
            //update the view when the page loads
            updateView();

        });


 document.getElementById("saml-input").onkeyup = function() {searchFunction()};


 // Make whole li element clickable
 $(document).ready(function(){
  var $options = $('li');

  $options.click(function(e){
    var $current = $(this);
    e.preventDefault()
    e.stopPropagation()
    $options.removeClass('active')
    $current.addClass('active')
    $('input', $current).prop('checked', true)
  })
})
