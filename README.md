# The Wedding of Siska & Dimas

Website undangan online siap deploy.

## Struktur gambar yang mudah diganti

Semua foto ada di folder berikut:

```text
assets/images/logo.png
assets/images/cover.jpg
assets/images/profil-siska.jpg
assets/images/profil-dimas.jpg
assets/images/gallery-1.jpg
assets/images/gallery-2.jpg
assets/images/gallery-3.jpg
assets/images/gallery-4.jpg
assets/images/gallery-5.jpg
assets/images/gallery-6.jpg
assets/images/gallery-7.jpg
assets/images/gallery-8.jpg
assets/images/gallery-9.jpg
assets/images/gallery-10.jpg
```

Cara ganti foto: cukup replace file dengan nama yang sama. Tidak perlu edit kode.

## Audio

Musik ada di:

```text
assets/audio/background-music.wav
```

Ganti file tersebut kalau ingin memakai musik lain. Jika memakai MP3, ubah juga path/type di `index.html`.

## Edit data undangan

Data utama berada di object `inviteData` dalam `script.js`.

## Jalankan lokal

Bisa langsung buka `index.html`. Jika browser memblokir beberapa fitur, jalankan:

```bash
python3 -m http.server
```

Lalu buka `http://localhost:8000/wedding/index.html`.
