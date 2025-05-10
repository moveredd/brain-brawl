import React from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import TriviaGame from "@/app/api/TriviaGame"; // <-- import the wrapper

const TriviaPage = async () => {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-grow p-4 space-y-4">
        <TriviaGame /> {/* <-- use the wrapper here */}
      </div>

      <hr />
      <Footer className="absolute bottom-0 w-full" />
    </main>
  );
};

export default TriviaPage;
