// 一些全局变量
const fileInput = document.getElementById("fileInput");
const progressListContainer = document.getElementById('progressListContainer');

// 触发文件表单选择文件
function handleActiveFileInput() {
    fileInput.click();
}
// 清除file input 的value内容
function clearFileInput() {
    fileInput.setAttribute('value', '');
}
// 文件选择变化处理
function handleFileInputChange() {
    const file = fileInput.files[0];
    if (!file) {
        return false;
    }
    progressListContainer.innerHTML = '';
    fileSliceUpload(file);
}

/**
 * @name 
 * @description 上传chunk的 progress 事件处理
 * @param form  上传的表单数据
 * @param e     事件处理
 */
function handleXhrProgressCallback(total, index, e) {
    const liHtm = document.createElement('li');
    liHtm.innerText = `当前上传第 ${index + 1} 个chunk，共计 ${total}`;
    progressListContainer.innerHTML = '';
    progressListContainer.appendChild(liHtm);
}

/**
 * 上传成功处理
 * @param {*} data 返回数据
 * @param {*} ext  文件后缀
 */
function handleXhrSuccessCallback(data, ext) {
    const imgShowContainer = document.getElementById("imgShowContainer");
    imgShowContainer.innerHTML = ''; // 清空显示的内容
    if (data.code === -1) {
        return alert('上传失败');
    }
    const linkElem = document.getElementById('imgUrlLink');
    const filePath = `uploads/${data.data.path}`;
    if ((/jpg|jpeg|png|gif/g).test(ext)) {
        const img = document.createElement('img');
        img.style.maxWidth = '300px';
        img.src = filePath;
        img.onload = () => {
            imgShowContainer.appendChild(img);
            linkElem.setAttribute('href', img.src);
            linkElem.innerText = img.src;
        };
    } else {
        linkElem.setAttribute('href', filePath);
        linkElem.innerText = filePath;
    }
}
// 上传失败处理
function handleXhrErrorCallback(err) {
    document.getElementById('imgShowContainer').innerHTML = JSON.stringify(err);
}

function _axios(form, axiosOptions) {
    return axios.post('/upload_chunks', form, axiosOptions)
}

/**
 * @name 
 * @description 文件分片上传操作
 * @param file  文件File
 */
function fileSliceUpload(file) {
    const eachSize = 2 * 1024 * 1024; // 每个chunks的大小
    const blockCount = Math.ceil(file.size / eachSize); // 分片总数
    const axiosArray = []; // axiosPromise数组
    let ext = file.name.split('.');
    ext = ext[ext.length - 1]; // 获取文件后缀名
    // 文件 hash 实际应用时，hash需要更加复杂，确保唯一性，可以使用uuid
    let hash = (new libs).getUUID();
    // 处理每个分片的上传操作
    for (let i = 0; i < blockCount; i++) {
        let start = i * eachSize,
            end = Math.min(file.size, start + eachSize);
        // 构建表单
        const form = new FormData();
        form.append('file', file.slice(start, end));
        form.append('name', file.name);
        form.append('total', blockCount);
        form.append('ext', ext);
        form.append('index', i);
        form.append('size', file.size);
        form.append('hash', hash);
        // ajax提交分片，此时 content-type 为 multipart/form-data
        const axiosOptions = ((number) => {
            return {
                onUploadProgress: (e) => {
                    handleXhrProgressCallback(blockCount, number, e)
                }
            }
        })(i);
        // 加入到 Promise 数组中
        axiosArray.push((function(form, axiosOptions) {
            return async function() {
                return await axios.post('/upload_chunks', form, axiosOptions)
            }
        })(form, axiosOptions));
    }
    runLazy().loadFn(axiosArray).sleepFirst(1).callback((function(file, blockCount, ext, hash) {
        return async function() {
            const data = {
                name: file.name,
                total: blockCount,
                ext,
                hash
            };
            return await axios.post('/merge_chunks', data).then((res) => {
                handleXhrSuccessCallback(res.data, ext);
                clearFileInput();
                return res.data;
            }).catch((err) => {
                handleXhrErrorCallback(err);
                clearFileInput();
                return { error: JSON.stringify(err) };
            });
        }
    })(file, blockCount, ext, hash));
}

/**
 * 序列化请求
 */
function LazyManClass() {
    this.taskList = [];

    this.next = async function() {
        for (var task in this.taskList) {
            let res = await this.taskList[task]();
            if (res.data && res.code == 0) {
                console.log(res.msg);
            }
        }
        return this;
    }

    this.loadFn = function(array) {
        var that = this;
        var _index = 0;
        for (var key in array) {
            this.taskList.push(array[key]);
            _index++;
        }
        return this;
    }

    this.sleepFirst = function(time) {
        console.log(`sleepFirst ${time}s.`);
        return this;
    }

    this.callback = function(fn) {
        this.taskList.push(fn);
        this.next();
        return this;
    }
}

function runLazy() {
    return new LazyManClass();
}