// 重写数组
// 1. 获取原来的数组方法
// 2. 集成
// 3. 劫持

let oldArrayProtoMethods = Array.prototype;

export let ArrayMethods = Object.create(oldArrayProtoMethods);

let methods = ["push", "pop", "unshift", "shift", "sort", "splice", "reverse"];

methods.forEach((method) => {
  ArrayMethods[method] = function (...args) {
    // 劫持方法
    // 1. 调用原来的方法
    console.log("执行了", method, "值是", ...args);
    let result = oldArrayProtoMethods[method].call(this, ...args);
    // 2. 对新数据进行劫持
    // 那么怎么判断来了新数据呢？
    //  1. push
    //  2. unshift
    //  3. splice
    // 上述3中都属于是新数据哦
    // 然后，通过Observer的__ob__属性获取对象实例this
    // 再进行数组的监听
    let inserted = '';
    switch(method) {
        case 'push':
        case 'unshift':
            inserted = args;
            break;
        case 'splice':
            inserted = args.splice(2);
            break;
    }
    if (inserted) {
        const ob = this.__ob__;
        ob.observerArray(inserted);
    }
    return result;
  };
});

// 总结
// Object.create会集成参数的所有属性方法
// 劫持数组的方法，类似于切面编程，执行指定方法时，之前或者之后，可以执行额外的逻辑！！！！！
