const form = document.querySelector('.form')
const input = document.querySelector('.form__input')
const output = document.querySelector('.output')

const showMeanings = meanings => {
  meanings.map(meaning => {
    document.querySelector('.mean').innerHTML += `
    <h2 class='mean__speech'>${meaning.partOfSpeech}</h2>
    <p class='mean__definition'>${meaning.definitions[0].definition}</p>`
    showSynonyms(meaning.synonyms)
  })
}

const showSynonyms = synonyms => {
  if (synonyms.length) {
    document.querySelector('.mean').innerHTML += `
    <div class='mean__synonym'>
      <span class='mean__synonym__title'>Synonyms: </span>
      <span class='mean__synonym__content'>${synonyms.join(' / ')}</span>
    </div>`
  }
}

const showPhonetics = phonetics => {
  const phonetic = phonetics.find(item => item.audio)
  document.querySelector('.mean').innerHTML += `
    <div class='photentic'>
      <p class='photentic__text'>${phonetic.text}</p>
      <audio src="${phonetic.audio}" controls class='photentic__audio'><audio>
    <div>`
}

const showResult = event => {
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input.value}`)
    .then(res => res.json())
    .then(results => {
      output.innerHTML = null
      output.innerHTML += `
        <h1>Search resuls for ${results[0].word}</h1>
        <div class="mean"></div>`
      showPhonetics(results[0].phonetics)
      showMeanings(results[0].meanings)
    })
    .catch(error => {
      output.innerHTML = null
      Toastify({
        text: error,
        duration: 3000,
        close: true,
        stopOnFocus: true,
        style: { background: 'linear-gradient(crimson, orangered )' }
      }).showToast()
    })

  event.preventDefault()
}

form.onsubmit = event => showResult(event)