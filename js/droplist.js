$('.select').on('focus', '.select__head', onSelectFocus);



$('.select__head input').on('focus', onInputFocus)

// Выбор элемента из списка
$('.select').on('click', '.select__item', droplistChooseItem);

function onSelectFocus() {
  if (!this.parentElement.classList.contains('disable')) { // Отключить предыдущие 
    $('.select__head').removeClass('open');
    $('.select__list').fadeOut(5);
    // включить текущую 
    $(this).addClass('open');
    $(this).next().fadeIn(5);
  }
}

function onInputFocus() {
  if (!this.parentElement.classList.contains('select__head')) {
    if ($('.select__head'))
      $('.select__head').removeClass('open');
    if ($('.select__list'))
      $('.select__list').fadeOut(5);
  }
}

function droplistChooseItem() {
  const doctorTheme = document.querySelector('.js-themeDoctor')
  const candidateTheme = document.querySelector('.js-themeCandidate')

  if (this.classList.contains('js-degreeDoctor') && candidateTheme && doctorTheme) {
    doctorTheme.style.display = 'flex'
    candidateTheme.style.display = 'flex'
  }
  if (this.classList.contains('js-degreeCandidate') && candidateTheme && doctorTheme) {
    doctorTheme.style.display = 'none'
    candidateTheme.style.display = 'flex'
  }
  if (this.classList.contains('js-degreeEmpty') && candidateTheme && doctorTheme) {
    doctorTheme.style.display = 'none'
    candidateTheme.style.display = 'none'
  }
  $('.select__head').removeClass('open');
  $('.select__list').fadeOut(5);

  const selectInput = this.parentElement.parentElement.querySelector('.select__head').querySelector('input')
  if (selectInput) {
    // selectInput.value = this.textContent
    selectInput.setAttribute('value', this.textContent)
    selectInput.classList.remove('invalid')
    if (selectInput.parentElement.querySelector('div.invalid'))
      selectInput.parentElement.querySelector('div.invalid').remove()
  } else {
    console.log('ERROR: в теле выпадающего списка отсутвует поле выбора элемента')
  }


  // выбор даты рождения 
  const BDinput = document.querySelector('.js-Birhday')


  if (BDinput) {
    if (this.classList.contains('js-BDday')) {
      BDinput.setAttribute('data-day', this.textContent)
    }
    if (this.classList.contains('js-BDmonth')) {
      BDinput.setAttribute('data-month', this.getAttribute('data-value'))
    }
    if (this.parentElement.classList.contains('js-BDyear')) {
      BDinput.setAttribute('data-year', this.textContent)
    }

    
    // проверяем, все ли значения заполнены 
    if (BDinput.getAttribute('data-day') != '' && BDinput.getAttribute('data-month') != '' && BDinput.getAttribute('data-year') != '' )
    {
      let date = BDinput.getAttribute('data-day').replace(' ', '') + '-' + BDinput.getAttribute('data-month').replace(' ', '') + '-' + BDinput.getAttribute('data-year').replace(' ', '')
      BDinput.setAttribute('value', date) 
    } 
  }

}

function setBirhday(input) {

}

$(document).click(function (e) {
  if (!$(e.target).closest('.select').length) {
    $('.select__head').removeClass('open');
    $('.select__list').fadeOut(5);
  }
});