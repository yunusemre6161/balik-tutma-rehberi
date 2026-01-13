import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/backend/lib/prisma';

// GET /api/equipment - Tüm ekipmanları getir
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const isBeginnerFriendly = searchParams.get('isBeginnerFriendly');

    const where: any = {};

    if (category) {
      where.category = category.toUpperCase();
    }

    if (isBeginnerFriendly) {
      where.isBeginnerFriendly = isBeginnerFriendly === 'true';
    }

    const equipment = await prisma.equipment.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: equipment });
  } catch (error) {
    console.error('Equipment GET Error:', error);
    return NextResponse.json(
      { success: false, error: 'Ekipmanlar getirilirken hata oluştu' },
      { status: 500 }
    );
  }
}

// POST /api/equipment - Yeni ekipman ekle
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const equipment = await prisma.equipment.create({
      data: {
        name: body.name,
        category: body.category,
        description: body.description,
        recommendedFor: body.recommendedFor || [],
        specSize: body.specifications?.size,
        specWeight: body.specifications?.weight,
        specMaterial: body.specifications?.material,
        specLength: body.specifications?.length,
        priceMin: body.priceRange?.min,
        priceMax: body.priceRange?.max,
        isBeginnerFriendly: body.isBeginnerFriendly || false,
        image: body.image,
      },
    });

    return NextResponse.json(
      { success: true, data: equipment },
      { status: 201 }
    );
  } catch (error) {
    console.error('Equipment POST Error:', error);
    return NextResponse.json(
      { success: false, error: 'Ekipman eklenirken hata oluştu' },
      { status: 500 }
    );
  }
}
