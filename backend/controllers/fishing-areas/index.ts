import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/backend/lib/prisma';

// GET /api/fishing-areas - Tüm av alanlarını getir
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');
    const difficulty = searchParams.get('difficulty');
    const accessType = searchParams.get('accessType');

    const where: any = {};

    if (city) {
      where.city = { contains: city, mode: 'insensitive' };
    }

    if (difficulty) {
      where.difficulty = difficulty.toUpperCase();
    }

    if (accessType) {
      where.accessType = accessType.toUpperCase().replace(' ', '_');
    }

    const areas = await prisma.fishingArea.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: areas });
  } catch (error) {
    console.error('FishingAreas GET Error:', error);
    return NextResponse.json(
      { success: false, error: 'Av alanları getirilirken hata oluştu' },
      { status: 500 }
    );
  }
}

// POST /api/fishing-areas - Yeni av alanı ekle
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const area = await prisma.fishingArea.create({
      data: {
        name: body.name,
        city: body.city,
        region: body.region,
        description: body.description,
        lat: body.coordinates?.lat,
        lng: body.coordinates?.lng,
        fishTypes: body.fishTypes || [],
        difficulty: body.difficulty || 'ORTA',
        bestTimes: body.bestTimes || [],
        facilities: body.facilities || [],
        accessType: body.accessType,
        image: body.image,
      },
    });

    return NextResponse.json(
      { success: true, data: area },
      { status: 201 }
    );
  } catch (error) {
    console.error('FishingAreas POST Error:', error);
    return NextResponse.json(
      { success: false, error: 'Av alanı eklenirken hata oluştu' },
      { status: 500 }
    );
  }
}
