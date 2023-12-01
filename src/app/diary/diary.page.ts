import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.page.html',
  styleUrls: ['./diary.page.scss'],
})
export class DiaryPage implements OnInit {
  constructor(
    public _apiService: ApiService,
    private modal: ModalController,
    private router: Router
  ) {}
  dataDiary: any = [];
  modal_tambah = false;
  id: any;
  judul: any;
  isi_diary: any;
  ngOnInit() {
    this.getDiary();
  }
  getDiary() {
    this._apiService.tampil('tampil.php').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.dataDiary = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  reset_model() {
    this.id = null;
    this.judul = '';
    this.isi_diary = '';
  }
  open_modal_tambah(isOpen: boolean) {
    this.modal_tambah = isOpen;
    this.reset_model();
    this.modal_tambah = true;
    this.modal_edit = false;
  }
  cancel() {
    this.modal.dismiss();
    this.modal_tambah = false;
    this.reset_model();
  }
  tambahDiary() {
    if (this.judul != '' && this.isi_diary != '') {
      let data = {
        judul: this.judul,
        isi_diary: this.isi_diary,
      };
      this._apiService.tambah(data, '/tambah.php').subscribe({
        next: (hasil: any) => {
          this.reset_model();
          console.log('berhasil tambah diary');
          this.getDiary();
          this.modal_tambah = false;
          this.modal.dismiss();
        },
        error: (err: any) => {
          console.log('gagal tambah diary');
        },
      });
    } else {
      console.log('gagal tambah diary karena masih ada data yg kosong');
    }
  }
  hapusDiary(id: any) {
    this._apiService.hapus(id, '/hapus.php?id=').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.getDiary();
        console.log('berhasil hapus data');
      },
      error: (error: any) => {
        console.log('gagal');
      },
    });
  }
  ambilDiary(id: any) {
    this._apiService.lihat(id, '/lihat.php?id=').subscribe({
      next: (hasil: any) => {
        console.log('sukses', hasil);
        let diary = hasil;
        this.id = diary.id;
        this.judul = diary.judul;
        this.isi_diary = diary.isi_diary;
      },
      error: (error: any) => {
        console.log('gagal ambil data');
      },
    });
  }
  modal_edit = false;
  open_modal_edit(isOpen: boolean, idget: any) {
    this.modal_edit = isOpen;
    this.id = idget;
    console.log(this.id);
    this.ambilDiary(this.id);
    this.modal_tambah = false;
    this.modal_edit = true;
  }
  editDiary() {
    let data = {
      id: this.id,
      judul: this.judul,
      isi_diary: this.isi_diary,
    };
    this._apiService.edit(data, '/edit.php').subscribe({
      next: (hasil: any) => {
        console.log(hasil);
        this.reset_model();
        this.getDiary();
        console.log('berhasil edit Diary');
        this.modal_edit = false;
        this.modal.dismiss();
      },
      error: (err: any) => {
        console.log('gagal edit Diary');
      },
    });
  }
  goToLoginPage() {
    this.router.navigate(['/login']);
  }
}
