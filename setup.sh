#!/bin/bash

# Renkli çıktı için
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🐟 Balık Tutma Rehberi - Kurulum Scripti${NC}\n"

# Node.js kontrolü
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js bulunamadı. Lütfen Node.js 18+ kurun.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js bulundu: $(node --version)${NC}"

# npm kontrolü
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm bulunamadı.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ npm bulundu: $(npm --version)${NC}\n"

# PostgreSQL kontrolü
if ! command -v psql &> /dev/null; then
    echo -e "${YELLOW}⚠ PostgreSQL client bulunamadı. Docker kullanmanız önerilir.${NC}"
    echo -e "${YELLOW}  Docker kurulu değilse: https://docs.docker.com/get-docker/${NC}\n"
fi

# Docker kontrolü
if command -v docker &> /dev/null && command -v docker-compose &> /dev/null; then
    echo -e "${GREEN}✓ Docker bulundu!${NC}"
    echo -e "\n${GREEN}🚀 Docker ile başlatmak için:${NC}"
    echo -e "   ${YELLOW}docker-compose up${NC}\n"

    read -p "Docker ile başlatmak ister misiniz? (E/h): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Ee]$ ]]; then
        docker-compose up
        exit 0
    fi
fi

echo -e "\n${YELLOW}📦 Bağımlılıklar yükleniyor...${NC}"
npm install

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Bağımlılık yüklemesi başarısız!${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Bağımlılıklar yüklendi${NC}\n"

# .env dosyası kontrolü
if [ ! -f .env ]; then
    echo -e "${YELLOW}📝 .env dosyası oluşturuluyor...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✓ .env dosyası oluşturuldu${NC}"
    echo -e "${YELLOW}⚠ .env dosyasında DATABASE_URL'yi güncellemeyi unutmayın!${NC}\n"
fi

# PostgreSQL database oluşturma
read -p "PostgreSQL veritabanı oluşturmak ister misiniz? (E/h): " -n 1 -r
echo
if [[ $REPLY =~ ^[Ee]$ ]]; then
    read -p "PostgreSQL kullanıcı adı [postgres]: " PG_USER
    PG_USER=${PG_USER:-postgres}

    createdb -U $PG_USER balik_tutma_rehberi 2>/dev/null

    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Veritabanı oluşturuldu${NC}\n"
    else
        echo -e "${YELLOW}⚠ Veritabanı zaten mevcut veya oluşturulamadı${NC}\n"
    fi
fi

echo -e "${YELLOW}🔧 Prisma client oluşturuluyor...${NC}"
npx prisma generate

echo -e "${YELLOW}🗄️ Veritabanı tabloları oluşturuluyor...${NC}"
npx prisma db push

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Veritabanı bağlantısı başarısız!${NC}"
    echo -e "${YELLOW}⚠ .env dosyasındaki DATABASE_URL'yi kontrol edin${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Veritabanı hazır${NC}\n"

echo -e "${YELLOW}🌱 Örnek veriler yükleniyor...${NC}"
npm run seed

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Örnek veriler yüklendi${NC}\n"
else
    echo -e "${RED}❌ Örnek veri yükleme başarısız!${NC}\n"
fi

echo -e "${GREEN}✅ Kurulum tamamlandı!${NC}\n"
echo -e "${GREEN}🚀 Uygulamayı başlatmak için:${NC}"
echo -e "   ${YELLOW}npm run dev${NC}\n"
echo -e "${GREEN}📖 Tarayıcıda açın:${NC}"
echo -e "   ${YELLOW}http://localhost:3000${NC}\n"

read -p "Şimdi geliştirme sunucusunu başlatmak ister misiniz? (E/h): " -n 1 -r
echo
if [[ $REPLY =~ ^[Ee]$ ]]; then
    npm run dev
fi
