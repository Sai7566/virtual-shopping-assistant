import React from 'react';
import { useTranslation } from "react-i18next";
import heroImg1 from '../assets/heroImg1.png';
import Footer from '../Components/Footer';

const About = () => {
  const { t } = useTranslation(); 

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6 flex flex-col items-center justify-center">
      {/* Hero Section with Overlay Text */}
      <div className="relative w-full flex justify-center mb-10">
        <img src={heroImg1} alt={t("about.title")} className="w-[80%] md:w-[50%] rounded-lg shadow-lg" />
        
        {/* Overlay Text */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white px-6 py-3 rounded-lg text-2xl font-bold">
          Virtual Shopping Assistant
        </div>
      </div>

      {/* About Content */}
      <div className="max-w-4xl bg-white shadow-lg rounded-2xl p-8">
        {/* Header Section */}
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-6">
          {t("about.title")}
        </h1>
        <p className="text-gray-600 text-lg text-center">
          {t("about.description", { brand: "VSA" })}
        </p>

        {/* Mission Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-3">{t("about.mission")}</h2>
          <p className="text-gray-600 text-lg">{t("about.missionText")}</p>
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-3">{t("about.whyChooseUs")}</h2>
          <ul className="list-disc pl-6 text-gray-600 text-lg">
            <li>{t("about.quality")}</li>
            <li>{t("about.aiAssistant")}</li>
            <li>{t("about.fastShipping")}</li>
            <li>{t("about.securePayments")}</li>
          </ul>
        </div>

        {/* Team Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-3">{t("about.meetTeam")}</h2>
          <p className="text-gray-600 text-lg">{t("about.teamText")}</p>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default About;


