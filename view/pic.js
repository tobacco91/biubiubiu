;(function() {
    var file,
        state = true,
		currentSize = 0,
        partSize = 1024 * 2;
    var $ = function(selector) {
        if(document.querySelectorAll(selector).length === 1) {
            return document.querySelector(selector);
        } else {
            return document.querySelectorAll(selector);
        }
    }



    var upload = function(file) {
        if(state){
            var formData = new FormData();
            formData.append('fileName',file.name);
            formData.append('filePart',file.slice(currentSize,currentSize+partSize))
            var xhr = new XMLHttpRequest();
            xhr.upload.addEventListener('progress', function (e) {
                $('.current').style.width = (currentSize + e.loaded) / file.size * 100 + '%';
            }, false);
            xhr.open("POST", "/pic.html", true);
            xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            var  a = formData.getAll('fileName')[0];
            var  b = formData.getAll('filePart')[0];
            xhr.send('a='+a+'&b='+b);
            xhr.addEventListener('readystatechange', function() {
                if(xhr.readyState == 200 && xhr.status == 4){
                    currentSize += partSize;
                    if(currentSize < file.size) {
                        upload(file);
                    }
                }
            })
            
        }
    }




    $('#file').addEventListener('change', function() {
        file = this.files[0];
        console.log(file);
        $('.description').innerHTML = '文件' + file.name + "大小为" + file.size;
    });
    $('#up').addEventListener('click', function(e) {
        upload(file);
    });
    
})()