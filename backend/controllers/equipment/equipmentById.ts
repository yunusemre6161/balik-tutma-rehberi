import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/backend/lib/prisma';

// GET /api/equipment/[id] - Belirli ekipman detayı
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const equipment = await prisma.equipment.findUnique({
      where: { id },
    });

    if (!equipment) {
      return NextResponse.json(
        { success: false, error: 'Ekipman bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: equipment });
  } catch (error) {
    console.error('Equipment GET by ID Error:', error);
    return NextResponse.json(
      { success: false, error: 'Ekipman getirilirken hata oluştu' },
      { status: 500 }
    );
  }
}

// PUT /api/equipment/[id] - Ekipman güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const equipment = await prisma.equipment.update({
      where: { id },
      data: {
        name: body.name,
        category: body.category,
        description: body.description,
        recommendedFor: body.recommendedFor,
        specSize: body.specifications?.size,
        specWeight: body.specifications?.weight,
        specMaterial: body.specifications?.material,
        specLength: body.specifications?.length,
        priceMin: body.priceRange?.min,
        priceMax: body.priceRange?.max,
        isBeginnerFriendly: body.isBeginnerFriendly,
        image: body.image,
      },
    });

    return NextResponse.json({ success: true, data: equipment });
  } catch (error) {
    console.error('Equipment PUT Error:', error);
    return NextResponse.json(
      { success: false, error: 'Ekipman güncellenirken hata oluştu' },
      { status: 500 }
    );
  }
}

// DELETE /api/equipment/[id] - Ekipman sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.equipment.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Ekipman silindi' });
  } catch (error) {
    console.error('Equipment DELETE Error:', error);
    return NextResponse.json(
      { success: false, error: 'Ekipman silinirken hata oluştu' },
      { status: 500 }
    );
  }
}
