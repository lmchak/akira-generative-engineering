import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSupabaseAuth } from '@/integrations/supabase';
import { useProfile } from '@/integrations/supabase/hooks/profiles';

const Subscription = () => {
  const { session } = useSupabaseAuth();
  const { data: profile, isLoading } = useProfile(session?.user?.id);

  const plans = [
    { name: 'Basic', price: '$9.99/month', features: ['Feature 1', 'Feature 2', 'Feature 3'] },
    { name: 'Pro', price: '$19.99/month', features: ['All Basic features', 'Feature 4', 'Feature 5'] },
    { name: 'Enterprise', price: '$49.99/month', features: ['All Pro features', 'Feature 6', 'Feature 7'] },
  ];

  const handleSubscribe = (planName) => {
    // Here you would typically integrate with a payment provider
    // and update the user's subscription in your database
    alert(`Subscribing to ${planName} plan. Implement payment integration here.`);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Subscription Plans</h1>
      {profile && (
        <p className="mb-4">Current Plan: {profile.subscription_plan || 'Free'}</p>
      )}
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold mb-4">{plan.price}</p>
              <ul className="list-disc list-inside mb-4">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>{feature}</li>
                ))}
              </ul>
              <Button className="w-full" onClick={() => handleSubscribe(plan.name)}>
                {profile && profile.subscription_plan === plan.name ? 'Current Plan' : 'Subscribe'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Subscription;