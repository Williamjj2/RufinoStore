import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

interface AnalyticsPayload {
  event: string;
  data: any;
  timestamp: string;
}

export async function POST(request: NextRequest) {
  try {
    const payload: AnalyticsPayload = await request.json();
    const headersList = headers();
    
    // Get client info
    const userAgent = headersList.get('user-agent') || 'unknown';
    const clientIP = headersList.get('x-forwarded-for') || 
                    headersList.get('x-real-ip') || 
                    'unknown';
    const referer = headersList.get('referer') || '';

    // Enhance data with server-side info
    const enhancedData = {
      ...payload,
      client_ip: clientIP,
      user_agent: userAgent,
      referer: referer,
      server_timestamp: new Date().toISOString()
    };

    // Here you would typically:
    // 1. Validate the data
    // 2. Store in your analytics database
    // 3. Send to external analytics services
    
    console.log('Analytics Event Received:', {
      event: payload.event,
      timestamp: payload.timestamp,
      source: payload.data?.source || 'unknown',
      user_id: payload.data?.user_id || 'anonymous'
    });

    // Example: Store in database (implement based on your needs)
    // await storeAnalyticsEvent(enhancedData);

    // Example: Forward to Google Analytics
    // await forwardToGoogleAnalytics(enhancedData);

    // Example: Send to webhook for external processing
    // await sendToWebhook(enhancedData);

    return NextResponse.json({ 
      success: true, 
      message: 'Analytics event tracked successfully' 
    });

  } catch (error) {
    console.error('Analytics tracking error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to track analytics event' 
      },
      { status: 500 }
    );
  }
}

// Example function to store analytics in database
async function storeAnalyticsEvent(data: any) {
  // Implement based on your database choice
  // Example with Prisma:
  /*
  await prisma.analyticsEvent.create({
    data: {
      event_type: data.event,
      source: data.data?.source || 'unknown',
      user_id: data.data?.user_id,
      product_id: data.data?.product_id,
      value: data.data?.value,
      utm_source: data.data?.utm_source,
      utm_medium: data.data?.utm_medium,
      utm_campaign: data.data?.utm_campaign,
      client_ip: data.client_ip,
      user_agent: data.user_agent,
      timestamp: new Date(data.timestamp),
      raw_data: JSON.stringify(data)
    }
  });
  */
}

// Example function to forward to Google Analytics
async function forwardToGoogleAnalytics(data: any) {
  // Implement Google Analytics Measurement Protocol
  // This allows server-side tracking
  const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID;
  const GA_API_SECRET = process.env.GA_API_SECRET;
  
  if (!GA_MEASUREMENT_ID || !GA_API_SECRET) {
    console.warn('Google Analytics credentials not configured');
    return;
  }

  try {
    const response = await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${GA_MEASUREMENT_ID}&api_secret=${GA_API_SECRET}`,
      {
        method: 'POST',
        body: JSON.stringify({
          client_id: data.client_ip || 'anonymous', // You might want to generate a proper client_id
          events: [{
            name: data.event,
            parameters: {
              source: data.data?.source,
              user_id: data.data?.user_id,
              value: data.data?.value,
              custom_parameter: JSON.stringify(data.data)
            }
          }]
        })
      }
    );

    if (!response.ok) {
      throw new Error(`GA API error: ${response.status}`);
    }
  } catch (error) {
    console.error('Failed to send to Google Analytics:', error);
  }
}

// Example webhook function
async function sendToWebhook(data: any) {
  const webhookUrl = process.env.ANALYTICS_WEBHOOK_URL;
  
  if (!webhookUrl) {
    return;
  }

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.error('Failed to send to webhook:', error);
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Analytics tracking endpoint is active',
    methods: ['POST']
  });
} 