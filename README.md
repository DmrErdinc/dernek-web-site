<div align="center">

# 🏛️ Ölümsüz Kahramanlar Derneği

### Modern, Yönetim Panelli, Docker Destekli Profesyonel Dernek Web Sitesi

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

[Demo](#-ekran-görüntüleri) • [Özellikler](#-özellikler) • [Kurulum](#-kurulum) • [Dokümantasyon](#-kullanım)

</div>

---

## 📑 İçindekiler

- [🎯 Özellikler](#-özellikler)
- [🛠️ Teknoloji Stack](#️-teknoloji-stack)
- [🚀 Hızlı Başlangıç](#-hızlı-başlangıç)
- [📸 Ekran Görüntüleri](#-ekran-görüntüleri)
- [💻 Kullanım](#-kullanım)
- [🔒 Güvenlik](#-güvenlik)
- [🌐 Production Deployment](#-production-deployment)
- [📞 Destek](#-destek)

---

## 🎯 Özellikler

<table>
<tr>
<td width="50%">

### 🌐 Public Web Sitesi

- ✨ **Modern Tasarım** - Responsive ve kullanıcı dostu
- 🏠 **Ana Sayfa** - Hero slider, istatistikler
- 📰 **Haberler** - Kategorize edilmiş haber sistemi
- 📅 **Etkinlikler** - Etkinlik takvimi
- 🎯 **Projeler** - Dernek faaliyetleri
- 🖼️ **Galeri** - Fotoğraf galerisi
- 👥 **Yönetim Kurulu** - Üye profilleri
- 💰 **Bağış** - Banka hesap bilgileri
- 📞 **İletişim** - Form + Harita
- 💬 **WhatsApp** - Floating button

</td>
<td width="50%">

### 🔐 Admin Paneli

- 🎨 **Modern Dashboard** - İstatistikler ve özet
- ⚙️ **Site Ayarları** - Genel ayarlar
- 📝 **İçerik Yönetimi** - CRUD işlemleri
- 🖼️ **Görsel Yönetimi** - Upload sistemi
- 📊 **Kategori Yönetimi** - Organize içerik
- ✉️ **Mesaj Yönetimi** - İletişim formları
- 👤 **Kullanıcı Yönetimi** - Admin hesapları
- 📱 **Mobil Uyumlu** - Responsive admin
- 🔄 **Gerçek Zamanlı** - Anlık güncellemeler

</td>
</tr>
</table>

---

## 🛠️ Teknoloji Stack

<div align="center">

| Kategori | Teknoloji |
|----------|-----------|
| **Framework** | ![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js) |
| **Language** | ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript) |
| **Styling** | ![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css) |
| **Database** | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?logo=postgresql) |
| **ORM** | ![Prisma](https://img.shields.io/badge/Prisma-5.0-2D3748?logo=prisma) |
| **Auth** | ![NextAuth](https://img.shields.io/badge/NextAuth.js-4.0-purple) |
| **Container** | ![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker) |
| **UI Components** | ![Radix UI](https://img.shields.io/badge/Radix-UI-161618) |

</div>

---

## 🚀 Hızlı Başlangıç

### Gereksinimler

- 🐳 Docker & Docker Compose
- 📦 Node.js 20+ (opsiyonel)
- 💾 2GB+ RAM
- 💿 10GB+ Disk

### ⚡ 3 Adımda Kurulum

```bash
# 1️⃣ Projeyi klonlayın
git clone <repo-url>
cd stk2

# 2️⃣ Environment dosyasını oluşturun
cp .env.example .env

# 3️⃣ Docker ile başlatın
docker-compose up -d
docker-compose exec app npx prisma migrate deploy
docker-compose exec app npx prisma db seed
```

### 🎉 Hazır!

<table>
<tr>
<td align="center" width="50%">
<h3>🌐 Public Site</h3>
<a href="http://localhost:3000">http://localhost:3000</a>
</td>
<td align="center" width="50%">
<h3>🔐 Admin Panel</h3>
<a href="http://localhost:3000/admin/login">http://localhost:3000/admin/login</a>
<br><br>
<b>Kullanıcı:</b> <code>admin</code><br>
<b>Şifre:</b> <code>admin123</code>
</td>
</tr>
</table>

> ⚠️ **Önemli:** İlk girişten sonra şifrenizi değiştirin!

---

## 📸 Ekran Görüntüleri

### 🌐 Public Web Sitesi

<details open>
<summary><b>🏠 Ana Sayfa</b></summary>

#### Hero Bölümü
Modern ve etkileyici hero slider ile ziyaretçilerinizi karşılayın.

![Ana Sayfa Hero](docs/screenshots/homepage-hero.png)

#### İstatistikler ve Hızlı Erişim
Derneğinizin başarılarını sayılarla gösterin.

![Ana Sayfa İstatistikler](docs/screenshots/homepage-stats.png)

#### Son Haberler ve Etkinlikler
Güncel içeriklerinizi öne çıkarın.

![Ana Sayfa Haberler](docs/screenshots/homepage-news.png)

</details>

<details>
<summary><b>ℹ️ Hakkımızda</b></summary>

Derneğinizin misyon, vizyon ve değerlerini profesyonel bir şekilde sunun.

![Hakkımızda](docs/screenshots/about.png)

**Özellikler:**
- 📝 Misyon ve vizyon
- 🎯 Değerler
- 📜 Tarihçe
- 🎖️ Hedefler

</details>

<details>
<summary><b>📰 Haberler</b></summary>

Kategorize edilmiş, aranabilir haber sistemi.

![Haberler Listesi](docs/screenshots/news-list.png)

**Özellikler:**
- 🏷️ Kategori filtreleme
- 🔍 Arama özelliği
- 📅 Tarih sıralama
- 🖼️ Görsel destekli

</details>

<details>
<summary><b>📅 Etkinlikler</b></summary>

Yaklaşan ve geçmiş etkinliklerinizi sergileyin.

![Etkinlikler](docs/screenshots/events.png)

**Özellikler:**
- 📆 Takvim görünümü
- 📍 Konum bilgisi
- ⏰ Tarih ve saat
- 🎫 Detaylı açıklama

</details>

<details>
<summary><b>🎯 Faaliyetler ve Projeler</b></summary>

Derneğinizin yürüttüğü projeleri tanıtın.

![Faaliyetler](docs/screenshots/projects.png)

**Özellikler:**
- 📊 Proje kategorileri
- 🖼️ Çoklu görsel
- 📈 İlerleme durumu
- 📝 Detaylı açıklama

</details>

<details>
<summary><b>🖼️ Galeri</b></summary>

Fotoğraflarınızı kategorize edilmiş galeriler halinde sunun.

![Galeri](docs/screenshots/gallery.png)

**Özellikler:**
- 🗂️ Kategori sistemi
- 🔍 Lightbox görünüm
- 📱 Responsive grid
- ⚡ Hızlı yükleme

</details>

<details>
<summary><b>👥 Yönetim Kurulu</b></summary>

Yönetim kurulu üyelerinizi profesyonel kartlarla tanıtın.

![Yönetim Kurulu](docs/screenshots/board.png)

**Özellikler:**
- 👤 Profil fotoğrafları
- 💼 Görev unvanları
- 📝 Biyografi
- 🎨 Modern kartlar

</details>

<details>
<summary><b>📞 İletişim</b></summary>

İletişim formu ve harita entegrasyonu.

![İletişim](docs/screenshots/contact.png)

**Özellikler:**
- 📧 İletişim formu
- 🗺️ Google Maps
- 📱 İletişim bilgileri
- 🕐 Çalışma saatleri

</details>

<details>
<summary><b>💰 Bağış ve Destek</b></summary>

Banka hesap bilgileri ve bağış rehberi.

![Bağış](docs/screenshots/donation.png)

**Özellikler:**
- 🏦 Banka hesapları
- 💳 IBAN bilgileri
- 📋 Kopyalama butonu
- 📝 Ek açıklamalar

</details>

---

### 🔐 Admin Paneli

<details open>
<summary><b>🔑 Giriş Ekranı</b></summary>

Güvenli ve modern admin giriş ekranı.

![Admin Giriş](docs/screenshots/admin-login.png)

**Güvenlik Özellikleri:**
- 🔒 Şifreli giriş
- 🛡️ CSRF koruması
- 🔐 Session yönetimi
- ⏱️ Timeout kontrolü

</details>

<details>
<summary><b>📊 Dashboard</b></summary>

İstatistikler ve hızlı erişim paneli.

![Admin Dashboard](docs/screenshots/admin-dashboard.png)

**Dashboard Özellikleri:**
- 📈 İstatistik kartları
- 📋 Son eklenen içerikler
- ✉️ Okunmamış mesajlar
- 🔔 Yaklaşan etkinlikler

</details>

<details>
<summary><b>⚙️ Site Ayarları</b></summary>

Tüm site ayarlarını tek yerden yönetin.

![Site Ayarları](docs/screenshots/admin-settings.png)

**Ayarlanabilir Özellikler:**
- 🏢 Site bilgileri
- 📞 İletişim bilgileri
- 🌐 Sosyal medya
- 💬 WhatsApp numarası
- 🗺️ Harita koordinatları
- 🎨 Logo ve favicon

</details>

<details>
<summary><b>📰 Haber Yönetimi</b></summary>

Haber ekleme, düzenleme ve yönetimi.

![Haber Listesi](docs/screenshots/admin-news.png)

![Haber Düzenleme](docs/screenshots/admin-news-edit.png)

**Yönetim Özellikleri:**
- ✏️ WYSIWYG editör
- 🏷️ Kategori yönetimi
- 🖼️ Görsel yükleme
- 📅 Yayınlama tarihi
- 👁️ Önizleme modu
- 🔍 Arama ve filtreleme

</details>

<details>
<summary><b>📅 Etkinlik Yönetimi</b></summary>

Etkinlik oluşturma ve düzenleme.

![Etkinlik Yönetimi](docs/screenshots/admin-events.png)

**Yönetim Özellikleri:**
- 📆 Tarih seçici
- ⏰ Saat belirleme
- 📍 Konum bilgisi
- 🎫 Afiş yükleme
- 📝 Detaylı açıklama

</details>

<details>
<summary><b>🖼️ Galeri Yönetimi</b></summary>

Görsel yükleme ve kategori yönetimi.

![Galeri Yönetimi](docs/screenshots/admin-gallery.png)

**Yönetim Özellikleri:**
- 📤 Toplu yükleme
- 🗂️ Kategori sistemi
- ✂️ Görsel düzenleme
- 🔄 Sürükle-bırak
- 🗑️ Toplu silme

</details>

<details>
<summary><b>👥 Yönetim Kurulu Yönetimi</b></summary>

Yönetim kurulu üye yönetimi.

![Yönetim Kurulu Yönetimi](docs/screenshots/admin-board.png)

**Yönetim Özellikleri:**
- 👤 Profil yönetimi
- 📸 Fotoğraf yükleme
- 💼 Görev tanımları
- 📝 Biyografi
- 🔢 Sıralama

</details>

<details>
<summary><b>💰 Bağış Bilgileri</b></summary>

Banka hesap bilgileri yönetimi.

![Bağış Yönetimi](docs/screenshots/admin-donation.png)

**Yönetim Özellikleri:**
- 🏦 Banka hesapları
- 💳 IBAN bilgileri
- 📝 Açıklama metinleri
- ➕ Çoklu hesap

</details>

---

## 💻 Kullanım

### 🔐 İlk Giriş

1. Admin paneline gidin: `http://localhost:3000/admin/login`
2. Varsayılan bilgilerle giriş yapın:
   - **Kullanıcı:** `admin`
   - **Şifre:** `admin123`
3. ⚠️ **Hemen şifrenizi değiştirin!**

### ⚙️ Site Ayarları

<table>
<tr>
<td width="50%">

#### 1️⃣ Genel Bilgiler
- Site adı
- Site açıklaması
- Logo yükleme
- Favicon yükleme

</td>
<td width="50%">

#### 2️⃣ İletişim Bilgileri
- Telefon numarası
- E-posta adresi
- Adres bilgisi
- Çalışma saatleri

</td>
</tr>
<tr>
<td width="50%">

#### 3️⃣ Sosyal Medya
- Facebook
- Instagram
- Twitter
- YouTube
- LinkedIn

</td>
<td width="50%">

#### 4️⃣ Diğer Ayarlar
- WhatsApp numarası
- Harita koordinatları
- SEO ayarları
- Copyright metni

</td>
</tr>
</table>

### 📝 İçerik Yönetimi

#### Haber Ekleme

```
1. Haberler → Yeni Haber
2. Başlık ve özet girin
3. İçeriği yazın (WYSIWYG editör)
4. Kategori seçin
5. Kapak görseli yükleyin
6. Yayınlama durumunu seçin
7. Kaydet
```

#### Etkinlik Ekleme

```
1. Etkinlikler → Yeni Etkinlik
2. Başlık ve açıklama girin
3. Tarih ve saat seçin
4. Konum bilgisi ekleyin
5. Afiş yükleyin
6. Kaydet
```

#### Galeri Yönetimi

```
1. Galeri → Kategoriler (kategori oluşturun)
2. Galeri → Yeni Görsel
3. Görselleri yükleyin (çoklu)
4. Başlık ve açıklama ekleyin
5. Kategori seçin
6. Kaydet
```

---

## 🔒 Güvenlik

<table>
<tr>
<td width="33%">

### 🔐 Kimlik Doğrulama
- NextAuth.js
- Bcrypt hashing
- Session yönetimi
- CSRF koruması

</td>
<td width="33%">

### 🛡️ API Güvenliği
- Authentication
- Input validation
- SQL injection koruması
- XSS koruması

</td>
<td width="33%">

### 📁 Dosya Güvenliği
- Tip kontrolü
- Boyut limiti
- Güvenli adlandırma
- İzolasyon

</td>
</tr>
</table>

### 🔑 Güvenlik Önerileri

```env
# ✅ Güçlü secret key (min 32 karakter)
NEXTAUTH_SECRET="your-very-strong-secret-key-min-32-chars"

# ✅ HTTPS kullanın (production)
NEXTAUTH_URL="https://yourdomain.com"

# ✅ Güçlü veritabanı şifresi
DATABASE_URL="postgresql://user:STRONG_PASSWORD@host:5432/db"
```

---

## 🌐 Production Deployment

### 🚀 VPS Kurulumu

<details>
<summary><b>1️⃣ Sunucu Hazırlığı</b></summary>

```bash
# Sistem güncellemesi
sudo apt update && sudo apt upgrade -y

# Docker kurulumu
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Docker Compose kurulumu
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

</details>

<details>
<summary><b>2️⃣ Proje Kurulumu</b></summary>

```bash
# Projeyi klonlayın
git clone <repo-url> /var/www/kahramanlar-dernegi
cd /var/www/kahramanlar-dernegi

# Environment ayarlayın
cp .env.example .env
nano .env

# Başlatın
docker-compose up -d
docker-compose exec app npx prisma migrate deploy
docker-compose exec app npx prisma db seed
```

</details>

<details>
<summary><b>3️⃣ Nginx Reverse Proxy</b></summary>

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    client_max_body_size 10M;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

</details>

<details>
<summary><b>4️⃣ SSL Sertifikası</b></summary>

```bash
# Certbot kurulumu
sudo apt install certbot python3-certbot-nginx -y

# SSL sertifikası al
sudo certbot --nginx -d yourdomain.com

# Otomatik yenileme
sudo certbot renew --dry-run
```

</details>

---

## 🗄️ Veritabanı Yönetimi

### 💾 Yedekleme

```bash
# Yedek al
docker-compose exec db pg_dump -U postgres kahramanlar_dernegi > backup_$(date +%Y%m%d).sql

# Sıkıştırılmış yedek
docker-compose exec db pg_dump -U postgres kahramanlar_dernegi | gzip > backup.sql.gz
```

### 🔄 Geri Yükleme

```bash
# SQL dosyasından
docker-compose exec -T db psql -U postgres kahramanlar_dernegi < backup.sql

# Sıkıştırılmış dosyadan
gunzip < backup.sql.gz | docker-compose exec -T db psql -U postgres kahramanlar_dernegi
```

### 🔧 Prisma Komutları

```bash
# Migration oluştur
npx prisma migrate dev --name migration_name

# Production migration
npx prisma migrate deploy

# Prisma Studio
npx prisma studio
```

---

## 🐛 Sorun Giderme

<details>
<summary><b>🐳 Docker Sorunları</b></summary>

```bash
# Container'ları yeniden başlat
docker-compose restart

# Logları kontrol et
docker-compose logs -f app
docker-compose logs -f db

# Temizle ve yeniden oluştur
docker-compose down -v
docker-compose up -d --build
```

</details>

<details>
<summary><b>💾 Veritabanı Sorunları</b></summary>

```bash
# PostgreSQL'e bağlan
docker-compose exec db psql -U postgres -d kahramanlar_dernegi

# Connection string kontrol
echo $DATABASE_URL

# Veritabanını sıfırla
docker-compose exec app npx prisma migrate reset
```

</details>

<details>
<summary><b>🖼️ Görsel Yükleme Sorunları</b></summary>

```bash
# İzinleri kontrol et
ls -la public/uploads

# İzinleri düzelt
chmod -R 755 public/uploads
chown -R www-data:www-data public/uploads
```

</details>

---

## 📊 Performans

<table>
<tr>
<td width="33%" align="center">

### ⚡ Next.js
- Image Optimization
- Static Generation
- Code Splitting
- Font Optimization

</td>
<td width="33%" align="center">

### 💾 Database
- Connection Pooling
- Query Optimization
- Indexing
- Caching

</td>
<td width="33%" align="center">

### 🌐 CDN
- Static Assets
- Image CDN
- Global Distribution
- Edge Caching

</td>
</tr>
</table>

---

## 📞 Destek

<div align="center">

### İletişim Bilgileri

📧 **Email:** info@kahramanlardernegi.org

📱 **Telefon:** +90 (212) 555 0009

📍 **Adres:** Atatürk Mahallesi, Cumhuriyet Caddesi No:123, Kadıköy/İstanbul

---

### Sosyal Medya

[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/kahramanlardernegi)
[![Facebook](https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](https://facebook.com/kahramanlardernegi)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/kahramanlardernegi)
[![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtube.com/kahramanlardernegi)

</div>

---

## 📝 Lisans

Bu proje özel kullanım içindir. Tüm hakları saklıdır.

---

<div align="center">

### ⭐ Projeyi Beğendiyseniz Yıldız Vermeyi Unutmayın!

**Made with ❤️ by Ölümsüz Kahramanlar Derneği**

[⬆ Başa Dön](#️-ölümsüz-kahramanlar-derneği)

</div>