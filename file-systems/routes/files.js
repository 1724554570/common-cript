var express = require('express');
var router = express.Router();

var fs = require('fs');
var path = require('path');
var uploadChunksMiddleware = require('../middlewares/upload-chunks');

const fileBasePath = 'uploads';
const chunkBasePath = '~uploads';

/**
 * 获取文件列表
 * @param {*} req 
 * @param {*} res 
 */
function getFilePathAction(req, res) {
    let readPath = `${fileBasePath}`;
    let query_path = req.params.path || req.query.path;
    if (query_path) {
        readPath = `${fileBasePath}/${query_path}`;
    }
    const chunks = fs.readdirSync(readPath);
    let rootPath = query_path ? `${query_path}/` : '';
    return { readPath, chunks, rootPath };
}

// 上传页面
router.get('/fileupload', (req, res) => {
    res.render('files/upload', { title: '文件上传', o: 'active' });
});

// 上传chunks
router.post('/upload_chunks', uploadChunksMiddleware, (req, res) => {
    var _object = req.body;
    if (Object.keys(req.body).length < 1) {
        _object = req.query;
    }
    var copyPath = req.file && req.file.path;
    if (!copyPath) {
        copyPath = `${chunkBasePath}/${_object.hash}`;
    }
    // 创建chunk的目录
    const chunkTmpDir = `${chunkBasePath}/${_object.hash}/`;
    // 判断目录是否存在
    if (!fs.existsSync(chunkTmpDir)) fs.mkdirSync(chunkTmpDir);
    // 移动切片文件
    fs.renameSync(copyPath, `${chunkTmpDir}${_object.hash}-${_object.index}`);
    res.send(req.file);
});

// 文件分片
router.post('/merge_chunks', (req, res) => {
    var _object = req.body;
    if (Object.keys(req.body).length < 0) {
        _object = req.query;
    }
    const D = new Date();
    const total = _object.total;
    const hash = _object.hash;
    const saveDir = `${fileBasePath}/${D.getFullYear()}${D.getMonth() + 1<10?('0'+D.getMonth() + 1):'0'+D.getMonth() + 1}${D.getDate()<10?('0'+D.getDate()):D.getDate()}`;
    const savePath = `${saveDir}/${hash}.${_object.ext}`;
    const chunkDir = `${chunkBasePath}/${hash}/`;
    try {
        // 创建保存的文件夹(如果不存在)
        if (!fs.existsSync(saveDir)) {
            fs.mkdirSync(saveDir, { recursive: true });
        }
        // 创建文件
        fs.writeFileSync(savePath, '');
        // 读取所有的chunks 文件名存放在数组中
        const chunks = fs.readdirSync(`${chunkBasePath}/${hash}`);
        // 检查切片数量是否正确
        if (chunks.length !== total || chunks.length === 0) return res.send({ code: -1, msg: '切片文件数量不符合' });
        for (let i = 0; i < total; i++) {
            var cs = fs.readFileSync(chunkDir + hash + '-' + i);
            // 追加写入到文件中
            fs.appendFileSync(savePath, cs);
            // 删除本次使用的chunk
            //fs.unlinkSync(chunkDir + hash + '-' + i);
        }
        // 删除chunk的文件夹
        // fs.rmdirSync(chunkDir);
        // 返回uploads下的路径，不返回uploads
        res.json({ code: 0, msg: '文件上传成功', data: { path: savePath.replace(`${fileBasePath}/`, '') } });
    } catch (err) {
        res.json({ code: -1, msg: '出现异常,上传失败' });
    }
});

// 返回文件
router.get('/uploads/:dir/:path', (req, res) => {
    const url = path.resolve(__dirname, `../${fileBasePath}/${req.params.dir}/${req.params.path}`);
    // res.type('png').sendFile(url);
    res.sendFile(url);
});

router.get('/getfilelist/:path', (req, res) => {
    let result = getFilePathAction(req, res);
    res.render('files/list', { title: '文件列表', chunks: result.chunks, path: result.rootPath });
});

router.get('/getfilelist', (req, res) => {
    let result = getFilePathAction(req, res);
    res.render('files/list', { title: '文件列表', chunks: result.chunks, path: result.rootPath });
});


module.exports = router;
