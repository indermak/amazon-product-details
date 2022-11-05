import './index.css'
let title = '',
  url = '',
  imageSrc = '',
  tag = ''
import $ from 'jquery'

document.querySelector('#app').innerHTML = `
<main>
  <div class="extension" id="extension">
      <div class="formDiv">
            <div id="right">
              <button class="submitButton ctaButton" id="submitUrlButton">Process</button>
            </div>
      </div>
    </div>
    <div id="lds-ellipsis" class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    <div>
      <button class="showTextButton ctaButton" id="showTextButton">Show Text</button>
    </div>
    </div>
    <div>
      <div id="title">
        Title: ${title}
        </div>
        <br />
        <div id="url">
        URL: ${url}
        </div>
        <br />
        <div id="imageSrc">
        Image URL: ${imageSrc}
        </div>
        <br />
        <div id="tag">
        Tag: ${tag}
        </div>
    </div>

</main>
`

const listener = () => {
  // const copyUrlButton = document.getElementById('copyUrlButton');
  const submitUrlButton = document.getElementById('submitUrlButton')
  submitUrlButton.addEventListener('click', () => {
    submitUrl()
  })
  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message) {
      const { data } = message
      $('#title')[0].innerHTML = `Title: ${data.title}`
      $('#tag')[0].innerHTML = `Tag: ${data.tag}`
      $('#imageSrc')[0].innerHTML = `Image URL: ${data.imageSrc}`
      $('#url')[0].innerHTML = `URL: ${data.url}`
      console.log('Got message!')
      // var fill = document.getElementById('fillMe')
      // fill.innerHTML = 'The first h3 found was ' + message.innerHTML
      return true
    }
  })
}
listener()

const submitUrl = () => {
  console.log('Button clicked!')
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    var activeTab = tabs[0]
    chrome.tabs.sendMessage(activeTab.id, {
      message: 'getProductDetails',
      data: JSON.stringify({ activeTab }),
    })
  })
}
