import './vendor/bootstrap/collapse'

function run() {}

// todo What if the event is never triggered? (blocked asset)
if (document.readyState === 'complete') {
  run()
} else {
  window.addEventListener('load', run)
}
