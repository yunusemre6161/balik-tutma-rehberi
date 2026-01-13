@echo off
echo.
echo ========================================
echo 🐟 Balik Tutma Rehberi - Kurulum
echo ========================================
echo.

REM Node.js kontrolü
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js bulunamadi. Lutfen Node.js 18+ kurun.
    echo    https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js bulundu:
node --version
echo.

REM npm kontrolü
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ npm bulunamadi.
    pause
    exit /b 1
)

echo ✓ npm bulundu:
npm --version
echo.

REM Docker kontrolü
where docker >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    where docker-compose >nul 2>nul
    if %ERRORLEVEL% EQU 0 (
        echo ✓ Docker bulundu!
        echo.
        echo 🚀 Docker ile baslatmak icin:
        echo    docker-compose up
        echo.
        set /p DOCKER_CHOICE="Docker ile baslatmak ister misiniz? (E/h): "
        if /i "%DOCKER_CHOICE%"=="E" (
            docker-compose up
            exit /b 0
        )
    )
)

echo 📦 Bagimlilıklar yukleniyor...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Bagimlılık yuklemesi basarisiz!
    pause
    exit /b 1
)
echo ✓ Bagimlılıklar yuklendi
echo.

REM .env dosyası kontrolü
if not exist .env (
    echo 📝 .env dosyasi olusturuluyor...
    copy .env.example .env >nul
    echo ✓ .env dosyasi olusturuldu
    echo ⚠ .env dosyasinda DATABASE_URL'yi guncellemeyi unutmayin!
    echo.
)

REM PostgreSQL kontrolü
where psql >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    set /p CREATE_DB="PostgreSQL veritabani olusturmak ister misiniz? (E/h): "
    if /i "!CREATE_DB!"=="E" (
        set /p PG_USER="PostgreSQL kullanici adi [postgres]: "
        if "!PG_USER!"=="" set PG_USER=postgres

        createdb -U !PG_USER! balik_tutma_rehberi 2>nul
        if %ERRORLEVEL% EQU 0 (
            echo ✓ Veritabani olusturuldu
        ) else (
            echo ⚠ Veritabani zaten mevcut veya olusturulamadi
        )
        echo.
    )
)

echo 🔧 Prisma client olusturuluyor...
call npx prisma generate

echo 🗄️ Veritabani tablolari olusturuluyor...
call npx prisma db push
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Veritabani baglantisi basarisiz!
    echo ⚠ .env dosyasindaki DATABASE_URL'yi kontrol edin
    pause
    exit /b 1
)
echo ✓ Veritabani hazir
echo.

echo 🌱 Ornek veriler yukleniyor...
call npm run seed
if %ERRORLEVEL% EQU 0 (
    echo ✓ Ornek veriler yuklendi
) else (
    echo ❌ Ornek veri yukleme basarisiz!
)
echo.

echo ✅ Kurulum tamamlandi!
echo.
echo 🚀 Uygulamayi baslatmak icin:
echo    npm run dev
echo.
echo 📖 Tarayicida acin:
echo    http://localhost:3000
echo.

set /p START_SERVER="Simdi gelistirme sunucusunu baslatmak ister misiniz? (E/h): "
if /i "%START_SERVER%"=="E" (
    npm run dev
)
