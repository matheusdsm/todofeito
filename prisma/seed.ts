import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("password123", 12);

  const user = await prisma.user.upsert({
    where: { email: "demo@todonotas.com" },
    update: {},
    create: {
      name: "Usuário Demo",
      email: "demo@todonotas.com",
      password: hashedPassword,
      role: "client",
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: "admin@todonotas.com" },
    update: {},
    create: {
      name: "Administrador",
      email: "admin@todonotas.com",
      password: hashedPassword,
      role: "admin",
    },
  });

  const note1 = await prisma.note.create({
    data: {
      title: "Primeira nota de exemplo",
      content: "Este é o conteúdo da primeira nota. Aqui você pode escrever qualquer coisa que precise lembrar ou organizar.",
      status: "active",
      userId: user.id,
    },
  });

  const note2 = await prisma.note.create({
    data: {
      title: "Lista de tarefas pendentes",
      content: "1. Revisar documento\n2. Enviar relatório\n3. Agendar reunião\n4. Atualizar planilha",
      status: "completed",
      userId: user.id,
    },
  });

  const note3 = await prisma.note.create({
    data: {
      title: "Ideias para o projeto",
      content: "Explorar novas funcionalidades para o sistema de notas, incluindo tags, categorias e busca avançada.",
      status: "active",
      userId: user.id,
    },
  });

  await prisma.historyEntry.createMany({
    data: [
      {
        action: "Nota criada",
        entityType: "note",
        entityId: note1.id,
        userId: user.id,
        details: "Primeira nota de exemplo",
      },
      {
        action: "Nota criada",
        entityType: "note",
        entityId: note2.id,
        userId: user.id,
        details: "Lista de tarefas pendentes",
      },
      {
        action: "Nota concluída",
        entityType: "note",
        entityId: note2.id,
        userId: user.id,
        details: "Lista de tarefas pendentes",
      },
      {
        action: "Nota criada",
        entityType: "note",
        entityId: note3.id,
        userId: user.id,
        details: "Ideias para o projeto",
      },
      {
        action: "Login realizado",
        entityType: "user",
        entityId: user.id,
        userId: user.id,
      },
      {
        action: "Sistema inicializado",
        entityType: "system",
        entityId: "seed",
        userId: user.id,
        details: "Dados de demonstração criados",
      },
    ],
  });

  console.log("Seed completed!");
  console.log("Demo user: demo@todonotas.com / password123");
  console.log("Admin user: admin@todonotas.com / password123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
