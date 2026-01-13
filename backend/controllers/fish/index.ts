import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/backend/lib/prisma';

// GET /api/fish - Tüm balıkları getir
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const region = searchParams.get('region');
    const difficulty = searchParams.get('difficulty');

    const where: any = {};

    if (region) {
      where.regions = { has: region };
    }

    if (difficulty) {
      where.difficulty = difficulty.toUpperCase();
    }

    const fish = await prisma.fish.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: fish });
  } catch (error) {
    console.error('Fish GET Error:', error);
    return NextResponse.json(
      { success: false, error: 'Balıklar getirilirken hata oluştu' },
      { status: 500 }
    );
  }
}

// POST /api/fish - Yeni balık ekle
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const fish = await prisma.fish.create({
      data: {
        name: body.name,
        scientificName: body.scientificName,
        description: body.description,
        image: body.image,
        bestMonths: body.bestMonths || [],
        regions: body.regions || [],
        fishingType: body.fishingType || [],
        closedSeasonStart: body.closedSeason?.start,
        closedSeasonEnd: body.closedSeason?.end,
        minSize: body.minSize,
        maxSize: body.maxSize,
        habitat: body.habitat,
        baitTypes: body.baitTypes || [],
        difficulty: body.difficulty || 'ORTA',
      },
    });

    return NextResponse.json(
      { success: true, data: fish },
      { status: 201 }
    );
  } catch (error) {
    console.error('Fish POST Error:', error);
    return NextResponse.json(
      { success: false, error: 'Balık eklenirken hata oluştu' },
      { status: 500 }
    );
  }
}
