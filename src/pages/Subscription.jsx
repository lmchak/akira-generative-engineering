import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Subscription = () => {
  const plans = [
    { name: 'Basic', price: '$9.99/month', features: ['Feature 1', 'Feature 2', 'Feature 3'] },
    { name: 'Pro', price: '$19.99/month', features: ['All Basic features', 'Feature 4', 'Feature 5'] },
    { name: 'Enterprise', price: '$49.99/month', features: ['All Pro features', 'Feature 6', 'Feature 7'] },
  ];

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Subscription Plans</h1>
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
              <Button className="w-full">Subscribe</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </Layout>
  );
};

export default Subscription;