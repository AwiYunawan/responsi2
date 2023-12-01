<?php
    require 'koneksi.php';
    $input = file_get_contents('php://input');
    $data = json_decode($input,true);
    //terima data dari mobile
    $judul=trim($data['judul']);
    $isi_diary=trim($data['isi_diary']);
    http_response_code(201);
    if($judul!='' and $isi_diary!=''){
    $query = mysqli_query($koneksi,"insert into diary(judul,isi_diary) values('$judul','$isi_diary')");
    $pesan = true;
    }else{
    $pesan = false;
    }
    echo json_encode($pesan);
    echo mysqli_error($koneksi);
?>