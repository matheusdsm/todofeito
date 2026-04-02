import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const { id } = await params;

  const note = await prisma.note.findFirst({
    where: { id, userId: session.userId },
  });

  if (!note) {
    return NextResponse.json({ error: "Nota não encontrada." }, { status: 404 });
  }

  return NextResponse.json(note);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const { title, content } = body;

  const existing = await prisma.note.findFirst({
    where: { id, userId: session.userId },
  });

  if (!existing) {
    return NextResponse.json({ error: "Nota não encontrada." }, { status: 404 });
  }

  const note = await prisma.note.update({
    where: { id },
    data: { title: title ?? existing.title, content: content ?? existing.content },
  });

  await prisma.historyEntry.create({
    data: {
      action: "Nota editada",
      entityType: "note",
      entityId: note.id,
      userId: session.userId,
      details: title || existing.title,
    },
  });

  return NextResponse.json(note);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const { id } = await params;

  const existing = await prisma.note.findFirst({
    where: { id, userId: session.userId },
  });

  if (!existing) {
    return NextResponse.json({ error: "Nota não encontrada." }, { status: 404 });
  }

  await prisma.note.delete({ where: { id } });

  return NextResponse.json({ message: "Nota excluída." });
}
