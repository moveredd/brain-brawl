import React from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const TriviaPage = async () => {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-grow"> 
        {/* Main Content Goes Here */}
      </div>


      <hr />
      <Footer className="absolute bottom-0 w-full" />
    </main>
  );
};

export default TriviaPage;
