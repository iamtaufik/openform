'use client';
import { createForm } from '@/actions/form.actions';
import { CreateFormDTO, createFormDTO } from '@/validations/form.validations';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ZodError } from 'zod';
import { toast } from 'react-toastify';
import Spin from '@/components/Spin';

const variants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 100 : -100,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction < 0 ? 100 : -100,
  }),
};

const CreateForm = () => {
  const [form, setForm] = useState<CreateFormDTO>({
    title: '',
    questions: [{ text: '', type: 'TEXT', options: [] }],
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleNext = () => {
    if (currentQuestionIndex < form.questions.length - 1) {
      setDirection(1);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        questions: [...prevForm.questions, { text: '', type: 'TEXT', options: [] }],
      }));
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
    setIsLoading(true);
    try {
      const filteredQuestions = form.questions.filter((question) => question.text.trim() !== '');
      const formToSubmit = { ...form, questions: filteredQuestions };

      await createFormDTO.parseAsync(formToSubmit);

      await createForm(formToSubmit);
      router.push('/forms');
      toast.success('Form created successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    } catch (error) {
      if (error instanceof ZodError) {
        for (const issue of error.errors) {
          toast.error(`- ${issue.path.join('.')} : ${issue.message}`, {
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
      }
      console.log(`Error creating form: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (index: number, field: string, value: any) => {
    const updatedQuestions = form.questions.map((question, qIndex) => {
      if (qIndex === index) {
        return { ...question, [field]: value, options: question.options || [] };
      }
      return question;
    });
    setForm({ ...form, questions: updatedQuestions });
  };

  const addOption = (index: number) => {
    const updatedQuestions = form.questions.map((question, qIndex) => {
      if (qIndex === index) {
        return {
          ...question,
          options: [...(question.options || []), { text: '' }],
        };
      }
      return question;
    });
    setForm({ ...form, questions: updatedQuestions });
  };

  const currentQuestion = form.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className=" max-w-xs lg:max-w-xl w-full space-y-6">
        <div>
          <h1 className="text-3xl font-bold  text-center">Create Form</h1>
        </div>
        <div className="">
          <label className="block text-lg font-medium text-gray-700">Form Title</label>
          <input
            type="text"
            className="mt-2 block w-full rounded-md border-l-2 border-t-2 border-r-4 border-b-4 border-black focus:border-[#1B202A] focus:ring-[#1B202A] text-lg"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Enter form title"
          />
        </div>
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div key={currentQuestionIndex} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ type: 'tween', duration: 0.5 }} className="question">
            <div className="bg-white border-l-2 border-t-2 border-r-4 border-b-4 border-black rounded-lg p-6 max-w-xs lg:max-w-xl w-full">
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700">Question {currentQuestionIndex + 1}</label>
                <input
                  type="text"
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1B202A] focus:ring-[#1B202A] text-lg"
                  value={currentQuestion.text}
                  onChange={(e) => handleChange(currentQuestionIndex, 'text', e.target.value)}
                  placeholder="Enter question text"
                />
                <select
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1B202A] focus:ring-[#1B202A] text-lg"
                  value={currentQuestion.type}
                  onChange={(e) => handleChange(currentQuestionIndex, 'type', e.target.value)}
                >
                  <option value="TEXT">Text</option>
                  <option value="SINGLE_CHOICE">Single Choice</option>
                  <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                </select>
                {['SINGLE_CHOICE', 'MULTIPLE_CHOICE'].includes(currentQuestion.type) && (
                  <div className="mt-4">
                    <label className="block text-lg font-medium text-gray-700">Options</label>
                    {currentQuestion.options?.map((option, index) => (
                      <input
                        key={index}
                        type="text"
                        className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                        value={option.text}
                        onChange={(e) => {
                          const updatedOptions = [...(currentQuestion.options || [])];
                          updatedOptions[index].text = e.target.value;
                          handleChange(currentQuestionIndex, 'options', updatedOptions);
                        }}
                        placeholder={`Option ${index + 1}`}
                      />
                    ))}
                    <button className="mt-2 px-4 py-2 border-l-2 border-t-2 border-r-4 border-b-4 border-black text-white bg-blue-500" onClick={() => addOption(currentQuestionIndex)}>
                      Add Option
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-between">
          <button onClick={handlePrev} disabled={currentQuestionIndex === 0} className="bg-gray-300 text-gray-700 rounded px-4 py-2 border-l-2 border-t-2 border-r-4 border-b-4 border-black disabled:opacity-50">
            Previous
          </button>
          {currentQuestionIndex < form.questions.length - 1 || currentQuestion.text !== '' ? (
            <button onClick={handleNext} className="bg-blue-500 text-white rounded px-4 py-2 border-l-2 border-t-2 border-r-4 border-b-4 border-black">
              Next
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={isLoading} className=" bg-green-500 text-white rounded px-4 py-2 border-l-2 border-t-2 border-r-4 border-b-4 border-black">
              {isLoading ? <Spin /> : 'Submit'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
