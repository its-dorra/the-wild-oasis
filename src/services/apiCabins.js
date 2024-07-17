import supabase, { supabaseUrl } from './supabase';

export const getCabins = async function () {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
};

export const deleteCabin = async function (id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);
  if (error) {
    console.error(error);
    throw new Error(' Cabin could not be deleted! please try again');
  }
  return data;
};

export const createEditCabin = async function (cabin, id) {
  const hasImagePath = cabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${cabin.image.name}`.replace('/', '');

  const imagePath = hasImagePath
    ? cabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // https://tkbhjmmwjrizpzcwpwpg.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  // 1. Create/Edit a cabin
  let query = supabase.from('cabins');

  // A. Create a new cabin
  if (!id) query = query.insert([{ ...cabin, image: imagePath }]);

  // B. Update an existing cabin
  if (id) query = query.update({ ...cabin, image: imagePath }).eq('id', id);

  const { data, error } = await query.select();

  if (error) {
    console.error(error);
    throw new Error(`Cabin could not be ${id ? 'updated' : 'created'}`);
  }

  //? To not upload the image one more time

  if (hasImagePath) return data;

  // 2. Upload image

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, cabin.image);

  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.error(storageError);
    throw new Error(
      ' Cabin image could not be uploaded and the cabin was not created'
    );
  }

  // 3. Delete the file IF there is an error in uploading image

  return data;
};
