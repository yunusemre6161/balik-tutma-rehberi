import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/backend/lib/prisma';

// GET /api/fishing-areas/[id] - Belirli av alanı detayı
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const area = await prisma.fishingArea.findUnique({
      where: { id },
    });

    if (!area) {
      return NextResponse.json(
        { success: false, error: 'Av alanı bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: area });
  } catch (error) {
    console.error('FishingArea GET by ID Error:', error);
    return NextResponse.json(
      { success: false, error: 'Av alanı getirilirken hata oluştu' },
      { status: 500 }
    );
  }
}

// PUT /api/fishing-areas/[id] - Av alanı güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const area = await prisma.fishingArea.update({
      where: { id },
      data: {
        name: body.name,
        city: body.city,
        region: body.region,
        description: body.description,
        lat: body.coordinates?.lat,
        lng: body.coordinates?.lng,
        fishTypes: body.fishTypes,
        difficulty: body.difficulty,
        bestTimes: body.bestTimes,
        facilities: body.facilities,
        accessType: body.accessType,
        image: body.image,
      },
    });

    return NextResponse.json({ success: true, data: area });
  } catch (error) {
    console.error('FishingArea PUT Error:', error);
    return NextResponse.json(
      { success: false, error: 'Av alanı güncellenirken hata oluştu' },
      { status: 500 }
    );
  }
}

// DELETE /api/fishing-areas/[id] - Av alanı sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.fishingArea.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Av alanı silindi' });
  } catch (error) {
    console.error('FishingArea DELETE Error:', error);
    return NextResponse.json(
      { success: false, error: 'Av alanı silinirken hata oluştu' },
      { status: 500 }
    );
  }
}
