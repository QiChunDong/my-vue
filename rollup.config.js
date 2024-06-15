import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';

export default {
    input: './src/index.js',
    output: {
        file: 'dist/vue.js',
        format: 'umd', // 会向window上挂载一个Vue对象
        name: 'Vue',
        sourcemap: true
    },
    plugins: [
        babel({
            exclude: 'node_modules/**'
        }),
        serve({
            port: 3000,
            openPage: './index.html',
            contentBase: '', // 空字符串标识当前目录
        })
    ]
}