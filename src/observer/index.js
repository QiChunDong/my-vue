import { ArrayMethods } from "./arr";

/**
 * 响应式
 */
export function observer(data) {
  if (typeof data !== "object" || data === null) {
    return data;
  }
  return new Observer(data);
}

/**
 * 监听对象
 */
class Observer {
  constructor(value) {
    // 给当前监听对象挂在一个自身的引用
    // 这样，在任何地方都可以通过this.__ob__访问observer
    Object.defineProperty(value, '__ob__', {
      enumerable: false,
      value: this
    })
    // 判断类型
    if (Array.isArray(value)) {
      // 重写原型链，是经过劫持的
      value.__proto__ = ArrayMethods;
      // console.log("数组");
      // 对于数组的内部数据，也要劫持
      this.observerArray(value);
    } else {
      this.walk(value); // 对所有属性进行遍历  懒执行
    }
  }

  walk(data) {
    let keys = Object.keys(data);
    // console.log("data keys", keys);
    for (let i = 0; i < keys.length; i++) {
      // 劫持每个属性
      const key = keys[i];
      const value = data[key];
      defineReactive(data, key, value);
    }
  }

  /**
   * 监听数组
   * @param {Array} array 数组
   */
  observerArray(array) {
    for (let i = 0; i < array.length; i++) {
      observer(array[i]);
    }
  }
}

/**
 * 定义响应式属性
 * @param {Object} data 监听的对象
 * @param {string} key 监听的key
 * @param {any} value 监听的值
 */
function defineReactive(data, key, value) {
  // 要递归处理值
  observer(value);
  Object.defineProperty(data, key, {
    get() {
      // console.log("获取值", key, value);
      return value;
    },
    set(newValue) {
      // console.log("设置值", key, newValue);
      if (newValue === value) {
        return;
      }
      // 要递归处理修改的值
      observer(newValue);
      value = newValue;
    },
  });
}

/**
 * 总结
 * 1. defineProperty只能监听一个属性
 * 2. 要递归监听对象的每个属性
 *
 * 数组监听
 * 劫持数组的话：数组可能是简单数组或者对象数组，所以采用函数劫持，重写数组的方法
 * 所以更改数组的下标时可能会失去响应
 * 如何劫持呢？
 * 及时通过奇妙的原型链来实现的！！！！！！！
 */
