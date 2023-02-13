import Immersal from './Immersal'

class Layout {
  toggleMenu() {
    if (this.menuEnabled) {
      this.buttons.style.display = 'none'
      this.toggleBtn.style.background = 'transparent'
    } else {
      this.buttons.style.display = 'flex'
      this.toggleBtn.style.background = 'white'
    }

    this.menuEnabled = !this.menuEnabled
  }

  toggleSpinner() {
    if (this.spinnerEnabled) {
      this.loading.style.display = 'none'
    } else {
      this.loading.style.display = 'flex'
    }

    this.spinnerEnabled = !this.spinnerEnabled
  }

  toggle() {
    this.toggleMenu()
    this.toggleSpinner()
  }

  //////////////////////////////////////////////////////////////////////////////////////////

  localize() {
    Immersal.localize()
  }

  //////////////////////////////////////////////////////////////////////////////////////////

  bind() {
    this.toggleMenu = this.toggleMenu.bind(this)
    this.toggleSpinner = this.toggleSpinner.bind(this)
    this.localize = this.localize.bind(this)
  }

  setLayout() {
    document.querySelector('.menu.container').innerHTML = `
      <button id="toggle-btn"></button>

      <div class="menu buttons">
        <button id="localize-btn">Localize 📍</button>
      </div>
    `
    document.querySelector('.loading.container').innerHTML = `
      <div class="spinner"></div>
    `

    this.buttons = document.querySelector('.menu.buttons')
    this.loading = document.querySelector('.loading')

    this.toggleBtn = document.getElementById('toggle-btn')
    this.toggleBtn.addEventListener('click', this.toggleMenu)

    this.localizeBtn = document.getElementById('localize-btn')
    this.localizeBtn.addEventListener('click', this.localize)
  }

  init() {
    this.menuEnabled = true
    this.spinnerEnabled = false

    this.bind()
    this.setLayout()
  }
}

const instance = new Layout()
export default instance
