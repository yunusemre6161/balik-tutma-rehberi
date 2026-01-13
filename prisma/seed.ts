import { PrismaClient, Difficulty, AccessType, EquipmentCategory } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import 'dotenv/config';
import { fishData } from '../shared/data/fishData';
import { fishingAreasWithCoords } from '../shared/data/fishingAreasWithCoords';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Difficulty mapping
const difficultyMap: Record<string, Difficulty> = {
  'Kolay': 'KOLAY',
  'Orta': 'ORTA',
  'Zor': 'ZOR',
};

// AccessType mapping
const accessTypeMap: Record<string, AccessType> = {
  'Kıyı': 'KIYI',
  'Tekne': 'TEKNE',
  'Kıyı/Tekne': 'HER_IKISI',
};

async function main() {
  console.log('🌱 Veritabanı seed işlemi başlatılıyor...');

  // Mevcut verileri temizle
  console.log('🗑️  Mevcut veriler temizleniyor...');
  await prisma.equipment.deleteMany();
  await prisma.fishingArea.deleteMany();
  await prisma.fish.deleteMany();

  // Balık verilerini ekle
  console.log('🐟 Balık verileri ekleniyor...');
  for (const fish of fishData) {
    await prisma.fish.create({
      data: {
        id: fish.id,
        name: fish.name,
        scientificName: fish.scientificName || null,
        description: fish.description,
        image: fish.image,
        bestMonths: fish.bestMonths,
        regions: fish.regions,
        fishingType: fish.fishingType,
        habitat: fish.habitat,
        baitTypes: fish.baitTypes,
        difficulty: difficultyMap[fish.difficulty] || 'ORTA',
        closedSeasonStart: fish.closedSeason?.start || null,
        closedSeasonEnd: fish.closedSeason?.end || null,
      },
    });
  }
  console.log(`✅ ${fishData.length} balık türü eklendi.`);

  // Av alanı verilerini ekle
  console.log('🗺️  Av alanları ekleniyor...');
  for (const area of fishingAreasWithCoords) {
    await prisma.fishingArea.create({
      data: {
        id: area.id,
        name: area.name,
        city: area.city,
        region: area.region,
        description: area.description,
        lat: area.lat,
        lng: area.lng,
        fishTypes: area.fishTypes,
        difficulty: difficultyMap[area.difficulty] || 'ORTA',
        bestTimes: area.bestTimes,
        accessType: accessTypeMap[area.accessType] || 'HER_IKISI',
        facilities: [],
      },
    });
  }
  console.log(`✅ ${fishingAreasWithCoords.length} av alanı eklendi.`);

  // Örnek ekipman verileri ekle
  console.log('🎣 Örnek ekipman verileri ekleniyor...');
  const sampleEquipment = [
    {
      name: 'Profesyonel Olta Kamışı',
      category: 'OLTA' as EquipmentCategory,
      description: 'Carbon fiber malzemeden üretilmiş, hafif ve dayanıklı olta kamışı. Hem kıyı hem de tekne balıkçılığı için uygundur.',
      recommendedFor: ['Levrek', 'Çipura', 'Lüfer'],
      specLength: '2.70m - 3.60m',
      specMaterial: 'Carbon Fiber',
      priceMin: 500,
      priceMax: 2000,
      isBeginnerFriendly: false,
    },
    {
      name: 'Başlangıç Seti Olta',
      category: 'OLTA' as EquipmentCategory,
      description: 'Yeni başlayanlar için ideal, makara dahil ekonomik olta seti.',
      recommendedFor: ['Kefal', 'Mezgit', 'İstavrit'],
      specLength: '2.40m',
      specMaterial: 'Fiberglass',
      priceMin: 150,
      priceMax: 400,
      isBeginnerFriendly: true,
    },
    {
      name: 'Owner Iğne Seti',
      category: 'IGNE' as EquipmentCategory,
      description: 'Japonya yapımı kaliteli iğne seti. Çeşitli boy ve kalınlıklarda 50 adet iğne.',
      recommendedFor: ['Levrek', 'Çipura', 'Barbun'],
      priceMin: 80,
      priceMax: 150,
      isBeginnerFriendly: true,
    },
    {
      name: 'Örgü Misina 0.20mm',
      category: 'MISINA' as EquipmentCategory,
      description: '8 örgülü, yüksek dayanıklı PE misina. 150m makarada.',
      recommendedFor: ['Levrek', 'Lüfer', 'Palamut'],
      specWeight: '18lb / 8.2kg',
      specMaterial: 'PE (Polyethylene)',
      priceMin: 120,
      priceMax: 300,
      isBeginnerFriendly: false,
    },
    {
      name: 'Silikon Yem Seti',
      category: 'YEM' as EquipmentCategory,
      description: 'Çeşitli renk ve boyutlarda 10 adet silikon yem. Levrek avı için idealdir.',
      recommendedFor: ['Levrek', 'Lüfer'],
      priceMin: 50,
      priceMax: 150,
      isBeginnerFriendly: true,
    },
    {
      name: 'Profesyonel Olta Makarası',
      category: 'AKSESUAR' as EquipmentCategory,
      description: '5000 serisi, alüminyum gövdeli, yüksek performanslı spinning makara.',
      recommendedFor: ['Levrek', 'Çipura', 'Lüfer'],
      specMaterial: 'Alüminyum Alaşım',
      specWeight: '285g',
      priceMin: 400,
      priceMax: 1500,
      isBeginnerFriendly: false,
    },
  ];

  for (const equipment of sampleEquipment) {
    await prisma.equipment.create({
      data: equipment,
    });
  }
  console.log(`✅ ${sampleEquipment.length} ekipman eklendi.`);

  console.log('');
  console.log('🎉 Seed işlemi başarıyla tamamlandı!');
  console.log('📊 Özet:');
  console.log(`   - ${fishData.length} balık türü`);
  console.log(`   - ${fishingAreasWithCoords.length} av alanı`);
  console.log(`   - ${sampleEquipment.length} ekipman`);
}

main()
  .catch((e) => {
    console.error('❌ Seed işlemi sırasında hata oluştu:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
