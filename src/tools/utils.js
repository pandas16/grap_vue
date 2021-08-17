/**
 * 公共方法
 */
 import { saveAs } from 'file-saver'

const Tools = {
    writeFile: (fileName = '', content = '') => {
        return new Promise((resolve) => {
            let str = new Blob([content], {type: 'text/plain;charset=utf-8'});
            saveAs(str, fileName);
            resolve();
        });
    },
    isDataValid: function (data = '') {
        if (data != null) {
            data = data.toString();
            if (data != '' && data != 'undefined' && data != 'null') {
                return true;
            }
        }
        return false;
    },
    delay: async (time) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, time);
        });
    },
}

export default Tools;
