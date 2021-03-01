import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function userId(req, res) {
  const id = parseInt(req.query.id);
  if (req.method === "GET") {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return res.status(200).json(user);
  } else if (req.method === "PUT") {
    let updated = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(updated);
  } else if (req.method === "DELETE") {
    await prisma.user.delete({
      where: {
        id: id,
      },
    });
    return res.status(200).json({ message: "user was removed successfully" });
  } else {
    return res.status(405).json({ message: "Method now allowed" });
  }
}
