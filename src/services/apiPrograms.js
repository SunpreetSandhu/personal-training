import supabase, { supabaseUrl } from "./supabase";

export async function getPrograms() {
  const { data, error } = await supabase.from("programs").select("*");
  if (error) {
    console.error(error);
    throw new Error("Programs could not be loaded");
  }

  return data;
}

export async function createEditProgram(newPorgram, id) {
  const hasImagePath = newPorgram.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newPorgram.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newPorgram.image
    : `${supabaseUrl}/storage/v1/object/public/program-images/${imageName}`;

  //https://kgmtpxeccxdasvbmmgny.supabase.co/storage/v1/object/public/program-images/program-001.jpg
  //1. CREATE/EDIT prog

  let query = supabase.from("programs");

  //A) CREATE
  if (!id) {
    query = query.insert([{ ...newPorgram, image: imagePath }]);
  }

  //B) EDIT
  if (id)
    query = query.update({ ...newPorgram, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();
  //to take new element out of array instantly
  if (error) {
    console.error(error);
    throw new Error("Program could not be created");
  }

  //2. upload image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("program-images")
    .upload(imageName, newPorgram.image);

  //3. delete cabin if error uploading image
  if (storageError) {
    await supabase.from("programs").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Program image could not be uploaded and program could not be created"
    );
  }
  return data;
}

export async function deleteProgram(id) {
  const { data, error } = await supabase.from("programs").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Program could not be deleted");
  }

  return data;
}
