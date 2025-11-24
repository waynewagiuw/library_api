# library_api

a. Persyaratan Sistem
-Node.js v20.19.5 ke atas<br>
-ExpressJS versi 5.1.0 <br>
-npm 10.8.2 ke atas<br>
-PostgreSQL sebagai database <br>
-Paket pendukung lain seperti cors, dotenv, nodemon, prisma, dan validator<br>

b. Langkah-langkah Instalasi Dependensi<br>
Inisialisasi project Node.js:<br>

-npm init -y<br>
-Install ExpressJS <br>

-Install dev dependency untuk pengembangan:<br>
-npm install express cors dotenv<br>

-Install Prisma client dan PostgreSQL adapter<br>
-npm install --save-dev nodemon @types/node @types/pg prisma<br>

-Inisialisasi Prisma dan generate client<br>
-npm install @prisma/client @prisma/adapter-pg pg validator<br>

-npx prisma init --db --output ../generated/prisma<br>

Push schema ke database dan migrasi:<br>
-npx prisma db pull<br>
-npx prisma generate<br>
-npx prisma migrate <br>

c. Perintah untuk Menjalankan Proyek<br>
Jalankan server dengan nodemon (untuk auto-restart saat ada perubahan):<br>
npx nodemon .<br>

Setelah server berjalan, akan muncul pesan:<br>
Server running on port 3000
