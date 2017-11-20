import './vendor/bootstrap/collapse'
import { handleAnchors } from './type'
import { handleContactForm } from './contact'

function run() {
  handleAnchors()
  handleContactForm()
}

// todo What if the event is never triggered? (blocked asset)
if (document.readyState === 'complete') {
  run()
} else {
  window.addEventListener('load', run)
}
