const BaseComponent = require('./baseComponent.js')

class UpComponent extends BaseComponent {
	constructor (){
		super();
		this.componentName = 'UpComponent'
		this.sayHello = this.sayHello.bind(this)
	}

	async sayHello(){
		return 'hello world'
	}
}

module.exports = UpComponent