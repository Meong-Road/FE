import { useMutation } from "@tanstack/react-query";

import { petsApi } from "@/api/pets";
import { ImageUploadReq, ImageUploadRes } from "@/api/types/pets";

export function useUploadPetImage() {
  return useMutation<ImageUploadRes, Error, File>({
    mutationFn: (file) => petsApi.uploadPetImage(file),
  });
}
