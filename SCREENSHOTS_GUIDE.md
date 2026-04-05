# 📸 Ekran Görüntüleri Alma Rehberi

Bu rehber, README.md dosyasında kullanılan tüm ekran görüntülerini nasıl alacağınızı gösterir.

## 🚀 Hazırlık

1. Projeyi başlatın:
```bash
npm run dev
```

2. Tarayıcınızda açın: http://localhost:3000

## 📋 Alınacak Ekran Görüntüleri Listesi

### 🌐 Public Web Sitesi (11 görsel)

| # | Dosya Adı | URL | Açıklama |
|---|-----------|-----|----------|
| 1 | `homepage-hero.png` | http://localhost:3000 | Ana sayfa hero bölümü (üst kısım) |
| 2 | `homepage-stats.png` | http://localhost:3000 | Ana sayfa istatistikler (scroll down) |
| 3 | `homepage-news.png` | http://localhost:3000 | Ana sayfa son haberler (scroll down) |
| 4 | `about.png` | http://localhost:3000/hakkimizda | Hakkımızda sayfası |
| 5 | `news-list.png` | http://localhost:3000/haberler | Haberler listesi |
| 6 | `events.png` | http://localhost:3000/etkinlikler | Etkinlikler sayfası |
| 7 | `projects.png` | http://localhost:3000/faaliyetler | Faaliyetler/Projeler sayfası |
| 8 | `gallery.png` | http://localhost:3000/galeri | Galeri sayfası |
| 9 | `board.png` | http://localhost:3000/yonetim | Yönetim kurulu sayfası |
| 10 | `contact.png` | http://localhost:3000/iletisim | İletişim sayfası |
| 11 | `donation.png` | http://localhost:3000/bagis | Bağış sayfası |

### 🔐 Admin Paneli (9 görsel)

| # | Dosya Adı | URL | Açıklama |
|---|-----------|-----|----------|
| 12 | `admin-login.png` | http://localhost:3000/admin/login | Admin giriş ekranı |
| 13 | `admin-dashboard.png` | http://localhost:3000/admin | Dashboard (giriş yaptıktan sonra) |
| 14 | `admin-settings.png` | http://localhost:3000/admin/ayarlar | Site ayarları |
| 15 | `admin-news.png` | http://localhost:3000/admin/haberler | Haber listesi |
| 16 | `admin-news-edit.png` | http://localhost:3000/admin/haberler/[id] | Haber düzenleme (bir habere tıklayın) |
| 17 | `admin-events.png` | http://localhost:3000/admin/etkinlikler | Etkinlik yönetimi |
| 18 | `admin-gallery.png` | http://localhost:3000/admin/galeri | Galeri yönetimi |
| 19 | `admin-board.png` | http://localhost:3000/admin/yonetim-kurulu | Yönetim kurulu yönetimi |
| 20 | `admin-donation.png` | http://localhost:3000/admin/bagis | Bağış bilgileri |

## 📸 Ekran Görüntüsü Alma Adımları

### Windows:
1. Sayfayı açın
2. `Windows + Shift + S` tuşlarına basın
3. Ekran görüntüsü alanını seçin
4. `docs/screenshots/` klasörüne kaydedin

### macOS:
1. Sayfayı açın
2. `Cmd + Shift + 4` tuşlarına basın
3. Ekran görüntüsü alanını seçin
4. `docs/screenshots/` klasörüne kaydedin

### Tarayıcı Eklentisi (Önerilen):
- **Awesome Screenshot** veya **Fireshot** eklentisini kullanın
- Tam sayfa ekran görüntüsü alabilirsiniz
- Otomatik olarak kaydedebilirsiniz

## 🎯 Öneriler

1. **Çözünürlük:** 1920x1080 veya daha yüksek
2. **Format:** PNG (daha kaliteli)
3. **Boyut:** Mümkünse 500KB altında tutun
4. **İçerik:** Gerçek içerik varsa daha iyi görünür
5. **Zoom:** %100 zoom seviyesinde alın

## ✅ Kontrol Listesi

Tüm görselleri aldıktan sonra:

```bash
# Görselleri kontrol edin
ls -la docs/screenshots/

# Git'e ekleyin
git add docs/screenshots/
git commit -m "Ekran görüntüleri eklendi"
git push origin main
```

## 🔐 Admin Giriş Bilgileri

- **Kullanıcı Adı:** admin
- **Şifre:** admin123

## 📝 Notlar

- Tüm görseller `docs/screenshots/` klasörüne kaydedilmelidir
- Dosya adları README.md'deki referanslarla tam olarak eşleşmelidir
- Görseller PNG formatında olmalıdır
- Kişisel bilgiler varsa blur/mozaik uygulayın