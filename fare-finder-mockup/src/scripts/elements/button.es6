import EventEmitter from '../core/eventemitter.es6';

export default class Button extends EventEmitter {
	constructor(el) {
		this.root = el;
		el.addEventListener('click', () => {
			this.emit('click', {
				id: this.root.dataset.id
			});
		});
	}
}
