let memes = {};
let memesId = 0;

//add event listner to page
const form = document.querySelector("form");
form.addEventListener("submit", submitForm);

//get and submit form information, clear out form fields
function submitForm(evt) {
  let urlInput = document.getElementById("image-url");
  let textTopInput = document.getElementById("text-top");
  let textBottomInput = document.getElementById("text-bottom");
  evt.preventDefault();
  let meme = createMeme(
    urlInput.value,
    textTopInput.value,
    textBottomInput.value
  );
  if (meme) {
    memesId += 1;
    memes[memesId] = meme;
    appendMeme(meme);
    urlInput.value = "";
    textTopInput.value = "";
    textBottomInput.value = "";
  }
}

//add meme to memes list
function createMeme(url, textTop, textBottom) {
  if (url === "" || textTop === "" || textBottom === "") return;
  return {
    url: url,
    textTop: textTop,
    textBottom: textBottom,
  };
}

// append new meme div to section
function appendMeme(meme) {
  const memeSection = document.querySelector("section");
  const newMeme = document.createElement("div");
  appendElementsMeme(meme, newMeme);
  memeSection.appendChild(newMeme);
}

// append elements (img, top text, bottom text, delete) to new meme
function appendElementsMeme(meme, newMeme) {
  const memeImg = document.createElement("img");
  const topText = document.createElement("p");
  const bottomText = document.createElement("p");
  const deleteButton = document.createElement("button");
  newMeme.classList.add("meme");
  newMeme.id = memesId;
  memeImg.src = meme.url;
  topText.innerHTML = meme.textTop;
  topText.classList.add("top-text");
  bottomText.innerHTML = meme.textBottom;
  bottomText.classList.add("bottom-text");
  deleteButton.innerHTML = "X";
  deleteButton.classList.add("delete-meme");
  deleteButton.addEventListener("click", deleteMeme);
  newMeme.append(memeImg, topText, bottomText, deleteButton);
}

//delete meme function
function deleteMeme(e) {
  let memeId = e.target.parentElement.id;

  let memeDivs = Array.from(document.querySelectorAll("#memes div"));
  for (let meme of memeDivs) {
    if (meme.id == memeId) {
      meme.remove();
    }
  }
}
