import supabase from "./supabase";

export async function getPrograms() {
  const { data, error } = await supabase.from("programs").select("*");
  if (error) {
    console.error(error);
    throw new Error("Programs could not be loaded");
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
