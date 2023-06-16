import { logo } from "../assets/index";

const Hero = () => {
  return (
    <section className="w-full">
      <header className="flex justify-between items-center mt-4 text-lg">
        <div>
          <img className="w-36" src={logo} alt="" />
        </div>
        <button
          className="bg-black text-white rounded-full p-2 w-32"
          onClick={() => window.open("https://github.com/Vsoni27/OpenAI-Summarizer")}
        >
          GitHub
        </button>
      </header>
      <div className="flex flex-col items-center mt-16">
        <h1 className="head_text">Summarize Articles with</h1>
        <h1 className="orange_gradient head_text">OpenAI GPT-4</h1>
        <p className="text-center text-xl font-bold text-gray-600 mt-10 w-4/5">
          Simplify your reading with Summize, an open-source article summarizer
          that transforms lengthy articles into clear and concise summaries
        </p>
      </div>
    </section>
  );
};

export default Hero;
