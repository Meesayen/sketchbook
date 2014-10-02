import controllers from '../elements/all.es6';
import { toArray } from './utils.es6';

export default class Orchestrator {
	constructor() {

	}
	run() {
		var elements = toArray(document.querySelectorAll('[data-ctrl]'));
		elements.filter(el => {
			return controllers[el.dataset.ctrl] !== undefined;
		}).forEach(el => {
			el.__ctrl__ = new controllers[el.dataset.ctrl](el);
		});
	}
}
