document.addEventListener("DOMContentLoaded", ready);

function ready() {
    currentSlide(1);
    window.onscroll = function () {
        scrollControl()
    };
    loadFirstLogPage();
    generateBreadcrumbs();
    // controlLeftMenu();
}

// construct
function Account(username, password) {
    this.username = username;
    this.password = password;
}

let accounts = [new Account("admin", "1234")];
let currentAc;

// slidershow
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("imageContainer");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" activeMenu", "");
    }
    if (slides[slideIndex - 1] !== undefined) {
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " activeMenu";
    }
}

// end of slidershow

// menu navigation
(function () {
    var animenuToggle = document.querySelector('.animenu__toggle'),
        animenuNav = document.querySelector('.animenu__nav'),
        hasClass = function (elem, className) {
            return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
        },
        toggleClass = function (elem, className) {
            var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
            if (hasClass(elem, className)) {
                while (newClass.indexOf(' ' + className + ' ') >= 0) {
                    newClass = newClass.replace(' ' + className + ' ', ' ');
                }
                elem.className = newClass.replace(/^\s+|\s+$/g, '');
            } else {
                elem.className += ' ' + className;
            }
        },
        animenuToggleNav = function () {
            toggleClass(animenuToggle, "animenu__toggle--active");
            toggleClass(animenuNav, "animenu__nav--open");
        };
    if (animenuToggle != null) {
        if (!animenuToggle.addEventListener) {
            animenuToggle.attachEvent("onclick", animenuToggleNav);
        }
        else {
            animenuToggle.addEventListener('click', animenuToggleNav);
        }
    }
})();


function scrollControl() {

    let sectionCrumbs = document.getElementById("breadcrumbsID");
    let sticky = sectionCrumbs.offsetTop;

    if (window.pageYOffset > sticky) {
        sectionCrumbs.classList.add("stickyBreadCrumbs");
        document.getElementById("menuID").classList.add("stickyMenu");
        // if (!(sectionCrumbs.className.split(" ").indexOf("stickyBreadCrumbs") >= 0))
        //     sectionCrumbs.className += " stickyBreadCrumbs";
        // if (!(document.getElementById("menuID").className.split(" ").indexOf("stickyMenu") >= 0))
        //     document.getElementById("menuID").className += " stickyMenu";
    } else {
        sectionCrumbs.classList.remove("stickyBreadCrumbs");
        document.getElementById("menuID").classList.remove("stickyMenu");
        // if (sectionCrumbs.className.split(" ").indexOf("stickyBreadCrumbs") >= 0)
        //     sectionCrumbs.className -= "stickyBreadCrumbs";
        // if (document.getElementById("menuID").className.split(" ").indexOf("stickyMenu") >= 0)
        //     document.getElementById("menuID").className -= "stickyMenu";
    }
}

var currentPage;

function pageControl(purposePage) {
    let newPage = document.getElementById(purposePage);
    if (currentPage !== newPage) {
        if (!(newPage.className.split(" ").indexOf("activePage") >= 0))
            newPage.className += " activePage ";
        if (currentPage !== undefined) {
            if (currentPage.className.split(" ").indexOf("activePage") >= 0)
                currentPage.className -= "activePage";
        }
        currentPage = newPage;
        generateBreadcrumbs();
    }

}


// breadcrumbs
function generateBreadcrumbs() {
    let ul = document.getElementById("breadcrumbsID");
    if (currentPage === document.getElementById('firstLogPageID')) {
        ul.innerHTML = '';
        return;
    }

    let li = document.createElement("li");
    let newlink = document.createElement('a');
    if (currentPage === document.getElementById('homeID')) {
        newlink.innerText = "Home";
        ul.innerHTML = '';
        li.appendChild(newlink);
        ul.appendChild(li);
        return;
    }
    else if (currentPage === document.getElementById('contactsID')) {
        newlink.innerText = "Contacts";
    }
    else if (currentPage === document.getElementById('yourAccountID')) {
        newlink.innerText = "Your Account";
    }
    else if (currentPage === document.getElementById('yourStatsID')) {
        newlink.innerText = "Your Stats";
    }
    else if (currentPage === document.getElementById('playID')) {
        newlink.innerText = "Play";
        ul.innerHTML = '';
        let homelink = document.createElement('a');
        homelink.innerText = "Home";
        homelink.setAttribute('onclick', 'pageControl(\'homeID\')');
        let arrow = document.createElement('span');
        arrow.innerText = " > ";
        li.appendChild(homelink);
        li.appendChild(arrow);
        li.appendChild(newlink);
        ul.appendChild(li);

        // prepare game
        defineLet();
        addListeners();
        startGame();
        return;
    }

    ul.innerHTML = '';
    let homelink = document.createElement('a');
    homelink.innerText = "Home";
    homelink.setAttribute('onclick', 'pageControl(\'homeID\')');
    let arrow = document.createElement('span');
    arrow.innerText = " > ";
    li.appendChild(homelink);
    li.appendChild(arrow);
    li.appendChild(newlink);
    ul.appendChild(li);
}

function errorMessageLogReg(message, form) {
    let num = document.getElementById('modalLogInContainer').childElementCount;
    if (num <= 5) {
        let errorMessage = document.createElement('p');
        errorMessage.style.color = "red";
        errorMessage.style.textAlign = "center";
        errorMessage.style.margin = "0";
        errorMessage.innerText = message;
        form.appendChild(errorMessage);
    }
}

//log in form
function processLoginForm() {
    let username = document.getElementById('usernameLogin').value;
    let password = document.getElementById('passwordLogin').value;
    currentAc = new Account(username, password);
    let exist = false;
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].username == username) {
            if (accounts[i].password == password) {
                exist = true;
                break;
            }
        }
    }
    //if entered values are ok
    if (exist) {
        pageControl('homeID');
        document.getElementById('formLogin').style.display = 'none';
        changeLogMenu();
        document.getElementById('usernameYourAccountID').innerText = username;
        document.getElementById('passwordYourAccountID').innerText = password;

    }
    else {
        //create wrong log in page
        // check if there is no message
        errorMessageLogReg("Wrong login or password", document.getElementById('modalLogInContainer'));
    }

}

function processRegistrationForm() {
    //get values and save them
    // check if values were entered
    let username = document.getElementById('usernameReg').value;
    let password = document.getElementById('passwordReg').value;
    if (username !== "" && password !== "") {
        //create user
        let account = new Account(username, password);
        accounts.push(account);
        document.getElementById('formRegister').style.display = 'none';
        pageControl('homeID');
        changeLogMenu();
        document.getElementById('usernameYourAccountID').innerText = username;
        document.getElementById('passwordYourAccountID').innerText = password;
    }
    else {
        errorMessageLogReg("Input your username and password.", document.getElementById('modalRegContainer'));
    }
}

function loadFirstLogPage() {
    pageControl('firstLogPageID');
    let ul = document.getElementById('animenu__navID');
    let myListItems = ul.children;
    let length = myListItems.length;
    for (let i = 0; i < length - 2; i++) {
        // myListItems[i].classList.add('blocked');
        //IE
        if (!(myListItems[i].className.split(" ").indexOf("blocked") >= 0))
            myListItems[i].className += " blocked";
    }
    //IE
    // myListItems[length - 1].classList.remove('blocked');
    // myListItems[length - 2].classList.remove('blocked');
    if (myListItems[length - 1].className.split(" ").indexOf("blocked") >= 0)
        myListItems[length - 1].className -= "blocked";
    if (myListItems[length - 2].className.split(" ").indexOf("blocked") >= 0)
        myListItems[length - 2].className -= "blocked";
    generateBreadcrumbs();
}

function changeLogMenu() {
    let ul = document.getElementById('animenu__navID');
    let myListItems = ul.children;
    let length = myListItems.length;
    for (let i = 0; i < length - 2; i++) {
        if (myListItems[i].className.split(" ").indexOf("blocked") >= 0)
            myListItems[i].className -= "blocked";
    }
    myListItems[length - 2].className += " blocked";
    myListItems[length - 1].className += " blocked";
}


function blockStats(statsToBlock) {
    let statsBlock = document.getElementById(statsToBlock);
    let yourStats = document.getElementById('rightYourStatsID');
    let compareStats = document.getElementById('rightCompareStatsID');
    if (!(statsBlock.className.split(" ").indexOf("blocked") >= 0))
        statsBlock.className += " blocked";
    if (statsBlock === yourStats) {
        if (compareStats.className.split(" ").indexOf("blocked") >= 0)
            compareStats.className -= "blocked";
    }
    else {
        if (yourStats.className.split(" ").indexOf("blocked") >= 0)
            yourStats.className -= "blocked";
    }
}

var cardAr;
var cards;
var deck;
var moves;
var counter;
var stars;
var matchedCard;
var starsList;
var closeicon;
var modal;
var openedCards;

function defineLet() {
    cardAr = document.getElementsByClassName('card');
    // cards = [...cardAr];
    cards = Array.prototype.slice.call(cardAr);
// deck of all cards in game
    deck = document.getElementById("card-deck");
// declaring move variable
    moves = 0;
    counter = document.querySelector(".moves");
// declare variables for star icons
    stars = document.querySelectorAll(".fa-star");
// declaring variable of matchedCards
    matchedCard = document.getElementsByClassName("match");
// stars list
    starsList = document.querySelectorAll(".stars li");
// close icon in modal
    closeicon = document.querySelector(".close");
// declare modal
    modal = document.getElementById("popup1");
// array for opened cards
    openedCards = [];
    //timer
    timer = document.getElementById('timerID');
}


// @description shuffles cards
// @param {array}
// @returns shuffledarray
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// @description shuffles cards when page is refreshed / loads
// document.body.onload = startGame();


// @description function to start a new play
function startGame() {
    // shuffle deck
    cards = shuffle(cards);
    // remove all exisiting classes from each card
    for (var i = 0; i < cards.length; i++) {
        deck.innerHTML = "";
        [].forEach.call(cards, function (item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
        ///for IE
        // cards[i].className-='show';
        // cards[i].className-='open';
        // cards[i].className-='match';
        // cards[i].className-='disabled';
    }
    // reset moves
    moves = 0;
    counter.innerHTML = moves;
    // reset rating
    for (let i = 0; i < stars.length; i++) {
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }
    //reset timer
    second = 0;
    minute = 0;
    hour = 0;
    let timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}


// @description toggles open and show class to display cards
function displayCard() {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");


}


// @description add opened cards to OpenedCards list and check if cards are match or not
function cardOpen() {
    openedCards.push(this);
    let len = openedCards.length;
    if (len === 2) {
        moveCounter();
        if (openedCards[0].type === openedCards[1].type) {
            matched();
        } else {
            unmatched();
        }
    }
}


// @description when cards match
function matched() {
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}


// description when cards don't match
function unmatched() {
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function () {
        openedCards[0].classList.remove("show", "open", "no-event", "unmatched");
        openedCards[1].classList.remove("show", "open", "no-event", "unmatched");
        enable();
        openedCards = [];
    }, 1100);
}


// @description disable cards temporarily
function disable() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.add('disabled');
    });
}


// @description enable cards and disable matched cards
function enable() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.remove('disabled');
        for (let i = 0; i < matchedCard.length; i++) {
            matchedCard[i].classList.add("disabled");
        }
    });
}

// @description game timer
var second = 0;
var minute = 0;
var hour = 0;
var timer;
var interval;

function startTimer() {
    interval = setInterval(function () {
        timer.innerHTML = minute + "mins " + second + "secs";
        second++;
        if (second === 60) {
            minute++;
            second = 0;
        }
        if (minute === 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}

// @description count player's moves
function moveCounter() {
    moves++;
    counter.innerHTML = moves;
    //start timer on first click
    if (moves === 1) {
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
    // setting rates based on moves
    if (moves > 8 && moves < 12) {
        for (i = 0; i < 3; i++) {
            if (i > 1) {
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 13) {
        for (i = 0; i < 3; i++) {
            if (i > 0) {
                stars[i].style.visibility = "collapse";
            }
        }
    }
}

// @description congratulations when all cards match, show modal and moves, time and rating
function congratulations() {
    if (matchedCard.length === 16) {
        clearInterval(interval);
        let finalTime = timer.innerHTML;

        // show congratulations modal
        modal.classList.add("show");

        // declare star rating variable
        let starRating = document.querySelector(".stars").innerHTML;

        //showing move, rating, time on modal
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;

        //closeicon on modal
        // closeModal();
    }
}


// @description close icon on modal
function closeModal() {
    modal.classList.remove("show");
    startGame();
}


// @desciption for user to play Again
function playAgain() {
    modal.classList.remove("show");
    startGame();
}


// loop to add event listeners to each card
function addListeners() {

    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        card.addEventListener("click", displayCard);
        card.addEventListener("click", cardOpen);
        card.addEventListener("click", congratulations);
    }
}


////table


$(document).ready(function () {
    $('#MyTable').DataTable({
        initComplete: function () {
            this.api().columns().every(function () {
                var column = this;
                var select = $('<select><option value=""></option></select>')
                    .appendTo($(column.footer()).empty())
                    .on('change', function () {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );
                        //to select and search from grid
                        column
                            .search(val ? '^' + val + '$' : '', true, false)
                            .draw();
                    });

                column.data().unique().sort().each(function (d, j) {
                    select.append('<option value="' + d + '">' + d + '</option>')
                });
            });
        }
    });
});

var dropdown;

function controlLeftMenu() {
    dropdown = document.getElementsByClassName("dropdown-btn");
    let i;
    for (i = 0; i < dropdown.length; i++) {
        dropdown[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var dropdownContent = this.nextElementSibling;
            if (dropdownContent.className.split(" ").indexOf("active") >= 0)
                dropdownContent.className -= "active";
            else
                dropdownContent.className += " active";
        });

    }
}

var targetWord;
let name;

function search() {
    if (targetWord !== "" && targetWord!==undefined) {
        document.getElementById(targetWord).innerHTML = document.getElementById(targetWord).innerHTML.replace( name, name);
    }
    targetWord = "";
     name = document.getElementById("searchID").value;
    let pattern = name.toLowerCase();
    let divs = document.getElementsByTagName("p");
    for (let i = 0; i < divs.length; i++) {
        let index = divs[i].innerText.toLowerCase().indexOf(pattern);
        if (index !== -1) {
            targetWord = divs[i].id;
            document.getElementById(targetWord).innerHTML = document.getElementById(targetWord).innerHTML.replace(name, "<span class='marked'>"+name+"</span>")
             break;
        }
    }
}