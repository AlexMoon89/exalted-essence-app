'use client';

import { useEffect, useState } from 'react';
import { useSession } from '@supabase/auth-helpers-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { NewCampaignModal } from '@/components/NewCampaignModal';

type Campaign = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image?: string;
  gm_id: string;
  gm_name?: string;
};

export default function CampaignsPage() {
  const supabase = createClientComponentClient();
  const session = useSession();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    async function loadCampaigns() {
      if (!session?.user) return;

      const { data, error } = await supabase
        .from('campaigns')
        .select(`
          id,
          slug,
          name,
          description,
          image,
          gm_id,
          profiles (
            display_name
          )
        `)
        .or(`gm_id.eq.${session.user.id},participants.cs.{${session.user.id}}`);

      if (error) {
        console.error('Error loading campaigns:', error.message);
      } else {
        const enriched = data?.map((c: any) => ({
          ...c,
          gm_name: c.profiles?.display_name || 'GM',
        }));
        setCampaigns(enriched || []);
      }
    }

    loadCampaigns();
  }, [session]);

  return (
    <div className="p-6">
      <h1 className="text-3xl bg-gradient-to-r from-aura-abyssal to-aura-sidereal text-transparent bg-clip-text mb-4">
        Your Campaigns
      </h1>

      <div className="mb-6">
        <NewCampaignModal />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <Link
            key={campaign.id}
            href={`/campaigns/${campaign.slug}`}
            className="group bg-card border border-muted rounded-xl shadow hover:shadow-lg transition duration-200 overflow-hidden"
          >
            <img
              src={campaign.image || '/castes/default.png'}
              alt={campaign.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 space-y-1">
              <h2 className="text-lg font-bold text-steel group-hover:underline">
                {campaign.name}
              </h2>
              <p className="text-xs text-muted-foreground">
                GM: {campaign.gm_name}
              </p>
              {campaign.description && (
                <p className="text-sm text-aura-abyssal line-clamp-3">
                  {campaign.description}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
