import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Product, Industry, ContactInquiry, CompanyInfo } from '@/backend';

export function useGetProducts() {
  const { actor, isFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetProduct(id: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Product>({
    queryKey: ['product', id],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getProduct(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useGetIndustries() {
  const { actor, isFetching } = useActor();

  return useQuery<Industry[]>({
    queryKey: ['industries'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getIndustries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCompanyInfo() {
  const { actor, isFetching } = useActor();

  return useQuery<CompanyInfo | null>({
    queryKey: ['companyInfo'],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getCompanyInfo();
      } catch (error) {
        return null;
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitContactInquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (inquiry: ContactInquiry) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.submitContactInquiry(inquiry);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    },
  });
}

export function useGetAllInquiries() {
  const { actor, isFetching } = useActor();

  return useQuery<ContactInquiry[]>({
    queryKey: ['inquiries'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllInquiries();
    },
    enabled: !!actor && !isFetching,
  });
}
