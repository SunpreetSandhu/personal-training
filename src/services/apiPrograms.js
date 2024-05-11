import supabase, { supabaseUrl } from "./supabase";

export async function getPrograms() {
  const { data, error } = await supabase.from("programs").select("*");
  if (error) {
    console.error(error);
    throw new Error("Programs could not be loaded");
  }

  return data;
}

export async function createProgram(newPorgram) {
  const imageName = `${Math.random()}-@${newPorgram.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/program-images/${imageName}`;
  //https://kgmtpxeccxdasvbmmgny.supabase.co/storage/v1/object/public/program-images/program-001.jpg
  //1. create prog
  const { data, error } = await supabase
    .from("programs")
    .insert([{ ...newPorgram, image: imagePath }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Program could not be created");
  }

  //2. upload image
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
