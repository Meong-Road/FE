import { useMutation } from "@tanstack/react-query";

import { gatheringApi } from "@/api/gatherings";
import { petsApi } from "@/api/pets";
import { GatheringImageUploadRes } from "@/api/types/gatherings";
import { ImageUploadRes } from "@/api/types/pets";

export function useUploadPetImage() {
  return useMutation<ImageUploadRes, Error, File>({
    mutationFn: (file) => petsApi.uploadPetImage(file),
  });
}

export function useUploadGatheringImage() {
  return useMutation<GatheringImageUploadRes, Error, File>({
    mutationFn: (file) => gatheringApi.uploadGatheringImage({ file }),
  });
}
