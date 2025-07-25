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