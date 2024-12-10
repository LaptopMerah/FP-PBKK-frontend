'use client';

import AxiosService from '@/app/api/axiosService';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetAllEvent = () => {
  return useQuery({
    queryKey: ['Event'],
    queryFn: async () => {
      const { data } = await AxiosService.get('/event/');
      return data.data;
    },
  });
};


export const useGetEvent = (id: number) => {
  return useQuery({
    queryKey: ['Event', id],
    queryFn: async () => {
      const { data } = await AxiosService.get(`/event/${id}`);
      return data.data;
    },
  });
};

export const useCreateEvent = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await AxiosService.post('/event/', data);
      return response.data;
    },
  });
};

export const useUpdateEvent = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await AxiosService.patch(`/event/${data.id}`, data);
      return response.data;
    },
  });
};

export const useDeleteEvent = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await AxiosService.delete(`/event/${id}`);
      return response.data;
    },
  });
};
