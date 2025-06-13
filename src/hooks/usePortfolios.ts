
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Database } from '@/integrations/supabase/types';

type Portfolio = Database['public']['Tables']['portfolios']['Row'];
type NewPortfolio = Database['public']['Tables']['portfolios']['Insert'];

export const usePortfolios = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: portfolios = [], isLoading, error } = useQuery({
    queryKey: ['portfolios'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('portfolios')
        .select('*')
        .order('updated_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const createPortfolio = useMutation({
    mutationFn: async (portfolio: Omit<NewPortfolio, 'user_id'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('portfolios')
        .insert({ ...portfolio, user_id: user.id })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolios'] });
      toast({
        title: "Portfolio created",
        description: "Your portfolio has been created successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error creating portfolio",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updatePortfolio = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Portfolio> & { id: string }) => {
      const { data, error } = await supabase
        .from('portfolios')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolios'] });
      toast({
        title: "Portfolio updated",
        description: "Your portfolio has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error updating portfolio",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deletePortfolio = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('portfolios')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolios'] });
      toast({
        title: "Portfolio deleted",
        description: "Your portfolio has been deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error deleting portfolio",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    portfolios,
    isLoading,
    error,
    createPortfolio,
    updatePortfolio,
    deletePortfolio,
  };
};
