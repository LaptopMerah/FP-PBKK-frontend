'use client';

import AxiosService from '@/app/api/axiosService';
import { useQuery, useMutation } from '@tanstack/react-query';

export const useGetAllParticipant = () => {
  return useQuery({
    queryKey: ['Participant'],
    queryFn: async () => {
      const { data } = await AxiosService.get('/participant/');
      return data.data;
    },
  });
};

export const useGetParticipant = (id: number) => {
  return useQuery({
    queryKey: ['Participant', id],
    queryFn: async () => {
      const { data } = await AxiosService.get(`/participant/${id}`);
      return data.data;
    },
  });
};

export const useCreateParticipant = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await AxiosService.post('/participant/', data);
      return response.data;
    },
  });
};

export const useUpdateParticipant = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await AxiosService.patch(`/participant/${data.id}`, data);
      return response.data;
    },
  });
};

export const useDeleteParticipant = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await AxiosService.delete(`/participant/${id}`);
      return response.data;
    },
  });
};
