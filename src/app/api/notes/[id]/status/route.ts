import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const { status } = body;

  if (!status || !["active", "completed"].includes(status)) {
    return NextResponse.json({ error: "Status inválido." }, { status: 400 });
  }

  const existing = await prisma.note.findFirst({
    where: { id, userId: session.userId },
  });

  if (!existing) {
    return NextResponse.json({ error: "Nota não encontrada." }, { status: 404 });
  }

  const note = await prisma.note.update({
    where: { id },
    data: { status },
  });

  await prisma.historyEntry.create({
    data: {
      action: status === "completed" ? "Nota concluída" : "Nota restaurada",
      entityType: "note",
      entityId: note.id,
      userId: session.userId,
      details: existing.title,
    },
  });

  return NextResponse.json(note);
}
