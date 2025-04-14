import React from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Questions from "@/app/api/Questions";

const TriviaPage = async () => {

  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-grow p-4 space-y-4">
        <Questions />
      </div>

      <hr />
      <Footer className="absolute bottom-0 w-full" />
    </main>
  );
};

export default TriviaPage;
