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



// TODO convert input to markdown format
// convert input to HTML representation
function textConverter(inputText) {
  const convertedTextArray = inputText.split(/\n\n/);
  console.log('convertedTextArray: ', convertedTextArray);


  let convertedTextAsHTML = "";
  convertedTextArray.forEach(string => {
    // generate header tags
    if (string.startsWith("#")) {
      const hashCount = string.match(/#+/)[0].length
      const newString = string.slice(hashCount)
      // headers can't go past h6
      if (hashCount > 6) {
        convertedTextAsHTML += `<p>${newString}<p>`
      } else {
        convertedTextAsHTML += `<h${hashCount}>${newString}</h${hashCount}>`
      }
    } else if (string.startsWith("```")) {
      const newString = string.slice(3, -3)
      convertedTextAsHTML += `<pre><code>${newString}</code></pre>`

    } else {
      convertedTextAsHTML += `<p>${string}</p>`
    }

  });
  return convertedTextAsHTML
}


// TODO render to DOM
// take converted HTML and render to output element
function renderOutput(htmlRep) {
  // reference to DOM element for output
  const markdownOutput = document.getElementById("markdown_output")
  markdownOutput.innerHTML = htmlRep;
}