# Ölümsüz Kahramanlar Derneği - Hızlı Kurulum Rehberi

## 🚀 Hızlı Başlangıç (5 Dakika)

### Adım 1: Projeyi İndirin

```bash
git clone <repository-url>
cd stk2
```

### Adım 2: Environment Dosyasını Hazırlayın

```bash
cp .env.example .env
```

### Adım 3: Docker ile Başlatın

```bash
docker-compose up -d
```

### Adım 4: Siteye Erişin

- **Ana Site:** http://localhost:3000
- **Admin Panel:** http://localhost:3000/admin/login
  - Email: `admin@kahramanlardernegi.org`
  - Şifre: `Admin123!`

## ✅ Kurulum Tamamlandı!

Site artık çalışıyor. İlk yapmanız gerekenler:

1. Admin paneline giriş yapın
2. Şifrenizi değiştirin
3. Site ayarlarını düzenleyin
4. İçerik eklemeye başlayın

## 🔧 Geliştirme Modu (Opsiyonel)

Eğer kod üzerinde çalışmak istiyorsanız:

```bash
# Bağımlılıkları yükle
npm install

# Sadece veritabanını başlat
docker-compose up -d db

# Prisma setup
npx prisma generate
npx prisma migrate dev
npm run prisma:seed

# Development server
npm run dev
```

## 📝 Önemli Notlar

### Güvenlik
- İlk girişten sonra admin şifresini mutlaka değiştirin
- Production'da `.env` dosyasındaki `NEXTAUTH_SECRET` değerini değiştirin
- Güçlü veritabanı şifresi kullanın

### Yedekleme
```bash
# Veritabanı yedeği
docker-compose exec db pg_dump -U postgres kahramanlar_dernegi > backup.sql

# Uploads yedeği
docker cp kahramanlar_app:/app/public/uploads ./uploads_backup
```

### Güncelleme
```bash
git pull
docker-compose down
docker-compose up -d --build
```

## 🆘 Sorun mu Yaşıyorsunuz?

### Container başlamıyor
```bash
docker-compose logs app
docker-compose down
docker-compose up -d
```

### Veritabanı bağlantı hatası
```bash
docker-compose ps
docker-compose logs db
```

### Port çakışması
`docker-compose.yml` dosyasında portları değiştirin:
```yaml
ports:
  - "3001:3000"  # 3000 yerine 3001
```

## 📚 Detaylı Dokümantasyon

Daha fazla bilgi için `README.md` dosyasına bakın.

## 🎯 Sonraki Adımlar

1. ✅ Admin paneline giriş yaptınız mı?
2. ✅ Şifrenizi değiştirdiniz mi?
3. ✅ Site ayarlarını düzenlediniz mi?
4. ✅ İlk haberinizi eklediniz mi?
5. ✅ İlk etkinliğinizi oluşturdunuz mu?

Tebrikler! Siteniz hazır. 🎉