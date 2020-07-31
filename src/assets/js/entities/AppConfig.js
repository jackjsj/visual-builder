export default class AppConfig {
  constructor(config) {
    this.container = config.container;
  }

  getContainer() {
    return this.container;
  }
}
