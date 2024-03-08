const darkMode_icon = document.querySelector(".dark-mode"),
  moon = document.querySelector(".moon"),
  fonts = document.querySelectorAll(".font"),
  font_text = document.querySelector(".text"),
  input = document.querySelector("#search"),
  search_bnt = document.querySelector(".btn"),
  errorText = document.querySelector(".errorText"),
  inputContainer = document.querySelector(".input"),
  errorContainer = document.querySelector(".errorInfo"),
  information = document.querySelector(".information");
//dark mode
function darkMode() {
  document.body.classList.toggle("dark"),
    document.querySelector(".circle").classList.toggle("circle-active");
}

darkMode_icon.addEventListener("click", darkMode);
moon.addEventListener("click", darkMode);
//fonts
document.querySelector(".wrapper-text").addEventListener("click", () => {
  document.querySelector(".wrap-active").classList.toggle("hade");
});
function font(e) {
  let value = e.target.textContent;
  if (value == "Sans Serif") {
    document.body.classList.remove("mono");
    document.body.classList.remove("serif");
    font_text.textContent = value;
  }
  if (value == "Serif") {
    document.body.classList.add("serif");
    document.body.classList.remove("mono");
    font_text.textContent = value;
  }
  if (value == "Mono") {
    document.body.classList.remove("serif");
    document.body.classList.add("mono");
    font_text.textContent = value;
  }
}
fonts.forEach((item) => {
  item.addEventListener("click", font);
});
//form validate
search_bnt.addEventListener("click", () => {
  if (input.value.length == 0) {
    errorText.textContent = "Whoops, can’t be empty…";
    inputContainer.style = "border:1px solid red";
  } else {
    inputContainer.style = "border:none";
    errorText.textContent = "";
  }
});
input.addEventListener("input", (e) => {
  let value = e.target.value;
  if (!value == "") {
    inputContainer.style = "border:none";
    errorText.textContent = "";
  } else {
    errorText.textContent = "Whoops, can’t be empty…";
    inputContainer.style = "border:1px solid red";
  }
});
//info
function info(data) {
  let result = ``;
  data.forEach((item) => {
    const { word, phonetics, license, meanings, sourceUrls, example } = item;
    console.log(item.meanings[1].definitions[0].example ?? "");
    result = `
 <div class="listening">
 <div class="listening-text">
   <h3>${word}</h3>
   <p>${phonetics[0].text ?? phonetics[1].text}</p>
 </div>
 <audio src="" id="audio" autoplay></audio>
 <img src="./src/img/mp3-icon.svg" alt="" id="music" />
</div>
<div class="text">
 <p>noun</p>
 <span></span>
</div>
<div class="meaning">
 <h4>Meaning</h4>
 <div class="meaning-list">
   <ul>
     <li>${meanings[0].definitions[0].definition}</li>
     <li>
     ${
       meanings[0].definitions[1] ?? ""
         ? meanings[0].definitions[1].definition
         : ""
     }
     </li>
     <li>
     ${
       meanings[0].definitions[2] ?? ""
         ? meanings[0].definitions[2].definition
         : ""
     }
     </li>
   </ul>
 </div>
 <span class="synonyms-text">
   <p>Synonyms</p>
   <h4>${meanings[0].synonyms[0] ?? ""}</h4>
 </span>
</div>
<div class="text">
 <p>verb</p>
 <span></span>
</div>
<div class="meaning">
 <h4>Meaning</h4>
 <div class="meaning-list">
   <ul>
     <li>${
       meanings[1] == undefined ? "" : meanings[1].definitions[0].definition
     }</li>
   </ul>
   <p>${
     meanings[1] == undefined ? "" : meanings[1].definitions[0].example ?? ""
   }</p>
 </div>
</div>
<hr />
<div class="footer">
 <div class="container footer-container">
   <p>Source</p>
   <a href="${sourceUrls[0]}"
     >${sourceUrls[0]}
   
   <img src="./src/img/tabler.svg" alt="" />
 </div>
</div>
 `;
  });
  information.innerHTML = result;
  const music = document.querySelector("#music"),
    audio = document.querySelector("#audio");
  music.addEventListener("click", () => {
    if (data[0].phonetics[0].audio != "") {
      audio.src = `${data[0].phonetics[0].audio}`;
    }
    if (data[0].phonetics[1]) {
      audio.src = `${data[0].phonetics[1].audio}`;
    }
    if (data[0].phonetics[2]) {
      audio.src = `${data[0].phonetics[2].audio}`;
    }
    if (data[0].phonetics[2].audio == "") {
      audio.src = `${data[0].phonetics[1].audio}`;
    }
  });
}
function errorInfo(data) {
  let result = `
    <div class="container errorInfo">
    <div class="img"><img src="./src/img/errorImg.png" alt="" /></div>
    <div class="text">
      <h2>${data.title}</h2>
      <p>
     ${data.message}${data.resolution}
      </p>
    </div>
  </div>
    `;
  errorContainer.innerHTML = result;
  console.log(data);
}
//XML

function search(e) {
  let text = e.target.value;
  let xhr = new XMLHttpRequest();
  xhr.open("GET", `https://api.dictionaryapi.dev/api/v2/entries/en/${text}`);
  xhr.responseType = "json";
  xhr.onload = () => {
    if (xhr.status >= 400) {
      information.style = "display:none";
      errorContainer.style = "display:block";
      errorInfo(xhr.response);
    } else {
      errorContainer.style = "display:none";
      information.style = "display:block";
      info(xhr.response);
    }
  };
  xhr.send();
}
input.addEventListener("blur", search);
