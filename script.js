const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.style.display = "none";
}

let apiQuotes = [];
// Get quotes from api
async function getQoutes() {
  showLoadingSpinner();
  const URL = "https://type.fit/api/quotes";
  try {
    const res = await fetch(URL);
    apiQuotes = await res.json();
    newQuote();
  } catch (error) {
    console.log(error);
  }
}

// show new quote
function newQuote() {
  showLoadingSpinner();
  // pick a random ap from api quotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  //   replace the qoute author by unknown
  if (!quote.author) {
    authorText.textContent = "UnKnown";
  } else {
    authorText.textContent = quote.author;
  }

  //   change font
  if (quote.text.length > 100) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}

getQoutes();

// tweet a Quote
function tweetQoute() {
  const tweetUrl = `https://twitter.com/compose/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(tweetUrl, "_blank");
}

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQoute);
