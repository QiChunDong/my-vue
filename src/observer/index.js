/**
 * 响应式
 */
export function observer(data) {
    if (typeof data !== 'object' || data === null) {
        return data;
    }
    return new Observer(data);
}

/**
 * 监听对象
 */
class Observer {
    constructor(value) {
        this.walk(value);  // 对所有属性进行遍历  懒执行
    }

    walk(data) {
        let keys = Object.keys(data);
        console.log(keys);
        for (let i = 0; i < keys.length; i++) {
            // 劫持每个属性
            const key = keys[i];
            const value = data[key];
            defineReactive(data, key, value);
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
    Object.defineProperty(data, key, {
        get() {
            console.log('获取值', key ,value)
            return value;
        },
        set(newValue) {
            console.log('设置值', key ,newValue)
            if (newValue === value) {
                return;
            }
            value = newValue
        }
    });
}