var Validation = function () {
    this.kiemTraRong = function (name, value, selectorErr) {
        if (value.trim() === "") {
            document.querySelector(selectorErr).innerHTML = name + " không được bỏ trống";
            return false;
        }
        document.querySelector(selectorErr).innerHTML = "";
        return true;
    }
    this.kiemTraSo = function (name, value, selectorErr) {
        var regexNumber = /^[0-9]+$/;
        if (value.match(regexNumber)) {
            document.querySelector(selectorErr).innerHTML = "";
            return true;
        }
        document.querySelector(selectorErr).innerHTML = name + " yêu cầu nhập số";
        return false;
    }
    this.kiemTraEmail = function(name,value,selectorErr){
        var regexEmail =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (value.match(regexEmail)) { //Nếu dữ liệu là số khớp với định dạng trả về true
            document.querySelector(selectorErr).innerHTML = '';
            return true;
        }
        document.querySelector(selectorErr).innerHTML = name + ' không hợp lệ!';
        return false;
    }
    this.kiemTraKyTu = function (name, value, selectorErr) {
        var regexLetter = /^[A-Z a-z]+$/;
        if (value.match(regexLetter)) { //Nếu dữ liệu là số khớp với định dạng trả về true
            document.querySelector(selectorErr).innerHTML = '';
            return true;
        }
        document.querySelector(selectorErr).innerHTML = name + ' yêu cầu nhập chữ!';
        return false;
    }
    this.kiemTraDoDai = function (name, value, selectorErr, minLength, maxLength) {
        if (value.trim().length >= minLength && value.trim().length <= maxLength) {
        
            return true;
        }
        document.querySelector(selectorErr).innerHTML += '<br />' + name + 'từ ' + minLength + ' đến ' + maxLength + ' ký tự';
        return false;
    }
}