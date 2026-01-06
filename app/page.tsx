import React from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import TriviaGame from "@/app/api/TriviaGame";

const TriviaPage = async () => {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-grow flex items-center justify-center p-4 md:p-6 lg:p-8">
        <TriviaGame />
      </div>

      <Footer />
    </main>
  );
};

export default TriviaPage;
