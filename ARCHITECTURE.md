# Proje Mimarisi

Bu proje Next.js 16 App Router kullanarak **monorepo** yapısında geliştirilmiştir. Frontend ve Backend aynı proje içinde organize edilmiştir.

## 📁 Proje Yapısı

```
balik-tutma-rehberi/
├── app/                          # Next.js App Router
│   ├── api/                     # 🔴 BACKEND: API Routes
│   │   ├── fish/               # Balık CRUD endpoints
│   │   │   ├── route.ts       # GET (liste), POST (yeni)
│   │   │   └── [id]/
│   │   │       └── route.ts   # GET, PUT, DELETE (tek balık)
│   │   ├── fishing-areas/      # Av Alanları CRUD
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   └── equipment/          # Ekipman CRUD
│   │       ├── route.ts
│   │       └── [id]/route.ts
│   │
│   ├── balik-turleri/          # 🔵 FRONTEND: Balık türleri sayfası
│   ├── av-alanlari/            # 🔵 FRONTEND: Av alanları sayfası
│   ├── av-sezonlari/           # 🔵 FRONTEND: Av sezonları sayfası
│   ├── ekipmanlar/             # 🔵 FRONTEND: Ekipmanlar sayfası
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Ana sayfa
│   └── globals.css             # Global stiller
│
├── components/                  # 🔵 FRONTEND: React Components
│   ├── fish/                   # Balık ile ilgili componentler
│   │   └── FishCard.tsx       # Balık kartı component
│   ├── areas/                  # Av alanları componentleri
│   ├── equipment/              # Ekipman componentleri
│   └── ui/                     # Genel UI componentleri
│       └── Navbar.tsx         # Navigation bar
│
├── lib/                        # 🟡 SHARED: Paylaşılan kod
│   ├── prisma.ts              # Prisma client instance
│   └── mongodb.ts             # (Eski - Artık kullanılmıyor)
│
├── models/                     # 🔴 BACKEND: Mongoose Models (Eski)
│   ├── Fish.ts                # ⚠️ Artık kullanılmıyor (Prisma'ya geçildi)
│   ├── FishingArea.ts         # ⚠️ Artık kullanılmıyor
│   └── Equipment.ts           # ⚠️ Artık kullanılmıyor
│
├── prisma/                     # 🔴 BACKEND: Database Schema
│   ├── schema.prisma          # Prisma database şeması
│   └── migrations/            # Database migration dosyaları
│
├── public/                     # 🔵 FRONTEND: Static Files
│
├── .env                        # Environment variables
├── .env.local                  # Local environment variables
├── prisma.config.ts            # Prisma configuration
├── package.json                # Dependencies
└── tsconfig.json               # TypeScript configuration
```

## 🔴 Backend (API Routes)

Backend, Next.js API Routes ile geliştirilmiştir. Tüm endpoint'ler `/app/api/` klasörü altındadır.

### API Endpoint'leri

#### 🐟 Fish (Balık) API
- `GET /api/fish` - Tüm balıkları listele (query: region, difficulty)
- `POST /api/fish` - Yeni balık ekle
- `GET /api/fish/[id]` - Belirli balık detayı
- `PUT /api/fish/[id]` - Balık güncelle
- `DELETE /api/fish/[id]` - Balık sil

#### 🎣 Fishing Areas (Av Alanları) API
- `GET /api/fishing-areas` - Tüm av alanlarını listele (query: city, difficulty, accessType)
- `POST /api/fishing-areas` - Yeni av alanı ekle
- `GET /api/fishing-areas/[id]` - Belirli av alanı detayı
- `PUT /api/fishing-areas/[id]` - Av alanı güncelle
- `DELETE /api/fishing-areas/[id]` - Av alanı sil

#### 🎯 Equipment (Ekipman) API
- `GET /api/equipment` - Tüm ekipmanları listele (query: category, isBeginnerFriendly)
- `POST /api/equipment` - Yeni ekipman ekle
- `GET /api/equipment/[id]` - Belirli ekipman detayı
- `PUT /api/equipment/[id]` - Ekipman güncelle
- `DELETE /api/equipment/[id]` - Ekipman sil

### API Response Format

Tüm API endpoint'leri aynı response formatını kullanır:

```typescript
// Success Response
{
  "success": true,
  "data": { ... }
}

// Error Response
{
  "success": false,
  "error": "Hata mesajı"
}
```

### Database

**Veritabanı:** PostgreSQL (Prisma ORM ile)

**Models:**
- `Fish` - Balık türleri
- `FishingArea` - Av alanları
- `Equipment` - Ekipmanlar

Prisma schema: `prisma/schema.prisma`

## 🔵 Frontend (React Pages & Components)

Frontend, Next.js App Router ve React ile geliştirilmiştir.

### Sayfalar
- `/` - Ana sayfa
- `/balik-turleri` - Balık türleri listesi
- `/av-alanlari` - Av alanları haritası
- `/av-sezonlari` - Av sezonları takvimi
- `/ekipmanlar` - Ekipman rehberi

### Components Yapısı
- **fish/** - Balık ile ilgili componentler
- **areas/** - Av alanları componentleri
- **equipment/** - Ekipman componentleri
- **ui/** - Genel UI componentleri (Navbar, Button, Card vs.)

## 🟡 Shared (Ortak Kod)

`lib/` klasörü hem frontend hem backend tarafından kullanılan ortak kodları içerir:

- **prisma.ts** - Prisma client instance (singleton pattern)
- **utils/** - Yardımcı fonksiyonlar
- **validations/** - Veri doğrulama şemaları (Zod vs.)

## 🛠️ Teknoloji Stack'i

### Frontend
- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React
- **Maps:** React Leaflet
- **Language:** TypeScript

### Backend
- **Runtime:** Node.js
- **Framework:** Next.js API Routes
- **Database:** PostgreSQL
- **ORM:** Prisma 7
- **Validation:** Native TypeScript (gelecekte Zod eklenebilir)

### Development Tools
- **Linter:** ESLint
- **Code Formatter:** (Gelecekte Prettier eklenebilir)
- **Package Manager:** npm

## 🚀 Çalıştırma

```bash
# Bağımlılıkları yükle
npm install

# Development server başlat
npm run dev

# Build (production)
npm run build

# Production server başlat
npm start
```

## 📦 Database Migration

```bash
# Prisma migration oluştur
npx prisma migrate dev --name migration_adi

# Prisma client generate et
npx prisma generate

# Prisma Studio aç (Database GUI)
npx prisma studio
```

## 🔐 Environment Variables

`.env.local` dosyasında aşağıdaki değişkenler tanımlı olmalı:

```env
DATABASE_URL="postgresql://user:password@host:port/database"
```

## 📝 Geliştirme Notları

### Mongoose'dan Prisma'ya Geçiş
- ✅ Prisma schema oluşturuldu
- ✅ API routes Prisma kullanacak şekilde güncellendi
- ⚠️ `models/` klasöründeki Mongoose modelleri artık kullanılmıyor (ileride silinecek)
- ⚠️ Frontend sayfaları henüz API'lere bağlanmadı (mock data kullanıyor)

### Yapılacaklar
- [ ] PostgreSQL kurulumu ve migration'ların çalıştırılması
- [ ] Frontend sayfalarının API'lere bağlanması
- [ ] Form validation (Zod) eklenmesi
- [ ] Error handling ve loading states
- [ ] Authentication (opsiyonel)
- [ ] Image upload (opsiyonel)

## 📚 Dokümantasyon

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Leaflet Documentation](https://react-leaflet.js.org/)

---

**Son Güncelleme:** 2025-12-31
