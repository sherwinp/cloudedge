'use strict';
import TemplateView from './template-view.js'
import TemplateViewItems from './template-viewitems.js'
import Auth from './auth.js'

function updatemenuactions(){
	document.querySelectorAll('a[menu-action]').forEach(function(cv, ci){
        cv.addEventListener('click', function(ev){
			document.querySelector('template-viewitems').layout = ev.target.getAttribute('menu-action');
		});
	});
}

window.addEventListener('DOMContentLoaded', (event) => {

    Auth.isSignedIn();

	if (!customElements.get('template-view')) {
		customElements.define('template-view', TemplateView);
		customElements.define('template-viewitems', TemplateViewItems);
	}

	updatemenuactions();
});