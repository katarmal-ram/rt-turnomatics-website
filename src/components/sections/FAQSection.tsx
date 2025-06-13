
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQSectionProps {
  data: {
    enabled?: boolean;
    title?: string;
    subtitle?: string;
    items?: Array<{
      question: string;
      answer: string;
      category?: string;
    }>;
    // Legacy support for old data structure
    questions?: Array<{
      question: string;
      answer: string;
      category?: string;
    }>;
  };
}

export const FAQSection = ({ data }: FAQSectionProps) => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  if (!data?.enabled) return null;

  // Support both new 'items' structure and legacy 'questions' structure
  const questions = data.items || data.questions || [];
  
  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const questionCount = questions.length;
  const containerClass = questionCount <= 3 ? "max-w-3xl" : "max-w-4xl";
  const paddingClass = questionCount === 0 ? "py-12" : questionCount <= 2 ? "py-16" : "py-20";

  return (
    <section className={`${paddingClass} bg-gray-50`}>
      <div className={`${containerClass} mx-auto px-4 sm:px-6 lg:px-8`}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {data.title || "Frequently Asked Questions"}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {data.subtitle || "Answers to common questions"}
          </p>
        </div>
        
        <div className="space-y-4">
          {questions.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <div>
                  {faq.category && (
                    <span className="text-sm text-blue-600 font-medium mb-1 block">
                      {faq.category}
                    </span>
                  )}
                  <h3 className="text-lg font-semibold text-gray-900">
                    {faq.question}
                  </h3>
                </div>
                {openQuestion === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {openQuestion === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
