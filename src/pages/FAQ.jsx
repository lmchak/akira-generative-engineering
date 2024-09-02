import React from 'react';
import Layout from '@/components/Layout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqItems = [
    { question: 'What is rUv?', answer: 'rUv is a platform for capturing and sharing moments through images and connecting with others.' },
    { question: 'How do I create an account?', answer: 'You can create an account by clicking on the "Sign Up" button on the homepage and following the registration process.' },
    { question: 'Is rUv free to use?', answer: 'rUv offers both free and paid subscription plans. The basic features are free, while advanced features require a subscription.' },
    { question: 'How can I reset my password?', answer: 'You can reset your password by clicking on the "Forgot Password" link on the login page and following the instructions sent to your email.' },
    { question: 'Can I delete my account?', answer: 'Yes, you can delete your account by going to the Settings page and selecting the "Delete Account" option.' },
  ];

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Frequently Asked Questions</h1>
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Layout>
  );
};

export default FAQ;