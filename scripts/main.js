
console.log("Marky Markdown, Ready To Get Funky!")



// AUTOMATED TEST AGAINST SPECIFIED RAW TEXT FILE
// fetch('https://gist.githubusercontent.com/askingalot/c0965782b49cf17acc2001dac3bd6d24/raw/b3b769606bf9329e8a5d0fe2165a7fb95cc2bdd8/markdown-to-html.md')
//   .then(response => response.text())
//   .then((data) => {
//     console.log(data)
//     const convertedHTML = textConverter(data)
//     renderOutput(convertedHTML)
//   })

// AUTOMATED TEST AGAINST MY TEXT FILE
fetch('https://raw.githubusercontent.com/BryanNilsen/MarkdownConverter/master/scripts/raw.txt')
  .then(response => response.text())
  .then((data) => {
    console.log(data)
    const convertedHTML = textConverter(data)
    renderOutput(convertedHTML)
  })



// ! gather form data
// reference to text input element
const textInput = document.getElementById("text_input")
// reference to button
const convertButton = document.getElementById("convert_btn")
// event listener
textInput.addEventListener("keyup", () => {
  // get value of text input
  const ToConvert = textInput.value
  // run text through converter function
  const convertedHTML = textConverter(ToConvert)
  // append converted text to DOM

  renderOutput(convertedHTML)

})

// ! convert input to HTML representation

function textConverter(inputText) {
  // split the input text into an array
  const textArray = inputText.split(/\n\n/)
  console.log('convertedTextArray: ', textArray);

  // HTML element to build up
  let convertedTextAsHTML = "";

  // iterate array of input strings and convert to HTML
  textArray.forEach(string => {
    // if it's a Code Block, trim characters and leave rest intact
    if (string.startsWith("```")) {
      let newString = string.slice(3, -3)
      if (newString.match(/^\n/)) {
        newString = newString.slice(1)
      }
      convertedTextAsHTML += `<pre><code>${newString}</code></pre>`
      return
    }

    // non-Code Block elements should trim line breaks
    string = string.replace(/\n/g, "")

    // convert bold text
    if (string.match(/(\*{2})/g)) {
      const strongCount = string.match(/(\*{2})/g).length
      if (strongCount > 1) {
        for (let i = 1; i <= strongCount; i++) {
          if (i % 2 != 0) {
            string = string.replace("**", "<strong>")
          } else {
            string = string.replace("**", "</strong>")
          }
        }
      }
    }

    // convert italics text
    if (string.match(/(\_)/g)) {
      const italicsCount = string.match(/(\_)/g).length
      if (italicsCount > 1) {
        for (let i = 1; i <= italicsCount; i++) {
          if (i % 2 != 0) {
            string = string.replace("_", "<em>")
          } else {
            string = string.replace("_", "</em>")
          }
        }
      }
    }
    if (string.match(/(\*)/) && !string.startsWith("*")) {
      const italicsCount = string.match(/(\*)/g).length
      if (italicsCount > 1) {
        for (let i = 1; i <= italicsCount; i++) {
          if (i % 2 != 0) {
            string = string.replace("*", "<em>")
          } else {
            string = string.replace("*", "</em>")
          }
        }
      }
    }

    // CONVERT IMAGES and ALT TEXT
    if (string.match(/\!\[/)) {
      const regExpAltText = /\!\[(.*?)\]/
      var altText = regExpAltText.exec(string)[1];
      const regExpPath = /\(([^)]+)\)/;
      var path = regExpPath.exec(string)[1];
      convertedTextAsHTML += `<img alt="${altText}" src="${path}"/>`
      return
    }

    // CONVERT HYPERLINKS
    if (string.match(/\[*\]/)) {
      const stringStart = string.split("[")[0]
      const stringEnd = string.split(")")

      const regExpAltText = /\[(.*?)\]/
      var altText = regExpAltText.exec(string)[1];
      const regExpPath = /\(([^)]+)\)/;
      var path = regExpPath.exec(string)[1];

      convertedTextAsHTML += `${stringStart} <a href=${path} target="blank" rel=" noopener noreferrer nofollow"/>${altText}</a> ${stringEnd[1] ? stringEnd[1] : ""}`
      return
    }



    // generate header tags
    if (string.startsWith("#")) {
      const hashCount = string.match(/#+/)[0].length
      const newString = string.slice(hashCount)
      // headers can't go past h6
      if (hashCount < 7) {
        convertedTextAsHTML += `<h${hashCount}>${newString}</h${hashCount}>`
        return
      }
    } else if (string.startsWith("*")) {
      // UNORDERED LIST ITEMS
      const newStringArray = string.split("*")
      let unOrderedList = "<ul>"
      newStringArray.forEach(item => {
        if (item != "") {
          unOrderedList += `<li>${item}</li>`
        }
      })
      unOrderedList += "</ul>"
      convertedTextAsHTML += unOrderedList
    } else if (string.match(/[0-9]+\.\s/)) {
      // ORDERED LIST ITEMS
      const newStringArray = string.split(/[0-9]+\.\s/)
      let orderedList = "<ol>"
      newStringArray.forEach(item => {
        if (item != "") {
          orderedList += `<li>${item}</li>`
        }
      })
      orderedList += "</ol>"
      convertedTextAsHTML += orderedList
    } else {
      convertedTextAsHTML += `<p>${string}</p>`
    }

  })
  return convertedTextAsHTML
}


// TODO render to DOM
// take converted HTML and render to output element
function renderOutput(htmlRep) {
  // reference to DOM element for output
  const markdownOutput = document.getElementById("markdown_output")
  markdownOutput.innerHTML = htmlRep;
}