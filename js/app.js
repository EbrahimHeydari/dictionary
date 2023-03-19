if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js')
  .then(reg => {
    console.log('Service worker registred successfully.', reg)
  })
  .catch(err => {
    console.log('service worker not registred !!', err)
  })
}