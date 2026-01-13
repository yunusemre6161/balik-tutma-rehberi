# Balık Tutma Rehberi

Türkiye'deki balık türleri, av alanları, ekipmanlar ve av sezonları hakkında kapsamlı bilgi sunan Next.js tabanlı web uygulaması.

## Özellikler

- 🐟 Balık türleri ve detaylı bilgileri
- 🗺️ İnteraktif Türkiye haritası ile av alanları
- 🎣 Balıkçılık ekipmanları rehberi
- 📅 Av sezonları takibi
- 🗄️ PostgreSQL veritabanı entegrasyonu
- 🎨 Modern ve responsive tasarım

## Gereksinimler

### Docker ile (Önerilen - Tüm platformlar)
- Docker Desktop (Windows/macOS) veya Docker Engine (Linux)
- Docker Compose

### Manuel kurulum için
- Node.js 18.x veya üzeri
- PostgreSQL veritabanı
- npm veya yarn

**Windows Kullanıcıları için Not:**
- Docker ile kurulum en kolay ve sorunsuz yöntemdir
- Manuel kurulum için PostgreSQL indirmeniz gerekir: https://www.postgresql.org/download/windows/

## Kurulum

### 🚀 Hızlı Kurulum (Docker ile - Önerilen)

En kolay ve hızlı kurulum yöntemi. **Windows, macOS ve Linux**'ta çalışır. Sadece Docker yüklü olması gerekiyor.

1. **Projeyi klonlayın**
```bash
git clone https://github.com/yunusemre6161/balik-tutma-rehberi.git
cd balik-tutma-rehberi
```

2. **Docker Compose ile başlatın**
```bash
docker-compose up
```

Bu kadar! Proje otomatik olarak:
- PostgreSQL veritabanını oluşturacak
- Tüm bağımlılıkları yükleyecek
- Veritabanı tablolarını oluşturacak
- Örnek verileri yükleyecek
- Uygulamayı başlatacak

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

**İpucu:** Arka planda çalıştırmak için:
```bash
docker-compose up -d
```

**Durdurmak için:**
```bash
docker-compose down
```

**Not:** `docker-compose up` development modunda çalışır ve kod değişikliklerini otomatik algılar (Hot Reload).

**Production build için:**
```bash
docker-compose -f docker-compose.prod.yml up
```

---

### 🛠️ Manuel Kurulum (Docker olmadan)

#### Otomatik Kurulum Scripti

En kolay yol, setup scriptini çalıştırmak:

**Linux / macOS:**
```bash
git clone https://github.com/yunusemre6161/balik-tutma-rehberi.git
cd balik-tutma-rehberi
./setup.sh
```

**Windows (CMD veya PowerShell):**
```bash
git clone https://github.com/yunusemre6161/balik-tutma-rehberi.git
cd balik-tutma-rehberi
setup.bat
```

**Windows (Git Bash / WSL):**
```bash
git clone https://github.com/yunusemre6161/balik-tutma-rehberi.git
cd balik-tutma-rehberi
./setup.sh
```

Script sizin için:
- Bağımlılıkları yükleyecek
- .env dosyasını oluşturacak
- Veritabanını hazırlayacak
- Örnek verileri yükleyecek
- Sunucuyu başlatacak

#### Manuel Adımlar

1. **Projeyi klonlayın**
```bash
git clone https://github.com/yunusemre6161/balik-tutma-rehberi.git
cd balik-tutma-rehberi
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Ortam değişkenlerini ayarlayın**
```bash
cp .env.example .env
```

`.env` dosyasını düzenleyin ve kendi PostgreSQL bağlantı bilgilerinizi girin:
```
DATABASE_URL="postgresql://kullanici:sifre@localhost:5432/balik_tutma_rehberi"
```

4. **PostgreSQL veritabanını oluşturun**
```bash
createdb balik_tutma_rehberi
```

5. **Veritabanı tablolarını oluşturun**
```bash
npx prisma generate
npx prisma db push
```

6. **Örnek verileri yükleyin**
```bash
npm run seed
```

7. **Geliştirme sunucusunu başlatın**
```bash
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## Kullanılabilir Komutlar

- `npm run dev` - Geliştirme sunucusunu başlatır
- `npm run build` - Production için projeyi derler
- `npm start` - Production sunucusunu başlatır
- `npm run lint` - Kod kalitesi kontrolü yapar
- `npm run seed` - Veritabanına örnek verileri yükler

## Teknolojiler

- **Frontend:** Next.js 16, React 19, TypeScript
- **Stil:** Tailwind CSS 4
- **Veritabanı:** PostgreSQL, Prisma ORM
- **Harita:** Leaflet, React Leaflet
- **İkonlar:** Lucide React

## Proje Yapısı

```
├── app/                    # Next.js App Router sayfaları
│   ├── api/               # API rotaları
│   ├── balik-turleri/     # Balık türleri sayfaları
│   ├── av-alanlari/       # Av alanları sayfası
│   ├── ekipmanlar/        # Ekipmanlar sayfası
│   └── av-sezonlari/      # Av sezonları sayfası
├── frontend/              # Frontend bileşenleri
│   ├── components/        # React bileşenleri
│   └── pages/            # Sayfa bileşenleri
├── backend/               # Backend logic
│   ├── controllers/       # API controller'ları
│   └── lib/              # Yardımcı kütüphaneler
├── shared/                # Paylaşılan tipler ve veriler
│   ├── data/             # Statik veri dosyaları
│   └── types/            # TypeScript tip tanımları
├── prisma/                # Prisma schema ve migrations
└── public/                # Statik dosyalar

```

## Katkıda Bulunma

1. Bu repository'yi fork edin
2. Feature branch'i oluşturun (`git checkout -b feature/yeniOzellik`)
3. Değişikliklerinizi commit edin (`git commit -m 'Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/yeniOzellik`)
5. Pull Request oluşturun

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## İletişim

Yunus Emre - [@yunusemre6161](https://github.com/yunusemre6161)

Proje Linki: [https://github.com/yunusemre6161/balik-tutma-sitesi](https://github.com/yunusemre6161/balik-tutma-sitesi)
