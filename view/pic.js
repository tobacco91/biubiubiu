;(function() {
    var file,
		startSize,
        partSize = 1024 * 2;
    var $ = function(selector) {
        if(document.querySelectorAll(selector).length === 1) {
            return document.querySelector(selector);
        } else {
            return document.querySelectorAll(selector);
        }
    }

    $('#file').addEventListener('change', function() {
        file = this.files[0];
        console.log(file);
        $('.description').innerHTML = '文件' + file.name + "大小为" + file.size;
    });
    $('#up').addEventListener('click', function(e) {
        var formData = new FormData();
        formData.append('fileName',file.name);
        formData.append('filePart',file.slice(0,0+2*1024))
        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener('progress', function (e) {
            $('.current').style.width = (currentPosition + e.loaded) / file.size * 100 + '%';
        }, false);
		 xhr.open("POST", "./app.js", true);
    });
    
})()