import Calculator from './calculator/index';
import SumFunction from './sum-function/index'
import Calendar from './calendar/index'
const components = [
    Calculator,
    SumFunction,
    Calendar
]



const install = function(Vue, opts = {}) {
    components.forEach(component => {
      Vue.component(component.name, component);
    });
};
  
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install,
    Calculator,
    SumFunction,
    Calendar
}
