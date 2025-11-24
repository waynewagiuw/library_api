# library_api

a. Persyaratan Sistem
-Node.js v20.19.5 ke atas
-ExpressJS versi 5.1.0 
-npm 10.8.2 ke atas
-PostgreSQL sebagai database 
-Paket pendukung lain seperti cors, dotenv, nodemon, prisma, dan validator

b. Langkah-langkah Instalasi Dependensi
Inisialisasi project Node.js:

-npm init -y
-Install ExpressJS 

-Install dev dependency untuk pengembangan:
-npm install express cors dotenv

-Install Prisma client dan PostgreSQL adapter
-npm install --save-dev nodemon @types/node @types/pg prisma

-Inisialisasi Prisma dan generate client
-npm install @prisma/client @prisma/adapter-pg pg validator

-npx prisma init --db --output ../generated/prisma

Push schema ke database dan migrasi:
-npx prisma generate
-npx prisma db push
-npx prisma migrate 

c. Perintah untuk Menjalankan Proyek
Jalankan server dengan nodemon (untuk auto-restart saat ada perubahan):
npx nodemon .

Setelah server berjalan, akan muncul pesan:
Server running on port 3000
