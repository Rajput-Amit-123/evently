"user server";

import { CreateUserParams, UpdateUserParams } from "@/types";
import { handleError } from "../utils";
import User from "../database/models/event.model";
import Order from "@/lib/database/models/order.model";
import Event from "@/lib/database/models/event.model";
import { connectToDatabase } from "../database";
import { revalidatePath } from "next/cache";

export const createUser = async (user: CreateUserParams) => {
  try {
    await connectToDatabase();

    const newUser = User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
};

export const updateTheUser = async (
  ClerkId: string,
  user: UpdateUserParams
) => {
  try {
    await connectToDatabase();
    const updatedUser = User.findOneAndUpdate({ ClerkId }, user, { new: true });

    if (!updatedUser) throw new Error("User Update in database is failed");

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
};

export async function deleteTheUser(clerkId: string) {
  try {
    await connectToDatabase();

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Unlink relationships
    await Promise.all([
      // Update the 'events' collection to remove references to the user
      Event.updateMany(
        { _id: { $in: userToDelete.events } },
        { $pull: { organizer: userToDelete._id } }
      ),

      // Update the 'orders' collection to remove references to the user
      Order.updateMany(
        { _id: { $in: userToDelete.orders } },
        { $unset: { buyer: 1 } }
      ),
    ]);

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}

export const getUserById = async (userId: string) => {
  await connectToDatabase();
  try {
    const user = User.findById({ userId });
    if (!user) throw new Error("User Not Found");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
};
