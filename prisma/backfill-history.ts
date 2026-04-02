import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando backfill de histórico...");

  const notes = await prisma.note.findMany({
    include: { user: true },
  });

  console.log(`Encontradas ${notes.length} notas para processar.`);

  let entriesCreated = 0;

  for (const note of notes) {
    const existing = await prisma.historyEntry.findFirst({
      where: {
        entityType: "note",
        entityId: note.id,
        action: "Nota criada",
      },
    });

    if (!existing) {
      await prisma.historyEntry.create({
        data: {
          action: "Nota criada",
          entityType: "note",
          entityId: note.id,
          userId: note.userId,
          details: note.title,
          timestamp: note.createdAt,
        },
      });
      entriesCreated++;
    }

    if (note.status === "completed") {
      const existingCompleted = await prisma.historyEntry.findFirst({
        where: {
          entityType: "note",
          entityId: note.id,
          action: "Nota concluída",
        },
      });

      if (!existingCompleted) {
        await prisma.historyEntry.create({
          data: {
            action: "Nota concluída",
            entityType: "note",
            entityId: note.id,
            userId: note.userId,
            details: note.title,
            timestamp: note.updatedAt,
          },
        });
        entriesCreated++;
      }
    }
  }

  console.log(`Backfill concluído. ${entriesCreated} registros de histórico criados.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
