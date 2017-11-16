import Collapse from './vendor/bootstrap/collapse'
import { handleAnchors } from './type'

function run() {
  handleAnchors()
}

// todo What if the event is never triggered? (blocked asset)
if (document.readyState === 'complete') {
  run()
} else {
  window.addEventListener('load', run)
}
