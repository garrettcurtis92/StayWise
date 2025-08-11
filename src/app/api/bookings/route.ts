// src/app/api/bookings/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    // 1. Ensure the user is signed in
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2. Parse and validate payload
    const { listingId, startDate, endDate } = await req.json();
    if (!listingId || !startDate || !endDate) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }
    const start = new Date(startDate);
    const end   = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return NextResponse.json(
        { error: "Invalid dates" },
        { status: 400 }
      );
    }
    if (start >= end) {
      return NextResponse.json(
        { error: "End date must be after start date" },
        { status: 400 }
      );
    }

    // 3. Prevent overlapping bookings for the same listing
  // Use index access to avoid any transient TS type mismatch if booking delegate not picked up
  const conflict = await (prisma as any).booking.findFirst({
      where: {
        listingId,
        startDate: { lte: end },
        endDate:   { gte: start },
      },
    });
    if (conflict) {
      return NextResponse.json(
        { error: "These dates are already booked" },
        { status: 409 }
      );
    }

    // 4. Find the user record (to get their ID)
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // 5. Create the booking
  const booking = await (prisma as any).booking.create({
      data: {
        listingId,
        userId:    user.id,
        startDate: start,
        endDate:   end,
      },
    });

    return NextResponse.json(booking);
  } catch (err: any) {
    console.error("Booking creation error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
