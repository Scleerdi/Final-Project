import { PrismaClient } from "@prisma/client";
import amenityData from "../src/data/amenities.json";
import bookingData from "../src/data/bookings.json";
import hostData from "../src/data/hosts.json";
import propertyData from "../src/data/properties.json";
import reviewData from "../src/data/reviews.json";
import userData from "../src/data/users.json";

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

async function main() {
  const { amenities } = amenityData;
  const { bookings } = bookingData;
  const { hosts } = hostData;
  const { properties } = propertyData;
  const { reviews } = reviewData;
  const { users } = userData;

  for (const amenity of amenities) {
    await prisma.amenity.upsert({
      where: { id: amenity.id },
      update: {},
      create: amenity,
    });
  }

  for (const booking of bookings) {
    await prisma.booking.upsert({
      where: { id: booking.id },
      update: {},
      create: booking,
    });
  }

  for (const host of hosts) {
    await prisma.host.upsert({
      where: { id: host.id },
      update: {},
      create: host,
    });
  }

  for (const property of properties) {
    const { hostId, ...propertyData } = property;
    await prisma.property.upsert({
      where: { id: property.id },
      update: {},
      create: {
        ...propertyData,
        hosts: { connect: { id: hostId } },
      },
    });
  }

  for (const review of reviews) {
    await prisma.review.upsert({
      where: { id: review.id },
      update: {},
      create: review,
    });
  }

  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user,
    });
  }
}
