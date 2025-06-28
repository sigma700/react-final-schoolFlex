import React from "react";
import BarPoll from "./components/votes";

function Contacts() {
  return (
    <main className="min-h-screen">
      <div>
        <section className="max-w-[500px] mx-auto my-8 p-4 md:p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-center mb-6 text-gray-800">
            Contact Us <br />
            @allankirimi65@gmail.com
          </h2>
          <form className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email Address"
              required
              className="p-3 rounded-md border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              required
              className="p-3 rounded-md border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              required
              className="p-3 rounded-md border border-gray-300 text-base resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="p-3 rounded-md bg-blue-600 text-white font-semibold transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </form>
        </section>
        <BarPoll />
      </div>
    </main>
  );
}

export default Contacts;
