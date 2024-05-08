import supabase from "./supabase";

export async function getPrograms() {
  const { data, error } = await supabase.from("programs").select("*");
  if (error) {
    console.error(error);
    throw new Error("programs could not be loaded");
  }

  return data;
}
