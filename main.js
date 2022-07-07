const searchBox = $('.search-box');
//searchBox.toggleClass('.search-box')
searchBox.hide();
const backBtn = $('#back-btn');
backBtn.hide();
const textBox = $('.text-box');
const quoteBtn = $('#quote-button');
const saveBtn = $('#save-btn');
const bottom = $('#bottom');
const $top = $('#top');
const topItems = $('.top-items')
const srchBtn = $('#srch-btn');
const $newQuote = $('<div></div>');
const $quoteAuthor = $('<h1></h1>');
$quoteAuthor.attr("class", "fade-in");
const $quoteAnime = $('<h4></h4>');
$quoteAnime.attr("class", "fade-in");
const $middle = $("#middle");
let quoteClicked = false;



//hide save button
saveBtn.toggle()
//hide bottom
bottom.css("opacity", "0")
bottom.css('height', "1px")
//hide top
$top.css("opacity", "0");
//save array
let currentData = [];


//generate new quote
function getNewQuote () {
        $.get('https://animechan.vercel.app/api/random', (data) => {
          currentData = [];
          currentData.push(data);
          if (data.quote.length < 400) {
            $newQuote.text('"' + data.quote + '"');
            $quoteAuthor.text("~" + data.character);
            $quoteAnime.text(data.anime);
            } else {
              $newQuote.text('Oops, sorry that quote is too big!');
              $quoteAnime.text('');
              $squoteAuthor.text('~Paul')
            }
          $newQuote.attr('id', 'quote');
          
          textBox.append($newQuote);
          textBox.append($quoteAuthor);
          textBox.append($quoteAnime);
   
          anime.timeline({
            loop:false
        })
            .add({
              targets: "#quote",
              translateX: [40,0],
              translateZ: 0,
              opacity: [0, 1],
              easing: 'easeOutExpo',
              duration: 1200,
              delay: (el, i) => 500 + 30 * i
            })
            .add({
              targets: ".fade-in",
              translateX: [40,0],
              translateZ: 0,
              opacity: [0, 1],
              easing: 'easeOutExpo',
              duration: 1200,
              delay: (el, i) => 500 + 30 * i
            })
          
        })
 }
///generate new quote

//generate new facts
// function getFacts () {
//   $.get('https://anime-facts-rest-api.herokuapp.com/api/v1', (data) => {
    
//   })
// }
//generate new facts end


//Start Button functions start

quoteBtn.mouseenter( () => {
      if (!quoteClicked) {
        anime({
          targets: '#quote-button',
          scale: 1.8,
        })
      }
    })
quoteBtn.mouseleave( () => {
    if (!quoteClicked) {
      anime({
        targets: '#quote-button',
        scale: 1,
      })
    }
  })
quoteBtn.mousedown(() => {
    if(!quoteClicked) {
      anime({
        targets: '#quote-button',
        scale: 1,
        
      })
    }
  })



 quoteBtn.click(() => {setTimeout(() => {
  if (!quoteClicked) {
  var tl = anime.timeline({ 
    easing: 'easeOutExpo',   
    duration: 6000,
    
  })

      tl
        .add({
              targets:'#quote-button',
              opacity: { value: "0", duration: 2000},
              // duration: 2000,
              translateY: 500,})
         .add({
              targets: '.top-items',
              opacity: {value: 1, duration: 3000}
          })
        .add({
              targets: '#top',
              opacity: 1,
              width: {value:1000, duration: 5000}
          })
        .add({
            targets: '#save-btn',
            translateY: 500,
            duration: 100}) 

        setTimeout(getNewQuote, 1000);

        setTimeout(() => {quoteBtn.text('New')}, 2000) ;

        tl.add({
            targets: "#quote-button",
            opacity: {value: ".2", duration: 2000}
        })

       setTimeout(() => { saveBtn.toggle()}, 1000);

       tl.add({
          targets: "#save-btn",
          opacity: {value: ".2", duration: 2000}
       })

       quoteClicked = true;
} else {
    var tl = anime.timeline({
      easing: 'easeOutExpo',
      duration: 750
    });
  tl   
      .add({
          targets: '#quote',
          scale: 0,
          delay: 600,
      })
      .add({
          targets: '.fade-in',
          scale: 0, 
      })
      .add({ 
          targets:'#quote-button',
          rotate:{
              value:360,
              duration: 1000,
          }
      })

    setTimeout(getNewQuote, 2000);

    tl.add({
        targets: '#quote',
        scale: 1,
        delay: 1000
    })
    tl.add({
        targets: '.fade-in',
        scale: {value:1, duration: 2000}, 
        delay: 600
    })
}}, 1000)
})
///start functions end ....

////qoute button animations
quoteBtn.mouseenter(() => {
    quoteBtn.css('border-color', 'white')
      anime({
        targets: "#quote-button",
      })
})
quoteBtn.mouseleave(() => {
  quoteBtn.css('border-color', "black")
    anime({
      targets: "#quote-button",
    })
})
saveBtn.mouseenter(() => {
    saveBtn.css('border-color', 'white');
})
saveBtn.mouseleave(() => {
    saveBtn.css('border-color', "black")
})
//quote button animation end




//save button functions
let saveButtonHeight = 0;
saveBtn.click(() => {
    saveButtonHeight += 275;
    saveButtonHeightString = saveButtonHeight.toString()
    saveButtonHeightString = saveButtonHeightString + "px"
    save();
      var tl = anime.timeline({
        easing: 'easeOutExpo',
        duration: 750
      });
        tl
          .add({
                targets: "#bottom",
                opacity: "1",
                duration: 1000,
                width: {value:"1000px", duration: 2000}
          })
          .add({
                targets: "#bottom",
                height: {value: saveButtonHeightString, duration: 2000},
          })
          .add({
                targets: ".saved-data",
                opacity: {value: "1", duration: 2000}
          })
      
 
})
function save () {
   let savedData = [];
      savedData.push(currentData);
   let $sQuote = $('<div></div>');
      $sQuote.attr('class', 'saved-data')
      $sQuote.text(savedData[0][0].quote)
      bottom.append($sQuote);
   let $squoteAuthor = $('<div></div>');
      $squoteAuthor.attr('class', 'saved-data')
      $squoteAuthor.text("~" + savedData[0][0].character + ' From: ' + savedData[0][0].anime)
      bottom.append($squoteAuthor)
}
///save functions end .....


///search functios start ....
srchBtn.keypress(function(event){
  var keycode = (event.keyCode ? event.keyCode : event.which);
  if(keycode == '13'){
    hideTxtBox()
    searchBox.show();
    backBtn.show();
    let url = `https://animechan.vercel.app/api/quotes/character?name=${srchBtn.val()}`;
    //let url = 'https://animechan.vercel.app/api/quotes/character?name=saitama'
     $.get(url, (data) => {
       console.log(data);
       displaySearch(data);
     })
  }
});
function hideTxtBox () {
  textBox.hide();
  
}
function displaySearch(array) {
  let newId = 0;
  for (let i = 0; i < array.length; i++ ) {
      let miniSearchDiv = $('<div></div>')
        miniSearchDiv.attr('class', 'miniSearchDiv');
        miniSearchDiv.attr('id', newId.toString())
      let newSearchDiv = $('<div></div>')
        newSearchDiv.attr('id', 'search-data')
        newSearchDiv.attr('class', 'search-data')
        newSearchDiv.text(array[i].quote)
        miniSearchDiv.append(newSearchDiv)
        searchBox.append(miniSearchDiv);
    let searchAuthor = $('<div></div>');
      searchAuthor.attr('class', 'search-data');
      searchAuthor.text("~" + array[i].character + ' From: ' + array[i].anime);
      miniSearchDiv.append(searchAuthor);
      searchBox.append(miniSearchDiv);
      newId++

     setTimeout(anime({
        targets: '.miniSearchDiv',
        easing: 'easeOutExpo',
        opacity: {value: 1, duration: 5000 }
      }), 1500)
      }

   }
    
srchBtn.mouseenter(() => {
    anime({
        targets: "#srch-btn",
        width: "200px",  
    })
})
srchBtn.mouseleave(() => {
  anime({
      targets: "#srch-btn",
      width: "30px",
  })
})
///search functions end 

//backbtn funcitons start..
backBtn.click(() => {
  searchBox.hide();
  textBox.show();
  backBtn.hide();
})
backBtn.mouseenter(() => {
  anime({
    targets: "#back-btn",
    width: "150px",  
  })
})
backBtn.mouseleave(() => {
  anime({
    targets: "#back-btn",
    width: "90px",
  })
})



