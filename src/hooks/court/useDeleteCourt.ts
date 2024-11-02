import updateCourt from "@/services/court/updateCourt.service";
import { useMutation } from "@tanstack/react-query";

const useDeleteCourt = () => {
  return useMutation({
    mutationFn: updateCourt,
  });
};

export default useDeleteCourt;
