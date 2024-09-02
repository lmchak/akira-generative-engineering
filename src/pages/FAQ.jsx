import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FAQ = () => {
  const faqItems = [
    { question: 'What is rUv?', answer: 'rUv is a platform for capturing and sharing moments through images and connecting with others.' },
    { question: 'How do I create an account?', answer: 'You can create an account by clicking on the "Sign Up" button on the homepage and following the registration process.' },
    { question: 'Is rUv free to use?', answer: 'rUv offers both free and paid subscription plans. The basic features are free, while advanced features require a subscription.' },
    { question: 'How can I reset my password?', answer: 'You can reset your password by clicking on the "Forgot Password" link on the login page and following the instructions sent to your email.' },
    { question: 'Can I delete my account?', answer: 'Yes, you can delete your account by going to the Settings page and selecting the "Delete Account" option.' },
  ];

  const handleSubmitQuestion = (e) => {
    e.preventDefault();
    const question = e.target.question.value;
    alert(`Your question "${question}" has been submitted. We'll get back to you soon!`);
    e.target.reset();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Frequently Asked Questions</h1>
      <Accordion type="single" collapsible className="w-full mb-8">
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Can't find what you're looking for?</h2>
        <form onSubmit={handleSubmitQuestion} className="space-y-4">
          <Input name="question" placeholder="Type your question here" required />
          <Button type="submit">Submit Question</Button>
        </form>
      </div>
    </div>
  );
};

export default FAQ;