import { useQuery } from '@tanstack/react-query';
import { publisherService } from '@/lib/services/publisher.service';
import { seriesService } from '@/lib/services/series.service';
import { issueService } from '@/lib/services/issue.service';
import { characterService } from '@/lib/services/character.service';
import { creatorService } from '@/lib/services/creator.service';
import { teamService } from '@/lib/services/team.service';
import { storyArcService } from '@/lib/services/storyArc.service';
import { universeService } from '@/lib/services/universe.service';
import { dashboardService } from '@/lib/services/dashboard.service';
import { scanService } from '@/lib/services/scan.service';
import { searchService } from '@/lib/services/search.service';
import { collectionService } from '@/lib/services/collection.service';
import type { PaginationParams } from '@/lib/types';
import { reviewService } from '@/lib/services/review.service';
import { favoriteService } from '@/lib/services/favorite.service';

export function usePublishers(params?: { search?: string; page?: number; pageSize?: number }) {
  return useQuery({
    queryKey: ['publishers', params],
    queryFn: () => publisherService.getAll(params),
  });
}

export function usePublisher(id: number) {
  return useQuery({
    queryKey: ['publishers', id],
    queryFn: () => publisherService.getById(id),
    enabled: !!id,
  });
}

export function useSeries(params?: { search?: string; publisherId?: number; page?: number; pageSize?: number }) {
  return useQuery({
    queryKey: ['series', params],
    queryFn: () => seriesService.getAll(params),
  });
}

export function useSeriesDetail(id: number) {
  return useQuery({
    queryKey: ['series', id],
    queryFn: () => seriesService.getById(id),
    enabled: !!id,
  });
}

export function useIssue(id: number) {
  return useQuery({
    queryKey: ['issues', id],
    queryFn: () => issueService.getById(id),
    enabled: !!id,
  });
}

export function useIssuesBySeries(seriesId: number, params?: { page?: number; pageSize?: number }) {
  return useQuery({
    queryKey: ['issues', 'series', seriesId, params],
    queryFn: () => issueService.getBySeries(seriesId, params),
    enabled: !!seriesId,
  });
}

export function useCharacters(params?: { search?: string; page?: number; pageSize?: number }) {
  return useQuery({
    queryKey: ['characters', params],
    queryFn: () => characterService.getAll(params),
  });
}

export function useCharacter(id: number) {
  return useQuery({
    queryKey: ['characters', id],
    queryFn: () => characterService.getById(id),
    enabled: !!id,
  });
}

export function useCreators(params?: { search?: string; page?: number; pageSize?: number }) {
  return useQuery({
    queryKey: ['creators', params],
    queryFn: () => creatorService.getAll(params),
  });
}

export function useCreator(id: number) {
  return useQuery({
    queryKey: ['creators', id],
    queryFn: () => creatorService.getById(id),
    enabled: !!id,
  });
}

export function useTeams(params?: { search?: string; page?: number; pageSize?: number }) {
  return useQuery({
    queryKey: ['teams', params],
    queryFn: () => teamService.getAll(params),
  });
}

export function useTeam(id: number) {
  return useQuery({
    queryKey: ['teams', id],
    queryFn: () => teamService.getById(id),
    enabled: !!id,
  });
}

export function useStoryArcs(params?: { search?: string; page?: number; pageSize?: number }) {
  return useQuery({
    queryKey: ['storyArcs', params],
    queryFn: () => storyArcService.getAll(params),
  });
}

export function useStoryArc(id: number) {
  return useQuery({
    queryKey: ['storyArcs', id],
    queryFn: () => storyArcService.getById(id),
    enabled: !!id,
  });
}

export function useUniverses() {
  return useQuery({
    queryKey: ['universes'],
    queryFn: () => universeService.getAll(),
  });
}

export function useUniverse(id: number) {
  return useQuery({
    queryKey: ['universes', id],
    queryFn: () => universeService.getById(id),
    enabled: !!id,
  });
}

export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: () => dashboardService.getStats(),
  });
}

export function useScanGroups() {
  return useQuery({
    queryKey: ['scans', 'groups'],
    queryFn: () => scanService.getGroups(),
  });
}

export function useScanGroup(id: number) {
  return useQuery({
    queryKey: ['scans', 'groups', id],
    queryFn: () => scanService.getGroupById(id),
    enabled: !!id,
  });
}

export function useScan(id: number) {
  return useQuery({
    queryKey: ['scans', id],
    queryFn: () => scanService.getById(id),
    enabled: !!id,
  });
}

export function useSearch(query: string, enabled?: boolean) {
  return useQuery({
    queryKey: ['search', query],
    queryFn: () => searchService.globalSearch(query),
    enabled: enabled !== false && query.length > 0,
  });
}

export function useCollections(userId: number) {
  return useQuery({
    queryKey: ['collections', userId],
    queryFn: () => collectionService.getUserCollections(userId),
    enabled: !!userId,
  });
}

export function useCollection(id: number) {
  return useQuery({
    queryKey: ['collections', id],
    queryFn: () => collectionService.getById(id),
    enabled: !!id,
  });
}

export function useReviewsByIssue(issueId: number) {
  return useQuery({
    queryKey: ['reviews', 'issue', issueId],
    queryFn: () => reviewService.getByIssue(issueId),
    enabled: !!issueId,
  });
}

export function useFavorites() {
  return useQuery({
    queryKey: ['favorites'],
    queryFn: () => favoriteService.getAll(),
  });
}

export function useCurrentReadings() {
  return useQuery({
    queryKey: ['collections', 'reading', 'current'],
    queryFn: () => collectionService.getCurrentReadings(),
  });
}
