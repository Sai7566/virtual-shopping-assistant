import React from "react";
import { useTranslation } from "react-i18next";
import { BsFire } from "react-icons/bs";

const Title = ({ 
  title1, 
  title2, 
  titleStyles = "", 
  title1Styles = "", 
  paraStyles = "" 
}) => {
  const { t } = useTranslation();

  return (
    <div className={`${titleStyles} pb-2`}>
      <h3 className={`text-2xl font-semibold ${title1Styles}`}>
        {t(title1)}{" "}
        <span className="text-secondary font-light">{t(title2)}</span>
      </h3>
      <p className={`text-gray-500 text-sm mt-1 flex items-center gap-1 flex-wrap ${paraStyles}`}>
      {t("description")} <BsFire className="text-red-500 text-base" />
      </p>
    </div>
  );
};

export default Title;
