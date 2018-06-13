class BaseComponent {
	constructor(){
		this.componentName = 'BaseComponent'
		this.sayName = this.sayName.bind(this)
	}

	async sayName(){
		return this.componentName
	}
}

module.exports = BaseComponent