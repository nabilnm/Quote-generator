const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('Author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-Quote');
const loader = document.getElementById('loader');


// show loading
function loading ( ) {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide loading
function complete () {
  if  (! loader.hidden)  {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

//  Get Quote From API
async function getQuote () {
  loading ( );
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
      const response = await fetch(proxyUrl + apiUrl);
      const data = await response.json ();
    //   If Author is blank, add 'Unknow'
      if (data.quoteAuthor === ' ') {
          authorText.innerText = 'Unknown';
      } else {
            authorText.innerText = data.quoteAuthor;
      }
    // Reduce font size for long quotes
    if (data.quoteText.length > 120) {
        quoteText.classList.add('long-quote');
    } else{
        quoteText.classList.remove('long-quote');
    }
      quoteText.innerText = data.quoteText;
      //  stop loader, show Quote
      complete ();
  } catch (error) {
    getQuote ();
  }
}
//   twitter function Tweet Quote
  function  tweetQuote( ) {
      const quote = quoteText.innerText;
      const author = authorText.innerText;
      const twitterUrl = `https://twitter.com/intent/tweet?text=${quote}  -  ${author}`;
      window.open(twitterUrl,  '_blank ');
    }
    //  Event Listeners
    newQuoteBtn.addEventListener('click',  getQuote );
    twitterBtn.addEventListener('click',  tweetQuote );

//  On load
 getQuote ();


