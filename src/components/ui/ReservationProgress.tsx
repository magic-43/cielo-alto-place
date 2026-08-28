import { Check } from "lucide-react";

interface ReservationProgressProps {
  currentStep: 1 | 2 | 3 | 4;
  onStepClick?: (step: 1 | 2 | 3 | 4) => void;
}

export function ReservationProgress({
  currentStep,
  onStepClick,
}: ReservationProgressProps) {
  const steps: Array<{ num: 1 | 2 | 3 | 4; label: string; icon: string }> = [
    { num: 1, label: "DATES", icon: "calendar_today" },
    { num: 2, label: "CABIN", icon: "cabin" },
    { num: 3, label: "GUEST", icon: "person" },
    { num: 4, label: "PAYMENT", icon: "payments" },
  ];

  return (
    <div className="bg-surface border-b border-outline/10 py-4 px-4 shadow-sm">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-2 sm:gap-4 py-1">
          {steps.map((step, index) => {
            const isCompleted = currentStep > step.num;
            const isCurrent = currentStep === step.num;
            const isClickable = isCompleted && onStepClick;

            return (
              <div key={step.num} className="flex items-center shrink-0">
                <button
                  type="button"
                  onClick={() => isClickable && onStepClick(step.num)}
                  disabled={!isClickable && !isCurrent}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all ${
                    isCurrent
                      ? "bg-primary text-on-primary font-bold shadow-sm"
                      : isCompleted
                      ? "bg-surface-container-high text-primary hover:bg-surface-variant cursor-pointer font-semibold"
                      : "text-on-surface-variant/60 cursor-not-allowed font-medium"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      isCurrent
                        ? "bg-on-primary text-primary"
                        : isCompleted
                        ? "bg-primary text-on-primary"
                        : "bg-surface-container text-on-surface-variant"
                    }`}
                  >
                    {isCompleted ? <Check className="w-3.5 h-3.5" /> : step.num}
                  </div>
                  <span className="text-xs tracking-wider uppercase">
                    {step.label}
                  </span>
                </button>

                {index < steps.length - 1 && (
                  <div className="w-4 sm:w-8 md:w-12 h-[1px] bg-outline/20 mx-1 shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
