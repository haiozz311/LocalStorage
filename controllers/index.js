var mangNhanVien = [];
var validate = new Validation();
document.querySelector('#btnThemNV').onclick = function () {
    var nhanvien = new NhanVien();
    nhanvien.maNhanVien = document.querySelector('#msnv').value;
    nhanvien.tenNhanVien = document.querySelector('#name').value;
    nhanvien.email = document.querySelector('#email').value;
    nhanvien.matKhau = document.querySelector('#password').value;
    nhanvien.ngayLam = document.querySelector('#datepicker').value;
    nhanvien.chucVu = document.querySelector('#chucvu').value;

    // kiểm tra rỗng 

    var valid = true;
    console.log(valid);

    valid = validate.kiemTraRong('Mã nhân viên ', nhanvien.maNhanVien, '#tbMaNV') &
        validate.kiemTraRong('Tên nhân viên ', nhanvien.tenNhanVien, '#tbTen') & validate.kiemTraRong('Mật khẩu', nhanvien.matKhau, '#tbMatKhau') & validate.kiemTraRong('Ngày lam', nhanvien.ngayLam, '#tbNgay') &
        validate.kiemTraSo('Mã nhân viên ', nhanvien.maNhanVien, '#tbMaNV') & validate.kiemTraEmail('Email', nhanvien.email, '#tbEmail') & validate.kiemTraKyTu('Tên nhân viên', nhanvien.tenNhanVien, '#tbTen') &
        validate.kiemTraDoDai('Mã nhân viên', nhanvien.maNhanVien, '#tbMaNV', 4, 6);
    if (!valid) {
        return;
    }

    mangNhanVien.push(nhanvien);
    // console.log(mangNhanVien);
    taoBang();
    reset();
    document.querySelector('#btnDong').click();
    luuLocalStorage();
    layDuLieuStorage();
}

var taoBang = function () {
    var contentTable = '';
    for (let index = 0; index < mangNhanVien.length; index++) {
        var obNhanVien = mangNhanVien[index];
        contentTable += `
        <tr>
            <td>${obNhanVien.maNhanVien}</td>
            <td>${obNhanVien.tenNhanVien}</td>
            <td>${obNhanVien.email}</td>
            <td>${obNhanVien.ngayLam}</td>
            <td>${obNhanVien.chucVu}</td>
            <td><button class="btn btn-danger" onclick="xoaNhanVien('${obNhanVien.maNhanVien}')">Xóa</button></td>
            <td><button class="btn btn-success" onclick="suaNhanVien('${obNhanVien.maNhanVien}')">Sữa</button></td>
        </tr>
        `
    }
    document.querySelector('#tableDanhSach').innerHTML = contentTable;
}
var reset = function () {
    document.querySelector('#msnv').value = "";
    document.querySelector('#name').value = "";
    document.querySelector('#email').value = "";
    document.querySelector('#password').value = "";
    document.querySelector('#password').value = "";
    document.querySelector('#datepicker').value = "";
    // document.querySelector('#chucvu').value = "";

}

var luuLocalStorage = function () {
    var smangNhanVien = JSON.stringify(mangNhanVien);
    localStorage.setItem('mangNhanVien', smangNhanVien);
    console.log(smangNhanVien);
}

var layDuLieuStorage = function () {
    if (localStorage.getItem('mangNhanVien')) {
        var smangNhanVien = localStorage.getItem('mangNhanVien');
        mangNhanVien = JSON.parse(smangNhanVien);
        taoBang();
    }
}
document.querySelector('#btnGetStorage').onclick = layDuLieuStorage;

var xoaNhanVien = function (maNv) {
    for (let index = mangNhanVien.length - 1; index >= 0; index--) {
        var nhanvien = mangNhanVien[index];
        if (nhanvien.maNhanVien === maNv) {
            mangNhanVien.splice(index, 1);
        }
    }
    // console.log(mangNhanVien);
    taoBang();
    luuLocalStorage();
}

var suaNhanVien = function (maNv) {
    for (let index = 0; index < mangNhanVien.length; index++) {
        var nhanvien = mangNhanVien[index];
        if (nhanvien.maNhanVien === maNv) {
            document.querySelector('#btnThem').click();
            document.getElementById('msnv').value = nhanvien.maNhanVien;
            document.getElementById('name').value = nhanvien.tenNhanVien;
            document.getElementById('email').value = nhanvien.email;
            document.getElementById('password').value = nhanvien.matKhau;
            document.getElementById('datepicker').value = nhanvien.ngayLam;
            document.getElementById('chucvu').value = nhanvien.chucVu;
        }
    }
}
//cập nhật
document.querySelector('#btnCapNhat').onclick = function () {
    var nhanVienUpdate = new NhanVien();
    nhanVienUpdate.maNhanVien = document.getElementById('msnv').value;
    nhanVienUpdate.tenNhanVien = document.getElementById('name').value;
    nhanVienUpdate.email = document.getElementById('email').value;
    nhanVienUpdate.matKhau = document.getElementById('password').value;
    nhanVienUpdate.ngayLam = document.getElementById('datepicker').value;
    nhanVienUpdate.chucVu = document.getElementById('chucvu').value;
    console.log(nhanVienUpdate);
    for (let index = 0; index < mangNhanVien.length; index++) {
        var nhanvien = mangNhanVien[index];
        if (nhanvien.maNhanVien === nhanVienUpdate.maNhanVien) {
            nhanvien.tenNhanVien = nhanVienUpdate.tenNhanVien;
            nhanvien.email = nhanVienUpdate.email;
            nhanvien.matKhau = nhanVienUpdate.matKhau;
            nhanvien.ngayLam = nhanVienUpdate.ngayLam;
            nhanvien.chucVu = nhanVienUpdate.chucVu;
        }
    }
    taoBang();
    luuLocalStorage();
    document.getElementById('btnDong').click();
}

//Chức năng tìm kiếm

document.getElementById('btnTimNV').onclick = function () {
    var tuKhoa = document.getElementById('searchName').value;
    var mangNhanVienTimKiem = [];
    for (var index = 0; index < mangNhanVien.length; index++) {
        var nhanVien = mangNhanVien[index];
        //Nếu tên nhân viên chứa từ khóa
        //trim(): loại bỏ khoảng trống đầu cuối của chuỗi
        //toLowerCase(): chuyển đổi chuỗi tất cả thành chữ thường
        if (nhanVien.tenNhanVien.trim().toLowerCase().search(tuKhoa.trim().toLowerCase()) != -1) {
            mangNhanVienTimKiem.push(nhanVien);
        }
    }
    // console.log('mangNhanVienTimKiem',mangNhanVienTimKiem);
    loadTableNhanVien(mangNhanVienTimKiem);
}
