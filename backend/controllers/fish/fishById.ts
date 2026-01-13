import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/backend/lib/prisma';

// GET /api/fish/[id] - Belirli balık detayı
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const fish = await prisma.fish.findUnique({
      where: { id },
    });

    if (!fish) {
      return NextResponse.json(
        { success: false, error: 'Balık bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: fish });
  } catch (error) {
    console.error('Fish GET by ID Error:', error);
    return NextResponse.json(
      { success: false, error: 'Balık getirilirken hata oluştu' },
      { status: 500 }
    );
  }
}

// PUT /api/fish/[id] - Balık güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const fish = await prisma.fish.update({
      where: { id },
      data: {
        name: body.name,
        scientificName: body.scientificName,
        description: body.description,
        image: body.image,
        bestMonths: body.bestMonths,
        regions: body.regions,
        fishingType: body.fishingType,
        closedSeasonStart: body.closedSeason?.start,
        closedSeasonEnd: body.closedSeason?.end,
        minSize: body.minSize,
        maxSize: body.maxSize,
        habitat: body.habitat,
        baitTypes: body.baitTypes,
        difficulty: body.difficulty,
      },
    });

    return NextResponse.json({ success: true, data: fish });
  } catch (error) {
    console.error('Fish PUT Error:', error);
    return NextResponse.json(
      { success: false, error: 'Balık güncellenirken hata oluştu' },
      { status: 500 }
    );
  }
}

// DELETE /api/fish/[id] - Balık sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.fish.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Balık silindi' });
  } catch (error) {
    console.error('Fish DELETE Error:', error);
    return NextResponse.json(
      { success: false, error: 'Balık silinirken hata oluştu' },
      { status: 500 }
    );
  }
}
