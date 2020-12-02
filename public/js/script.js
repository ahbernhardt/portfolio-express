// let ishidden = false;
// let isExpanding = false;
// const scrollNavHide = () => {
//     $(window).scroll(() => {
//         let $nav = $('.navbar.header');
//         let navHeight = $nav.height();
//         let navDisplay = $nav.css('display');
//
//         let scroll = $(document).scrollTop();
//
//         // if(scroll < navHeight) {console.log(`Scroll: ${scroll} \n Nav height: ${navHeight} \n Nav Display: ${navDisplay} \n Nav Hidden: ${ishidden} \n  isExpanding: ${isExpanding}`);}
//
//         if (scroll > navHeight && !ishidden) {
//             $('.navbar').fadeOut(200);
//             ishidden = true;
//             //
//         } else if (scroll < navHeight && ishidden && !isExpanding) {
//             $('.navbar').fadeIn(200);
//             ishidden = false;
//         }
//     });
// };
//
// // local function to scroll to div
// const scrollTo = (id) => {
//     console.log($(id).offset().top);
//     $('html, body').animate({
//             scrollTop: $(id).offset().top + 30
//         },
//         256,
//         () => {
//             // finished operation - unblock scroll listener
//             isExpanding = false;
//         }
//     );
// };
//
// const expandOnClick = () => {
//     // get current href of clicked element
//
//     $('.expand').click(function(e) {
//         isExpanding = true;
//         let link = $(this).attr('href');
//         // fade out navbar when project goes fs
//         if ($('.navbar').height() !== 0) {
//             $('.navbar').fadeOut(200);
//
//             ishidden = true;
//         } else {
//             $('.navbar').fadeIn(200);
//
//             ishidden = false;
//         }
//
//         // dont jump to anchor
//         e.preventDefault();
//         // find use link href to find div id
//
//         $(link).toggleClass('fullwidth');
//         $(link).find('iframe').toggleClass('fullheight');
//
//         setTimeout(scrollTo.bind(null, link), 500);
//     });
// };
//
// $(document).ready(function() {
//
//     setTimeout(expandOnClick, 500);
//     // ================
//     // EVENT LISTENERS
//     // ===============
//
//     // ON CONTACT FORM SUBMIT
//     // change to laoding spinner
//
//     $('#contact').submit((e) => {
//         $('#sendmsg').html(` <img class="spinner" src="assets/img/spinner.gif">`);
//     });
//
//     // On Mobile navbar toggle click
//     // fade navbars
//     $('.toggle').click((e) => {
//         console.log(e)
//         $('.toggle').toggleClass('rotate')
//         $('.navbar.header').fadeToggle(200);
//     });
//     let isMobile = window.innerWidth < 600;
//
//     if (isMobile) console.log('Mobile device detected.');
//     if (!isMobile) scrollNavHide();
//
//     // on click a lang dropdown
//     $('.langpopup').click(function(e) {
//         $(this).children().toggleClass('flip');
//         $(this).next().toggleClass('hidden');
//     });
//
//     const animateText = (element, speed) => {
//         // get length of text
//         // split into array of letters
//         // make new array filled with spaces
//         // iterate through that array, and add a letter from orignal string at index
//         const str = element.innerText;
//         const textLen = element.innerText.length;
//         const spaces = new Array(textLen).fill(`&nbsp;`);
//         let idx = -1;
//         setInterval(() => {
//             idx++;
//             spaces[idx] = str[idx];
//             element.innerHTML = spaces.join('');
//             if (idx === textLen) {
//                 idx = 0;
//                 spaces.fill(' ');
//             }
//         }, speed);
//     };
//
//     $('.codegena_iframe').hover(function(e) {
//         $(this).children().find('.iframe_text').fadeToggle();
//     });
// });
