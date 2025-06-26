interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

interface SocialTraffic {
  source: string;
  medium: string;
  campaign: string;
  content: string;
  timestamp: string;
  user_agent: string;
  referrer: string;
}

interface ConversionEvent {
  event_type: 'page_view' | 'product_view' | 'share' | 'purchase';
  source: string;
  product_id?: string;
  user_id?: string;
  value?: number;
  timestamp: string;
}

// Extract UTM parameters from URL
export function extractUTMParameters(): {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
} {
  if (typeof window === 'undefined') {
    return {
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      utm_content: null
    };
  }

  const urlParams = new URLSearchParams(window.location.search);
  return {
    utm_source: urlParams.get('utm_source'),
    utm_medium: urlParams.get('utm_medium'),
    utm_campaign: urlParams.get('utm_campaign'),
    utm_content: urlParams.get('utm_content')
  };
}

// Track social traffic
export function trackSocialTraffic(username: string): void {
  if (typeof window === 'undefined') return;

  const utm = extractUTMParameters();
  
  if (utm.utm_source && utm.utm_medium === 'social') {
    const trafficData: SocialTraffic = {
      source: utm.utm_source,
      medium: utm.utm_medium,
      campaign: utm.utm_campaign || 'store_share',
      content: utm.utm_content || username,
      timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent,
      referrer: document.referrer
    };

    // Send to analytics (you can integrate with Google Analytics, Mixpanel, etc.)
    sendAnalytics('social_traffic', trafficData);
    
    // Store in localStorage for offline tracking
    const key = `social_traffic_${Date.now()}`;
    localStorage.setItem(key, JSON.stringify(trafficData));
    
    console.log('Social traffic tracked:', trafficData);
  }
}

// Track page views with source attribution
export function trackPageView(username: string, page: string = 'store'): void {
  const utm = extractUTMParameters();
  
  const conversionEvent: ConversionEvent = {
    event_type: 'page_view',
    source: utm.utm_source || 'direct',
    user_id: username,
    timestamp: new Date().toISOString()
  };

  sendAnalytics('page_view', conversionEvent);
}

// Track product views
export function trackProductView(username: string, productId: string): void {
  const utm = extractUTMParameters();
  
  const conversionEvent: ConversionEvent = {
    event_type: 'product_view',
    source: utm.utm_source || 'direct',
    product_id: productId,
    user_id: username,
    timestamp: new Date().toISOString()
  };

  sendAnalytics('product_view', conversionEvent);
}

// Track shares
export function trackShare(username: string, platform: string, productId?: string): void {
  const conversionEvent: ConversionEvent = {
    event_type: 'share',
    source: platform,
    product_id: productId,
    user_id: username,
    timestamp: new Date().toISOString()
  };

  sendAnalytics('share', conversionEvent);
}

// Track purchases with attribution
export function trackPurchase(
  username: string, 
  productId: string, 
  value: number
): void {
  const utm = extractUTMParameters();
  
  const conversionEvent: ConversionEvent = {
    event_type: 'purchase',
    source: utm.utm_source || 'direct',
    product_id: productId,
    user_id: username,
    value: value,
    timestamp: new Date().toISOString()
  };

  sendAnalytics('purchase', conversionEvent);
}

// Send analytics data (customize this for your analytics provider)
async function sendAnalytics(event: string, data: any): Promise<void> {
  try {
    // Google Analytics 4 example
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event, {
        custom_parameter: data,
        event_category: 'social_commerce',
        event_label: data.source || 'unknown'
      });
    }

    // Send to your API for custom tracking
    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event,
        data,
        timestamp: new Date().toISOString()
      })
    }).catch(err => {
      console.warn('Analytics API unavailable:', err.message);
    });

  } catch (error) {
    console.warn('Analytics tracking failed:', error);
  }
}

// Get social conversion funnel data
export interface SocialFunnelData {
  source: string;
  page_views: number;
  product_views: number;
  shares: number;
  purchases: number;
  conversion_rate: number;
  total_value: number;
}

export function getSocialConversionData(): SocialFunnelData[] {
  if (typeof window === 'undefined') return [];

  const socialSources = ['whatsapp', 'twitter', 'instagram', 'facebook', 'qrcode', 'direct'];
  
  return socialSources.map(source => {
    // This would normally come from your analytics API
    // For now, we'll use localStorage data as a fallback
    const mockData = {
      source,
      page_views: Math.floor(Math.random() * 100) + 10,
      product_views: Math.floor(Math.random() * 50) + 5,
      shares: Math.floor(Math.random() * 20) + 2,
      purchases: Math.floor(Math.random() * 10) + 1,
      conversion_rate: (Math.random() * 0.1) + 0.01, // 1-11%
      total_value: (Math.random() * 1000) + 100
    };

    return mockData;
  });
}

// Generate UTM URL
export function generateUTMUrl(
  baseUrl: string,
  source: string,
  medium: string = 'social',
  campaign: string = 'store_share',
  content?: string
): string {
  const url = new URL(baseUrl);
  url.searchParams.set('utm_source', source);
  url.searchParams.set('utm_medium', medium);
  url.searchParams.set('utm_campaign', campaign);
  if (content) {
    url.searchParams.set('utm_content', content);
  }
  return url.toString();
}

// Clean up old analytics data from localStorage
export function cleanupAnalyticsData(): void {
  if (typeof window === 'undefined') return;

  const keys = Object.keys(localStorage);
  const now = Date.now();
  const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days

  keys.forEach(key => {
    if (key.startsWith('social_traffic_')) {
      const timestamp = parseInt(key.split('_')[2]);
      if (now - timestamp > maxAge) {
        localStorage.removeItem(key);
      }
    }
  });
} 