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
    if (!file)
        return false;
    progressListContainer.innerHTML = '';
    fileSliceUpload(file, handleXhrProgressCallback, handleXhrSuccessCallback);
}

/**
 * @name handleXhrProgressCallback
 * @description 上传chunk的 progress 事件处理
 * @param form // 上传的表单数据
 * @param e // 事件处理
 */
function handleXhrProgressCallback(total, index, e) {
    const liHtm = document.createElement('li');
    liHtm.innerText = `当前上传第 ${index + 1} 个chunk，共计 ${total}`;
    progressListContainer.appendChild(liHtm);
}
// 上传成功处理
function handleXhrSuccessCallback(data) {
    const imgShowContainer = document.getElementById("imgShowContainer");
    imgShowContainer.innerHTML = ''; // 清空显示的内容
    if (data.code === -1) {
        return alert('上传失败');
    }
    const img = document.createElement('img');
    img.style.maxWidth = '300px';
    img.src = `uploads/${data.data.path}`;
    img.onload = () => {
        const linkElem = document.getElementById('imgUrlLink');
        linkElem.setAttribute('href', img.src);
        linkElem.innerText = img.src;
        imgShowContainer.appendChild(img);
    };
}
// 上传失败处理
function handleXhrErrorCallback(err) {
    console.log(err);
}

/**
 * @name fileSliceUpload
 * @description 文件分片上传操作
 * @param file 文件File
 * @param handleXhrProgressCallback // progress事件回调
 * @param handleXhrSuccessCallback // 请求成功事件回调
 * @param handleXhrErrorCallback // 请求失败事件
 */
function fileSliceUpload(file, handleXhrProgressCallback, handleXhrSuccessCallback, handleXhrErrorCallback) {
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
        axiosArray.push(axios.post('/upload_chunks', form, axiosOptions));
    }
    // 所有分片上传后，请求合并分片文件
    axios.all(axiosArray).then(() => {
        // 合并chunks
        const data = {
            name: file.name,
            total: blockCount,
            ext,
            hash
        };
        axios.post('/merge_chunks', data).then((res) => {
            handleXhrSuccessCallback(res.data);
            clearFileInput();
        }).catch((err) => {
            handleXhrErrorCallback(err);
            clearFileInput();
        });
    });
}