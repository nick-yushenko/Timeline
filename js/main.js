// Полифилы: 
if ('NodeList' in window && !NodeList.prototype.forEach) {
  console.info('polyfill for IE11');
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}




// Нажатие на кнопку наверх (в подразделе архива)
const gototop = document.querySelector('.gototop')
if (gototop) {

  gototop.addEventListener('click', function () {
    $("html, body").animate({
      scrollTop: 0 + "px"
    }, {
      duration: 500,
      easing: "swing"
    });
  })
}

// let scrollToChronology = (window.innerHeight <= 1000) ? window.innerHeight : 1000;
let scrollToChronology
let scrollHeight
if (document.querySelector('.hero') && document.querySelector('.about'))
  scrollHeight = document.querySelector('.hero').clientHeight + document.querySelector('.about').clientHeight
else
  scrollHeight = null


// Высота шапки 
var menuHeight = 90
if (window.innerWidth <= 1600)
  menuHeight = 80
if (window.innerWidth <= 1500)
  menuHeight = 70
if (window.innerWidth <= 1300)
  menuHeight = 60

var mobNavHeight = (window.innerWidth <= 900) ? 80 : 0
if (window.innerWidth <= 600)
  mobNavHeight = 60

// Смена языка
var changeLang = document.querySelector('.js-changeLang')
if (changeLang) {
  document.querySelector('body').addEventListener('click', function (e) {

    if (!e.target.classList.contains('droplist-item') && !e.target.classList.contains('droplist')) {
      if (changeLang.classList.contains('opened'))
        changeLang.classList.remove('opened')
    }

    if (e.target.classList.contains('js-changeLang') ||
      (e.target.tagName == 'IMG' && e.target.parentElement.classList.contains('js-changeLang')) ||
      (e.target.tagName == 'SPAN' && e.target.parentElement.classList.contains('js-changeLang'))) {
      changeLang.classList.add('opened')

    }


  })
  if (window.innerWidth >= 992) { // открытие при ховере
    changeLang.addEventListener('mouseenter', function (e) {
      changeLang.classList.add('opened')
    })
    changeLang.addEventListener('mouseleave', function (e) {
      changeLang.classList.remove('opened')
    })
  } else { // открытие кликом для планшетов и мобилок
    // changeLang.addEventListener('click', function (e) {
    //   changeLang.classList.toggle('opened')

    // })
  }

  var langItems = changeLang.querySelectorAll('.droplist-item')

  langItems.forEach(function (item) {
    item.addEventListener('click', function (e) {
      changeLang.classList.remove('opened')
    })

  });

}

// Открытие поиска
var modalBg = document.querySelector('.modal-bg')

var toSearchBtns = document.querySelectorAll('.js-toSearch')
var searchModal = document.querySelector('#search')
var closeSearch = searchModal.querySelector('.search-close')
if (toSearchBtns && searchModal && closeSearch) {
  toSearchBtns.forEach(function (item) {
    item.addEventListener('click', function (e) {
      searchModal.classList.add('opened')
      modalBg.classList.add('active')
      document.querySelector('body').style.overflow = 'hidden'
    })

  })

  closeSearch.addEventListener('click', closeSearchFunc)
  modalBg.addEventListener('click', closeSearchFunc)

}

function closeSearchFunc() {
  searchModal.classList.remove('opened')
  modalBg.classList.remove('active')
  document.querySelector('body').style.overflow = 'auto'

}


// Открытие меню 
var toModalBtns = document.querySelectorAll('.header-burger')
var menuModal = document.querySelector('#menu')
var closeMenu = menuModal.querySelector('.menu-close')

if (toModalBtns && menuModal && closeMenu) {

  toModalBtns.forEach(function (item) {
    item.addEventListener('click', function (e) {
      menuModal.classList.add('opened')
      modalBg.classList.add('active')
      document.querySelector('body').style.overflow = 'hidden'
    })

  })

  closeMenu.addEventListener('click', closeMenuFunc)
  modalBg.addEventListener('click', closeMenuFunc)

}

function closeMenuFunc() {
  menuModal.classList.remove('opened')
  modalBg.classList.remove('active')
  document.querySelector('body').style.overflow = 'auto'

}


// Нажатие на кнпоку скрола до хронологии событий 
var scrollBtn = document.querySelector('.js-scrollBtn')
if (scrollBtn) {
  scrollBtn.addEventListener('click', function (e) {


    $("html, body").animate({
      scrollTop: scrollHeight - menuHeight + "px"
    }, {
      duration: 500,
      easing: "swing"
    });

  })
}
// Нажатие на кнопку скрола в начало хронологии 

var chronology = document.querySelector('.chronology-content')
var scrollTopBtn = document.querySelector('.js-scrollToTopBtn')
if (scrollTopBtn && chronology) {
  scrollTopBtn.addEventListener('click', function (e) {



    $('html, body').animate({
      scrollTop: scrollHeight + menuHeight + "px"
    }, {
      duration: 500,
      easing: "swing"
    });

  })
}


// Навигация хронологии 

var chronologyNavItems = document.querySelectorAll('.chronology-nav__item')
var chronologyNavBlocks = new Array() // Массив блоков, на которые ведут ссылки
if (chronologyNavItems) {
  chronologyNavItems.forEach(function (item) {
    chronologyNavBlocks.push(document.querySelector(item.getAttribute('data-href')))

    item.addEventListener('click', function (e) {


      // Прокрутка к хронологии, если это требуется 
      if (window.pageYOffset < scrollToChronology) // не докрутили полностью 
      {
        $("html, body").animate({
          scrollTop: scrollToChronology + "px"
        }, {
          duration: 200,
          easing: "swing"
        });

      }
      var blockID = item.getAttribute('data-href').substring(1)
      $("html, body").animate({
        scrollTop: $('#' + blockID).offset().top - menuHeight - mobNavHeight + "px"
      }, {
        duration: 500,
        easing: "swing"
      });
      // // Изменение активного элемента навигации 
      // document.querySelector('.chronology-nav__item.current').classList.remove('current')
      // item.classList.add('current')

    })
  })
}



var nav = document.querySelector('.chronology-nav')


var scrollPos = 0
var curBlockNum = 0

var nextBlockOffset, prevBlockOffset, curBlockOffset

function isExistBlock(blockNum) {
  // Возможно ли получить элемент с индексом blockNum?
  if (blockNum >= chronologyNavBlocks.length)
    return false

  if (blockNum < 0)
    return false

  return true
}


window.addEventListener('scroll', function (e) {

  // скрытие и показ кнопки наверх в подразделе архива 

  // сколько нужно проскролить до хронологии
  if (chronology)
    scrollToChronology = chronology.getBoundingClientRect().top

  //Высота всей страницы с учетом прокрутки
  var sHeight = document.documentElement.scrollHeight;
  var clientHeight = document.documentElement.clientHeight;
  var pageHeight = sHeight - clientHeight;
  // Высота прокрутки 
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

  hideHeroBtn(scrollTop)

  if (gototop) {
    if (scrollTop <= window.innerHeight) {
      gototop.style.opacity = '0'
    } else {
      gototop.style.opacity = '1'
    }
  }
  // Фиксация и смена цвета у шапки

  if (scrollTop >= 80) {
    fixHeader()
  } else {
    unfixHeader()

  }

  if (scrollTop <= scrollHeight + 200) {
    hideChronologyBtn()

  } else {
    showChronologyBtn()

  }
  // Закрепление навигации, когда доскролили до хроники

  if (chronology) {
    if (scrollToChronology - menuHeight <= 0) { // если проскролили до хроники (она полностью видна)
      if (window.innerWidth <= 900) {
        nav.style.position = 'fixed'
        nav.style.left = 0
        nav.style.top = menuHeight + 'px'

      } else {
        nav.style.position = 'fixed'
        nav.style.paddingTop = menuHeight + 80 + 'px'
      }
    } else {
      if (window.innerWidth <= 900) {
        nav.style.position = 'absolute'
        nav.style.left = 0
        nav.style.top = 0

      } else {
        nav.style.paddingTop = '80px'
        nav.style.position = 'absolute'
      }
    }
  }


  if (chronology) {
    if (isExistBlock(curBlockNum - 1))
      prevBlockOffset = chronologyNavBlocks[curBlockNum - 1].getBoundingClientRect().top
    else
      prevBlockOffset = null
    if (isExistBlock(curBlockNum))
      curBlockOffset = chronologyNavBlocks[curBlockNum].getBoundingClientRect().top
    else
      curBlockOffset = null

    if (isExistBlock(curBlockNum + 1))
      nextBlockOffset = chronologyNavBlocks[curBlockNum + 1].getBoundingClientRect().top
    else
      nextBlockOffset = null
  }



  if (chronology) {
    var st = $(this).scrollTop();
    if (st > scrollPos) {
      // Скрол вниз
      if (nextBlockOffset != null)
        if (nextBlockOffset <= (menuHeight + mobNavHeight) * 2 || pageHeight <= scrollTop + 10) {
          // alert('next!')
          chronologyNavItems.forEach(function (item) {
            item.classList.remove('current')
          })
          chronologyNavItems[curBlockNum + 1].classList.add('current')
          curBlockNum++
        }
    } else {
      // Скрол наверх
      if (prevBlockOffset != null) {
        if (curBlockOffset >= (menuHeight + mobNavHeight) * 4) {
          // alert('PREV!')
          chronologyNavItems.forEach(function (item) {
            item.classList.remove('current')
          })
          chronologyNavItems[curBlockNum - 1].classList.add('current')
          curBlockNum--
        }
      }
    }
    scrollPos = st;

  }





  // Если кнопка "В начало хронологии" находится над темным блоком 
  if (chronology) {


    var darkBlocks = document.querySelectorAll('.chronology-item__wrap.primary .chronology-item')
    let btnSpan = document.querySelector('.chronology-scroll__btn span')
    var winH = window.innerHeight

    let blocks = []

    var bPos = 50 // Значение bottom для кнопки (отступ от нижней границы экрана)  
    var btnSize = 40 // высота иконки   
    var marginB = 30 // Отступ от текста до иконки
    var e = 0 // погрешность
    if (window.innerWidth <= 1600)
      btnSize = 35
    if (window.innerWidth <= 1400)
      marginB = 20
    if (window.innerWidth <= 1300)
      btnSize = 30
    if (window.innerWidth <= 1200)
      btnSize = 25

    darkBlocks.forEach(function (item) {
      blocks.push({
        y: item.getBoundingClientRect().top,
        height: item.clientHeight,

      })
    })

    let count = 0

    for (var i = 0; i < blocks.length; i++) {
      if (blocks[i].y - winH + bPos + btnSize + marginB <= 0 && blocks[i].y - winH + bPos + btnSize + marginB + blocks[i].height > 0)
        count++
    }


    // Если под кнопкой нет темных элементов
    if (count == 0)
      btnSpan.classList.remove('overDark')
    else
      btnSpan.classList.add('overDark')

  }

})

// Если кнопка "В начало хронологии" находится над темным блоком 
// var darkBlocks = document.querySelectorAll('.chronology-item__wrap.primary .chronology-item')
// darkBlocks.forEach(function (item) {
//   let btnSpan = document.querySelector('.chronology-scroll__btn span')
//   var y = item.getBoundingClientRect().top
//   var winH = window.innerHeight
//   var height = item.clientHeight
//   var bPos = 50 // Значение bottom для кнопки (отступ от нижней границы экрана)  
//   var btnSize = 40 // высота иконки   
//   var marginB = 30 // Отступ от текста до иконки
//   var e = 0 // погрешность

//   if (window.innerWidth <= 1600)
//     btnSize = 35
//   if (window.innerWidth <= 1400)
//     marginB = 20
//   if (window.innerWidth <= 1300)
//     btnSize = 30
//   if (window.innerWidth <= 1200)
//     btnSize = 25
//   // Если кнопка над элементом
//   if (y - winH + bPos + btnSize + marginB <= 0 && y - winH + bPos + btnSize + marginB + height > 0) {
//     // btnSpan.style.color = '#f7f7f7'
//     btnSpan.classList.add('overDark')
//   } else {
//     // btnSpan.style.color = '#2f2f2f'
//     btnSpan.classList.remove('overDark')


//   }
// })


function fixHeader() {
  var header = document.querySelector('.header')
  if (header) {
    header.classList.add('fixed')

  }
}

function unfixHeader() {
  var header = document.querySelector('.header')
  if (header && !header.classList.contains('white')) {
    header.classList.remove('fixed')
  }
}

function hideHeroBtn(scrollTop) {

  var heroBtn = document.querySelector('.hero-scroll__btn')
  if (heroBtn) {
    needScroll = 200 - scrollTop
    heroBtn.style.opacity = (needScroll > 0) ? needScroll / 100 + 0.05 : 0

  }


}

function showChronologyBtn() {

  var chronologyBtn = document.querySelector('.chronology-scroll__btn')
  if (chronologyBtn)
    chronologyBtn.style.opacity = 1
}

function hideChronologyBtn() {
  var chronologyBtn = document.querySelector('.chronology-scroll__btn')
  if (chronologyBtn)

    chronologyBtn.style.opacity = 0
}



// Страница FAQ

const FAQitems = document.querySelectorAll('.faq-item')

if (FAQitems) {
  FAQitems.forEach(function (item) {
    const openBtn = item.querySelector('.open')

    openBtn.addEventListener('click', function () {
      const textBlocks = item.querySelectorAll('.faq-item__text p')
      const text = item.querySelector('.faq-item__text')
      let textHeight = 0;


      if (item.classList.contains('opened')) {
        item.classList.remove('opened')
      } else {
        // закрыть все остальные блоки 
        FAQitems.forEach(function (elem) {
          elem.classList.remove('opened')
        })
        textBlocks.forEach(function (p) {
          textHeight = textHeight + p.clientHeight + 10
        })
        item.classList.add('opened')
      }

      text.style.height = textHeight + 'px'



    })
  })
}