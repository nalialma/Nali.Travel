let currentLang = 'es';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('siteLang', lang);
  translatePage();
}

function translatePage() {
  document.querySelectorAll('[data-lang]').forEach(element => {
    const keys = element.getAttribute('data-lang').split('.');
    let text = languages[currentLang];
    for (const key of keys) {
      if (text && text[key]) {
        text = text[key];
      } else {
        text = null;
        break;
      }
    }
    if (text) {
      if (element.classList.contains('intro') || element.classList.contains('itinerario')) {
        element.innerHTML = text;
      } else {
        element.textContent = text;
      }
    }
  });

  const mensajeAventura = document.querySelector('.mensaje-lado p:nth-child(1)');
  const mensajeReserva = document.querySelector('.mensaje-lado p:nth-child(2)');
  if (mensajeAventura) mensajeAventura.textContent = languages[currentLang]["mensaje"]["aventura"];
  if (mensajeReserva) mensajeReserva.textContent = languages[currentLang]["mensaje"]["reserva"];
}

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu-hamburguesa');
  const dropdowns = document.querySelectorAll('.dropdown');

  // Alternar menú principal
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('active');
  });

  // Cerrar menú al hacer clic fuera
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && e.target !== menuToggle && !menuToggle.contains(e.target)) {
      menu.classList.remove('active');
      // Cerrar también los submenús
      dropdowns.forEach(d => d.classList.remove('active'));
    }
  });

  // --- CORRECCIÓN: Lógica para alternar submenús ---
  dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a'); // El primer <a> del dropdown
    if (link) {
      link.addEventListener('click', function (e) {
        // Prevenir el comportamiento por defecto solo si es un dropdown (tiene submenu)
        const hasSubmenu = this.nextElementSibling && this.nextElementSibling.classList.contains('submenu');
        if (hasSubmenu) {
            e.preventDefault(); // Solo prevenir si es un enlace de dropdown
        }
        
        // Alternar la clase 'active' en el dropdown padre
        dropdown.classList.toggle('active');
      });
    }
  });
  // --- FIN CORRECCIÓN ---

  // Cerrar menús al redimensionar a escritorio (opcional, si usas hover en desktop)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 767) {
      menu.classList.remove('active');
      dropdowns.forEach(d => d.classList.remove('active'));
    }
  });

  // Redirección a destino (funcionalidad de scroll)
  document.querySelectorAll('[data-scroll]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Si el botón está dentro de un dropdown, cerrar el menú
      if(btn.closest('.dropdown')) {
          menu.classList.remove('active');
          dropdowns.forEach(d => d.classList.remove('active'));
      }
      
      const id = btn.getAttribute('data-scroll');
      const section = document.getElementById(id);
      if (section) {
        e.preventDefault(); // Prevenir el salto por defecto
        section.scrollIntoView({ behavior: 'smooth' });
        // El menú ya se cierra arriba si es necesario
      }
    });
  });

  // Botón de idiomas (tu código original parece correcto)
  const langToggle = document.getElementById('language-toggle');
  const langMenu = document.getElementById('language-menu');

  if (langToggle && langMenu) {
    langToggle.addEventListener('click', () => {
      langMenu.classList.toggle('active');
    });

    document.addEventListener('click', (event) => {
      if (!langMenu.contains(event.target) && !langToggle.contains(event.target)) {
        langMenu.classList.remove('active');
      }
    });
  }

  // Cargar idioma guardado
  const savedLang = localStorage.getItem('siteLang') || 'es';
  if (savedLang && languages[savedLang]) {
    currentLang = savedLang;
  }

  translatePage();
});


// Animaciones al hacer scroll
document.addEventListener('DOMContentLoaded', function() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
      }
    });
  }, observerOptions);

  // Observar todas las secciones de destino
  document.querySelectorAll('.destino, .parapente, .experiencia').forEach(section => {
    observer.observe(section);
  });
});

  // Function to set the language
function setLanguage(lang) {
  console.log(`Setting language to: ${lang}`); // Debugging log

  // Get the selected language translations, fallback to Spanish if not found
  const selectedLang = translations[lang] || translations.es;

  // Update all elements with data-lang attributes
  document.querySelectorAll('[data-lang]').forEach(element => {
    const key = element.getAttribute('data-lang');
    if (selectedLang[key]) {
      // Check if the content is HTML (contains tags) or plain text
      if (/<[a-z][\s\S]*>/i.test(selectedLang[key])) {
        // If it looks like HTML, set innerHTML
        element.innerHTML = selectedLang[key];
      } else {
        // Otherwise, set textContent for safety
        element.textContent = selectedLang[key];
      }
    } else {
      console.warn(`Translation key '${key}' not found for language '${lang}'.`); // Warning for missing keys
    }
  });

  // O: Store the selected language in localStorage for persistence
  localStorage.setItem('selectedLanguage', lang);
}

// O: Initialize language on page load based on stored preference or default
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('selectedLanguage') || 'es'; // Default to Spanish
  setLanguage(savedLang);

  // Ensure the language button reflects the current language
  const langToggleBtn = document.getElementById('language-toggle');
  if (langToggleBtn) {
    langToggleBtn.textContent = `Idiomas ▼ (${savedLang.toUpperCase()})`;
  }
});
// Function to set the language
function setLanguage(lang) {
  console.log(`Setting language to: ${lang}`); // Debugging log

  // Get the selected language translations, fallback to Spanish if not found
  const selectedLang = translations[lang] || translations.es;

  // Update all elements with data-lang attributes
  document.querySelectorAll('[data-lang]').forEach(element => {
    const key = element.getAttribute('data-lang');
    if (selectedLang[key]) {
      // Check if the content is HTML (contains tags) or plain text
      if (/<[a-z][\s\S]*>/i.test(selectedLang[key])) {
        // If it looks like HTML, set innerHTML
        element.innerHTML = selectedLang[key];
      } else {
        // Otherwise, set textContent for safety
        element.textContent = selectedLang[key];
      }
    } else {
      console.warn(`Translation key '${key}' not found for language '${lang}'.`); // Warning for missing keys
    }
  });

  // Optional: Store the selected language in localStorage for persistence
  localStorage.setItem('selectedLanguage', lang);

  // Optional: Update the language toggle button text
  const langToggleBtn = document.getElementById('language-toggle');
  if (langToggleBtn) {
    const langNames = {
      es: 'Español',
      en: 'English',
      pt: 'Português',
      it: 'Italiano',
      fr: 'Français'
    };
    langToggleBtn.textContent = `${langNames[lang] || lang} ▼`;
  }
}

// Optional: Initialize language on page load based on stored preference or default
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('selectedLanguage') || 'es'; // Default to Spanish
  setLanguage(savedLang);
});
// translator.js

class LanguageTranslator {
  constructor() {
    this.currentLanguage = 'es'; // Idioma por defecto
    this.translations = translations; // El objeto translations del archivo lang.js
    this.init();
  }

  init() {
    // Cargar el idioma guardado o usar el por defecto
    const savedLang = localStorage.getItem('selectedLanguage');
    if (savedLang && this.translations[savedLang]) {
      this.currentLanguage = savedLang;
    }
    
    // Aplicar el idioma
    this.applyLanguage();
    
    // Agregar event listeners a los botones de idioma
    this.setupLanguageButtons();
  }

  setupLanguageButtons() {
    // Escuchar cambios en los botones de idioma
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('lang-btn')) {
        const lang = e.target.getAttribute('data-lang');
        this.changeLanguage(lang);
      }
    });
  }

  changeLanguage(lang) {
    if (this.translations[lang]) {
      this.currentLanguage = lang;
      localStorage.setItem('selectedLanguage', lang);
      this.applyLanguage();
    }
  }

  applyLanguage() {
    // Actualizar todos los elementos con data-lang
    const elements = document.querySelectorAll('[data-lang]');
    
    elements.forEach(element => {
      const key = element.getAttribute('data-lang');
      const translation = this.getTranslation(key);
      
      if (translation) {
        // Verificar si es un input o textarea
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          if (element.type === 'button' || element.type === 'submit' || element.type === 'reset') {
            element.value = translation;
          } else {
            element.placeholder = translation;
          }
        } else if (element.tagName === 'IMG') {
          // Para imágenes, usar el atributo alt
          element.alt = translation;
        } else {
          // Para otros elementos, usar innerHTML
          element.innerHTML = translation;
        }
      }
    });
  }

  getTranslation(key) {
    // Navegar por el objeto de traducciones usando la clave
    const keys = key.split('.');
    let result = this.translations[this.currentLanguage];
    
    for (let k of keys) {
      if (result && result[k] !== undefined) {
        result = result[k];
      } else {
        return null;
      }
    }
    
    return result;
  }
}

// Inicializar el traductor cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
  window.translator = new LanguageTranslator();
});

// Función para cambiar el idioma desde cualquier parte
function changeLanguage(lang) {
  if (window.translator) {
    window.translator.changeLanguage(lang);
  }
}
