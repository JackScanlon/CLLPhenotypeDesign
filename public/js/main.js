import { domReady } from "./utils.js";

const updateNavBarStyle = (navbar) => {
  const y = window.scrollY;
  if (y >= navbar.offsetHeight/2 - navbar.offsetTop) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

const updateTrackerStyle = (navbar, trackers) => {
  for (let i = 0; i < trackers.length; i++) {
    const tracker = trackers[i];
    const offset = tracker.getBoundingClientRect().y - navbar.offsetHeight;
    const size = tracker.offsetHeight;

    let progress = 0;
    if (offset < 0) {
      progress = Math.min((Math.abs(offset) / (size/2)) * 100, 100);
    }
    tracker.style.setProperty('--progress-percentage', `${progress}%`);
  }
}

const initScrollStyling = () => {
  const navbar = document.querySelector('.page-navigation');
  const trackers = document.querySelectorAll('.progress-item');
  updateNavBarStyle(navbar);
  updateTrackerStyle(navbar, trackers);

  document.addEventListener('scroll', e => {
    updateNavBarStyle(navbar);
    updateTrackerStyle(navbar, trackers);
  });
}

const computeBurgerProperty = (burger) => {
  return window.getComputedStyle(burger, ':after').getPropertyValue('--as-burger').replace(/[^\w!?]/g, '');
}

const initHamburger = () => {
  const burger = document.querySelector('.page-navigation .buttons');
  const panel = burger.querySelector('.items');
  
  burger.addEventListener('click', e => {
    if (panel.classList.contains('open'))
      return;
    
    const isBurger = computeBurgerProperty(burger);
    if (isBurger === "true") {
      panel.classList.add('open');
      return;
    }

    panel.classList.remove('open');
  });

  document.addEventListener('click', e => {
    const element = e.target;
    if (burger.contains(element)) {
      return;
    }

    panel.classList.remove('open');
  })
}

const initStepsWizard = () => {
  document.querySelectorAll('.wizard-step-item').forEach(elem => {
    elem.addEventListener('click', e => {
      const target = document.querySelector(`#${elem.getAttribute('data-target')}`);
      if (target) {
        window.scroll({ top: target.offsetTop, left: 0, behavior: 'smooth' });
      }
    });
  });
}


const openModal = (modal, pages) => {
  pages.creator.classList.add('show');
  pages.codelist.classList.remove('show');
  modal.classList.add('show');
}

const closeModal = (modal) => {
  modal.classList.remove('show');
}

const initCreateConceptBtn = () => {
  const modal = document.querySelector('.modal');
  const creator = document.querySelector('#create-concept-btn');
  const pages = {
    creator: modal.querySelector('#modal-view-1'),
    codelist: modal.querySelector('#modal-view-2')
  };

  const next = document.querySelector('.modal #create-concept');
  next.addEventListener('click', e => {
    const target = next.getAttribute('value');
    if (target == 'cancel') {
      next.innerHTML = 'Add Codes';
      next.setAttribute('value', 'next');
      return closeModal(modal);
    }

    next.innerHTML = 'Create Concept';
    next.setAttribute('value', 'cancel');
    
    pages.creator.classList.remove('show');
    pages.codelist.classList.add('show');
  });

  const cancel = document.querySelector('.modal #cancel-modal');
  cancel.addEventListener('click', e => {
    closeModal(modal);
  });

  creator.addEventListener('click', e => {
    console.log('click');
    openModal(modal, pages);
  });
}

domReady.finally(() => {
  initScrollStyling();
  initHamburger();
  initStepsWizard();
  initCreateConceptBtn();
});