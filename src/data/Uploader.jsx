import { useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";
import supabase from "../services/supabase";
import Button from "../ui/Button";
import { subtractDates } from "../utils/helpers";

import { bookings } from "./data-bookings";
import { programs } from "./data-programs";
import { clients } from "./data-clients";

// const originalSettings = {
//   minBookingLength: 3,
//   maxBookingLength: 30,
//   maxClientsPerBooking: 10,
//   nutritionPrice: 15,
// };

async function deleteClients() {
  const { error } = await supabase.from("clients").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deletePrograms() {
  const { error } = await supabase.from("programs").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteBookings() {
  const { error } = await supabase.from("bookings").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function createClients() {
  const { error } = await supabase.from("clients").insert(clients);
  if (error) console.log(error.message);
}

async function createPrograms() {
  const { error } = await supabase.from("programs").insert(programs);
  if (error) console.log(error.message);
}

async function createBookings() {
  // Bookings need a guestId and a cabinId. We can't tell Supabase IDs for each object, it will calculate them on its own. So it might be different for different people, especially after multiple uploads. Therefore, we need to first get all guestIds and cabinIds, and then replace the original IDs in the booking data with the actual ones from the DB
  const { data: clientIds } = await supabase
    .from("clients")
    .select("id")
    .order("id");
  const allClientIds = clientIds.map((program) => program.id);
  const { data: programIds } = await supabase
    .from("programs")
    .select("id")
    .order("id");
  const allProgramIds = programIds.map((program) => program.id);

  const finalBookings = bookings.map((booking) => {
    // Here relying on the order of cabins, as they don't have and ID yet
    const program = programs.at(booking.programId - 1);
    const numDays = subtractDates(booking.endDate, booking.startDate);
    const programPrice = numDays * (program.regularPrice - program.discount);
    const extrasPrice = booking.hasNutrition
      ? numDays * 15 * booking.numClients
      : 0; // hardcoded breakfast price
    const totalPrice = programPrice + extrasPrice;

    let status;
    if (
      isPast(new Date(booking.endDate)) &&
      !isToday(new Date(booking.endDate))
    )
      status = "completed";
    if (
      isFuture(new Date(booking.startDate)) ||
      isToday(new Date(booking.startDate))
    )
      status = "unconfirmed";
    if (
      (isFuture(new Date(booking.endDate)) ||
        isToday(new Date(booking.endDate))) &&
      isPast(new Date(booking.startDate)) &&
      !isToday(new Date(booking.startDate))
    )
      status = "in-progress";

    return {
      ...booking,
      numDays,
      programPrice,
      extrasPrice,
      totalPrice,
      clientId: allClientIds.at(booking.clientId - 1),
      programId: allProgramIds.at(booking.programId - 1),
      status,
    };
  });

  console.log(finalBookings);

  const { error } = await supabase.from("bookings").insert(finalBookings);
  if (error) console.log(error.message);
}

function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);
    // Bookings need to be deleted FIRST
    await deleteBookings();
    await deleteClients();
    await deletePrograms();

    // Bookings need to be created LAST
    await createClients();
    await createPrograms();
    await createBookings();

    setIsLoading(false);
  }

  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
  }

  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "#e0e7ff",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3>SAMPLE DATA</h3>

      <Button onClick={uploadAll} disabled={isLoading}>
        Upload ALL
      </Button>

      <Button onClick={uploadBookings} disabled={isLoading}>
        Upload bookings ONLY
      </Button>
    </div>
  );
}

export default Uploader;
