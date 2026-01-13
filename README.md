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

- Node.js 18.x veya üzeri
- PostgreSQL veritabanı
- npm veya yarn

## Kurulum

1. **Projeyi klonlayın**
```bash
git clone https://github.com/yunusemre6161/balik-tutma-sitesi.git
cd balik-tutma-sitesi
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Ortam değişkenlerini ayarlayın**
```bash
# .env.example dosyasını .env olarak kopyalayın
cp .env.example .env
```

`.env` dosyasını düzenleyin ve kendi PostgreSQL bağlantı bilgilerinizi girin:
```
DATABASE_URL="postgresql://kullanici:sifre@localhost:5432/veritabani_adi"
```

4. **Veritabanını oluşturun ve migrasyonları çalıştırın**
```bash
npx prisma generate
npx prisma db push
```

5. **Geliştirme sunucusunu başlatın**
```bash
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## Kullanılabilir Komutlar

- `npm run dev` - Geliştirme sunucusunu başlatır
- `npm run build` - Production için projeyi derler
- `npm start` - Production sunucusunu başlatır
- `npm run lint` - Kod kalitesi kontrolü yapar

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
