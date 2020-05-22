import FlowCanvas from './flow-canvas/index';
import SumFunction from './sum-function/index'

const components = [
    FlowCanvas,
    SumFunction
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
    FlowCanvas,
    SumFunction
}
