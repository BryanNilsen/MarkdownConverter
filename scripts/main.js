console.log("Marky Markdown, Ready To Get Funky!")

const rawUrl = `https://gist.githubusercontent.com/askingalot/c0965782b49cf17acc2001dac3bd6d24/raw/b3b769606bf9329e8a5d0fe2165a7fb95cc2bdd8/markdown-to-html.md`

// TODO gather form data
// reference to text iput element
const textInput = document.getElementById("text_input")
// reference to button
const convertButton = document.getElementById("convert_btn")
// event listener
convertButton.addEventListener("click", () => {
  // get value of text input
  const ToConvert = textInput.value
  // run text through converter function
  const convertedHTML = textConverter(ToConvert)
  // append converted text to DOM

  console.log('convertedHTML: ', convertedHTML);
  renderOutput(convertedHTML)

})

// ! convert to map function over array -> figure out order of operations
// ! check beginning of each string first and then replace for header
// ! if it's a code block, don't format bold/italic/ but you'll need to keep line breaks for asterisk list items
// ! bold / italics


// TODO convert input to markdown format
// convert input to HTML representation
function textConverter(inputText) {
  const convertedTextArray = inputText.split(/\n\n/).map(element => element.replace(/\n/g, ""))
  console.log('convertedTextArray: ', convertedTextArray);


  let convertedTextAsHTML = "";
  convertedTextArray.forEach(string => {

    // convert bold text
    if (string.match(/(\*{2})/g) && !string.startsWith("```")) {
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
    if (string.match(/(\_)/g) && !string.startsWith("```")) {
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
    if (string.match(/(\*)/) && !string.startsWith("```") && !string.startsWith("*")) {
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



    // generate header tags
    if (string.startsWith("#")) {
      const hashCount = string.match(/#+/)[0].length
      const newString = string.slice(hashCount)
      // headers can't go past h6
      if (hashCount < 7) {
        convertedTextAsHTML += `<h${hashCount}>${newString}</h${hashCount}>`
      }
    } else if (string.startsWith("```")) {
      const newString = string.slice(3, -3)
      convertedTextAsHTML += `<pre><code>${newString}</code></pre>`
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
      console.log('newStringArray: ', newStringArray);
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
