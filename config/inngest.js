import { Inngest } from "inngest";
import connectDB from "../lib/db";
import User from "../models/User";

// Initialize Inngest
export const inngest = new Inngest({ id: "quickcart-next" });

// Sync user creation
export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const email = email_addresses?.[0]?.email_address;
    if (!email) {
      console.warn("User created without email:", id);
      return;
    }

    const userData = {
      _id: id, // Clerk user ID as string
      email,
      name: `${first_name ?? ""} ${last_name ?? ""}`.trim(),
      imageUrl: image_url ?? "",
    };

    await connectDB();
    await User.create(userData);
    console.log("User created:", userData);
  }
);

// Sync user updates
export const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const email = email_addresses?.[0]?.email_address;
    if (!email) {
      console.warn("User update missing email:", id);
      return;
    }

    const userData = {
      email,
      name: `${first_name ?? ""} ${last_name ?? ""}`.trim(),
      imageUrl: image_url ?? "",
    };

    await connectDB();
    const updated = await User.findByIdAndUpdate(id, userData);
    if (updated) console.log("User updated:", updated);
    else console.warn("User not found to update:", id);
  }
);

// Sync user deletion
export const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;

    if (!id) {
      console.warn("User deletion missing ID");
      return;
    }

    await connectDB();
    const deleted = await User.findByIdAndDelete(id);
    if (deleted) console.log("User deleted:", id);
    else console.warn("User not found to delete:", id);
  }
);
