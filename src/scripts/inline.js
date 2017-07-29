function hideLoader() {
  if (window.jQuery) {
    window.jQuery('#loader').fadeOut()
  } else {
    document.getElementById('loader').style.display = 'none'
  }
}

function loadDeferredStyles() {
  var addStylesNode = document.getElementById('deferred-styles')
  var replacement = document.createElement('div')
  replacement.innerHTML = addStylesNode.textContent
  var link = replacement.firstChild
  link.onload = hideLoader
  document.body.appendChild(link)
  addStylesNode.parentElement.removeChild(addStylesNode)
}

if (document.readyState === 'complete') {
  loadDeferredStyles()
} else {
  window.addEventListener('load', loadDeferredStyles)
}
