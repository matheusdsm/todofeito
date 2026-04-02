import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");
  const adminView = searchParams.get("admin") === "true";
  const isAdmin = session.role === "admin";

  if (adminView && !isAdmin) {
    return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
  }

  const where = (adminView && isAdmin) ? {} : { userId: session.userId };

  const [entries, total] = await Promise.all([
    prisma.historyEntry.findMany({
      where,
      orderBy: { timestamp: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.historyEntry.count({ where }),
  ]);

  return NextResponse.json({ entries, total, page, pageSize });
}
