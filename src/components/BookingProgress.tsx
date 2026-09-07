import React from 'react';
import { Check, Plane, Tag, Armchair, User, CreditCard, CheckCircle2 } from 'lucide-react';
import { BookingStep } from '../context/BookingContext';

interface BookingProgressProps {
  currentStep: BookingStep;
  onStepClick?: (step: BookingStep) => void;
}

interface StepItem {
  id: BookingStep;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const STEPS: StepItem[] = [
  { id: 'search', label: 'Flight', icon: Plane },
  { id: 'fare', label: 'Fare', icon: Tag },
  { id: 'seats', label: 'Seat', icon: Armchair },
  { id: 'passengers', label: 'Passenger', icon: User },
  { id: 'payment', label: 'Payment', icon: CreditCard },
  { id: 'confirmation', label: 'Confirmation', icon: CheckCircle2 },
];

export const BookingProgress: React.FC<BookingProgressProps> = ({ currentStep, onStepClick }) => {
  const stepOrder: BookingStep[] = ['search', 'fare', 'seats', 'passengers', 'payment', 'confirmation'];
  const currentIndex = stepOrder.indexOf(currentStep);

  return (
    <div className="w-full pb-4 mb-4 border-b border-border">
      {/* Desktop / Tablet view */}
      <div className="hidden sm:flex items-center justify-between max-w-3xl mx-auto px-2">
        {STEPS.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const StepIcon = step.icon;

          return (
            <React.Fragment key={step.id}>
              <button
                type="button"
                disabled={!isCompleted || !onStepClick}
                onClick={() => isCompleted && onStepClick && onStepClick(step.id)}
                className={`flex items-center space-x-2 text-xs font-mono transition-all ${
                  isCompleted
                    ? 'text-ink hover:text-[#963F24] cursor-pointer'
                    : isCurrent
                    ? 'text-[#963F24] font-bold cursor-default'
                    : 'text-warm-gray cursor-not-allowed opacity-60'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                    isCompleted
                      ? 'bg-ink text-white'
                      : isCurrent
                      ? 'bg-[#963F24] text-white shadow-sm ring-2 ring-[#963F24]/20'
                      : 'bg-sand text-warm-gray border border-border'
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : <StepIcon className="w-3 h-3" />}
                </div>
                <span className="tracking-wider uppercase text-[11px] font-medium">{step.label}</span>
              </button>

              {index < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-[1.5px] mx-2 transition-colors ${
                    index < currentIndex ? 'bg-ink' : 'bg-border'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Mobile view */}
      <div className="sm:hidden flex items-center justify-between text-xs font-mono">
        <div className="flex items-center space-x-2 text-[#963F24] font-bold">
          <span className="w-5 h-5 rounded-full bg-[#963F24] text-white flex items-center justify-center text-[10px]">
            {currentIndex + 1}
          </span>
          <span className="uppercase tracking-wider font-semibold">
            {STEPS[currentIndex]?.label || 'BOOKING'}
          </span>
        </div>
        <span className="text-warm-gray text-[11px]">
          Step {currentIndex + 1} of {STEPS.length}
        </span>
      </div>
    </div>
  );
};
