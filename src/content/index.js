console.info('chrome-ext template-vanilla-js content script')

export {}

import $ from 'jquery'

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'getProductDetails') {
    try {
      const data = JSON.parse(request.data)
      const title = $('#productTitle')[0].innerText
      const url = data.activeTab.url
      const tag = $('#wayfinding-breadcrumbs_feature_div a')[0].innerText
      const imageSrc = $('#imgTagWrapperId img')[0].src
      chrome.runtime.sendMessage({
        from: 'content',
        subject: 'showPageAction',
        data: { title, url, tag, imageSrc },
      })
    } catch (err) {
      console.log('Error')
    }
  }
})
