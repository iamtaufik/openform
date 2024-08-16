'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import type { Form, Question } from '@prisma/client';
import { createAnswer } from '@/actions/answer.actions';
import { Fredoka } from 'next/font/google';
import { toast } from 'react-toastify';
import Button from '@/components/Button';
import Spin from '@/components/Spin';

const fredoka = Fredoka({ subsets: ['latin'], weight: '400' });

interface FormWithQuestions extends Form {
  questions: (Question & {
    options: { id: string; text: string }[];
  })[];
}

const variants = {
  enter: (direction: number) => {
    return {
      opacity: 0,
      x: direction > 0 ? 100 : -100,
    };
  },
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => {
    return {
      opacity: 0,
      x: direction < 0 ? 100 : -100,
    };
  },
};

const AnswerForm = ({ form }: { form: FormWithQuestions }) => {
  const [answers, setAnswers] = useState<{ [questionId: string]: string | string[] }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load answers and current question index from localStorage
    const savedAnswers = localStorage.getItem(`answers-${form.slug}`);
    const savedIndex = localStorage.getItem(`currentQuestionIndex-${form.slug}`);
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
    if (savedIndex) {
      setCurrentQuestionIndex(parseInt(savedIndex, 10));
    }
  }, [form.slug]);

  useEffect(() => {
    if (Object.keys(answers).length > 0 || currentQuestionIndex > 0) {
      // Save answers and current question index to localStorage
      localStorage.setItem(`answers-${form.slug}`, JSON.stringify(answers));
      localStorage.setItem(`currentQuestionIndex-${form.slug}`, currentQuestionIndex.toString());
    }
  }, [answers, currentQuestionIndex, form.id, form.slug]);

  const handleChange = (questionId: string, value: string | string[]) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < form.questions.length - 1) {
      setDirection(1);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setDirection(-1);
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const dataToValidate = Object.keys(answers).map((questionId) => ({
        questionId,
        text: answers[questionId] || '',
      }));

      if (dataToValidate.length !== form.questions.length) {
        throw new Error('Please answer all questions before submitting.');
      }

      for (const answer of dataToValidate) {
        if (Array.isArray(answer.text)) {
          if (answer.text.length === 0) {
            throw new Error('Please ensure all multiple choice questions are answered.');
          }
        } else if (!answer.text.trim()) {
          throw new Error('Please ensure all questions are answered.');
        }
      }

      await createAnswer({
        formId: form.id,
        slug: form.slug,
        answers,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      }
      console.log(`Error creating answer: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const currentQuestion = form.questions[currentQuestionIndex];
  const questionLabel = `${currentQuestionIndex + 1}/${form.questions.length}`;

  return (
    <div className={`${fredoka.className} min-h-screen flex items-center justify-center bg-[#1B202A]`}>
      <div className="w-full max-w-sm lg:max-w-2xl ">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#FFF8E4]">{form.title}</h1>
        <p className="text-center text-[#FFF8E4] mb-4">{questionLabel}</p>
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div key={currentQuestion.id} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ type: 'tween', duration: 0.5 }}>
            <div
              style={{
                boxShadow: '6px 6px 0 #FACC15',
              }}
              className="bg-[#FFE479] border-4 border-black  shadow-md rounded-2xl p-6 max-w-sm lg:max-w-2xl  w-full text-black"
            >
              <div className="mb-6">
                <label className="block text-3xl font-semibold text-black">
                  {currentQuestionIndex + 1}. {currentQuestion.text}
                </label>
                {currentQuestion.type === 'TEXT' && (
                  <input
                    type="text"
                    className="mt-2 text-black block w-full font-medium rounded-md border-black shadow-sm focus:border-black focus:ring-black text-lg"
                    value={answers[currentQuestion.id] || ''}
                    placeholder="Type your answer here"
                    onChange={(e) => handleChange(currentQuestion.id, e.target.value)}
                  />
                )}
                {currentQuestion.type === 'SINGLE_CHOICE' && (
                  <div className="mt-2">
                    {currentQuestion.options.map((option) => (
                      <div key={option.id} className="flex items-center mb-2">
                        <input
                          type="radio"
                          name={`question-${currentQuestion.id}`}
                          value={option.id}
                          checked={answers[currentQuestion.id] === option.id}
                          className="mr-2"
                          onChange={(e) => handleChange(currentQuestion.id, e.target.value)}
                        />
                        <label>{option.text}</label>
                      </div>
                    ))}
                  </div>
                )}
                {currentQuestion.type === 'MULTIPLE_CHOICE' && (
                  <div className="mt-2">
                    {currentQuestion.options.map((option) => (
                      <div key={option.id} className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          value={option.id}
                          checked={((answers[currentQuestion.id] as string[]) || []).includes(option.id)}
                          className="mr-2"
                          onChange={(e) => {
                            const selectedOptions = (answers[currentQuestion.id] as string[]) || [];
                            const newSelectedOptions = e.target.checked ? [...selectedOptions, e.target.value] : selectedOptions.filter((v) => v !== e.target.value);
                            handleChange(currentQuestion.id, newSelectedOptions);
                          }}
                        />
                        <label>{option.text}</label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-between mt-6">
          {currentQuestionIndex > 0 && (
            <Button onClick={handlePrev} variant="secondary">
              Previous
            </Button>
          )}
          {currentQuestionIndex < form.questions.length - 1 ? (
            <Button onClick={handleNext} variant="primary">
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isLoading} className='group' variant="success">
              {isLoading ? <Spin /> : 'Submit'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnswerForm;
