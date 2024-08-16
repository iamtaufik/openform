import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';
import { Fredoka } from 'next/font/google';

const fredoka = Fredoka({ subsets: ['latin'], weight: '400' });

const whyChooseUs = [
  {
    title: 'Seamless User Experience',
    description: 'OpenForm offers an intuitive and easy-to-use interface that makes creating, distributing, and analyzing forms a breeze.',
  },
  {
    title: 'Engaging & Interactive Forms',
    description: 'Our platform goes beyond traditional forms, turning them into interactive experiences that keep your audience engaged. Capture more meaningful responses with features designed to spark conversation.',
  },
  {
    title: 'Powerful Insights, Simplified',
    description: 'With OpenForm, gathering data is just the beginning. Our advanced analytics tools make it easy to interpret results, so you can make informed decisions faster and with confidence.',
  },
];

const testimonial = [
  {
    name: 'Janet Woods',
    email: 'janet.woods@example.com',
    avatar: 'https://randomuser.me/api/portraits/med/women/34.jpg',
    description: 'OpenForm revolutionized the way we gather feedback from our clients. The intuitive design and interactive features have significantly increased our response rates.',
  },
  {
    name: 'Philip Patel',
    email: 'philip.patel@example.com',
    avatar: 'https://randomuser.me/api/portraits/med/men/66.jpg',
    description: 'Creating forms with OpenForm is so easy and efficient. We saved hours on data collection and gained valuable insights that helped us improve our services.',
  },
  {
    name: 'David Sanz',
    email: 'david.sanz@example.com',
    avatar: 'https://randomuser.me/api/portraits/med/men/80.jpg',
    description: "OpenForm's engaging forms have transformed our surveys into a fun and interactive experience for our customers. The insights we've gathered are more detailed than ever before.",
  },
  {
    name: 'Jeannette Kuhnert',
    email: 'jeannette.kuhnert@example.com',
    avatar: 'https://randomuser.me/api/portraits/med/women/66.jpg',
    description: 'We needed a solution that was both powerful and user-friendly, and OpenForm delivered. Our team loves the simplicity, and our audience appreciates the thoughtful design.',
  },
  {
    name: 'Claudia Collazo',
    email: 'claudia.collazo@example.com',
    avatar: 'https://randomuser.me/api/portraits/med/women/74.jpg',
    description: "Thanks to OpenForm, our event registrations have become a breeze. The platform's ease of use and robust analytics have been game-changers for our planning process.",
  },
  {
    name: 'Juliette Morin',
    email: 'juliette.morin@example.com',
    avatar: 'https://randomuser.me/api/portraits/med/women/72.jpg',
    description: "OpenForm's interactive forms have helped us connect with our audience in a way that feels personal and engaging. It's a must-have tool for anyone serious about collecting meaningful data",
  },
];

export default async function Home() {
  const user = await currentUser();

  return (
    <main className={`${fredoka.className} min-h-screen bg-[#1B202A] text-[#FFF8E4] px-10 lg:px-32`}>
      <header className="flex justify-between h-10 py-10 items-center">
        <nav className="flex justify-between w-full items-center">
          <span className="text-3xl font-semibold">
            open<span className="text-[#FFE479]">Form</span>
          </span>
          <ul className=" gap-10 hidden lg:flex">
            <li>
              <a href="#whyUs">Why us?</a>
            </li>
            <li>Testimonial</li>
          </ul>
          <div className="space-x-6 hidden lg:block">
            {user ? (
              <Link
                href="/dashboard"
                className="ml-auto border-4 border-black inline-flex items-center scale-100 px-4 py-2 text-base font-semibold rounded-lg text-black bg-[#FFE479] shadow-[3px_3px_0_#FACC15]  transition-all ease-in-out duration-300 hover:scale-[0.9] hover:text-[#FFF8E4] hover:bg-[#1B202A] hover:border-[#1B202A]"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="ml-auto border-4 border-black inline-flex items-center scale-100 px-4 py-2 text-base font-semibold rounded-lg text-black bg-[#A9C0FB] shadow-[3px_3px_0_#FACC15]  transition-all ease-in-out duration-300 hover:scale-[0.9] hover:text-[#FFF8E4] hover:bg-[#1B202A] hover:border-[#1B202A]"
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  className="ml-auto border-4 border-black inline-flex items-center scale-100 px-4 py-2 text-base font-semibold rounded-lg text-black bg-[#FFE479] shadow-[3px_3px_0_#FACC15]  transition-all ease-in-out duration-300 hover:scale-[0.9] hover:text-[#FFF8E4] hover:bg-[#1B202A] hover:border-[#1B202A]"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>
      <div className="flex items-center justify-between py-20 flex-col lg:flex-row">
        <div>
          <Image src={'./reading-side.svg'} alt="Reading side" width={600} height={600} />
        </div>
        <div className="w-full max-w-xl">
          <h1 className="text-4xl font-semibold">Seamless Forms, Powerful Feedback</h1>
          <p className="text-base mt-4">
            OpenForm is a user-friendly platform that transforms the way you collect and analyze data. With interactive and engaging forms, OpenForm empowers you to connect with your audience, gather meaningful insights, and make informed
            decisions. Whether for surveys, feedback, or creative questionnaires, OpenForm simplifies the process, making every response count.
          </p>
          <div className="mt-10">
            <Link
              href="/sign-up"
              className="border-4 border-black inline-flex items-center scale-100 px-4 py-2 text-base font-semibold rounded-lg text-black bg-[#FFE479] shadow-[3px_3px_0_#FACC15]  transition-all ease-in-out duration-300 hover:scale-[0.9] hover:text-[#FFF8E4] hover:bg-[#1B202A] hover:border-[#1B202A]"
            >
              Get started for free
            </Link>
          </div>
        </div>
      </div>
      <div id="whyUs" className="py-10 space-y-10">
        <h1 className="text-4xl font-semibold">Why chose us?</h1>
        <div className="flex justify-between flex-col space-y-8 items-center lg:space-y-0 lg:items-start lg:flex-row">
          {whyChooseUs.map((item, index) => (
            <div
              key={index}
              className="w-full max-w-sm border-4 border-black  scale-100 px-4 py-2 text-base font-semibold rounded-lg text-black bg-[#A9C0FB] shadow-[3px_3px_0_#FACC15]  transition-all ease-in-out duration-300 hover:scale-[0.98] hover:text-[#FFF8E4] hover:bg-[#1B202A] hover:border-[#1B202A]"
            >
              <h2 className="text-2xl font-semibold">{item.title}</h2>
              <p className="text-base mt-4">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div id="testimonial" className="py-10 space-y-10 ">
        <h1 className="text-center text-4xl font-semibold">Testimonial</h1>
        <div className='flex flex-wrap justify-between gap-6'>
          {
            testimonial.map((item, index) => (
            <div key={index} className="w-full max-w-sm border-4 border-black  space-y-4 scale-100 p-4 text-base font-semibold rounded-lg text-black bg-[#A9C0FB] shadow-[3px_3px_0_#FACC15]  transition-all ease-in-out duration-300 hover:scale-[0.98] hover:text-[#FFF8E4] hover:bg-[#1B202A] hover:border-[#1B202A]">
              <div className="flex space-x-4">
                <Image src={item.avatar} className="rounded-full " alt={item.name} width={60} height={60} />
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm font-normal">{item.email}</p>
                </div>
              </div>
              <div>
                <p className="text-base">{item.description}</p>
              </div>
            </div>
            ))
          }
        </div>
      </div>
    </main>
  );
}
