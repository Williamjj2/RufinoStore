"use client";
import { useEffect, useCallback } from 'react';
import {
  trackSocialTraffic,
  trackPageView,
  trackProductView,
  trackShare,
  trackPurchase,
  generateUTMUrl,
  cleanupAnalyticsData
} from '@/lib/analytics';

interface UseSocialAnalyticsProps {
  username: string;
  autoTrackPageView?: boolean;
}

interface SocialAnalyticsHook {
  trackPageView: () => void;
  trackProductView: (productId: string) => void;
  trackShare: (platform: string, productId?: string) => void;
  trackPurchase: (productId: string, value: number) => void;
  generateShareUrl: (platform: string, baseUrl?: string) => string;
}

export function useSocialAnalytics({ 
  username, 
  autoTrackPageView = true 
}: UseSocialAnalyticsProps): SocialAnalyticsHook {

  // Auto-track page view and social traffic on mount
  useEffect(() => {
    if (autoTrackPageView) {
      trackSocialTraffic(username);
      trackPageView(username);
    }
    
    // Cleanup old analytics data
    cleanupAnalyticsData();
  }, [username, autoTrackPageView]);

  // Track page views
  const handleTrackPageView = useCallback(() => {
    trackPageView(username);
  }, [username]);

  // Track product views
  const handleTrackProductView = useCallback((productId: string) => {
    trackProductView(username, productId);
  }, [username]);

  // Track shares
  const handleTrackShare = useCallback((platform: string, productId?: string) => {
    trackShare(username, platform, productId);
  }, [username]);

  // Track purchases
  const handleTrackPurchase = useCallback((productId: string, value: number) => {
    trackPurchase(username, productId, value);
  }, [username]);

  // Generate share URLs with tracking
  const generateShareUrl = useCallback((
    platform: string, 
    baseUrl?: string
  ): string => {
    const url = baseUrl || (typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '');
    return generateUTMUrl(url, platform, 'social', 'store_share', username);
  }, [username]);

  return {
    trackPageView: handleTrackPageView,
    trackProductView: handleTrackProductView,
    trackShare: handleTrackShare,
    trackPurchase: handleTrackPurchase,
    generateShareUrl
  };
} 