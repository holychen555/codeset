/**
 * 实现深拷贝
 * 如果所需拷贝的对象含有内置类型并且不包含函数，可以是用MessageChannel
 * 
 */
function structuralClone(obj) {
    return new Promise(resolve => {
        const { port1, port2 } = new MessageChannel();
        port2.onmessage = ev => resolve(ev.data);
        port1.postMessage(obj);
    })
}

var obj = {
    a: 1,
    b: {
        c: 2
    },
    age: undefined,
    // sex: Symbol('male'),  // 实测会报错  Failed to execute 'postMessage' on 'MessagePort': Symbol(male) could not be cloned.
    // jobs: function(){}, // 实测会报错  Failed to execute 'postMessage' on 'MessagePort': function(){} could not be cloned.
    name: 'chase'
}

obj.b.d = obj.b;

// 注意该方法是异步的
// 可以处理undefined和循环引用对象
const test = async () => {
    const clone = await structuralClone(obj);
    console.log(clone);
}
test();