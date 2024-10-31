import React from 'react';

export const Steps = ({ steps, currentStep }) => {
  return (
    <div className="relative flex justify-between">
      {steps.map((step, index) => (
        <Step
          key={step.id}
          number={step.id}
          title={step.title}
          isActive={currentStep === step.id}
          isCompleted={currentStep > step.id}
          isLast={index === steps.length - 1}
        />
      ))}
    </div>
  );
};

export const Step = ({ number, title, isActive, isCompleted, isLast }) => {
  return (
    <div className="flex flex-col items-center relative">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isActive
            ? 'bg-blue-600 text-white'
            : isCompleted
            ? 'bg-green-500 text-white'
            : 'bg-gray-200 text-gray-600'
        }`}
      >
        {number}
      </div>
      <div className="text-xs mt-2 text-center max-w-[100px]">{title}</div>
      {!isLast && (
        <div
          className={`absolute top-4 left-8 w-[calc(100%-2rem)] h-0.5 -translate-y-1/2 ${
            isCompleted ? 'bg-green-500' : 'bg-gray-200'
          }`}
        />
      )}
    </div>
  );
};