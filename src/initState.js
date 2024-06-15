import { observer } from './observer/index';
export function initState(vm) {
    let opts = vm.$options;
    if (opts.props) {
        initProps(vm);
    }
    if (opts.data) {
        initData(vm);
    }
    if (opts.watch) {
        initWatch(vm);
    }
    if (opts.computed) {
        initComputed(vm);
    }
    if (opts.methods) {
        initMethods(vm);
    }
}

function initProps(vm) {

}

/**
 * 初始化数据
 * @param {Object} vm vue实例
 */
function initData(vm) {
    let data = vm.$options.data;
    data = vm._data = typeof data === 'function' ? data.call(vm) : data;
    // 开始劫持data数据
    observer(data)
}
function initWatch(vm) {

}
function initComputed(vm) {

}
function initMethods(vm) {

}

