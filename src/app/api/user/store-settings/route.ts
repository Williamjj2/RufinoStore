import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { DEFAULT_SETTINGS } from "@/types/templates";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    let settings = await prisma.userStoreSettings.findUnique({
      where: { user_id: session.user.id }
    });

    if (!settings) {
      // Create default settings if they don't exist
      settings = await prisma.userStoreSettings.create({
        data: {
          user_id: session.user.id,
          ...DEFAULT_SETTINGS
        }
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Erro ao buscar configurações:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { template_id, primary_color, accent_color, background_color, custom_css } = body;

    // Validate required fields
    if (!template_id || !primary_color || !accent_color || !background_color) {
      return NextResponse.json(
        { error: "Campos obrigatórios faltando" },
        { status: 400 }
      );
    }

    // Validate color format (hex colors)
    const colorRegex = /^#[0-9A-F]{6}$/i;
    if (!colorRegex.test(primary_color) || !colorRegex.test(accent_color) || !colorRegex.test(background_color)) {
      return NextResponse.json(
        { error: "Formato de cor inválido" },
        { status: 400 }
      );
    }

    const settings = await prisma.userStoreSettings.upsert({
      where: { user_id: session.user.id },
      update: {
        template_id,
        primary_color,
        accent_color,
        background_color,
        custom_css: custom_css || null,
        updated_at: new Date()
      },
      create: {
        user_id: session.user.id,
        template_id,
        primary_color,
        accent_color,
        background_color,
        custom_css: custom_css || null
      }
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Erro ao salvar configurações:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
} 