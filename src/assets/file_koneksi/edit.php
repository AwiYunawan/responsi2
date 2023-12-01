<?php
    require 'koneksi.php';
    $input = file_get_contents('php://input');
    $data = json_decode($input,true);
    //terima data dari mobile
    $id=trim($data['id']);
    $judul=trim($data['judul']);
    $isi_diary=trim($data['isi_diary']);
    http_response_code(201);
    if($judul!='' and $isi_diary!=''){
    $query = mysqli_query($koneksi,"update diary set judul='$judul',isi_diary='$isi_diary' where
    id='$id'");
    $pesan = true;
    }else{
    $pesan = false;
    }
    echo json_encode($pesan);
    echo mysqli_error($koneksi);
?>